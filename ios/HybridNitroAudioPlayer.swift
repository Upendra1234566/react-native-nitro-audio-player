import Foundation
import UIKit
import AVFoundation
import MediaPlayer
import NitroModules

class HybridNitroAudioPlayer: HybridAudioPlayerSpecSpec {

    private var player: AVPlayer?
    private var timeObserver: Any?
    private var isPlaying = false
    private var isServiceActive = false

    override init() {
        super.init()
        setupAudioSession()
        setupRemoteTransportControls()
    }

    deinit {
        if let observer = timeObserver {
            player?.removeTimeObserver(observer)
        }
        NotificationCenter.default.removeObserver(self)
    }

    func play(url: String, title: String, artist: String, imageUrl: String?) throws {
        guard let audioUrl = URL(string: url) else { return }
        isServiceActive = true

        if player == nil || (player?.currentItem?.asset as? AVURLAsset)?.url != audioUrl {
            player = AVPlayer(url: audioUrl)
            timeObserver = player?.addPeriodicTimeObserver(forInterval: CMTime(seconds: 1, preferredTimescale: 1), queue: .main) { [weak self] _ in
                self?.updateNowPlayingInfoTime()
            }
            NotificationCenter.default.addObserver(self, selector: #selector(playerDidFinishPlaying), name: .AVPlayerItemDidPlayToEndTime, object: player?.currentItem)
        }

        player?.play()
        isPlaying = true
        updateNowPlayingMetadata(title: title, artist: artist, imageUrl: imageUrl)
        updateNowPlayingInfoTime()
    }

    func pause() throws {
        player?.pause()
        isPlaying = false
        updateNowPlayingInfoTime()
    }

    func stop() throws {
        killService()
    }

    private func killService() {
        isServiceActive = false
        player?.pause()
        isPlaying = false
        if let observer = timeObserver {
            player?.removeTimeObserver(observer)
            timeObserver = nil
        }
        player = nil
        MPNowPlayingInfoCenter.default().nowPlayingInfo = nil
        try? AVAudioSession.sharedInstance().setActive(false)
    }

    private func setupAudioSession() {
        do {
            try AVAudioSession.sharedInstance().setCategory(.playback, mode: .default)
            try AVAudioSession.sharedInstance().setActive(true)
        } catch {
            print("Failed to set audio session category.")
        }
    }

    private func setupRemoteTransportControls() {
        let commandCenter = MPRemoteCommandCenter.shared()
        commandCenter.playCommand.addTarget { [weak self] event in
            self?.player?.play()
            self?.isPlaying = true
            self?.updateNowPlayingInfoTime()
            return .success
        }
        commandCenter.pauseCommand.addTarget { [weak self] event in
            try? self?.pause()
            return .success
        }
        commandCenter.stopCommand.addTarget { [weak self] event in
            try? self?.stop()
            return .success
        }
    }

    private func updateNowPlayingMetadata(title: String, artist: String, imageUrl: String?) {
        if !isServiceActive { return }
        var nowPlayingInfo = MPNowPlayingInfoCenter.default().nowPlayingInfo ?? [String: Any]()
        nowPlayingInfo[MPMediaItemPropertyTitle] = title
        nowPlayingInfo[MPMediaItemPropertyArtist] = artist
        MPNowPlayingInfoCenter.default().nowPlayingInfo = nowPlayingInfo

        if let imageUrlString = imageUrl, let url = URL(string: imageUrlString) {
            DispatchQueue.global(qos: .background).async {
                if let data = try? Data(contentsOf: url), let image = UIImage(data: data) {
                    DispatchQueue.main.async {
                        let artwork = MPMediaItemArtwork(boundsSize: image.size) { _ in return image }
                        var updatedInfo = MPNowPlayingInfoCenter.default().nowPlayingInfo ?? [String: Any]()
                        updatedInfo[MPMediaItemPropertyArtwork] = artwork
                        MPNowPlayingInfoCenter.default().nowPlayingInfo = updatedInfo
                    }
                }
            }
        }
    }

    private func updateNowPlayingInfoTime() {
        if !isServiceActive { return }
        guard let player = player, let currentItem = player.currentItem else { return }
        var nowPlayingInfo = MPNowPlayingInfoCenter.default().nowPlayingInfo ?? [String: Any]()
        
        let duration = currentItem.duration.seconds
        let currentTime = currentItem.currentTime().seconds
        
        if !duration.isNaN {
            nowPlayingInfo[MPMediaItemPropertyPlaybackDuration] = duration
        }
        if !currentTime.isNaN {
            nowPlayingInfo[MPNowPlayingInfoPropertyElapsedPlaybackTime] = currentTime
        }
        
        nowPlayingInfo[MPNowPlayingInfoPropertyPlaybackRate] = isPlaying ? 1.0 : 0.0
        MPNowPlayingInfoCenter.default().nowPlayingInfo = nowPlayingInfo
    }
    
    func sum(num1: Double, num2: Double) throws -> Double {
        return num1 + num2
    }

    @objc private func playerDidFinishPlaying(note: NSNotification) {
        try? stop()
    }
}