import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Alert,
  Image,
} from 'react-native';

import { AudioPlayer } from 'react-native-nitro-audio-player';

const SONGS = [
  { 
    id: '1', 
    title: 'Apna Bana Le', 
    artist: 'Arijit Singh', 
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', 
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500' 
  },
  { 
    id: '2', 
    title: '52 Gaj Ka Daman', 
    artist: 'Renuka Panwar', 
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', 
    image: 'https://images.unsplash.com/photo-1533174000220-4b2aeb289a01?w=500' 
  },
];

export default function App() {
  const [currentSong, setCurrentSong] = useState(SONGS[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  const requestNotificationPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      try {
        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const handlePlayPause = () => {
    try {
      if (isPlaying) {
        AudioPlayer.pause();
        setIsPlaying(false);
      } else {
        AudioPlayer.play(currentSong.url, currentSong.title, currentSong.artist, currentSong.image);
        setIsPlaying(true);
      }
    } catch (error) {
      Alert.alert('Error', String(error));
    }
  };

  const handleStop = () => {
    try {
      AudioPlayer.stop();
      setIsPlaying(false);
    } catch (error) {
      Alert.alert('Error', String(error));
    }
  };

  const changeSong = (song) => {
    setCurrentSong(song);
    AudioPlayer.play(song.url, song.title, song.artist, song.image);
    setIsPlaying(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Nitro Player Audio Player</Text>
      <View style={styles.card}>
        <Image source={{ uri: currentSong.image }} style={styles.albumArt} />
        <Text style={styles.title}>{currentSong.title}</Text>
        <Text style={styles.artist}>{currentSong.artist}</Text>

        {/* Player Controls */}
        <View style={styles.controlsRow}>
          <TouchableOpacity style={styles.playBtn} onPress={handlePlayPause}>
            <Text style={styles.btnText}>{isPlaying ? '⏸️ Pause' : '▶️ Play'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.stopBtn} onPress={handleStop}>
            <Text style={styles.btnText}>⏹️ Stop</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.listHeader}>Available Tracks</Text>

      {SONGS.map((song) => (
        <TouchableOpacity 
          key={song.id} 
          style={[styles.songItem, currentSong.id === song.id && styles.activeSongItem]}
          onPress={() => changeSong(song)}
        >
          <Text style={[styles.songItemText, currentSong.id === song.id && styles.activeSongText]}>
            {song.title} - {song.artist}
          </Text>
        </TouchableOpacity>
      ))}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 30,
    letterSpacing: 1,
  },
  card: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 40,
  },
  albumArt: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
    backgroundColor: '#E5E7EB',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
    textAlign: 'center',
  },
  artist: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 24,
    textAlign: 'center',
  },
  controlsRow: {
    flexDirection: 'row',
    gap: 15,
  },
  playBtn: {
    backgroundColor: '#3B82F6', 
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
  },
  stopBtn: {
    backgroundColor: '#EF4444',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  listHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4B5563',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  songItem: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  activeSongItem: {
    borderColor: '#3B82F6',
    backgroundColor: '#EFF6FF',
  },
  songItemText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  activeSongText: {
    color: '#1D4ED8',
    fontWeight: '700',
  },
});