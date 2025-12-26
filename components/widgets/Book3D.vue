<template>
  <div 
    class="absolute select-none pointer-events-auto"
    :class="classes" 
    :style="{ '--stagger': stagger, perspective: '1200px' }"
  >
    <!-- Book Container -->
    <div 
      class="group relative transition-all duration-500 ease-out hover:-translate-y-6 hover:shadow-2xl"
      :style="{ width: width + 'px', height: height + 'px', transformStyle: 'preserve-3d' }"
    >
      <!-- Spine (Left Edge) -->
      <div 
        class="absolute top-0 bottom-0 w-[12px] bg-gray-200 border-l border-gray-300 transform -translate-x-[6px] translate-z-[-6px] rotate-y-90 origin-right rounded-l-sm"
        :style="{ backgroundColor: color, height: height + 'px', left: '0px' }"
      ></div>

      <!-- Front Cover (Rotates on Hover) -->
      <div 
        class="absolute inset-0 bg-card rounded-r-sm shadow-md overflow-hidden transition-transform duration-500 origin-left group-hover:rotate-y-[-45deg] z-20"
        style="backface-visibility: hidden; transform-style: preserve-3d;"
      >
         <img 
          :src="cover" 
          :width="width" 
          :height="height" 
          class="w-full h-full object-cover" 
          alt="Book Cover" 
        />
        <!-- Spine Highlight -->
        <div class="absolute left-0 top-0 bottom-0 w-[5px] bg-gradient-to-r from-white/40 to-transparent pointer-events-none"></div>
      </div>
      
      <!-- Inside Page (Visible when cover opens) -->
      <div class="absolute inset-0 bg-[#fff] rounded-r-sm shadow-inner z-10 flex items-center justify-center overflow-hidden">
         <!-- Fake text lines -->
         <div class="w-3/4 flex flex-col gap-1 opacity-20">
            <div class="h-1 w-full bg-black rounded-full"></div>
            <div class="h-1 w-5/6 bg-black rounded-full"></div>
            <div class="h-1 w-full bg-black rounded-full"></div>
            <div class="h-1 w-4/6 bg-black rounded-full"></div>
         </div>
      </div>

      <!-- Back Pages Block (Thickness on Right) -->
      <div 
         class="absolute top-[3px] bottom-[3px] right-0 w-[12px] bg-white border border-gray-200 transform translate-x-[6px] translate-z-[-6px] rotate-y-90 origin-left"
         style="background: repeating-linear-gradient(90deg, #fff, #fff 1px, #f0f0f0 1px, #f0f0f0 2px);"
      ></div>

      <!-- Back Cover (Static) -->
      <div 
        class="absolute inset-0 rounded-r-sm transform translate-z-[-12px]"
        :style="{ backgroundColor: color }"
      ></div>

    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  cover: string
  color?: string
  width: number
  height: number
  classes?: string
  stagger?: number
}>()
</script>

<style scoped>
.rotate-y-90 {
  transform: rotateY(90deg);
}
</style>
