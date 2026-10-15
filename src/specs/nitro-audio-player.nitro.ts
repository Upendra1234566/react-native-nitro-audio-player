// import type { HybridObject } from 'react-native-nitro-modules'

// export interface NitroAudioPlayer extends HybridObject<{ ios: 'swift', android: 'kotlin' }> {
//   sum(num1: number, num2: number): number
// } 

import { type HybridObject } from 'react-native-nitro-modules';

export interface AudioPlayerSpec extends HybridObject<{ ios: 'swift'; android: 'kotlin' }> {
  play(url: string, title: string, artist: string, imageUrl?: string): void;
  pause(): void;
  stop(): void;
}