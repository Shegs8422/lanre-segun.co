<template>
  <div class="relative w-screen h-screen overflow-hidden bg-canvas transition-theme">
    
    <!-- 
      SCROLL WRAPPER
      This is the container that will be "scrollable".
      It allows native scrollbars (hidden) and wheel events.
      GSAP Draggable will control the scrollLeft/scrollTop of this element.
    -->
    <div 
      ref="scrollContainerRef"
      class="scroll-container w-full h-full overflow-auto hide-scrollbar relative"
    >
      <!-- 
        CANVAS CONTENT 
        Large area that holds the grid and elements.
      -->
      <div 
        ref="canvasContentRef"
        class="canvas-content w-[3000px] h-[3000px] relative grid-background"
      >
        <!-- Grid Cells (if we want to render them explicitly, typically BG image is enough) -->
        <slot />
      </div>
    </div>

    <!-- Drag Indicator -->
    <div class="fixed bottom-32 left-1/2 -translate-x-1/2 z-40 pointer-events-none mix-blend-difference">
      <div class="glass px-4 py-2 rounded-full flex items-center gap-2 text-white/80 border border-white/10">
        <Move class="w-3 h-3" />
        <span class="text-xs font-medium tracking-wide">SCROLL OR DRAG</span>
      </div>
    </div>

    <!-- Floating Dock -->
    <FloatingDock />
  </div>
</template>

<script setup lang="ts">
import { Move } from 'lucide-vue-next'

const scrollContainerRef = ref<HTMLElement | null>(null)
const canvasContentRef = ref<HTMLElement | null>(null)

onMounted(async () => {
  if (!process.client || !scrollContainerRef.value || !canvasContentRef.value) return

  const { $gsap: gsap, $Draggable: Draggable } = useNuxtApp()

  // Center the view initially
  const container = scrollContainerRef.value
  const contentWidth = 3000
  const contentHeight = 3000
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight

  container.scrollLeft = (contentWidth - viewportWidth) / 2
  container.scrollTop = (contentHeight - viewportHeight) / 2

  // Create Draggable on the content, but make it control the SCROLL of the container
  // Actually, standard pattern: Draggable.create(wrapper, { type: "scroll", ... })
  Draggable.create(scrollContainerRef.value, {
    type: 'scroll', // This is the magic: drags update scroll position!
    edgeResistance: 0.5,
    throwProps: true, // "inertia" is now often aliased or enabled via inertia: true
    inertia: true,
    cursor: 'grab',
    activeCursor: 'grabbing',
    onPress: function() {
      // Optional: stop any tweening scroll
      gsap.killTweensOf(container)
    }
  })
})
</script>

<style scoped>
/* 
  We ensure the cursor is correct on the scroll container.
  The container takes full screen, content is bigger.
*/
.scroll-container {
  cursor: grab;
  /* Smooth scroll behavior can interfere with GSAP Draggable, so we usually leave it auto or handling via GSAP */
  scroll-behavior: auto; 
}
.scroll-container:active {
  cursor: grabbing;
}
</style>
