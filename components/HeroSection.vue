<template>
  <section class="h-screen flex items-center justify-center relative overflow-hidden px-6">
    <div class="max-w-6xl w-full">
      <h1 ref="headingRef" class="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none">
        <span class="block overflow-hidden">
          <span class="hero-line inline-block">Lanre Segun</span>
        </span>
        <span class="block overflow-hidden mt-4">
          <span class="hero-line inline-block text-xl md:text-3xl font-mono text-gray-400">
            UI/UX & Brand Designer
          </span>
        </span>
      </h1>

      <!-- Animated SVG Accent -->
      <svg 
        ref="svgRef"
        class="mt-8 w-32 md:w-48" 
        viewBox="0 0 200 20" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M 0 10 Q 50 0, 100 10 T 200 10" 
          stroke="currentColor" 
          stroke-width="3" 
          stroke-linecap="round"
          class="text-white"
        />
      </svg>

      <!-- CTA Button -->
      <div class="mt-12 overflow-hidden">
        <MagneticButton class="hero-cta">
          View Work
        </MagneticButton>
      </div>
    </div>

    <!-- Background Element -->
    <div class="absolute inset-0 -z-10 opacity-20">
      <div ref="bgShapeRef" class="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-3xl"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'

const headingRef = ref<HTMLElement | null>(null)
const svgRef = ref<SVGElement | null>(null)
const bgShapeRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!headingRef.value) return

  // Split text into characters for animation
  const lines = headingRef.value.querySelectorAll('.hero-line')
  
  // Animate each line's characters
  lines.forEach((line, lineIndex) => {
    // Split into individual characters
    const text = line.textContent || ''
    const chars = text.split('')
    line.innerHTML = chars.map(char => 
      char === ' ' ? '&nbsp;' : `<span class="inline-block">${char}</span>`
    ).join('')

    const charElements = line.querySelectorAll('span')

    // Staggered reveal animation
    gsap.from(charElements, {
      y: 100,
      opacity: 0,
      rotationX: -90,
      stagger: 0.02,
      duration: 1,
      ease: 'expo.out',
      delay: lineIndex * 0.2
    })
  })

  // Animate SVG path
  if (svgRef.value) {
    const path = svgRef.value.querySelector('path')
    if (path) {
      const length = path.getTotalLength()
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length
      })
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 2,
        ease: 'expo.inOut',
        delay: 0.5
      })
    }
  }

  // Animate CTA button
  const cta = document.querySelector('.hero-cta')
  if (cta) {
    gsap.from(cta, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'expo.out',
      delay: 0.8
    })
  }

  // Parallax background shape
  if (bgShapeRef.value) {
    gsap.to(bgShapeRef.value, {
      y: 200,
      scrollTrigger: {
        trigger: headingRef.value,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    })
  }
})
</script>
