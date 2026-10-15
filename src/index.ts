// import { NitroModules } from 'react-native-nitro-modules'
// import type { NitroAudioPlayer as NitroAudioPlayerSpec } from './specs/nitro-audio-player.nitro'

// export const NitroAudioPlayer =
//   NitroModules.createHybridObject<NitroAudioPlayerSpec>('NitroAudioPlayer') 

import { NitroModules } from 'react-native-nitro-modules';
import type { AudioPlayerSpec } from './specs/nitro-audio-player.nitro';

export const AudioPlayer =
  NitroModules.createHybridObject<AudioPlayerSpec>('AudioPlayerSpec');

export type { AudioPlayerSpec };