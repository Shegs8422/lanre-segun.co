<template>
  <div 
    v-if="isVisible"
    class="preloader fixed inset-0 z-50 bg-black flex items-center justify-center"
    :class="{ 'opacity-0 pointer-events-none': isHiding }"
  >
    <div class="preloader-content text-center">
      <!-- Progress Circle -->
      <div class="relative w-32 h-32 mx-auto mb-12">
        <svg class="transform -rotate-90" width="128" height="128">
          <circle
            cx="64"
            cy="64"
            r="60"
            stroke="rgba(255,255,255,0.1)"
            stroke-width="2"
            fill="none"
          />
          <circle
            ref="progressCircle"
            cx="64"
            cy="64"
            r="60"
            stroke="white"
            stroke-width="2"
            fill="none"
            stroke-dasharray="377"
            stroke-dashoffset="377"
            stroke-linecap="round"
          />
        </svg>
        
        <!-- Progress Counter -->
        <div class="absolute inset-0 flex items-center justify-center">
          <span ref="counter" class="text-4xl font-mono font-bold">0</span>
        </div>
      </div>
      
      <!-- Name and Title -->
      <div class="text-reveal overflow-hidden">
        <h1 ref="nameText" class="text-5xl md:text-7xl font-bold tracking-tight mb-2 opacity-0">
          Lanre Segun
        </h1>
        <p ref="titleText" class="text-lg md:text-xl font-mono text-gray-400 opacity-0">
          UI/UX & Brand Designer
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const isVisible = ref(true)
const isHiding = ref(false)
const progressCircle = ref<SVGCircleElement>()
const counter = ref<HTMLElement>()
const nameText = ref<HTMLElement>()
const titleText = ref<HTMLElement>()

const circumference = 2 * Math.PI * 60 // 377

onMounted(() => {
  // Create timeline for loading sequence
  const tl = gsap.timeline({
    onComplete: hidePreloader
  })
  
  // Animate progress circle and counter
  tl.to(progressCircle.value, {
    strokeDashoffset: 0,
    duration: 2.5,
    ease: 'power2.inOut'
  }, 0)
  
  tl.to({ value: 0 }, {
    value: 100,
    duration: 2.5,
    ease: 'power2.inOut',
    onUpdate: function() {
      if (counter.value) {
        counter.value.textContent = Math.round(this.targets()[0].value).toString()
      }
    }
  }, 0)
  
  // Reveal name with character animation
  tl.to(nameText.value, {
    opacity: 1,
    duration: 0.6,
    ease: 'power2.out'
  }, 1.2)
  
  // Split text animation for individual characters
  if (nameText.value) {
    const chars = nameText.value.textContent?.split('') || []
    nameText.value.innerHTML = chars.map(char => 
      char === ' ' ? ' ' : `<span class="inline-block opacity-0">${char}</span>`
    ).join('')
    
    tl.to(nameText.value.querySelectorAll('span'), {
      opacity: 1,
      y: 0,
      duration: 0.05,
      stagger: 0.03,
      ease: 'power2.out'
    }, 1.3)
  }
  
  // Reveal title
  tl.to(titleText.value, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power2.out'
  }, 1.8)
})

function hidePreloader() {
  isHiding.value = true
  
  gsap.to('.preloader', {
    opacity: 0,
    duration: 0.8,
    ease: 'power2.inOut',
    onComplete: () => {
      isVisible.value = false
    }
  })
}
</script>

<style scoped>
.preloader {
  transition: opacity 0.8s cubic-bezier(0.76, 0, 0.24, 1);
}
</style>
