// import React, { useEffect, useState } from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   TouchableOpacity,
//   PermissionsAndroid,
//   Platform,
//   Alert,
//   Image,
// } from 'react-native';
// import { AudioPlayer } from 'react-native-nitro-audio-player';

// interface Track {
//   id: string;
//   title: string;
//   artist: string;
//   url: string;
//   image: string;
// }

// const SONGS: Track[] = [
//   {
//     id: '1',
//     title: 'Nitro Aduio',
//     artist: 'Voice',
//     url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
//     image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500',
//   },
  
// ];

// export default function App() {
//   const [currentSong, setCurrentSong] = useState<Track>(SONGS[0]);
//   const [isPlaying, setIsPlaying] = useState<boolean>(false);

//   useEffect(() => {
//     requestNotificationPermission();
//   }, []);

//   const requestNotificationPermission = async () => {
//     if (Platform.OS === 'android' && Platform.Version >= 33) {
//       try {
//         await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
//         );
//       } catch (err) {
//         console.warn('Failed to get notification permission:', err);
//       }
//     }
//   };

//   const handlePlayPause = () => {
//     try {
//       if (isPlaying) {
//         AudioPlayer.pause();
//         setIsPlaying(false);
//       } else {
//         AudioPlayer.play(
//           currentSong.url,
//           currentSong.title,
//           currentSong.artist,
//           currentSong.image
//         );
//         setIsPlaying(true);
//       }
//     } catch (error) {
//       Alert.alert('Playback Error', String(error));
//     }
//   };

//   const handleStop = () => {
//     try {
//       AudioPlayer.stop();
//       setIsPlaying(false);
//     } catch (error) {
//       Alert.alert('Error', String(error));
//     }
//   };

//   const changeSong = (song: Track) => {
//     setCurrentSong(song);
//     AudioPlayer.play(song.url, song.title, song.artist, song.image);
//     setIsPlaying(true);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Nitro Audio Player</Text>

//       {/* Active Track Card */}
//       <View style={styles.card}>
//         <Image source={{ uri: currentSong.image }} style={styles.albumArt} />
//         <Text style={styles.title}>{currentSong.title}</Text>
//         <Text style={styles.artist}>{currentSong.artist}</Text>

//         <View style={styles.controlsRow}>
//           <TouchableOpacity style={styles.playBtn} onPress={handlePlayPause}>
//             <Text style={styles.btnText}>{isPlaying ? '⏸️ Pause' : '▶️ Play'}</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.stopBtn} onPress={handleStop}>
//             <Text style={styles.btnText}>⏹️ Stop</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Playlist */}
//       <Text style={styles.listHeader}>Available Tracks</Text>

//       {SONGS.map((song) => (
//         <TouchableOpacity
//           key={song.id}
//           style={[
//             styles.songItem,
//             currentSong.id === song.id && styles.activeSongItem,
//           ]}
//           onPress={() => changeSong(song)}
//         >
//           <Text
//             style={[
//               styles.songItemText,
//               currentSong.id === song.id && styles.activeSongText,
//             ]}
//           >
//             {song.title} - {song.artist}
//           </Text>
//         </TouchableOpacity>
//       ))}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F3F4F6',
//     alignItems: 'center',
//     paddingTop: 60,
//     paddingHorizontal: 20,
//   },
//   header: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#111827',
//     marginBottom: 30,
//     letterSpacing: 0.5,
//   },
//   card: {
//     backgroundColor: '#FFFFFF',
//     width: '100%',
//     padding: 20,
//     borderRadius: 20,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     elevation: 5,
//     marginBottom: 30,
//   },
//   albumArt: {
//     width: 180,
//     height: 180,
//     borderRadius: 90,
//     marginBottom: 20,
//     backgroundColor: '#E5E7EB',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#1F2937',
//     marginBottom: 4,
//     textAlign: 'center',
//   },
//   artist: {
//     fontSize: 14,
//     color: '#6B7280',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   controlsRow: {
//     flexDirection: 'row',
//     gap: 15,
//   },
//   playBtn: {
//     backgroundColor: '#3B82F6',
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 30,
//   },
//   stopBtn: {
//     backgroundColor: '#EF4444',
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 30,
//   },
//   btnText: {
//     color: '#FFFFFF',
//     fontSize: 15,
//     fontWeight: '600',
//   },
//   listHeader: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#4B5563',
//     alignSelf: 'flex-start',
//     marginBottom: 12,
//   },
//   songItem: {
//     width: '100%',
//     backgroundColor: '#FFFFFF',
//     padding: 15,
//     borderRadius: 12,
//     marginBottom: 10,
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//   },
//   activeSongItem: {
//     borderColor: '#3B82F6',
//     backgroundColor: '#EFF6FF',
//   },
//   songItemText: {
//     fontSize: 14,
//     color: '#374151',
//     fontWeight: '500',
//   },
//   activeSongText: {
//     color: '#1D4ED8',
//     fontWeight: '700',
//   },
// }); 

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
  ScrollView,
} from 'react-native';
import { AudioPlayer } from 'react-native-nitro-audio-player';

