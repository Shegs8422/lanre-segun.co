<template>
  <div :class="['flip-clock', classes]">
    <div class="flip-clock__piece" v-for="(value, key) in displayTime" :key="key">
      <span class="flip-clock__card flip-card" :class="{ flip: flipStates[key] }">
        <b class="flip-card__top">{{ formatDigit(value) }}</b>
        <b class="flip-card__bottom" :data-value="formatDigit(value)"></b>
        <b class="flip-card__back" :data-value="formatDigit(previousTime[key])"></b>
        <b class="flip-card__back-bottom" :data-value="formatDigit(previousTime[key])"></b>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  classes?: string
}>()

const displayTime = reactive({
  Hours: 0,
  Minutes: 0,
  Seconds: 0
})

const previousTime = reactive({
  Hours: 0,
  Minutes: 0,
  Seconds: 0
})

const flipStates = reactive({
  Hours: false,
  Minutes: false,
  Seconds: false
})

const formatDigit = (value: number): string => {
  return value < 10 ? `0${value}` : `${value}`
}

let intervalId: any

const updateTime = () => {
  const now = new Date()
  const hours = now.getHours()
  const minutes = now.getMinutes()
  const seconds = now.getSeconds()

  // Update seconds
  if (seconds !== displayTime.Seconds) {
    previousTime.Seconds = displayTime.Seconds
    displayTime.Seconds = seconds
    flipStates.Seconds = false
    setTimeout(() => { flipStates.Seconds = true }, 10)
  }

  // Update minutes
  if (minutes !== displayTime.Minutes) {
    previousTime.Minutes = displayTime.Minutes
    displayTime.Minutes = minutes
    flipStates.Minutes = false
    setTimeout(() => { flipStates.Minutes = true }, 10)
  }

  // Update hours
  if (hours !== displayTime.Hours) {
    previousTime.Hours = displayTime.Hours
    displayTime.Hours = hours
    flipStates.Hours = false
    setTimeout(() => { flipStates.Hours = true }, 10)
  }
}

onMounted(() => {
  const now = new Date()
  displayTime.Hours = now.getHours()
  displayTime.Minutes = now.getMinutes()
  displayTime.Seconds = now.getSeconds()
  previousTime.Hours = displayTime.Hours
  previousTime.Minutes = displayTime.Minutes
  previousTime.Seconds = displayTime.Seconds

  intervalId = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<style scoped>
.flip-clock {
  text-align: center;
  perspective: 600px;
  margin: 0 auto;
}

.flip-clock *,
.flip-clock *:before,
.flip-clock *:after {
  box-sizing: border-box;
}

.flip-clock__piece {
  display: inline-block;
  margin: 0 0.2vw;
}

@media (min-width: 1000px) {
  .flip-clock__piece {
    margin: 0 5px;
  }
}

.flip-clock__slot {
  font-size: 1rem;
  line-height: 1.5;
  display: block;
  color: hsl(var(--foreground));
}

@media (min-width: 1000px) {
  .flip-clock__slot {
    font-size: 1.2rem;
  }
}

.flip-card {
  display: block;
  position: relative;
  padding-bottom: 0.72em;
  font-size: 2.25rem;
  line-height: 0.95;
}

@media (min-width: 1000px) {
  .flip-card {
    font-size: 3rem;
  }
}

/* Card faces */
.flip-card__top,
.flip-card__bottom,
.flip-card__back-bottom,
.flip-card__back::before,
.flip-card__back::after {
  display: block;
  height: 0.72em;
  color: #ccc;
  background: hsl(var(--component));
  padding: 0.23em 0.25em 0.4em;
  border-radius: 0.15em 0.15em 0 0;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  width: 1.8em;
}

.flip-card__bottom,
.flip-card__back-bottom {
  color: hsl(var(--foreground));
  position: absolute;
  top: 50%;
  left: 0;
  border-top: solid 1px rgba(0, 0, 0, 0.1);
  background: hsl(var(--component-active));
  border-radius: 0 0 0.15em 0.15em;
  pointer-events: none;
  overflow: hidden;
  z-index: 2;
}

.flip-card__back-bottom {
  z-index: 1;
}

.flip-card__bottom::after,
.flip-card__back-bottom::after {
  display: block;
  margin-top: -0.72em;
}

.flip-card__back::before,
.flip-card__bottom::after,
.flip-card__back-bottom::after {
  content: attr(data-value);
}

.flip-card__back {
  position: absolute;
  top: 0;
  height: 100%;
  left: 0;
  pointer-events: none;
}

.flip-card__back::before {
  position: relative;
  overflow: hidden;
  z-index: -1;
}

.flip .flip-card__back::before {
  z-index: 1;
  animation: flipTop 0.3s cubic-bezier(0.37, 0.01, 0.94, 0.35);
  animation-fill-mode: both;
  transform-origin: center bottom;
}

.flip .flip-card__bottom {
  transform-origin: center top;
  animation-fill-mode: both;
  animation: flipBottom 0.6s cubic-bezier(0.15, 0.45, 0.28, 1);
}

@keyframes flipTop {
  0% {
    transform: rotateX(0deg);
    z-index: 2;
  }

  0%,
  99% {
    opacity: 1;
  }

  100% {
    transform: rotateX(-90deg);
    opacity: 0;
  }
}

@keyframes flipBottom {

  0%,
  50% {
    z-index: -1;
    transform: rotateX(90deg);
    opacity: 0;
  }

  51% {
    opacity: 1;
  }

  100% {
    opacity: 1;
    transform: rotateX(0deg);
    z-index: 5;
  }
}
</style>
