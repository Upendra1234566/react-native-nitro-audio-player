

package com.margelo.nitro.nitroaudioplayer

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.app.Service
import android.content.Intent
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.media.MediaPlayer
import android.os.IBinder
import android.os.Build
import android.support.v4.media.session.MediaSessionCompat
import android.support.v4.media.session.PlaybackStateCompat
import android.support.v4.media.MediaMetadataCompat
import androidx.core.app.NotificationCompat
import com.margelo.nitro.NitroModules
import com.margelo.nitro.nitroaudioplayer.HybridAudioPlayerSpecSpec
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import java.net.URL

class AudioForegroundService : Service() {
    private var mediaPlayer: MediaPlayer? = null
    private lateinit var mediaSession: MediaSessionCompat
    private var currentTitle = "Now Playing"
    private var currentArtist = "Audio Track"
    private var currentBitmap: Bitmap? = null
    private var isServiceActive = false

    companion object {
        const val ACTION_PLAY = "ACTION_PLAY"
        const val ACTION_PAUSE = "ACTION_PAUSE"
        const val ACTION_STOP = "ACTION_STOP"
        const val ACTION_NEXT = "ACTION_NEXT"
        const val ACTION_PREV = "ACTION_PREV"
    }

    override fun onCreate() {
        super.onCreate()
        mediaSession = MediaSessionCompat(this, "AudioServiceSession").apply {
            // Native Android 11+ Music Player exactly isi callback ko listen karta hai
            setCallback(object : MediaSessionCompat.Callback() {
                override fun onPlay() {
                    playAudio()
                }
                override fun onPause() {
                    pauseAudio()
                }
                override fun onStop() {
                    killService()
                }
                override fun onSkipToNext() {}
                override fun onSkipToPrevious() {}
            })
            isActive = true
        }
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        val action = intent?.action
        
        if (action == ACTION_STOP) {
            killService()
            return START_NOT_STICKY
        }

        val url = intent?.getStringExtra("audio_url")
        intent?.getStringExtra("audio_title")?.let { currentTitle = it }
        intent?.getStringExtra("audio_artist")?.let { currentArtist = it }
        val imageUrl = intent?.getStringExtra("audio_image_url")

        when (action) {
            ACTION_PLAY -> playAudio()
            ACTION_PAUSE -> pauseAudio()
            ACTION_NEXT, ACTION_PREV -> {}
            else -> {
                if (url != null) {
                    isServiceActive = true
                    CoroutineScope(Dispatchers.IO).launch {
                        val bitmap = if (imageUrl != null) getBitmapFromURL(imageUrl) else null
                        
                        withContext(Dispatchers.Main) {
                            if (!isServiceActive) return@withContext

                            currentBitmap = bitmap
                            startForeground(1, createNotification(PlaybackStateCompat.STATE_CONNECTING))
                            
                            try {
                                mediaPlayer?.release()
                                mediaPlayer = MediaPlayer().apply {
                                    setDataSource(url)
                                    prepareAsync()
                                    setOnPreparedListener { 
                                        if (!isServiceActive) {
                                            release()
                                            return@setOnPreparedListener
                                        }
                                        start()
                                        updateMetadata()
                                        updatePlaybackState(PlaybackStateCompat.STATE_PLAYING)
                                        updateNotification()
                                    }
                                    setOnCompletionListener {
                                        updatePlaybackState(PlaybackStateCompat.STATE_STOPPED)
                                        killService()
                                    }
                                }
                            } catch (e: Exception) {
                                e.printStackTrace()
                            }
                        }
                    }
                }
            }
        }
        return START_NOT_STICKY
    }

    private fun playAudio() {
        if (mediaPlayer?.isPlaying == false) {
            mediaPlayer?.start()
            updatePlaybackState(PlaybackStateCompat.STATE_PLAYING)
            updateNotification()
        }
    }

    private fun pauseAudio() {
        if (mediaPlayer?.isPlaying == true) {
            mediaPlayer?.pause()
            updatePlaybackState(PlaybackStateCompat.STATE_PAUSED)
            updateNotification()
        }
    }

