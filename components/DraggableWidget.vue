<template>
  <div 
    ref="widgetRef"
    class="draggable-widget absolute cursor-grab active:cursor-grabbing will-change-transform"
    :style="{ 
      left: `${x}px`, 
      top: `${y}px`,
      width: width ? `${width}px` : 'auto',
      height: height ? `${height}px` : 'auto',
      zIndex: zIndex
    }"
    @mousedown="bringToFront"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'

const props = withDefaults(defineProps<{
  x?: number
  y?: number
  width?: number
  height?: number
  initialRotation?: number
}>(), {
  x: 0,
  y: 0,
  initialRotation: 0
})

const widgetRef = ref<HTMLElement | null>(null)
const zIndex = ref(10)

const bringToFront = () => {
  zIndex.value = Date.now() % 1000 + 100
}

onMounted(() => {
  if (!widgetRef.value || !process.client) return
  
  // Set initial rotation if provided
  if (props.initialRotation) {
    widgetRef.value.style.transform = `rotate(${props.initialRotation}deg)`
  }

  nextTick(async () => {
    // Dynamic import to handle SSR safety and consistent Draggable loading
    const { $gsap: gsap, $Draggable: Draggable } = useNuxtApp()
    
    Draggable.create(widgetRef.value, {
      type: 'x,y',
      inertia: true,
      edgeResistance: 0.65,
      cursor: 'grab',
      activeCursor: 'grabbing',
      onPress: function() {
        bringToFront()
        // Optional: slight scale up for feedback
        gsap.to(this.target, { scale: 1.02, duration: 0.2, ease: 'power1.out' })
      },
      onRelease: function() {
        // No spring back! Stay where dropped.
        gsap.to(this.target, { scale: 1, duration: 0.2, ease: 'power1.out' })
      }
    })
  })
})
</script>

<style scoped>
/* Optional: Add common widget styles here if needed, 
   but usually styling is handling by the slot content or utility classes passed to this component */
</style>