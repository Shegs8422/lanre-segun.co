<!-- DrawingCanvas.vue - Interactive HTML5 drawing canvas -->
<template>
  <div 
    :class="['select-none relative w-[360px] h-[360px] shadow-2xl rounded-2xl overflow-hidden', classes]"
    :style="positionStyle"
    data-no-drag="true"
  >
    <div class="relative w-full h-full">
      <div class="relative w-full h-full mx-auto border border-4 border-[#CEB990] bg-[#ECDDC0] rounded-lg">
        <canvas 
          ref="canvasRef"
          class="absolute top-0 left-0 cursor-crosshair w-full h-full"
          :width="360"
          :height="360"
          style="touch-action: none"
          @mousedown="startDrawing"
          @mousemove="draw"
          @mouseup="stopDrawing"
          @mouseleave="stopDrawing"
          @touchstart.prevent="startDrawing"
          @touchmove.prevent="draw"
          @touchend="stopDrawing"
        ></canvas>
        
        <!-- Tools -->
        <div class="absolute bottom-4 left-4 right-4 h-10 flex gap-2 justify-end pointer-events-none transition-all duration-300">
          <div class="flex gap-2 items-center pointer-events-auto">
            <!-- Eraser -->
            <button 
              class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-base font-medium ring-offset-background focus-visible:outline-none group size-10 p-1.5 bg-white hover:bg-white hover:scale-110 transition-transform"
              @click="clearCanvas"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" class="text-black group-hover:text-gray-600">
                <path d="M20.5749 6.82878L18.0352 11.3921L18.5476 11.6752C19.8997 12.4221 20.3897 14.1243 19.6393 15.4744C19.3898 15.9232 18.8241 16.0852 18.3747 15.8367L8.29529 10.2625C7.84416 10.013 7.68138 9.44459 7.93206 8.99413C8.68104 7.64823 10.3777 7.16193 11.7259 7.90672L12.2795 8.21253L14.8852 3.64501C15.7692 2.0954 17.7395 1.54479 19.3027 2.40784C20.8787 3.27792 21.4495 5.25722 20.5749 6.82878Z" fill="currentColor"></path>
                <path d="M7.36569 12.0298C6.91594 12.3951 6.46065 12.6428 5.99064 12.7967C5.21704 13.0501 4.31445 13.0787 3.19278 12.8407C2.51131 12.696 1.89206 13.2759 1.9958 13.9647C2.57011 17.7787 6.07699 20.7657 9.47367 21.6906C11.1979 22.1602 13.0491 22.145 14.5825 21.2978C15.9021 20.5686 16.8503 19.2994 17.2873 17.5167L7.36569 12.0298Z" fill="currentColor"></path>
              </svg>
            </button>
          </div>
          
          <!-- Color Picker -->
          <div class="flex gap-2 items-center pointer-events-auto">
            <button 
              v-for="color in colors"
              :key="color"
              class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-base font-medium ring-offset-background h-10 px-4 py-2 border-white border-4 hover:scale-110 transition-transform"
              :style="{ backgroundColor: color }"
              @click="currentColor = color"
            ></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  colStart?: number
  rowStart?: number
  rotation?: number
  x?: number
  y?: number
  classes?: string
}

const props = defineProps<Props>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
const isDrawing = ref(false)
const currentColor = ref('#CC5DE8')
const colors = ['#CC5DE8', '#FF6B6B', '#4ECDC4', '#FFD93D', '#6BCF7F']

const positionStyle = computed(() => {
  const styles: Record<string, string> = {}
  
  if (props.rotation) {
    styles.transform = `rotate(${props.rotation}deg)`
  }
  if (props.x !== undefined) {
    styles.left = `${props.x}px`
  }
  if (props.y !== undefined) {
    styles.top = `${props.y}px`
  }
  
  return styles
})

const getContext = () => {
  if (!canvasRef.value) return null
  return canvasRef.value.getContext('2d')
}

const getCoordinates = (event: MouseEvent | TouchEvent) => {
  if (!canvasRef.value) return { x: 0, y: 0 }
  const rect = canvasRef.value.getBoundingClientRect()
  
  if (event instanceof MouseEvent) {
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    }
  } else {
    const touch = event.touches[0]
    return {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    }
  }
}

const startDrawing = (event: MouseEvent | TouchEvent) => {
  isDrawing.value = true
  const ctx = getContext()
  if (!ctx) return
  
  const { x, y } = getCoordinates(event)
  ctx.beginPath()
  ctx.moveTo(x, y)
}

const draw = (event: MouseEvent | TouchEvent) => {
  if (!isDrawing.value) return
  
  const ctx = getContext()
  if (!ctx) return
  
  const { x, y } = getCoordinates(event)
  ctx.strokeStyle = currentColor.value
  ctx.lineWidth = 3
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.lineTo(x, y)
  ctx.stroke()
}

const stopDrawing = () => {
  isDrawing.value = false
}

const clearCanvas = () => {
  const ctx = getContext()
  if (!ctx || !canvasRef.value) return
  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)
}
</script>