interface Track {
  id: string;
  title: string;
  artist: string;
  url: string;
  image: string;
}

const SONGS: Track[] = [
  // 1. Local Aarti Audio (Testing res/raw/aarti.mp3)
  {
    id: '1',
    title: 'Local Aarti (Raw)',
    artist: 'Offline Mandir Aarti',
    url: 'aarti',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=500',
  },

  // 2. Remote Web MP3 (Online Stream)
  {
    id: '2',
    title: 'Remote Online Track',
    artist: 'SoundHelix Stream',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500',
  },
];

export default function App() {
  const [currentSong, setCurrentSong] = useState<Track>(SONGS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

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
        console.warn('Notification permission error:', err);
      }
    }
  };

  const handlePlayPause = () => {
    try {
      if (isPlaying) {
        AudioPlayer.pause();
        setIsPlaying(false);
      } else {
        AudioPlayer.play(
          currentSong.url,
          currentSong.title,
          currentSong.artist,
          currentSong.image
        );
        setIsPlaying(true);
      }
    } catch (error) {
      Alert.alert('Playback Error', String(error));
    }
  };

  const handleStop = () => {
    try {
      AudioPlayer.stop();
      setIsPlaying(false);
    } catch (error) {
      Alert.alert('Stop Error', String(error));
    }
  };

  const changeSong = (song: Track) => {
    setCurrentSong(song);
    try {
      AudioPlayer.play(song.url, song.title, song.artist, song.image);
      setIsPlaying(true);
    } catch (error) {
      Alert.alert('Playback Error', String(error));
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Nitro Audio Player Tester</Text>

      {/* Card */}
      <View style={styles.card}>
        <Image source={{ uri: currentSong.image }} style={styles.albumArt} />
        <Text style={styles.title}>{currentSong.title}</Text>
        <Text style={styles.artist}>{currentSong.artist}</Text>
        <Text style={styles.urlDebug}>Source: {currentSong.url}</Text>

        <View style={styles.controlsRow}>
          <TouchableOpacity style={styles.playBtn} onPress={handlePlayPause}>
            <Text style={styles.btnText}>{isPlaying ? '⏸️ Pause' : '▶️ Play'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.stopBtn} onPress={handleStop}>
            <Text style={styles.btnText}>⏹️ Stop</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.listHeader}>Select Track to Test</Text>

      {SONGS.map((song) => (
        <TouchableOpacity
          key={song.id}
          style={[
            styles.songItem,
            currentSong.id === song.id && styles.activeSongItem,
          ]}
          onPress={() => changeSong(song)}
          activeOpacity={0.8}
        >
          <View>
            <Text
              style={[
                styles.songItemText,
                currentSong.id === song.id && styles.activeSongText,
              ]}
            >
              {song.title}
            </Text>
            <Text style={styles.songSubText}>{song.artist}</Text>
          </View>
          <Text style={styles.arrowIcon}>▶</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 4,
    marginBottom: 24,
  },
  albumArt: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 14,
    backgroundColor: '#E5E7EB',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
    textAlign: 'center',
  },
  artist: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 8,
    textAlign: 'center',
  },
  urlDebug: {
    fontSize: 12,
    color: '#4B5563',
    marginBottom: 16,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  controlsRow: {
    flexDirection: 'row',
    gap: 15,
  },
  playBtn: {
    backgroundColor: '#3B82F6',
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 24,
  },
  stopBtn: {
    backgroundColor: '#EF4444',
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 24,
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  listHeader: {
    fontSize: 15,
    fontWeight: '700',
    color: '#4B5563',
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  songItem: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  activeSongItem: {
    borderColor: '#3B82F6',
    backgroundColor: '#EFF6FF',
  },
  songItemText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  activeSongText: {
    color: '#1D4ED8',
    fontWeight: 'bold',
  },
  songSubText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  arrowIcon: {
    fontSize: 14,
    color: '#9CA3AF',
  },
});