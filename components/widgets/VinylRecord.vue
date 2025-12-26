<!-- VinylRecord.vue - Interactive album with music playback -->
<template>
  <div 
    :class="['select-none w-fit h-fit relative cursor-pointer', classes]"
    :style="positionStyle"
    @click="handleClick"
  >
    <div class="relative w-48 h-48">
      <!-- Vinyl Disc (behind cover, rotates when playing) -->
      <div class="relative w-full h-full">
        <div 
          class="absolute inset-0 rounded-full bg-gradient-to-br from-gray-900 via-gray-800 to-black shadow-2xl"
          :style="{ 
            transform: isPlaying ? 'rotate(' + rotation + 'deg)' : 'rotate(0deg)',
            transition: 'none'
          }"
        >
          <!-- Grooves -->
          <div class="absolute inset-2 rounded-full border border-gray-700/30"></div>
          <div class="absolute inset-4 rounded-full border border-gray-700/20"></div>
          <div class="absolute inset-6 rounded-full border border-gray-700/20"></div>
          <div class="absolute inset-8 rounded-full border border-gray-700/20"></div>
          
          <!-- Center Label -->
          <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-red-800 overflow-hidden border-2 border-red-900">
            <img 
              :alt="`${artist || album} center`"
              width="80"
              height="80"
              :src="cover"
              class="w-full h-full object-cover"
            />
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-black/50"></div>
          </div>
        </div>
        
        <!-- Album Cover (slides when playing) -->
        <div 
          class="absolute inset-0 rounded-lg overflow-hidden shadow-lg transition-all duration-600 ease-in-out"
          :style="{ 
            transform: isPlaying ? 'translateX(45%)' : 'translateX(0)',
          }"
          @mouseenter="!isPlaying && (isHovering = true)"
          @mouseleave="isHovering = false"
        >
          <img 
            :alt="`${album} by ${artist}`" 
            width="216"
            height="216"
            :src="cover"
            class="w-full h-full object-cover"
          />
          
          <!-- Hover Overlay removed, using floating card instead -->
          
          <!-- Playing overlay -->
          <div 
            class="absolute inset-0 bg-black/20 transition-opacity duration-300"
            :style="{ opacity: isPlaying ? 1 : 0 }"
          ></div>
        </div>
      </div>
      
      <!-- Floating Info Card (Shows on Hover) -->
      <div 
        class="absolute -bottom-16 left-1/2 -translate-x-1/2 w-max max-w-[200px] z-20 pointer-events-none"
        :style="{ 
          opacity: isHovering && !isPlaying ? 1 : 0,
          transform: isHovering && !isPlaying ? 'translate(-50%, 0) scale(1) rotate(-5deg)' : 'translate(-50%, -10px) scale(0.9) rotate(-5deg)',
          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }"
      >
        <div class="bg-[#1A1A1A] text-white px-4 py-3 rounded-xl shadow-xl flex flex-col items-center border border-white/10">
          <p class="text-sm font-bold text-center leading-tight">{{ album }}</p>
          <p class="text-xs text-white/60 text-center mt-0.5">{{ artist }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSound } from '@vueuse/sound'

interface Props {
  cover: string
  album: string
  artist?: string
  musicFile?: string
  colStart?: number
  rowStart?: number
  rotation?: number
  x?: number
  y?: number
  classes?: string
}

const props = defineProps<Props>()

const { 
  isPlaying: isPlayingGlobal, 
  playTrack, 
  stopTrack,
  setCurrentSound,
  volume,
  isSoundEnabled 
} = useAlbumPlayer()

const isHovering = ref(false)
const rotation = ref(0)
const animationFrameId = ref<number | null>(null)

// Generate unique ID for this album
const albumId = computed(() => 
  `${props.album}-${props.artist}-${props.musicFile}`.replace(/\s+/g, '-').toLowerCase()
)

// Check if THIS album is playing
const isPlaying = computed(() => isPlayingGlobal(albumId.value))

// Setup audio if musicFile is provided
const soundResult = props.musicFile && isSoundEnabled.value
  ? useSound(props.musicFile, {
      volume: volume.value,
      onend: () => {
        stopTrack()
        if (animationFrameId.value) {
          cancelAnimationFrame(animationFrameId.value)
          animationFrameId.value = null
        }
        rotation.value = 0
      }
    })
  : null

const play = () => {
  if (soundResult && Array.isArray(soundResult)) {
    soundResult[0]()
  }
}

const stop = () => {
  if (soundResult && Array.isArray(soundResult) && soundResult[1]) {
    soundResult[1].stop()
  }
}

// Rotation animation
const animate = () => {
  if (isPlaying.value) {
    rotation.value = (rotation.value + 1) % 360
    animationFrameId.value = requestAnimationFrame(animate)
  }
}

// Watch for playing state changes
watch(isPlaying, (playing) => {
  if (playing) {
    // Start rotation animation
    if (!animationFrameId.value) {
      animate()
    }
  } else {
    // Stop rotation animation
    if (animationFrameId.value) {
      cancelAnimationFrame(animationFrameId.value)
      animationFrameId.value = null
    }
    rotation.value = 0
  }
})

const handleClick = () => {
  if (!props.musicFile) return
  
  if (isPlaying.value) {
    // Stop this track
    stop()
    stopTrack()
  } else {
    // Play this track
    if (isSoundEnabled.value) {
      play()
      playTrack({
        id: albumId.value,
        albumTitle: props.album,
        artist: props.artist || '',
        albumCover: props.cover,
        musicFile: props.musicFile
      })
      setCurrentSound({ play, stop })
    }
  }
}

const positionStyle = computed(() => {
  const styles: Record<string, string> = {}
  
  if (props.rotation) {
    styles.transform = `rotate(${props.rotation}deg)`
  }
  if (props.x !== undefined) {
    styles.left = `${props.x}px`
  }
  if (props.y !== undefined) {
    styles.top = `${props.y}px`
  }
  
  return styles
})

// Cleanup on unmount
onUnmounted(() => {
  if (animationFrameId.value) {
    cancelAnimationFrame(animationFrameId.value)
  }
  if (isPlaying.value) {
    stop()
  }
})
</script>
