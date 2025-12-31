<!-- EducationCard.vue - Education history card -->
<template>
  <div
    class="select-none flex flex-col gap-4 bg-component relative rounded-lg w-full max-w-[100vw] col-span-2 row-span-2 sm:w-[568px] shadow-lg p-6 h-fit overflow-hidden"
    :class="{ 'text-white': activeColor }" :style="{ '--stagger': stagger }">

    <!-- Lively Background Bubble -->
    <div ref="bubbleRef" class="absolute inset-0 z-0 pointer-events-none" style="clip-path: circle(0% at 0 0);"></div>

    <!-- Content (z-10 to stay above bubble) -->
    <div class="relative z-10 flex flex-col gap-4">
      <p class="font-display font-medium" :class="{ 'text-white': activeColor }">Education & Certification</p>

      <ul class="flex flex-col gap-4" @mouseleave="onLeave">
        <li v-for="(item, index) in education" :key="index"
          class="flex flex-row gap-4 items-center transition-all duration-200 relative p-2 rounded-md"
          @mouseenter="onHover(item.color)">

          <!-- Logo Image -->
          <div
            class="hidden sm:flex h-10 w-10 flex-none items-center justify-center rounded-sm overflow-hidden bg-white/10 shrink-0">
            <img v-if="item.logo" :src="item.logo" class="w-full h-full object-contain" alt="Logo" />
            <div v-else class="w-full h-full" :style="{ backgroundColor: item.color }"></div>
          </div>

          <div class="w-full flex flex-col gap-4">
            <div class="flex flex-row w-full justify-between gap-8 items-center">
              <div class="flex flex-col">
                <span class="font-medium" :class="{ 'text-white': activeColor }">{{ item.institution }}</span>
                <span class="text-sm transition-colors duration-200"
                  :class="activeColor ? 'text-white/80' : 'text-muted-foreground'">{{ item.program }}</span>
              </div>

              <div
                class="inline-flex items-center rounded-lg border px-2.5 py-0.5 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 h-fit shrink-0 tabular text-xs font-normal transition-colors duration-200"
                :class="activeColor ? 'border-white/30 bg-white/20 text-white' : 'border-secondary bg-secondary/40 text-muted-foreground'">
                {{ item.period }}
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
/* No extra CSS needed */
</style>

<script setup lang="ts">
import { ref } from 'vue'
import gsap from 'gsap'

interface EducationItem {
  institution: string
  program: string
  period: string
  color: string
  logo?: string
}

interface Props {
  stagger?: number
}

withDefaults(defineProps<Props>(), {
  stagger: 39
})

const bubbleRef = ref<HTMLElement | null>(null)
const activeColor = ref<string | null>(null)

// Lively Bubble Animation
const onHover = (color: string) => {
  if (activeColor.value === color) return // Avoid re-triggering if same color

  activeColor.value = color
  if (bubbleRef.value) {
    // Set color first
    bubbleRef.value.style.backgroundColor = color

    // Animate bubble expansion from top-left
    gsap.to(bubbleRef.value, {
      clipPath: 'circle(250% at 0 0)',
      duration: 0.6,
      ease: 'power2.out',
      overwrite: 'auto'
    })
  }
}

const onLeave = () => {
  activeColor.value = null
  if (bubbleRef.value) {
    // Animate bubble shrinking back to top-left
    gsap.to(bubbleRef.value, {
      clipPath: 'circle(0% at 0 0)',
      duration: 0.4,
      ease: 'power2.inOut',
      overwrite: 'auto'
    })
  }
}

const education: EducationItem[] = [
  {
    institution: 'Federal University of Agriculture',
    program: 'B.Sc. Computer Science',
    period: '2026',
    color: '#00A868',
    logo: '/images/Funaab logo.png'
  },
  {
    institution: 'Google',
    program: 'UX Design Professional',
    period: '2024',
    color: '#4285F4',
    logo: '/images/google.png'
  },
  {
    institution: 'NVIDIA',
    program: 'Fundamentals of Deep Learning',
    period: '2024',
    color: '#76B900',
    logo: '/images/nvidia.png'
  },
  {
    institution: 'McKinsey & Company',
    program: 'Forward Leadership',
    period: '2025',
    color: '#051C2C',
    logo: '/images/mckinsey.png'
  }
]
</script>
