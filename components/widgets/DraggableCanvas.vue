<template>
  <div class="relative w-screen h-screen overflow-hidden bg-canvas transition-theme">

    <!-- 
      SCROLL WRAPPER
      Native scrolling enabled (two-finger scroll / mouse wheel).
      Scrollbars hidden via CSS.
      Added Drag-to-Scroll events.
    -->
    <div ref="scrollContainerRef" class="scroll-container w-full h-full overflow-auto relative scrollbar-none flex"
      :class="{ 'cursor-grab': !isDragging, 'cursor-grabbing': isDragging }" @mousedown="startDrag" @mousemove="onDrag"
      @mouseup="stopDrag" @mouseleave="stopDrag">
      <!-- 
        CANVAS CONTENT 
        Large area that holds the grid and elements - Andre Souza style
      -->
      <div ref="canvasContentRef" class="canvas-content w-[3200px] h-[2760px] relative m-auto flex-shrink-0">
        <!-- Blue Canvas Mat with Border -->
        <div id="mat-texture"
          class="absolute overflow-hidden rounded-lg border-[4px] border-[#94BDE6] bg-[#2A6DB0] w-[3200px] h-[2760px] left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] shadow-lg bg-linear-grid bg-[size:16px_16px] bg-[position:12px_12px]">
          <!-- Window Texture Overlay -->
          <div id="window"
            class="z-10 opacity-[0.6] absolute w-full h-full left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]">
          </div>

          <!-- Large Grid Lines -->
          <div id="lines"
            class="absolute w-full h-full left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] bg-linear-big-grid bg-[size:80px_80px] bg-[position:-4px_-4px]">
          </div>

          <!-- Diagonal Lines -->
          <div id="diagonal-lines"
            class="absolute w-full h-full left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] bg-diagonal-grid bg-[size:80px_80px] bg-[position:-2.5px_-2.5px]">
          </div>
        </div>

        <!-- Content Slot -->
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, provide, onUnmounted } from 'vue'

const scrollContainerRef = ref<HTMLElement | null>(null)
const canvasContentRef = ref<HTMLElement | null>(null)

// Drag State
const isDragging = ref(false)
const startX = ref(0)
const startY = ref(0)
const scrollLeftStart = ref(0)
const scrollTopStart = ref(0)

// Momentum State
let velocityX = 0
let velocityY = 0
let lastX = 0
let lastY = 0
let animationFrameId: number | null = null

const startDrag = (e: MouseEvent) => {
  // Prevent drag if interacting with no-drag elements
  if ((e.target as HTMLElement).closest('[data-no-drag="true"]')) return
  if ((e.target as HTMLElement).closest('button')) return
  if ((e.target as HTMLElement).closest('a')) return

  isDragging.value = true
  startX.value = e.pageX
  startY.value = e.pageY
  lastX = e.pageX
  lastY = e.pageY

  // Stop any existing momentum
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }

  if (scrollContainerRef.value) {
    // CRITICAL: Disable smooth scrolling during drag to prevent fighting/lag
    scrollContainerRef.value.style.scrollBehavior = 'auto'
    scrollLeftStart.value = scrollContainerRef.value.scrollLeft
    scrollTopStart.value = scrollContainerRef.value.scrollTop
  }
}

const onDrag = (e: MouseEvent) => {
  if (!isDragging.value || !scrollContainerRef.value) return
  e.preventDefault()

  const currentX = e.pageX
  const currentY = e.pageY

  // Calculate delta for scroll
  const deltaX = currentX - startX.value
  const deltaY = currentY - startY.value

  // Calculate instantaneous velocity for momentum
  velocityX = currentX - lastX
  velocityY = currentY - lastY

  lastX = currentX
  lastY = currentY

  // Apply scroll (1:1 movement)
  scrollContainerRef.value.scrollLeft = scrollLeftStart.value - deltaX
  scrollContainerRef.value.scrollTop = scrollTopStart.value - deltaY
}

const stopDrag = () => {
  if (!isDragging.value) return
  isDragging.value = false

  // Start Momentum Loop
  applyMomentum()
}

const applyMomentum = () => {
  if (!scrollContainerRef.value) return

  // Friction factor (0.95 = slippery, 0.85 = quick stop)
  const friction = 0.95

  if (Math.abs(velocityX) > 0.5 || Math.abs(velocityY) > 0.5) {
    scrollContainerRef.value.scrollLeft -= velocityX
    scrollContainerRef.value.scrollTop -= velocityY

    velocityX *= friction
    velocityY *= friction

    animationFrameId = requestAnimationFrame(applyMomentum)
  } else {
    // Momentum finished, re-enable smooth scroll for wheel/api
    if (scrollContainerRef.value) {
      scrollContainerRef.value.style.scrollBehavior = 'smooth'
    }
  }
}

// Function to re-center the canvas
const recenterCanvas = () => {
  if (!scrollContainerRef.value) return

  const container = scrollContainerRef.value
  const contentWidth = 3200
  const contentHeight = 2760
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight

  container.scrollTo({
    left: Math.max(0, (contentWidth - viewportWidth) / 2),
    top: Math.max(0, (contentHeight - viewportHeight) / 2),
    behavior: 'smooth'
  })
}

// Provide the recenter function to child components
provide('recenterCanvas', recenterCanvas)


onMounted(async () => {
  if (!process.client || !scrollContainerRef.value) return

  const centerCanvas = () => {
    const container = scrollContainerRef.value
    if (!container) return

    const contentWidth = 3200
    const contentHeight = 2760
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    const scrollX = Math.max(0, (contentWidth - viewportWidth) / 2)
    const scrollY = Math.max(0, (contentHeight - viewportHeight) / 2)

    container.style.scrollBehavior = 'auto'
    container.scrollTo(scrollX, scrollY)
  }

  // Initial Center
  centerCanvas()

  // Setup smooth scroll after init
  setTimeout(() => {
    centerCanvas() // Ensure centered
    if (scrollContainerRef.value) {
      scrollContainerRef.value.style.scrollBehavior = 'smooth'
    }
  }, 100)

  // Safety check
  setTimeout(() => {
    if (scrollContainerRef.value && scrollContainerRef.value.scrollLeft === 0 && scrollContainerRef.value.scrollTop === 0) {
      centerCanvas()
    }
  }, 500)
})

onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
})
</script>

<style scoped>
.scroll-container {
  /* Ensure default cursor, no grab */
  /* cursor: default; Replaced by dynamic class binding */

  user-select: none;
  /* Prevent text selection while dragging */
}

/* Cursor Styles */
.cursor-grab {
  cursor: grab;
}

.cursor-grabbing {
  cursor: grabbing;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.scrollbar-none::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.scrollbar-none {
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}
</style>
