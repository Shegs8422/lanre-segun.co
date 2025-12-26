<template>
  <div 
    ref="cursorRef"
    class="custom-cursor fixed w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-difference bg-white"
    :class="{ 'is-hovering': isHovering }"
  ></div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'

const cursorRef = ref<HTMLElement | null>(null)
const isHovering = ref(false)

let xTo: ((value: number) => void) | null = null
let yTo: ((value: number) => void) | null = null

onMounted(() => {
  if (!cursorRef.value) return

  const cursor = cursorRef.value

  // Quick smooth follow
  xTo = gsap.quickTo(cursor, 'left', { duration: 0.4, ease: 'power3.out' })
  yTo = gsap.quickTo(cursor, 'top', { duration: 0.4, ease: 'power3.out' })

  // Track mouse
  const handleMouseMove = (e: MouseEvent) => {
    if (xTo && yTo) {
      xTo(e.clientX)
      yTo(e.clientY)
    }
  }

  // Detect interactive elements
  const handleMouseOver = (e: Event) => {
    const target = e.target as HTMLElement
    if (
      target.tagName === 'A' || 
      target.tagName === 'BUTTON' ||
      target.closest('a') ||
      target.closest('button') ||
      target.classList.contains('magnetic-btn')
    ) {
      isHovering.value = true
      gsap.to(cursor, {
        scale: 2,
        duration: 0.3,
        ease: 'power2.out'
      })
    }
  }

  const handleMouseOut = (e: Event) => {
    const target = e.target as HTMLElement
    if (
      target.tagName === 'A' || 
      target.tagName === 'BUTTON' ||
      target.closest('a') ||
      target.closest('button') ||
      target.classList.contains('magnetic-btn')
    ) {
      isHovering.value = false
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      })
    }
  }

  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseover', handleMouseOver)
  document.addEventListener('mouseout', handleMouseOut)

  onUnmounted(() => {
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseover', handleMouseOver)
    document.removeEventListener('mouseout', handleMouseOut)
  })
})
</script>

<style scoped>
.custom-cursor {
  transform: translate(-50%, -50%);
}

.custom-cursor.is-hovering {
  background-color: rgba(255, 255, 255, 0.8);
}
</style>
