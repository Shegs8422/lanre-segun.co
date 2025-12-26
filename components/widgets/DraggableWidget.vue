<template>
  <div 
    ref="el"
    class="absolute z-30 cursor-grab active:cursor-grabbing select-none"
    :style="style"
    @mousedown="startDrag"
    @touchstart.passive="startDrag"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'

const props = defineProps<{
  stiffness?: number
  damping?: number
}>()

const el = ref<HTMLElement | null>(null)
const isDragging = ref(false)
const position = ref({ x: 0, y: 0 })
const startPos = ref({ x: 0, y: 0 })

// Style binding
const style = computed(() => {
  return {
    transform: `translate(${position.value.x}px, ${position.value.y}px) rotate(${position.value.x * 0.05}deg)`,
    transition: isDragging.value ? 'none' : 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)', // Spring-like bezier
    zIndex: isDragging.value ? 50 : 'auto'
  }
})

const handleMove = (e: MouseEvent | TouchEvent) => {
  if (!isDragging.value) return

  let cx, cy
  if ('touches' in e) {
    cx = e.touches[0].clientX
    cy = e.touches[0].clientY
  } else {
    cx = (e as MouseEvent).clientX
    cy = (e as MouseEvent).clientY
  }

  position.value = {
    x: cx - startPos.value.x,
    y: cy - startPos.value.y
  }
}

const stopDrag = () => {
  if (!isDragging.value) return
  isDragging.value = false
  // Reset to 0,0 (relative to initial position) triggers the spring transition
  position.value = { x: 0, y: 0 }
  
  window.removeEventListener('mousemove', handleMove)
  window.removeEventListener('mouseup', stopDrag)
  window.removeEventListener('touchmove', handleMove)
  window.removeEventListener('touchend', stopDrag)
}

const startDrag = (e: MouseEvent | TouchEvent) => {
  e.stopPropagation() // Prevent dragging the canvas when dragging this widget
  isDragging.value = true
  
  let cx, cy
  if ('touches' in e) {
    cx = e.touches[0].clientX
    cy = e.touches[0].clientY
  } else {
    cx = (e as MouseEvent).clientX
    cy = (e as MouseEvent).clientY
  }
  
  // Initialize offset relative to current mouse position to avoid jump
  // but since we translate from 0,0, we want to track delta.
  // Actually, we want to track displacement from ORIGINAL spot.
  // So startPos should be the mouse position MINUS current translation.
  // Since we snap back to 0,0, current translation is 0 at start usually.
  
  startPos.value = {
    x: cx - position.value.x,
    y: cy - position.value.y
  }

  window.addEventListener('mousemove', handleMove)
  window.addEventListener('mouseup', stopDrag)
  window.addEventListener('touchmove', handleMove, { passive: true })
  window.addEventListener('touchend', stopDrag)
}

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMove)
  window.removeEventListener('mouseup', stopDrag)
})
</script>
