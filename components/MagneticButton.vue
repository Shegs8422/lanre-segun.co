<template>
  <button 
    ref="buttonRef"
    class="magnetic-btn relative px-8 py-4 bg-white text-black font-mono text-sm uppercase tracking-widest rounded-full overflow-hidden group transition-colors duration-300 hover:bg-gray-900 hover:text-white"
  >
    <span class="relative z-10">
      <slot>Click Me</slot>
    </span>
    
    <!-- Animated background -->
    <span 
      ref="bgRef"
      class="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"
    ></span>
  </button>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'

const buttonRef = ref<HTMLElement | null>(null)
const bgRef = ref<HTMLElement | null>(null)

let xTo: ((value: number) => void) | null = null
let yTo: ((value: number) => void) | null = null

onMounted(() => {
  if (!buttonRef.value) return

  const button = buttonRef.value

  // Quick functions for smooth magnetic effect
  xTo = gsap.quickTo(button, 'x', { duration: 0.6, ease: 'power3.out' })
  yTo = gsap.quickTo(button, 'y', { duration: 0.6, ease: 'power3.out' })

  // Mouse move handler
  const handleMouseMove = (e: MouseEvent) => {
    const rect = button.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2)

    // Magnetic pull radius
    const magneticRadius = 150

    if (distance < magneticRadius) {
      const strength = 1 - distance / magneticRadius
      const moveX = distanceX * strength * 0.3
      const moveY = distanceY * strength * 0.3

      if (xTo && yTo) {
        xTo(moveX)
        yTo(moveY)
      }

      // Scale up on proximity
      gsap.to(button, {
        scale: 1 + strength * 0.1,
        duration: 0.3,
        ease: 'power2.out'
      })
    } else {
      // Return to origin
      if (xTo && yTo) {
        xTo(0)
        yTo(0)
      }
      gsap.to(button, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      })
    }
  }

  // Mouse leave handler
  const handleMouseLeave = () => {
    if (xTo && yTo) {
      xTo(0)
      yTo(0)
    }
    gsap.to(button, {
      scale: 1,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)'
    })
  }

  window.addEventListener('mousemove', handleMouseMove)
  button.addEventListener('mouseleave', handleMouseLeave)

  onUnmounted(() => {
    window.removeEventListener('mousemove', handleMouseMove)
    button.removeEventListener('mouseleave', handleMouseLeave)
  })
})
</script>

<style scoped>
.magnetic-btn {
  will-change: transform;
}
</style>
