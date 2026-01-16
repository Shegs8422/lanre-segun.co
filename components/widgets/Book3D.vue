<template>
  <div class="absolute select-none pointer-events-auto" :class="classes"
    :style="{ '--stagger': stagger, perspective: '1200px' }">
    <!-- Book Container -->
    <div class="group relative transition-all duration-500 ease-out hover:-translate-y-6 hover:shadow-2xl"
      :style="{ width: width + 'px', height: height + 'px', transformStyle: 'preserve-3d' }"
      @mouseenter="isHovering = true" @mouseleave="isHovering = false">
      <!-- Spine (Left Edge) -->
      <div
        class="absolute top-0 bottom-0 w-[12px] bg-gray-200 border-l border-gray-300 transform -translate-x-[6px] translate-z-[-6px] rotate-y-90 origin-right rounded-l-sm"
        :style="{ backgroundColor: color, height: height + 'px', left: '0px' }" />

      <!-- Front Cover (Rotates on Hover) -->
      <div
        class="absolute inset-0 bg-card rounded-r-sm shadow-md overflow-hidden transition-transform duration-500 origin-left group-hover:rotate-y-[-45deg] z-20"
        style="backface-visibility: hidden; transform-style: preserve-3d;">
        <img :src="cover" :width="width" :height="height" class="w-full h-full object-cover" alt="Book Cover">
        <!-- Spine Highlight -->
        <div
          class="absolute left-0 top-0 bottom-0 w-[5px] bg-linear-to-r from-white/40 to-transparent pointer-events-none" />
      </div>

      <!-- Inside Page (Visible when cover opens) -->
      <div
        class="absolute inset-0 bg-paper-light rounded-r-sm shadow-inner z-10 flex items-center justify-center overflow-hidden">
        <!-- Fake text lines -->
        <div class="w-3/4 flex flex-col gap-1 opacity-20">
          <div class="h-1 w-full bg-black rounded-full" />
          <div class="h-1 w-5/6 bg-black rounded-full" />
          <div class="h-1 w-full bg-black rounded-full" />
          <div class="h-1 w-4/6 bg-black rounded-full" />
        </div>
      </div>

      <!-- Back Pages Block (Thickness on Right) -->
      <div
        class="absolute top-[3px] bottom-[3px] right-0 w-[12px] bg-white border border-gray-200 transform translate-x-[6px] translate-z-[-6px] rotate-y-90 origin-left"
        style="background: repeating-linear-gradient(90deg, var(--color-paper-light), var(--color-paper-light) 1px, var(--color-paper-pattern) 1px, var(--color-paper-pattern) 2px);" />

      <!-- Back Cover (Static) -->
      <div class="absolute inset-0 rounded-r-sm transform translate-z-[-12px]" :style="{ backgroundColor: color }" />

      <!-- Hover Tooltip -->
      <div
        class="absolute -bottom-20 left-1/2 -translate-x-1/2 w-max max-w-[200px] z-30 pointer-events-none transition-all duration-300 transform"
        :class="isHovering ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'">
        <div
          class="bg-tooltip-bg text-white px-4 py-3 rounded-xl shadow-xl flex flex-col items-center border border-white/10">
          <p class="text-sm font-bold text-center leading-tight">{{ title || 'Book Title' }}</p>
          <p class="text-xs text-white/60 text-center mt-0.5">{{ author || 'Author Name' }}</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  cover: string
  color?: string
  width: number
  height: number
  classes?: string
  stagger?: number
  title?: string
  author?: string
}>()

const isHovering = ref(false)
</script>

<style scoped>
.rotate-y-90 {
  transform: rotateY(90deg);
}
</style>
