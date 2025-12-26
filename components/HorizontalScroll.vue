<template>
  <section ref="sectionRef" class="h-screen w-full overflow-hidden flex items-center bg-zinc-900 text-white relative">
    <div ref="wrapperRef" class="flex items-center gap-10 px-24">
      <div v-for="n in 5" :key="n" class="w-[60vw] h-[60vh] bg-zinc-800 shrink-0 border border-zinc-700 rounded-2xl flex items-center justify-center hover:bg-zinc-700 transition-colors duration-500 group">
        <div class="text-center">
            <h3 class="text-4xl font-mono mb-4">Project 0{{ n }}</h3>
            <p class="opacity-0 group-hover:opacity-100 transition-opacity">View Case Study</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref<HTMLElement | null>(null)
const wrapperRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!sectionRef.value || !wrapperRef.value) return
  
  const wrapper = wrapperRef.value as HTMLElement
  const section = sectionRef.value as HTMLElement
  
  const x = -(wrapper.scrollWidth - window.innerWidth)
  
  // Refresh ScrollTrigger to ensure calculations are correct
  ScrollTrigger.refresh()

  gsap.to(wrapper, {
    x: x,
    ease: "none",
    scrollTrigger: {
      trigger: section,
      pin: true,
      scrub: 1,
      // Adjust end based on the width to control speed
      end: () => "+=" + (wrapper.scrollWidth - window.innerWidth),
      invalidateOnRefresh: true,
    }
  })
})

onUnmounted(() => {
    ScrollTrigger.getAll().forEach(t => t.kill())
})
</script>
