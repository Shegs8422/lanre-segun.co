import { ref, onUnmounted, shallowRef, computed } from 'vue'
import { Howl, type HowlOptions } from 'howler'

// Strict typing for sound hook options
export interface UseSoundOptions extends Omit<HowlOptions, 'src'> {
  volume?: number
  playbackRate?: number
  interrupt?: boolean
  soundEnabled?: boolean
  onload?: () => void
  onend?: () => void
  onpause?: () => void
  onstop?: () => void
  eager?: boolean
  // Remove "any" signature to enforce stricter type safety (TS Pattern)
}

/**
 * Robust client-side audio composable using Howler.js.
 * Utilizes a Factory-like pattern to manage sound instances safely.
 */
export const useClientSound = (src: string, options: UseSoundOptions = {}) => {
  const isPlaying = ref(false)
  const duration = ref<number | null>(null)
  const sound = shallowRef<Howl | null>(null)

  // Security check: Validate src is a string and not empty
  if (typeof src !== 'string' || !src.trim()) {
    console.warn('[useClientSound] Invalid source provided')
    return {
      play: () => { },
      stop: () => { },
      pause: () => { },
      setVolume: () => { },
      isPlaying: computed(() => false),
      duration: computed(() => 0),
      sound: computed(() => null)
    }
  }

  // Factory creation method for the Howl instance
  const createSoundInstance = () => {
    if (sound.value || typeof window === 'undefined') return

    console.log('[useClientSound] Initializing sound for:', src)
    const howl = new Howl({
      src: [src],
      html5: options.html5 ?? false, // Default to false for lower latency
      volume: options.volume ?? 1,
      loop: options.loop ?? false,
      preload: options.preload ?? true,
      autoplay: false,
      ...options,
      onload: () => {
        duration.value = howl.duration()
        if (options.onload) options.onload()
      },
      onplay: () => {
        isPlaying.value = true
      },
      onpause: () => {
        isPlaying.value = false
        if (options.onpause) options.onpause()
      },
      onstop: () => {
        isPlaying.value = false
        if (options.onstop) options.onstop()
      },
      onend: () => {
        isPlaying.value = false
        if (options.onend) options.onend()
      },
      onloaderror: (_id: unknown, err: unknown) => {
        console.error('[useClientSound] LOAD ERROR:', src, err)
      },
      onplayerror: (_id: unknown, err: unknown) => {
        console.error('[useClientSound] PLAY ERROR:', src, err)
        isPlaying.value = false
      }
    })

    sound.value = howl
  }

  // Eager initialization if explicitly requested
  if (options.eager && typeof window !== 'undefined') {
    setTimeout(() => createSoundInstance(), 100)
  }

  const play = () => {
    const { isSoundEnabled } = useAlbumPlayer()

    // Enforce global sound preference
    if (!isSoundEnabled.value) {
      console.log('[useClientSound] Play blocked: Sound is disabled.')
      return
    }

    console.log('[useClientSound] Play requested for:', src)

    // Lazy initialization (Factory execution)
    if (!sound.value) createSoundInstance()

    if (sound.value) {
      if (options.interrupt) {
        sound.value.stop()
      }
      sound.value.play()
    }
  }

  const stop = () => {
    sound.value?.stop()
  }

  const pause = () => {
    sound.value?.pause()
  }

  const setVolume = (vol: number) => {
    sound.value?.volume(vol)
  }

  // Proper cleanup on unmount to prevent memory leaks
  onUnmounted(() => {
    if (sound.value) {
      sound.value.unload()
    }
  })

  return {
    play,
    stop,
    pause,
    setVolume,
    isPlaying,
    duration,
    sound
  }
}
