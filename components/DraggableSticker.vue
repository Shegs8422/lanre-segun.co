<template>
  <div 
    ref="stickerRef"
    class="sticker absolute"
    :style="{ 
      left: `${x}px`, 
      top: `${y}px`,
      transform: `rotate(${rotation}deg) scale(${scale})`,
      zIndex: zIndex
    }"
    @mousedown="bringToFront"
  >
    <slot>
      <!-- Default placeholder sticker -->
      <div 
        class="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl"
        :style="{ background: bgColor }"
      >
        {{ emoji }}
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
interface Props {
  x?: number
  y?: number
  rotation?: number
  scale?: number
  emoji?: string
  bgColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  x: 0,
  y: 0,
  rotation: 0,
  scale: 1,
  emoji: '✨',
  bgColor: 'rgba(255, 255, 255, 0.1)'
})

const stickerRef = ref<HTMLElement | null>(null)
const zIndex = ref(15)

const bringToFront = () => {
  zIndex.value = Date.now() % 1000 + 100
}

onMounted(() => {
  if (!stickerRef.value || !process.client) return
  
  nextTick(async () => {
    const { $gsap: gsap, $Draggable: Draggable } = useNuxtApp()
    
    if (stickerRef.value) {
      Draggable.create(stickerRef.value, {
        type: 'x,y',
        inertia: true,
        onPress: () => {
          bringToFront()
        },
        onRelease: function() {
          gsap.to(this.target, {
            x: 0,
            y: 0,
            ease: "elastic.out(1, 0.5)",
            duration: 0.8
          })
        }
      })
    }
  })
})
</script>
