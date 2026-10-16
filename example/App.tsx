
// import React, { useEffect, useState } from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   PermissionsAndroid,
//   Platform,
//   Alert,
//   Image,
// } from 'react-native';

// import { AudioPlayer } from 'react-native-nitro-audio-player';

// // 12 Real Bhakti Aarti & Mantra List with working audio streams
// const BHAKTI_SONGS = [
//   { 
//     id: '1', 
//     title: 'Mangalam Bhagwan Vishnu', 
//     artist: 'Manish Sharma', 
//     url: 'https://www.spiritualbee.com/media/gayatri-mantra-raga-1.mp3', 
//     image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500' 
//   },
//   { 
//     id: '2', 
//     title: 'Om Jai Jagdish Hare', 
//     artist: 'Anuradha Paudwal', 
//     url: 'https://www.spiritualbee.com/media/surya-ashtakam-gayatri-stavan-sanskrit.mp3', 
//     image: 'https://images.unsplash.com/photo-1604608672516-f1b9d1d37076?w=500' 
//   },
//   { 
//     id: '3', 
//     title: 'Hanuman Chalisa', 
//     artist: 'Gulshan Kumar', 
//     url: 'https://www.spiritualbee.com/media/gayatri-aarti.mp3', 
//     image: 'https://images.unsplash.com/photo-1567591370504-76f5b7d2b5f8?w=500' 
//   },
//   { 
//     id: '4', 
//     title: 'Gayatri Mantra', 
//     artist: 'Anuradha Paudwal', 
//     url: 'https://www.spiritualbee.com/media/gayatri-mantra-raga-1.mp3', 
//     image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500' 
//   },
//   { 
//     id: '5', 
//     title: 'Om Namah Shivaya', 
//     artist: 'Anuradha Paudwal', 
//     url: 'https://www.spiritualbee.com/media/surya-ashtakam-gayatri-stavan-sanskrit.mp3', 
//     image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=500' 
//   },
//   { 
//     id: '6', 
//     title: 'Jai Ganesh Deva', 
//     artist: 'Anuradha Paudwal', 
//     url: 'https://www.spiritualbee.com/media/gayatri-aarti.mp3', 
//     image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=500' 
//   },
//   { 
//     id: '7', 
//     title: 'Shree Ram Chandra Kripalu', 
//     artist: 'Lata Mangeshkar', 
//     url: 'https://www.spiritualbee.com/media/gayatri-mantra-raga-1.mp3', 
//     image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=500' 
//   },
//   { 
//     id: '8', 
//     title: 'Aarti Kunj Bihari Ki', 
//     artist: 'Anuradha Paudwal', 
//     url: 'https://www.spiritualbee.com/media/surya-ashtakam-gayatri-stavan-sanskrit.mp3', 
//     image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=500' 
//   },
//   { 
//     id: '9', 
//     title: 'Maha Mrityunjaya Mantra', 
//     artist: 'Anuradha Paudwal', 
//     url: 'https://www.spiritualbee.com/media/gayatri-aarti.mp3', 
//     image: 'https://images.unsplash.com/photo-1543333995-a78aea2eee50?w=500' 
//   },
//   { 
//     id: '10', 
//     title: 'Sukh Karta Dukh Harta', 
//     artist: 'Anuradha Paudwal', 
//     url: 'https://www.spiritualbee.com/media/gayatri-mantra-raga-1.mp3', 
//     image: 'https://images.unsplash.com/photo-1604608672516-f1b9d1d37076?w=500' 
//   },
//   { 
//     id: '11', 
//     title: 'Jai Ambe Gauri', 
//     artist: 'Anuradha Paudwal', 
//     url: 'https://www.spiritualbee.com/media/surya-ashtakam-gayatri-stavan-sanskrit.mp3', 
//     image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=500' 
//   },
//   { 
//     id: '12', 
//     title: 'Shiv Tandav Stotram', 
//     artist: 'Shankar Mahadevan', 
//     url: 'https://www.spiritualbee.com/media/gayatri-aarti.mp3', 
//     image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500' 
//   },
// ];

