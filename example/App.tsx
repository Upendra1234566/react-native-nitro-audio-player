import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Button,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';

import { AudioPlayer } from 'react-native-nitro-audio-player';

const SONG_URL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
const SONG_IMAGE_URL = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c'; // Dynamic album art image URL

export default function App() {
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  const requestNotificationPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      try {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const playSong = () => {
    try {
      AudioPlayer.play(
        SONG_URL,
        'Mangalam Bhagwan Vishnu',
        'Manish Sharma',
        SONG_IMAGE_URL
      );
    } catch (error) {
      console.error('Play song error:', error);
      Alert.alert('Audio Error', String(error));
    }
  };

  const pauseSong = () => {
    try {
      AudioPlayer.pause();
    } catch (error) {
      console.error('Pause error:', error);
      Alert.alert('Audio Error', String(error));
    }
  };

  const stopSong = () => {
    try {
      AudioPlayer.stop(); // Pichle Kotlin update ke baad ab ye button properly audio kill kar dega
    } catch (error) {
      console.error('Stop error:', error);
      Alert.alert('Audio Error', String(error));
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Play Song" onPress={playSong} />
      <View style={styles.buttonSpace} />

      <Button title="Pause Song" onPress={pauseSong} />
      <View style={styles.buttonSpace} />

      <Button title="Stop Song" onPress={stopSong} color="#ff3b30" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  buttonSpace: {
    height: 16,
  },
});