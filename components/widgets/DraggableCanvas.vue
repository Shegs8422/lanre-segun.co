<template>
  <div class="relative w-screen h-screen overflow-hidden bg-canvas transition-theme">

    <!-- 
      SCROLL WRAPPER
      Native scrolling enabled (two-finger scroll / mouse wheel).
      Scrollbars hidden via CSS.
      Added Drag-to-Scroll events.
    -->
    <div ref="scrollContainerRef" class="scroll-container w-full h-full overflow-auto relative scrollbar-none"
      @mousedown="startDrag" @mousemove="onDrag" @mouseup="stopDrag" @mouseleave="stopDrag">

      <!-- 
        CANVAS CONTEXT WRAPPER
        This wrapper has the ACTUAL visual size (3200 * zoom).
        This ensures the scrollbars/scroll-range match the visual content.
      -->
      <div class="relative flex-shrink-0" :style="{
        width: `${3200 * zoom}px`,
        height: `${2760 * zoom}px`
      }">

        <!-- 
          CANVAS CONTENT 
          Large area that holds the grid and elements.
          We use origin-top-left (0 0) to make coordinate math predictable.
        -->
        <div ref="canvasContentRef"
          class="canvas-content w-[3200px] h-[2760px] absolute top-0 left-0 transition-transform duration-300 ease-out origin-[0_0]"
          :style="{ transform: `scale(${zoom})` }">

          <!-- Blue Canvas Mat with Border -->
          <div id="mat-texture"
            class="absolute overflow-hidden rounded-lg border-[4px] border-[#94BDE6] bg-[#2A6DB0] w-[3200px] h-[2760px] left-0 top-0 shadow-lg bg-linear-grid bg-[size:16px_16px] bg-[position:12px_12px]">
            <!-- Window Texture Overlay -->
            <div id="window" class="z-10 opacity-[0.6] absolute w-full h-full left-0 top-0 bg-cover bg-center"
              style="background-image: url('/images/Layer-window.png')">
            </div>

            <!-- Large Grid Lines -->
            <div id="lines"
              class="absolute w-full h-full left-0 top-0 bg-linear-big-grid bg-[size:80px_80px] bg-[position:-4px_-4px]">
            </div>

            <!-- Diagonal Lines -->
            <div id="diagonal-lines"
              class="absolute w-full h-full left-0 top-0 bg-diagonal-grid bg-[size:80px_80px] bg-[position:-2.5px_-2.5px]">
            </div>
          </div>

          <!-- Content Slot -->
          <div class="relative z-20 w-full h-full pointer-events-none">
            <div class="w-full h-full pointer-events-auto">
              <slot />
            </div>
          </div>
        </div>
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

// Scaling State
const zoom = ref(1.0)

const updateAdaptiveScale = () => {
  if (!process.client) return
  const width = window.innerWidth

  // Calculate zoom based on viewport width
  // 1440px is our reference width for 1.0 zoom
  // On smaller screens, we scale down linearly
  // We set a minimum zoom of 0.4 to prevent it from becoming too tiny
  let newZoom = Math.min(1.0, width / 1440)

  // Mobile specific adjustment
  if (width < 768) {
    newZoom = Math.max(0.4, width / 800)
  } else {
    newZoom = Math.max(0.6, newZoom)
  }

  zoom.value = newZoom
}

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

  // Apply scroll
  // Since we are scrolling the visually scaled container, no need to divide by zoom
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

// Function to calculate exact center of Profile Card for initial focus
const getProfileCardCoordinates = () => {
  // These are derived from the orchestration grid layout in app.vue
  // Grid: 8 cols of 360px (2880px + gaps)
  // Gaps: 4px * 7 = 28px
  // Total: 2908px width? Wait, app.vue says 2992px width.
  // 8 * 360 = 2880. 8 * 14 (total gaps?) = 112. 2880 + 112 = 2992.

  // Profile card is at col 4, row 4.
  // Col 4 start: (3 * 360) + (3 * 16) = 1080 + 48 = 1128
  // Card Width: 568px (2 cols + gap)
  // Center X: 1128 + (568/2) = 1128 + 284 = 1412

  // Row 4 start: (3 * 360) + (3 * 16) = 1128
  // Card Height: ~720? (h-fit, row-span-2)
  // Let's use 1412, 1488 as a good baseline or calculate relative to container

  return { x: 1600, y: 1380 } // Exactly centered on the 3200x2760 canvas
}

// Function to re-center the canvas or a specific area
const centerOnCoordinates = (x?: number, y?: number, smooth = true) => {
  if (!scrollContainerRef.value) return

  const container = scrollContainerRef.value
  const contentWidth = 3200
  const contentHeight = 2760
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight

  // Use provided coordinates OR default to geometric center
  const targetX = x !== undefined ? x : contentWidth / 2
  const targetY = y !== undefined ? y : contentHeight / 2

  // Calculate scroll position to put target in center of viewport
  // Math: Target position in layout * zoom = visual target position.
  // Then subtract half viewport to center it.
  const scrollX = (targetX * zoom.value) - (viewportWidth / 2)
  const scrollY = (targetY * zoom.value) - (viewportHeight / 2)

  container.scrollTo({
    left: scrollX,
    top: scrollY,
    behavior: smooth ? 'smooth' : 'auto'
  })
}

// Legacy function kept for compatibility
const recenterCanvas = () => centerOnCoordinates()

// Provide the functions to child components
provide('recenterCanvas', recenterCanvas)
provide('centerOnCoordinates', centerOnCoordinates)


onMounted(async () => {
  if (!process.client || !scrollContainerRef.value) return

  // Initial Scale
  updateAdaptiveScale()

  // Centering logic
  const centerCanvas = () => {
    const coords = getProfileCardCoordinates()
    centerOnCoordinates(coords.x, coords.y, false)
  }

  // Force center multiple times to handle race conditions with layout/zoom
  centerCanvas()

  // Try again after a frame
  requestAnimationFrame(() => {
    centerCanvas()
    // And after a small delay for good measure
    setTimeout(() => {
      centerCanvas()
      if (scrollContainerRef.value) {
        scrollContainerRef.value.style.scrollBehavior = 'smooth'
      }
    }, 100)
  })

  window.addEventListener('resize', () => {
    updateAdaptiveScale()
  })

  // Safety check
  setTimeout(() => {
    if (scrollContainerRef.value && scrollContainerRef.value.scrollLeft === 0 && scrollContainerRef.value.scrollTop === 0) {
      centerCanvas()
    }
  }, 500)
})

onUnmounted(() => {
  if (!process.client) return
  window.removeEventListener('resize', updateAdaptiveScale)
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
})

// Expose functions for parent components (like app.vue)
defineExpose({
  centerOnCoordinates,
  recenterCanvas,
  zoom
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
