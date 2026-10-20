# react-native-nitro-audio-player

<p align="center">
  <img width="1200" height="220" alt="banner" src="./assets/banner.png" />

[![img](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://github.com/sponsors/Upendra1234566)
</p> 

Background playback with lock-screen / notification controls on Android, and active playback controls on iOS.
<!-- [![Version](https://img.shields.io/npm/v/react-native-nitro-audio-player.svg)](https://www.npmjs.com/package/react-native-nitro-audio-player) -->

## Features

- tream audio from any remote URL
- Background playback with a native media notification (Android) and Now Playing info (iOS)
- Track metadata: title, artist and artwork image
- Lock-screen and notification controls (play, pause, stop)
- Built on Nitro Modules for fast, type-safe JS ↔ native calls
- Automatic cleanup when playback finishes or the notification is dismissedS

## Requirements

- React Native **v0.76.0** or higher
- Node **18.0.0** or higher
- Android: `minSdk` 21+ (Android 13+ requires a runtime notification permission)
- iOS: 13.0+

> [!IMPORTANT]
> To use `Nitro Views` you need React Native **v0.78.0** or higher.

## Installation

```bash
npm install react-native-nitro-audio-player react-native-nitro-modules
```

or with yarn / bun:

```bash
yarn add react-native-nitro-audio-player react-native-nitro-modules
bun add react-native-nitro-audio-player react-native-nitro-modules
```

For iOS, install the pods:

```bash
cd ios && pod install
```

## Platform Setup

### Android

**1. Add permissions** to `android/app/src/main/AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
<uses-permission android:name="android.permission.FOREGROUND_SERVICE_MEDIA_PLAYBACK" />
<uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
<uses-permission android:name="android.permission.WAKE_LOCK" />
```

**2. Declare the foreground service** inside the `<application>` tag (skip this if your manifest already merges it from the library):

```xml
<service
    android:name="com.margelo.nitro.nitroaudioplayer.AudioForegroundService"
    android:exported="false"
    android:foregroundServiceType="mediaPlayback" />
```

**3. Request notification permission at runtime (Android 13+).**
Without it, the media notification will not be visible:

```ts
import { PermissionsAndroid, Platform } from 'react-native';

if (Platform.OS === 'android' && Platform.Version >= 33) {
  await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
  );
}
```

> [!NOTE]
> Plain `http://` URLs are blocked by default on modern Android. Use `https://` URLs, or enable cleartext traffic for your app if you really need HTTP.

### iOS

Enable the **Audio, AirPlay, and Picture in Picture** background mode. In your `Info.plist`, add:

```xml
<key>UIBackgroundModes</key>
<array>
    <string>audio</string>
</array>
```

Or in Xcode: **Target → Signing & Capabilities → + Capability → Background Modes → Audio, AirPlay, and Picture in Picture**.

> [!NOTE]
> App Transport Security blocks plain `http://` URLs by default (`NSAllowsArbitraryLoads` is `false`). Use `https://` URLs, or add an ATS exception for your domain.

A full working `Info.plist` can be found in the [`example`](./example) app.

## Usage

```tsx
import React from 'react';
import { Button, View } from 'react-native';
import { NitroAudioPlayer } from 'react-native-nitro-audio-player';

export default function App() {
  const play = () => {
    NitroAudioPlayer.play(
      'https://example.com/audio/song.mp3',
      'Song Title',
      'Artist Name',
      'https://example.com/images/cover.jpg' // optional
    );
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', gap: 12 }}>
      <Button title="Play" onPress={play} />
      <Button title="Pause" onPress={() => NitroAudioPlayer.pause()} />
      <Button title="Stop" onPress={() => NitroAudioPlayer.stop()} />
    </View>
  );
}
```

## API

| Method | Description |
| --- | --- |
| `play(url, title, artist, imageUrl?)` | Starts playing the audio from `url` and shows the metadata in the notification / lock screen. |
| `pause()` | Pauses the current playback. |
| `stop()` | Stops playback, releases the player and removes the notification / Now Playing info. |

### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `url` | `string` | ✅ | Direct URL of the audio file or stream. |
| `title` | `string` | ✅ | Track title shown in the notification / lock screen. |
| `artist` | `string` | ✅ | Artist name shown in the notification / lock screen. |
| `imageUrl` | `string` | ❌ | Artwork image URL. Downloaded in the background and shown as album art. |

## How It Works

### Android

 Playback runs inside a **foreground service** (`AudioForegroundService`) using `MediaPlayer`, so audio keeps playing when the app goes to the background.
 A `MediaSessionCompat` is registered, which gives you the system media controls (including the Android 11+ media output / player UI).
 A `MediaStyle` notification is shown with Play / Pause actions.
 Swiping the notification away stops the playback and the service.
 When the track finishes, the service stops itself automatically.

### iOS

 Playback uses `AVPlayer` with the `.playback` audio session category.
 Track info and artwork are published to `MPNowPlayingInfoCenter`.
 Lock-screen and Control Center controls (play, pause, stop) are handled through `MPRemoteCommandCenter`.
 When the track ends, the player and Now Playing info are cleaned up.

## Current Limitations

 Single track playback only (no queue / playlist yet).
 Previous / Next buttons are placeholders and do not do anything yet.
 No seek, volume, or playback-state callbacks exposed to JS yet.
On Android, calling `play()` again always restarts the track from the beginning, even with the same URL.

## Troubleshooting

**No sound in the background on iOS**
Make sure the `audio` value is present in `UIBackgroundModes` and that you tested on a real device.

**No notification on Android 13+**
Request the `POST_NOTIFICATIONS` permission at runtime (see [Android setup](#android)).

**Service crash: `Context.startForegroundService() did not then call Service.startForeground()`**
Check that all foreground-service permissions are in your manifest and that the service has `foregroundServiceType="mediaPlayback"`.

**Audio does not load**
Verify the URL is reachable, uses `https://`, and points directly to an audio file or stream.

**`Nitro module not found` / build errors after install**
Make sure `react-native-nitro-modules` is installed, then clean and rebuild:

```bash
cd android && ./gradlew clean && cd ..
cd ios && pod install && cd ..
```

## Roadmap

- [ ] Queue / playlist support with working Next / Previous
- [ ] Seek and volume control
- [ ] Playback state and progress events
- [ ] Proper resume on Android without restarting the track

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Credits

Bootstrapped with [create-nitro-module](https://github.com/patrickkabwe/create-nitro-module).

## License

See the [LICENSE](./LICENSE) file for details.