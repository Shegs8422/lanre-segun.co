<template>
  <div ref="polaroidRef" data-no-drag="true" class="polaroid absolute transition-theme" :style="{
    left: `${x}px`,
    top: `${y}px`,
    transform: `rotate(${rotation}deg)`,
    zIndex: zIndex
  }" @mousedown="bringToFront">
    <!-- Photo area -->
    <div class="bg-canvas border border-border-subtle overflow-hidden relative group"
      :style="{ width: `${width}px`, height: `${height}px` }">
      <img v-if="src" :src="src" :alt="caption"
        class="w-full h-full object-cover filter sepia-[0.2] contrast-[1.05] group-hover:sepia-0 transition-all duration-500" />
      <!-- Placeholder if no image -->
      <div v-else class="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-zinc-800"
        :class="placeholderGradient">
        <ImageIcon class="w-8 h-8 text-black/20 dark:text-white/20" />
      </div>

      <!-- Shine effect -->
      <div
        class="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none mix-blend-overlay" />
    </div>
    <!-- Caption -->
    <p v-if="caption"
      class="absolute bottom-3 left-0 right-0 text-center text-xs font-mono text-gray-500/80 dark:text-gray-400/80 tracking-wide uppercase">
      {{ caption }}
    </p>
  </div>
</template>

<style scoped>
.polaroid {
  background: #fff;
  /* Polaroids are usually white, even in dark mode, or slightly off-white */
  padding: 12px;
  padding-bottom: 48px;
  box-shadow: var(--shadow-card);
  border-radius: 2px;
  cursor: grab;
  will-change: transform;
}

.polaroid:hover {
  box-shadow: var(--shadow-floating);
  z-index: 100 !important;
  /* Temporary lift on hover */
}

.polaroid:active {
  cursor: grabbing;
}
</style>

<script setup lang="ts">
import { Image as ImageIcon } from 'lucide-vue-next'

interface Props {
  x?: number
  y?: number
  width?: number
  height?: number
  rotation?: number
  src?: string
  caption?: string
  placeholderGradient?: string
}

const props = withDefaults(defineProps<Props>(), {
  x: 0,
  y: 0,
  width: 200,
  height: 200,
  rotation: 0,
  src: '',
  caption: '',
  placeholderGradient: 'from-blue-400 to-purple-500'
})

const polaroidRef = ref<HTMLElement | null>(null)
const zIndex = ref(10)

// Bring to front when clicked
const bringToFront = () => {
  zIndex.value = Date.now() % 1000 + 100
}

// Initialize individual dragging
onMounted(() => {
  if (!polaroidRef.value || !process.client) return

  nextTick(async () => {
    const { $gsap: gsap, $Draggable: Draggable } = useNuxtApp()

    if (polaroidRef.value) {
      Draggable.create(polaroidRef.value, {
        type: 'x,y',
        inertia: true,
        edgeResistance: 0.65,
        onPress: () => {
          bringToFront()
          gsap.to(polaroidRef.value, { scale: 1.05, duration: 0.2 })
        },
        onRelease: function () {
          // Stay put
          gsap.to(this.target, { scale: 1, duration: 0.2 })
        }
      })
    }
  })
})
</script>
