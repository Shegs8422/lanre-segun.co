<!-- CustomCursor.vue - Custom cursor with name tag -->
<template>
  <div 
    v-if="isClient"
    class="fixed z-50 pointer-events-none"
    :style="{ 
      left: `${position.x}px`, 
      top: `${position.y}px`,
      transform: 'translate(-2px, -2px)',
      willChange: 'transform'
    }"
  >
    <svg width="22" height="25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#cursor-shadow)">
        <path d="M7.5 18 5 5l11 6.5-5.5 1.5-3 5Z" fill="#007FFF"></path>
        <path d="M5.254 4.57 4.3 4.005l.209 1.09 2.5 13 .247 1.284.673-1.122 2.896-4.828 5.307-1.447 1.14-.31-1.018-.603-11-6.5Z" 
              stroke="#fff" stroke-linecap="square"></path>
      </g>
      <defs>
        <filter id="cursor-shadow" x="0" y="0" width="22" height="25">
          <feDropShadow dx="0" dy="1" stdDeviation="1" flood-opacity="0.3"/>
        </filter>
      </defs>
    </svg>
    <div class="absolute left-6 top-0 w-fit rounded-full bg-sky-500 px-2 py-1 text-white text-xs font-medium whitespace-nowrap">
      {{ name }}
    </div>
  </div>
</template>

<script setup lang="ts">
const isClient = ref(false)
const position = ref({ x: 0, y: 0 })
const name = ref('Lanre')

const updatePosition = (e: MouseEvent) => {
  position.value = { x: e.clientX, y: e.clientY }
}

onMounted(() => {
  isClient.value = true
  window.addEventListener('mousemove', updatePosition)
})

onUnmounted(() => {
  if (process.client) {
    window.removeEventListener('mousemove', updatePosition)
  }
})
</script>
