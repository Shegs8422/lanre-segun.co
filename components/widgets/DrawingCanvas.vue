<template>
  <div
    class="relative w-full h-full mx-auto border-4 border-[#CEB990] bg-[#ECDDC0] rounded-lg shadow-sm overflow-hidden select-none">

    <!-- Drawing Canvas -->
    <canvas ref="canvasRef" :class="[
      'absolute inset-0 w-full h-full touch-none cursor-crosshair'
    ]" @mousedown="startDrawing" @mousemove="draw" @mouseup="stopDrawing" @mouseleave="stopDrawing"
      @touchstart.prevent="startDrawing" @touchmove.prevent="draw" @touchend.prevent="stopDrawing" />

    <!-- Toolbar -->
    <div class="absolute bottom-4 right-4 flex flex-col gap-2 items-end z-10">

      <!-- Color palette -->
      <div class="flex flex-col-reverse gap-2 items-center">
        <button @click="togglePalette"
          class="w-10 h-10 rounded-md border-4 border-white shadow-sm hover:scale-110 active:scale-95"
          :style="{ backgroundColor: activeColor }" />

        <div v-if="isPaletteOpen" class="flex flex-col gap-2 mb-2 animate-in">
          <button v-for="color in colors" :key="color" @click="selectColor(color)"
            class="w-10 h-10 rounded-md border-4 border-white shadow-sm hover:scale-110 active:scale-95"
            :style="{ backgroundColor: color }" />
        </div>
      </div>

      <!-- Clear board (Eraser) -->
      <button @click="clearBoard"
        class="w-10 h-10 rounded-md bg-white shadow-sm hover:scale-110 active:scale-95 flex items-center justify-center"
        title="Clear board">
        🧽
      </button>
    </div>


  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const ctx = ref<CanvasRenderingContext2D | null>(null)

const isDrawing = ref(false)
const lastX = ref(0)
const lastY = ref(0)

const colors = [
  '#A855F7',
  '#F97316',
  '#22C55E',
  '#EAB308',
  '#EF4444',
  '#3B82F6',
  '#84CC16'
]

const activeColor = ref(colors[0])
const isPaletteOpen = ref(false)

const reduceMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches

/* ---------------- Drawing ---------------- */

function startDrawing(e: MouseEvent | TouchEvent) {
  if (!ctx.value) return
  isDrawing.value = true
  const { x, y } = getCoords(e)
  lastX.value = x
  lastY.value = y
}

function stopDrawing() {
  isDrawing.value = false
  ctx.value?.beginPath()
}

function draw(e: MouseEvent | TouchEvent) {
  if (!isDrawing.value || !ctx.value) return
  const { x, y } = getCoords(e)
  const currentCtx = ctx.value

  currentCtx.strokeStyle = activeColor.value
  currentCtx.lineWidth = 1.8
  currentCtx.lineCap = 'round'
  currentCtx.lineJoin = 'round'

  currentCtx.beginPath()
  currentCtx.moveTo(lastX.value, lastY.value)
  currentCtx.lineTo(x, y)
  currentCtx.stroke()

  lastX.value = x
  lastY.value = y
}

function getCoords(e: MouseEvent | TouchEvent) {
  if (!canvasRef.value) return { x: 0, y: 0 }
  const rect = canvasRef.value.getBoundingClientRect()

  if (e instanceof MouseEvent) {
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  const touch = e.touches[0]
  if (!touch) return { x: 0, y: 0 }
  return {
    x: touch.clientX - rect.left,
    y: touch.clientY - rect.top
  }
}

/* ---------------- UI ---------------- */

function togglePalette() {
  isPaletteOpen.value = !isPaletteOpen.value
}

function selectColor(color: string) {
  activeColor.value = color
  isPaletteOpen.value = false
}

function clearBoard() {
  if (!ctx.value || !canvasRef.value) return
  ctx.value.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)
}


/* ---------------- Mount ---------------- */

onMounted(() => {
  if (!canvasRef.value) return
  const canvas = canvasRef.value
  const dpr = window.devicePixelRatio || 1
  const rect = canvas.getBoundingClientRect()

  canvas.width = rect.width * dpr
  canvas.height = rect.height * dpr

  ctx.value = canvas.getContext('2d')
  if (ctx.value) {
    ctx.value.scale(dpr, dpr)
  }
})
</script>

<style scoped>
.animate-in {
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(6px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
