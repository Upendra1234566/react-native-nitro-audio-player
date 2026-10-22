
package com.margelo.nitro.nitroaudioplayer

import android.content.Intent
import android.os.Build
import com.margelo.nitro.NitroModules

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