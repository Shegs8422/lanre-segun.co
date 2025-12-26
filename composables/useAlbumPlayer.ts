import { ref, computed } from 'vue'

interface TrackInfo {
    id: string
    albumTitle: string
    artist: string
    albumCover: string
    musicFile: string
}

interface SoundControl {
    play: () => void
    stop: () => void
}

const currentPlayingId = ref<string | null>(null)
const currentTrack = ref<TrackInfo | null>(null)
const currentSound = ref<SoundControl | null>(null)
const volume = ref(0.7)
const isSoundEnabled = ref(true)

export const useAlbumPlayer = () => {
    const isPlaying = (id: string) => {
        return currentPlayingId.value === id
    }

    const playTrack = (track: TrackInfo) => {
        // Stop current sound if playing
        if (currentSound.value) {
            currentSound.value.stop()
        }

        currentTrack.value = track
        currentPlayingId.value = track.id
    }

    const pauseTrack = () => {
        if (currentSound.value) {
            currentSound.value.stop()
        }
        currentPlayingId.value = null
    }

    const stopTrack = () => {
        if (currentSound.value) {
            currentSound.value.stop()
        }
        currentPlayingId.value = null
        currentTrack.value = null
        currentSound.value = null
    }

    const setCurrentSound = (sound: SoundControl | null) => {
        currentSound.value = sound
    }

    const toggleSound = () => {
        isSoundEnabled.value = !isSoundEnabled.value
        if (!isSoundEnabled.value && currentSound.value) {
            currentSound.value.stop()
            currentPlayingId.value = null
            currentTrack.value = null
            currentSound.value = null
        }
    }

    return {
        currentPlayingId: computed(() => currentPlayingId.value),
        currentTrack: computed(() => currentTrack.value),
        volume: computed(() => volume.value),
        isSoundEnabled: computed(() => isSoundEnabled.value),
        isPlaying,
        playTrack,
        pauseTrack,
        stopTrack,
        setCurrentSound,
        setVolume: (val: number) => { volume.value = val },
        toggleSound
    }
}
