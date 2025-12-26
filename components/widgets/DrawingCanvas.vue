<template>
  <div class="relative w-full h-full mx-auto border-4 border-[#CEB990] bg-[#ECDDC0] rounded-lg shadow-sm overflow-hidden select-none">
    <!-- Canvas for Drawing -->
    <canvas 
      ref="canvasRef"
      :class="['absolute top-0 left-0 w-full h-full touch-none', activeColor === 'eraser' ? 'cursor-eraser' : 'cursor-crosshair']"
      @mousedown="startDrawing"
      @mousemove="draw"
      @mouseup="stopDrawing"
      @mouseleave="stopDrawing"
      @touchstart.prevent="startDrawing"
      @touchmove.prevent="draw"
      @touchend.prevent="stopDrawing"
    ></canvas>

    <!-- Toolbar -->
    <div class="absolute bottom-4 right-4 flex flex-col gap-2 items-end pointer-events-none z-10">
      
      <!-- Color Palette (Vertical Expansion) -->
       <div class="flex flex-col-reverse gap-2 items-center pointer-events-auto transition-all duration-300">
          
          <!-- Selected/Active Color Button -->
          <button 
            @click="togglePalette"
            class="w-10 h-10 rounded-md border-4 border-white shadow-sm transition-transform hover:scale-110 active:scale-95"
            :style="{ backgroundColor: activeColor === 'eraser' ? '#ffffff' : activeColor }"
          >
             <span v-if="activeColor === 'eraser'" class="flex items-center justify-center h-full text-black">
               <!-- Eraser Icon placeholder if current is eraser -->
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" class="w-5 h-5 opacity-50">
                   <path d="M20.5749 6.82878L18.0352 11.3921L18.5476 11.6752C19.8997 12.4221 20.3897 14.1243 19.6393 15.4744C19.3898 15.9232 18.8241 16.0852 18.3747 15.8367L8.29529 10.2625C7.84416 10.013 7.68138 9.44459 7.93206 8.99413C8.68104 7.64823 10.3777 7.16193 11.7259 7.90672L12.2795 8.21253L14.8852 3.64501C15.7692 2.0954 17.7395 1.54479 19.3027 2.40784C20.8787 3.27792 21.4495 5.25722 20.5749 6.82878Z" fill="currentColor"></path>
                   <path d="M7.36569 12.0298C6.91594 12.3951 6.46065 12.6428 5.99064 12.7967C5.21704 13.0501 4.31445 13.0787 3.19278 12.8407C2.51131 12.696 1.89206 13.2759 1.9958 13.9647C2.57011 17.7787 6.07699 20.7657 9.47367 21.6906C11.1979 22.1602 13.0491 22.145 14.5825 21.2978C15.9021 20.5686 16.8503 19.2994 17.2873 17.5167L7.36569 12.0298Z" fill="currentColor"></path>
                </svg>
             </span>
          </button>

          <!-- Expanded Colors -->
          <div v-if="isPaletteOpen" class="flex flex-col gap-2 mb-2 animate-in slide-in-from-bottom-2 fade-in duration-200">
             <button 
                v-for="color in colors" 
                :key="color"
                @click="selectColor(color)"
                class="w-10 h-10 rounded-md border-4 border-white shadow-sm hover:scale-110 active:scale-95 transition-all"
                :style="{ backgroundColor: color }"
             ></button>
          </div>

       </div>

      <!-- Eraser Button -->
      <button 
        @click="selectEraser"
        class="group pointer-events-auto w-10 h-10 rounded-md bg-white hover:bg-gray-100 flex items-center justify-center shadow-sm transition-transform hover:scale-110 active:scale-95"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" class="text-black group-hover:text-gray-600 transition-colors w-6 h-6">
            <path d="M20.5749 6.82878L18.0352 11.3921L18.5476 11.6752C19.8997 12.4221 20.3897 14.1243 19.6393 15.4744C19.3898 15.9232 18.8241 16.0852 18.3747 15.8367L8.29529 10.2625C7.84416 10.013 7.68138 9.44459 7.93206 8.99413C8.68104 7.64823 10.3777 7.16193 11.7259 7.90672L12.2795 8.21253L14.8852 3.64501C15.7692 2.0954 17.7395 1.54479 19.3027 2.40784C20.8787 3.27792 21.4495 5.25722 20.5749 6.82878Z" fill="currentColor"></path>
            <path d="M7.36569 12.0298C6.91594 12.3951 6.46065 12.6428 5.99064 12.7967C5.21704 13.0501 4.31445 13.0787 3.19278 12.8407C2.51131 12.696 1.89206 13.2759 1.9958 13.9647C2.57011 17.7787 6.07699 20.7657 9.47367 21.6906C11.1979 22.1602 13.0491 22.145 14.5825 21.2978C15.9021 20.5686 16.8503 19.2994 17.2873 17.5167L7.36569 12.0298Z" fill="currentColor"></path>
        </svg>
      </button>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const isDrawing = ref(false)