    private fun killService() {
        isServiceActive = false
        try {
            if (mediaPlayer?.isPlaying == true) {
                mediaPlayer?.stop()
            }
            mediaPlayer?.release()
        } catch (e: Exception) {}
        mediaPlayer = null
        
        try {
            mediaSession.isActive = false
            mediaSession.release()
        } catch (e: Exception) {}

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            stopForeground(STOP_FOREGROUND_REMOVE)
        } else {
            stopForeground(true)
        }
        stopSelf()
    }

    private fun updateMetadata() {
        val duration = mediaPlayer?.duration?.toLong() ?: 0L
        val metadata = MediaMetadataCompat.Builder()
            .putString(MediaMetadataCompat.METADATA_KEY_TITLE, currentTitle)
            .putString(MediaMetadataCompat.METADATA_KEY_ARTIST, currentArtist)
            .putLong(MediaMetadataCompat.METADATA_KEY_DURATION, duration)
            .apply {
                if (currentBitmap != null) {
                    putBitmap(MediaMetadataCompat.METADATA_KEY_ALBUM_ART, currentBitmap)
                }
            }
            .build()
        mediaSession.setMetadata(metadata)
    }

    private fun updatePlaybackState(state: Int) {
        val position = mediaPlayer?.let { 
            if (it.isPlaying || it.currentPosition > 0) it.currentPosition.toLong() else 0L 
        } ?: 0L
        
        val stateBuilder = PlaybackStateCompat.Builder()
            .setActions(PlaybackStateCompat.ACTION_PLAY or PlaybackStateCompat.ACTION_PAUSE or PlaybackStateCompat.ACTION_STOP or PlaybackStateCompat.ACTION_SKIP_TO_NEXT or PlaybackStateCompat.ACTION_SKIP_TO_PREVIOUS or PlaybackStateCompat.ACTION_SEEK_TO)
            .setState(state, position, if (state == PlaybackStateCompat.STATE_PLAYING) 1.0f else 0f)
        mediaSession.setPlaybackState(stateBuilder.build())
    }

    private fun updateNotification() {
        if (!isServiceActive) return
        val state = if (mediaPlayer?.isPlaying == true) PlaybackStateCompat.STATE_PLAYING else PlaybackStateCompat.STATE_PAUSED
        val notificationManager = getSystemService(NotificationManager::class.java)
        notificationManager.notify(1, createNotification(state))
    }

    private suspend fun getBitmapFromURL(src: String): Bitmap? {
        return withContext(Dispatchers.IO) {
            try {
                val url = URL(src)
                val connection = url.openConnection()
                connection.doInput = true
                connection.connect()
                val input = connection.getInputStream()
                BitmapFactory.decodeStream(input)
            } catch (e: Exception) {
                e.printStackTrace()
                null
            }
        }
    }

    private fun createNotification(state: Int): Notification {
        createNotificationChannel()

        val isPlaying = state == PlaybackStateCompat.STATE_PLAYING

        val playIntent = Intent(this, AudioForegroundService::class.java).apply { action = ACTION_PLAY }
        val playPendingIntent = PendingIntent.getService(this, 1, playIntent, PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE)

        val pauseIntent = Intent(this, AudioForegroundService::class.java).apply { action = ACTION_PAUSE }
        val pausePendingIntent = PendingIntent.getService(this, 2, pauseIntent, PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE)

        val prevIntent = Intent(this, AudioForegroundService::class.java).apply { action = ACTION_PREV }
        val prevPendingIntent = PendingIntent.getService(this, 3, prevIntent, PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE)

        val nextIntent = Intent(this, AudioForegroundService::class.java).apply { action = ACTION_NEXT }
        val nextPendingIntent = PendingIntent.getService(this, 4, nextIntent, PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE)

        val stopIntent = Intent(this, AudioForegroundService::class.java).apply { action = ACTION_STOP }
        val stopPendingIntent = PendingIntent.getService(this, 5, stopIntent, PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE)

        return NotificationCompat.Builder(this, "AUDIO_CHANNEL_ID")
            .setContentTitle(currentTitle)
            .setContentText(currentArtist)
            .setSmallIcon(android.R.drawable.ic_media_play)
            .setLargeIcon(currentBitmap)
            .setStyle(androidx.media.app.NotificationCompat.MediaStyle()
                .setMediaSession(mediaSession.sessionToken)
                .setShowActionsInCompactView(0, 1, 2)
            )
            .addAction(android.R.drawable.ic_media_previous, "Previous", prevPendingIntent)
            .addAction(if (isPlaying) android.R.drawable.ic_media_pause else android.R.drawable.ic_media_play, if (isPlaying) "Pause" else "Play", if (isPlaying) pausePendingIntent else playPendingIntent)
            .addAction(android.R.drawable.ic_media_next, "Next", nextPendingIntent)
            .setOngoing(isPlaying)
            .setVisibility(NotificationCompat.VISIBILITY_PUBLIC)
            .setDeleteIntent(stopPendingIntent) // Jab notification dismiss/swipe hoga tab song turant stop ho jayega
            .build()
    }

    override fun onDestroy() {
        killService()
        super.onDestroy()
    }

    override fun onBind(intent: Intent?): IBinder? = null

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val serviceChannel = NotificationChannel(
                "AUDIO_CHANNEL_ID",
                "Media Playback Channel",
                NotificationManager.IMPORTANCE_LOW
            )
            val manager = getSystemService(NotificationManager::class.java)
            manager?.createNotificationChannel(serviceChannel)
        }
    }
}

class HybridNitroAudioPlayer : HybridAudioPlayerSpecSpec() {
    override fun play(url: String, title: String, artist: String, imageUrl: String?) {
        val context = NitroModules.applicationContext ?: return
        val intent = Intent(context, AudioForegroundService::class.java).apply {
            putExtra("audio_url", url)
            putExtra("audio_title", title)
            putExtra("audio_artist", artist)
            putExtra("audio_image_url", imageUrl)
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            context.startForegroundService(intent)
        } else {
            context.startService(intent)
        }
    }

    override fun pause() {
        val context = NitroModules.applicationContext ?: return
        val intent = Intent(context, AudioForegroundService::class.java).apply {
            action = AudioForegroundService.ACTION_PAUSE
        }
        context.startService(intent)
    }

    override fun stop() {
        val context = NitroModules.applicationContext ?: return
        val intent = Intent(context, AudioForegroundService::class.java).apply {
            action = AudioForegroundService.ACTION_STOP
        }
        context.startService(intent)
        context.stopService(intent)
    }
}