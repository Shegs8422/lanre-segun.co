import { ref, onUnmounted, shallowRef } from 'vue'
import { Howl, type HowlOptions } from 'howler'

interface UseSoundOptions extends Omit<HowlOptions, 'src'> {
  volume?: number
  playbackRate?: number
  interrupt?: boolean
  soundEnabled?: boolean
  onload?: () => void
  onend?: () => void
  onpause?: () => void
  onstop?: () => void
  eager?: boolean
  [key: string]: any
}

/**
 * Robust client-side audio composable using Howler.js directly
 * Solves SSR issues by lazy-initializing the Howl instance
 */
export const useClientSound = (src: string, options: UseSoundOptions = {}) => {
  const isPlaying = ref(false)
  const duration = ref<number | null>(null)
  const sound = shallowRef<Howl | null>(null)

  // Initialize on first interaction or explicitly
  const init = () => {
    if (sound.value || typeof window === 'undefined') return

    // Create Howl instance
    console.log('[useClientSound] Initializing sound for:', src)
    const howl = new Howl({
      src: [src],
      // Default to false (Web Audio) for lower latency unless specified
      html5: options.html5 ?? false,
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
      onloaderror: (id: any, err: any) => {
        console.error('[useClientSound] LOAD ERROR:', src, err)
      },
      onplayerror: (id: any, err: any) => {
        console.error('[useClientSound] PLAY ERROR:', src, err)
        isPlaying.value = false
      }
    })

    sound.value = howl
  }

  // Eager initialization if requested
  if (options.eager && typeof window !== 'undefined') {
    // defer slightly to let hydration finish
    setTimeout(() => init(), 100)
  }

  const play = (opts?: any) => {
    const { isSoundEnabled } = useAlbumPlayer()
    if (!isSoundEnabled.value) {
      console.log('[useClientSound] Play blocked: Sound is disabled.')
      return
    }

    console.log('[useClientSound] Play requested for:', src)
    if (!sound.value) init()

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
    if (sound.value) {
      sound.value.volume(vol)
    }
  }

  // Cleanup
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