// export default function App() {
//   const [currentId, setCurrentId] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);

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
//         console.warn(err);
//       }
//     }
//   };

//   const playSong = (song) => {
//     try {
//       AudioPlayer.play(song.url, song.title, song.artist, song.image);
//       setCurrentId(song.id);
//       setIsPlaying(true);
//     } catch (error) {
//       console.error('Play song error:', error);
//       Alert.alert('Audio Error', String(error));
//     }
//   };

//   const pauseSong = () => {
//     try {
//       AudioPlayer.pause();
//       setIsPlaying(false);
//     } catch (error) {
//       Alert.alert('Audio Error', String(error));
//     }
//   };

//   const stopSong = () => {
//     try {
//       AudioPlayer.stop();
//       setCurrentId(null);
//       setIsPlaying(false);
//     } catch (error) {
//       Alert.alert('Audio Error', String(error));
//     }
//   };

//   const playNext = () => {
//     const currentIndex = BHAKTI_SONGS.findIndex(s => s.id === currentId);
//     const nextIndex = (currentIndex + 1) % BHAKTI_SONGS.length;
//     playSong(BHAKTI_SONGS[nextIndex]);
//   };

//   const playPrev = () => {
//     const currentIndex = BHAKTI_SONGS.findIndex(s => s.id === currentId);
//     const prevIndex = currentIndex <= 0 ? BHAKTI_SONGS.length - 1 : currentIndex - 1;
//     playSong(BHAKTI_SONGS[prevIndex]);
//   };

//   const renderItem = ({ item }) => {
//     const isCurrent = item.id === currentId;
//     return (
//       <TouchableOpacity
//         style={[styles.item, isCurrent && styles.activeItem]}
//         onPress={() => playSong(item)}
//       >
//         <Image source={{ uri: item.image }} style={styles.thumb} />
//         <View style={styles.textBox}>
//           <Text style={[styles.title, isCurrent && styles.activeText]} numberOfLines={1}>
//             {item.title}
//           </Text>
//           <Text style={styles.artist}>{item.artist}</Text>
//         </View>
//         <Text style={styles.icon}>{isCurrent && isPlaying ? '⏸️' : '▶️'}</Text>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>🙏 Bhakti Aarti Sangrah</Text>
//       {/* <Text style={styles.subHeader}>12 Aarti - Sunne ke liye tap karein</Text> */}

//       <FlatList
//         data={BHAKTI_SONGS}
//         keyExtractor={(item) => item.id}
//         renderItem={renderItem}
//         style={styles.list}
//         showsVerticalScrollIndicator={false}
//       />

//       {/* Bottom Controls */}
//       <View style={styles.controls}>
//         <TouchableOpacity style={styles.controlBtn} onPress={playPrev}>
//           <Text style={styles.controlText}>⏮️</Text>
//         </TouchableOpacity>

//         <TouchableOpacity 
//           style={[styles.controlBtn, styles.pauseBtn]} 
//           onPress={isPlaying ? pauseSong : () => currentId ? playSong(BHAKTI_SONGS.find(s => s.id === currentId)) : playSong(BHAKTI_SONGS[0])}
//         >
//           <Text style={styles.controlText}>{isPlaying ? '⏸️ Pause' : '▶️ Play'}</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.controlBtn} onPress={playNext}>
//           <Text style={styles.controlText}>⏭️</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={[styles.controlBtn, styles.stopBtn]} onPress={stopSong}>
//           <Text style={styles.controlText}>⏹️ Stop</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff7e6', paddingTop: 50, paddingHorizontal: 16 },
//   header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: '#b45309' },
//   subHeader: { fontSize: 13, textAlign: 'center', color: '#666', marginBottom: 16, marginTop: 4 },
//   list: { flex: 1 },
//   item: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 12, borderRadius: 12, marginBottom: 10, elevation: 2 },
//   activeItem: { backgroundColor: '#ffedd5', borderWidth: 1, borderColor: '#f59e0b' },
//   thumb: { width: 52, height: 52, borderRadius: 26, backgroundColor: '#eee' },
//   textBox: { flex: 1, marginLeft: 12 },
//   title: { fontSize: 16, fontWeight: '600', color: '#111' },
//   activeText: { color: '#b45309' },
//   artist: { fontSize: 13, color: '#888', marginTop: 2 },
//   icon: { fontSize: 18 },
//   controls: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 14, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#eee' },
//   controlBtn: { padding: 10, paddingHorizontal: 14, backgroundColor: '#f3f4f6', borderRadius: 20 },
//   pauseBtn: { backgroundColor: '#f59e0b' },
//   stopBtn: { backgroundColor: '#fee2e2' },
//   controlText: { fontSize: 15, fontWeight: '600' },
// }); 

