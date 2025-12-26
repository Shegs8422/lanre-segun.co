<template>
  <div :class="['flex items-center justify-center', classes]">
    <div class="relative flex items-center justify-center gap-4 sm:gap-6 p-4 rounded-lg overflow-hidden">

      <!-- Hour Group -->
      <FlipUnit :current="formatTime(hours)" :next="formatTime(nextHours)" :isFlipping="flipState.hours" />

      <!-- Minute Group -->
      <FlipUnit :current="formatTime(minutes)" :next="formatTime(nextMinutes)" :isFlipping="flipState.minutes" />

      <!-- Second Group -->
      <FlipUnit :current="formatTime(seconds)" :next="formatTime(nextSeconds)" :isFlipping="flipState.seconds" />

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  classes?: string
}>()

const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)

const nextHours = ref(0)
const nextMinutes = ref(0)
const nextSeconds = ref(0)

const flipState = ref({
  hours: false,
  minutes: false,
  seconds: false
})

const formatTime = (val: number) => (val < 10 ? `0${val}` : val.toString())

let intervalId: any

const updateTime = () => {
  const now = new Date()
  const sec = now.getSeconds()
  const min = now.getMinutes()
  const hr = now.getHours()

  if (sec !== nextSeconds.value) {
    nextSeconds.value = sec
    flipState.value.seconds = true
    setTimeout(() => {
      seconds.value = sec
      flipState.value.seconds = false
    }, 600)
  }

  if (min !== nextMinutes.value) {
    nextMinutes.value = min
    flipState.value.minutes = true
    setTimeout(() => {
      minutes.value = min
      flipState.value.minutes = false
    }, 600)
  }

  if (hr !== nextHours.value) {
    nextHours.value = hr
    flipState.value.hours = true
    setTimeout(() => {
      hours.value = hr
      flipState.value.hours = false
    }, 600)
  }
}

onMounted(() => {
  const now = new Date()
  hours.value = now.getHours()
  minutes.value = now.getMinutes()
  seconds.value = now.getSeconds()
  nextHours.value = hours.value
  nextMinutes.value = minutes.value
  nextSeconds.value = seconds.value

  intervalId = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  clearInterval(intervalId)
})
</script>

<style scoped>
/* Scoped styles for the parent clock container */
</style>

<!-- Internal Component for individual flip units to handle 3D cleanly -->
<script lang="ts">
import { defineComponent, h } from 'vue'

const FlipUnit = defineComponent({
  props: ['current', 'next', 'isFlipping'],
  render() {
    return h('div', { class: 'relative w-[70px] h-[90px] sm:w-[96px] sm:h-[110px] perspective-1000' }, [
      // Static Top (Next Number)
      h('div', { class: 'absolute top-0 w-full h-1/2 bg-component rounded-t-lg border-b border-black/10 overflow-hidden flex items-end justify-center' }, [
        h('span', { class: 'text-4xl sm:text-6xl font-mono translate-y-[50%] text-foreground' }, this.next)
      ]),
      // Static Bottom (Current Number)
      h('div', { class: 'absolute bottom-0 w-full h-1/2 bg-component rounded-b-lg overflow-hidden flex items-start justify-center' }, [
        h('span', { class: 'text-4xl sm:text-6xl font-mono -translate-y-[50%] text-foreground' }, this.current)
      ]),

      // Animated Flap
      h('div', {
        class: [
          'absolute top-0 w-full h-1/2 origin-bottom preserve-3d transition-transform duration-600 ease-in-out z-20',
          this.isFlipping ? '[transform:rotateX(-180deg)]' : '[transform:rotateX(0deg)]'
        ]
      }, [
        // Front (Old Number Top)
        h('div', { class: 'absolute inset-0 bg-component rounded-t-lg border-b border-black/10 backface-hidden overflow-hidden flex items-end justify-center' }, [
          h('span', { class: 'text-4xl sm:text-6xl font-mono translate-y-[50%] text-foreground' }, this.current)
        ]),
        // Back (New Number Bottom)
        h('div', { class: 'absolute inset-0 bg-component rounded-b-lg [transform:rotateX(180deg)] backface-hidden overflow-hidden flex items-start justify-center' }, [
          h('span', { class: 'text-4xl sm:text-6xl font-mono -translate-y-[50%] text-foreground' }, this.next)
        ])
      ])
    ])
  }
})
</script>

<style>
.perspective-1000 {
  perspective: 1000px;
}

.preserve-3d {
  transform-style: preserve-3d;
}

.backface-hidden {
  backface-visibility: hidden;
}
</style>