const ctx = ref<CanvasRenderingContext2D | null>(null)
const lastX = ref(0)
const lastY = ref(0)

// Colors from user screenshot (approximate)
const colors = [
  '#A855F7', // Purple
  '#F97316', // Orange
  '#22C55E', // Green
  '#EAB308', // Yellow
  '#EF4444', // Red
  '#3B82F6', // Blue
  '#84CC16', // Light Green
]

const activeColor = ref(colors[0]) // Default start color
const isPaletteOpen = ref(false)

const startDrawing = (e: MouseEvent | TouchEvent) => {
  if (!canvasRef.value || !ctx.value) return
  isDrawing.value = true
  const { x, y } = getCoordinates(e)
  lastX.value = x
  lastY.value = y
  
  // Single dot support
  draw(e)
}

const stopDrawing = () => {
  isDrawing.value = false
  if (ctx.value) ctx.value.beginPath()
}

const draw = (e: MouseEvent | TouchEvent) => {
  if (!isDrawing.value || !ctx.value) return
  const { x, y } = getCoordinates(e)
  
  ctx.value.lineWidth = 6
  ctx.value.lineCap = 'round'
  ctx.value.lineJoin = 'round' // Smoother joins

  if (activeColor.value === 'eraser') {
      ctx.value.globalCompositeOperation = 'destination-out'
      ctx.value.lineWidth = 20 // Erase bigger
  } else {
      ctx.value.globalCompositeOperation = 'source-over'
      ctx.value.strokeStyle = activeColor.value
  }
  
  ctx.value.beginPath()
  ctx.value.moveTo(lastX.value, lastY.value)
  ctx.value.lineTo(x, y)
  ctx.value.stroke()
  
  lastX.value = x
  lastY.value = y
}

const getCoordinates = (e: MouseEvent | TouchEvent) => {
  if (!canvasRef.value) return { x: 0, y: 0 }
  const rect = canvasRef.value.getBoundingClientRect()
  if (e instanceof MouseEvent) {
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }
  } else {
    // Touch
    return {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top
    }
  }
}

const togglePalette = () => {
    isPaletteOpen.value = !isPaletteOpen.value
}

const selectColor = (color: string) => {
    activeColor.value = color
    isPaletteOpen.value = false
}

const selectEraser = () => {
    activeColor.value = 'eraser'
    isPaletteOpen.value = false
}

onMounted(() => {
  if (canvasRef.value) {
    canvasRef.value.width = canvasRef.value.offsetWidth
    canvasRef.value.height = canvasRef.value.offsetHeight
    ctx.value = canvasRef.value.getContext('2d')
    activeColor.value = colors[0] // Set initial purple
    
    // Draw "hello" initial art? (Optional, user showed it in screenshot)
    // We'll leave it blank for free drawing.
  }
})
</script>

<style scoped>
.animate-in {
    animation: animateIn 0.2s ease-out;
}
@keyframes animateIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

/* Custom Eraser Cursor */
.cursor-eraser {
  cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M20.5749 6.82878L18.0352 11.3921L18.5476 11.6752C19.8997 12.4221 20.3897 14.1243 19.6393 15.4744C19.3898 15.9232 18.8241 16.0852 18.3747 15.8367L8.29529 10.2625C7.84416 10.013 7.68138 9.44459 7.93206 8.99413C8.68104 7.64823 10.3777 7.16193 11.7259 7.90672L12.2795 8.21253L14.8852 3.64501C15.7692 2.0954 17.7395 1.54479 19.3027 2.40784C20.8787 3.27792 21.4495 5.25722 20.5749 6.82878Z" fill="black"/><path d="M7.36569 12.0298C6.91594 12.3951 6.46065 12.6428 5.99064 12.7967C5.21704 13.0501 4.31445 13.0787 3.19278 12.8407C2.51131 12.696 1.89206 13.2759 1.9958 13.9647C2.57011 17.7787 6.07699 20.7657 9.47367 21.6906C11.1979 22.1602 13.0491 22.145 14.5825 21.2978C15.9021 20.5686 16.8503 19.2994 17.2873 17.5167L7.36569 12.0298Z" fill="black"/></svg>') 12 12, pointer;
}
</style>
