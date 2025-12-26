<template>
  <section 
    ref="sectionRef" 
    class="h-[200vh] relative bg-zinc-900"
  >
    <div class="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
      <div class="max-w-4xl px-6">
        <h2 
          ref="headingRef"
          class="text-5xl md:text-7xl font-bold mb-8 leading-tight"
        >
          Crafting digital experiences that matter
        </h2>
        
        <div ref="contentRef" class="space-y-6 text-lg md:text-xl text-gray-300 font-mono">
          <p class="reveal-text opacity-0">
            I believe great design is invisible. It doesn't call attention to itself—it guides, inspires, and delights.
          </p>
          <p class="reveal-text opacity-0">
            With over 5 years of experience, I've helped brands tell their stories through thoughtful UI/UX and bold visual identities.
          </p>
          <p class="reveal-text opacity-0">
            Let's build something beautiful together.
          </p>
        </div>

        <!-- Decorative element -->
        <div ref="decorRef" class="mt-12 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 origin-left scale-x-0"></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sectionRef = ref<HTMLElement | null>(null)
const headingRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const decorRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!sectionRef.value || !headingRef.value || !contentRef.value) return

  const section = sectionRef.value
  const heading = headingRef.value
  const paragraphs = contentRef.value.querySelectorAll('.reveal-text')
  const decor = decorRef.value

  // Create timeline
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      pin: '.sticky',
    }
  })

  // Animate heading scale and opacity
  tl.from(heading, {
    scale: 0.8,
    opacity: 0.3,
    duration: 0.5
  })

  // Stagger paragraphs reveal
  tl.to(paragraphs, {
    opacity: 1,
    y: 0,
    stagger: 0.3,
    duration: 0.5
  }, '-=0.2')

  // Animate decorative line
  if (decor) {
    tl.to(decor, {
      scaleX: 1,
      duration: 0.5
    }, '-=0.2')
  }
})

onUnmounted(() => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
})
</script>
