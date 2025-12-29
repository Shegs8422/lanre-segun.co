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

    <!-- Hidden SVG Path -->
    <svg viewBox="0 0 600 200" class="hidden">
      <path ref="helloPath" d="
          M20 120
          C40 140, 60 140, 70 120
          C80 80, 90 60, 110 70
          C130 80, 120 120, 110 130

          C100 150, 140 150, 150 120
          C160 90, 170 70, 190 80
          C210 90, 200 140, 180 140

          C170 140, 230 150, 240 120
          C250 90, 260 70, 280 80
          C300 90, 290 140, 270 140

          C260 140, 320 150, 330 120
          C340 90, 350 70, 370 80
          C390 90, 380 140, 360 140

          C360 140, 420 160, 460 120
          C500 80, 520 80, 540 100
        " />
    </svg>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const helloPath = ref<SVGPathElement | null>(null)
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

  ctx.value.strokeStyle = activeColor.value
  ctx.value.lineWidth = 6
  ctx.value.lineCap = 'round'
  ctx.value.lineJoin = 'round'

  ctx.value.beginPath()
  ctx.value.moveTo(lastX.value, lastY.value)
  ctx.value.lineTo(x, y)
  ctx.value.stroke()

  lastX.value = x
  lastY.value = y
}

function getCoords(e: MouseEvent | TouchEvent) {
  const rect = canvasRef.value!.getBoundingClientRect()
  if (e instanceof MouseEvent) {
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }
  return {
    x: e.touches[0].clientX - rect.left,
    y: e.touches[0].clientY - rect.top
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

/* ---------------- Scribble ---------------- */

function playScribble() {
  if (!ctx.value || !helloPath.value || !canvasRef.value) return

  const path = helloPath.value
  const length = path.getTotalLength()

  ctx.value.strokeStyle = '#000'
  ctx.value.lineWidth = 6
  ctx.value.lineCap = 'round'
  ctx.value.lineJoin = 'round'

  if (reduceMotion) {
    drawPath(length)
    return
  }

  const start = performance.now()
  const duration = 1000

  function animate(now: number) {
    const t = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - t, 3)
    drawPath(eased * length)
    if (t < 1) requestAnimationFrame(animate)
  }

  requestAnimationFrame(animate)

  function drawPath(progress: number) {
    ctx.value!.clearRect(0, 0, canvasRef.value!.width, canvasRef.value!.height)
    ctx.value!.beginPath()

    for (let i = 0; i <= progress; i += 4) {
      const p = path.getPointAtLength(i)
      if (i === 0) ctx.value!.moveTo(p.x, p.y)
      else ctx.value!.lineTo(p.x, p.y)
    }

    ctx.value!.stroke()
  }
}

/* ---------------- Mount ---------------- */

onMounted(() => {
  if (!canvasRef.value) return
  canvasRef.value.width = canvasRef.value.offsetWidth
  canvasRef.value.height = canvasRef.value.offsetHeight
  ctx.value = canvasRef.value.getContext('2d')
  playScribble()
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