import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Alert,
  Image,
} from 'react-native';

import { AudioPlayer } from 'react-native-nitro-audio-player';

// 15 Hindi & 5 Haryanvi Songs List (Audio URLs are for testing)
const SONGS_LIST = [
  // --- Hindi Songs ---
  { id: '1', title: 'Chaleya', artist: 'Arijit Singh', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', image: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=500' },
  { id: '2', title: 'Kesariya', artist: 'Arijit Singh', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', image: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f5f9af?w=500' },
  { id: '3', title: 'Apna Bana Le', artist: 'Arijit Singh', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500' },
  { id: '4', title: 'Tum Hi Ho', artist: 'Arijit Singh', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500' },
  { id: '5', title: 'Kabira', artist: 'Tochi Raina, Rekha Bhardwaj', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500' },
  { id: '6', title: 'Tera Ban Jaunga', artist: 'Akhil Sachdeva, Tulsi Kumar', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500' },
  { id: '7', title: 'Kal Ho Naa Ho', artist: 'Sonu Nigam', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500' },
  { id: '8', title: 'Tujh Mein Rab Dikhta Hai', artist: 'Roop Kumar Rathod', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=500' },
  { id: '9', title: 'Channa Mereya', artist: 'Arijit Singh', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3', image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=500' },
  { id: '10', title: 'Hawayein', artist: 'Arijit Singh', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3', image: 'https://images.unsplash.com/photo-1458560871784-56d23406c091?w=500' },
  { id: '11', title: 'Zaalima', artist: 'Arijit Singh, Harshdeep Kaur', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3', image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500' },
  { id: '12', title: 'Gerua', artist: 'Arijit Singh, Antara Mitra', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3', image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=500' },
  { id: '13', title: 'Pee Loon', artist: 'Mohit Chauhan', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3', image: 'https://images.unsplash.com/photo-1516280440502-a2f07ef4f215?w=500' },
  { id: '14', title: 'Tum Se Hi', artist: 'Mohit Chauhan', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3', image: 'https://images.unsplash.com/photo-1499364615650-ec38552f4cb8?w=500' },
  { id: '15', title: 'Raabta', artist: 'Arijit Singh', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3', image: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=500' },
  
  // --- Haryanvi Songs ---
  { id: '16', title: '52 Gaj Ka Daman', artist: 'Renuka Panwar', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3', image: 'https://images.unsplash.com/photo-1533174000220-4b2aeb289a01?w=500' },
  { id: '17', title: 'Gypsy', artist: 'GD Kaur', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', image: 'https://images.unsplash.com/photo-1513224502586-d1e602410265?w=500' },
  { id: '18', title: 'Bahu Kale Ki', artist: 'Gajender Phogat, Anu Kadyan', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', image: 'https://images.unsplash.com/photo-1525362081669-2b476bb628c3?w=500' },
  { id: '19', title: 'Mera Chand', artist: 'Sapna Choudhary', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', image: 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?w=500' },
  { id: '20', title: 'Loot Liya Haryana', artist: 'Masoom Sharma', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=500' },
];

export default function App() {
  const [currentId, setCurrentId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

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

  const playSong = (song) => {
    try {
      AudioPlayer.play(song.url, song.title, song.artist, song.image);
      setCurrentId(song.id);
      setIsPlaying(true);
    } catch (error) {
      console.error('Play song error:', error);
      Alert.alert('Audio Error', String(error));
    }
  };

  const pauseSong = () => {
    try {
      AudioPlayer.pause();
      setIsPlaying(false);
    } catch (error) {
      Alert.alert('Audio Error', String(error));
    }
  };

  const stopSong = () => {
    try {
      AudioPlayer.stop();
      setCurrentId(null);
      setIsPlaying(false);
    } catch (error) {
      Alert.alert('Audio Error', String(error));
    }
  };

  const playNext = () => {
    const currentIndex = SONGS_LIST.findIndex(s => s.id === currentId);
    const nextIndex = (currentIndex + 1) % SONGS_LIST.length;
    playSong(SONGS_LIST[nextIndex]);
  };

  const playPrev = () => {
    const currentIndex = SONGS_LIST.findIndex(s => s.id === currentId);
    const prevIndex = currentIndex <= 0 ? SONGS_LIST.length - 1 : currentIndex - 1;
    playSong(SONGS_LIST[prevIndex]);
  };

  const renderItem = ({ item }) => {
    const isCurrent = item.id === currentId;
    return (
      <TouchableOpacity
        style={[styles.item, isCurrent && styles.activeItem]}
        onPress={() => playSong(item)}
      >
        <Image source={{ uri: item.image }} style={styles.thumb} />
        <View style={styles.textBox}>
          <Text style={[styles.title, isCurrent && styles.activeText]} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.artist}>{item.artist}</Text>
        </View>
        <Text style={styles.icon}>{isCurrent && isPlaying ? '⏸️' : '▶️'}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🎵 Top Hits Collection</Text>
      <Text style={styles.subHeader}>Hindi & Haryanvi Blockbusters</Text>

      <FlatList
        data={SONGS_LIST}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={styles.list}
        showsVerticalScrollIndicator={false}
      />

      {/* Bottom Controls */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlBtn} onPress={playPrev}>
          <Text style={styles.controlText}>⏮️</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.controlBtn, styles.pauseBtn]} 
          onPress={isPlaying ? pauseSong : () => currentId ? playSong(SONGS_LIST.find(s => s.id === currentId)) : playSong(SONGS_LIST[0])}
        >
          <Text style={styles.controlText}>{isPlaying ? '⏸️ Pause' : '▶️ Play'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlBtn} onPress={playNext}>
          <Text style={styles.controlText}>⏭️</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.controlBtn, styles.stopBtn]} onPress={stopSong}>
          <Text style={styles.controlText}>⏹️ Stop</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0fdf4', paddingTop: 50, paddingHorizontal: 16 },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: '#166534' },
  subHeader: { fontSize: 13, textAlign: 'center', color: '#666', marginBottom: 16, marginTop: 4 },
  list: { flex: 1 },
  item: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 12, borderRadius: 12, marginBottom: 10, elevation: 2 },
  activeItem: { backgroundColor: '#dcfce7', borderWidth: 1, borderColor: '#22c55e' },
  thumb: { width: 52, height: 52, borderRadius: 26, backgroundColor: '#eee' },
  textBox: { flex: 1, marginLeft: 12 },
  title: { fontSize: 16, fontWeight: '600', color: '#111' },
  activeText: { color: '#166534' },
  artist: { fontSize: 13, color: '#888', marginTop: 2 },
  icon: { fontSize: 18 },
  controls: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 14, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#eee' },
  controlBtn: { padding: 10, paddingHorizontal: 14, backgroundColor: '#f3f4f6', borderRadius: 20 },
  pauseBtn: { backgroundColor: '#22c55e' },
  stopBtn: { backgroundColor: '#fee2e2' },
  controlText: { fontSize: 15, fontWeight: '600' },
});