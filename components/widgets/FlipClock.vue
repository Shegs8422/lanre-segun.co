<template>
  <div class="w-full h-full flex items-center justify-center">
    <div class="relative flex items-center justify-center gap-8 w-full h-full p-8 rounded-lg overflow-hidden">
      <div class="relative flex items-center justify-center w-full h-full rounded-lg overflow-hidden">
        <div class="relative z-10 flex items-center justify-center gap-8">
          
          <!-- Hours -->
          <div class="relative w-[96px] h-[96px] rounded-lg">
            <div class="absolute top-0 flip-container w-full h-1/2 items-start z-10 rounded-lg">
              <div :class="['clip-path-top-digit absolute z-10 class-test bg-component w-full rounded-lg font-mono text-6xl text-center clock-text', flipState.hours ? 'animate-flip-top' : 'opacity-0']">
                {{ formatTime(hours) }}
              </div>
              <div :class="['clip-path-bottom-digit absolute z-20 class-test bg-component w-full rounded-lg font-mono text-6xl text-center clock-text', flipState.hours ? 'animate-flip-bottom' : 'opacity-0']">
                {{ formatTime(nextHours) }}
              </div>
            </div>
            <div class="clip-path-top-digit absolute z-1 bg-component w-full flex items-center justify-center rounded-lg font-mono text-6xl text-center clock-text">
              {{ formatTime(nextHours) }}
            </div>
            <div class="clip-path-bottom-digit absolute z-1 bg-component w-full flex items-center justify-center rounded-lg font-mono text-6xl text-center clock-text">
             {{ formatTime(hours) }}
            </div>
          </div>

          <!-- Minutes -->
          <div class="relative w-[96px] h-[96px] rounded-lg">
            <div class="absolute top-0 flip-container w-full h-1/2 items-start z-10 rounded-lg">
              <div :class="['clip-path-top-digit absolute z-10 class-test bg-component w-full rounded-lg font-mono text-6xl text-center clock-text', flipState.minutes ? 'animate-flip-top' : 'opacity-0']">
                {{ formatTime(minutes) }}
              </div>
              <div :class="['clip-path-bottom-digit absolute z-20 class-test bg-component w-full rounded-lg font-mono text-6xl text-center clock-text', flipState.minutes ? 'animate-flip-bottom' : 'opacity-0']">
                {{ formatTime(nextMinutes) }}
              </div>
            </div>
            <div class="clip-path-top-digit absolute z-1 bg-component w-full flex items-center justify-center rounded-lg font-mono text-6xl text-center clock-text">
              {{ formatTime(nextMinutes) }}
            </div>
             <div class="clip-path-bottom-digit absolute z-1 bg-component w-full flex items-center justify-center rounded-lg font-mono text-6xl text-center clock-text">
              {{ formatTime(minutes) }}
            </div>
          </div>

          <!-- Seconds -->
          <div class="relative w-[96px] h-[96px] rounded-lg">
            <div class="absolute top-0 flip-container w-full h-1/2 items-start z-10 rounded-lg">
              <div :class="['clip-path-top-digit absolute z-10 class-test bg-component w-full rounded-lg font-mono text-6xl text-center clock-text', flipState.seconds ? 'animate-flip-top' : 'opacity-0']">
                {{ formatTime(seconds) }}
              </div>
              <div :class="['clip-path-bottom-digit absolute z-20 class-test bg-component w-full rounded-lg font-mono text-6xl text-center clock-text', flipState.seconds ? 'animate-flip-bottom' : 'opacity-0']">
                {{ formatTime(nextSeconds) }}
              </div>
            </div>
            <div class="clip-path-top-digit absolute z-1 bg-component w-full flex items-center justify-center rounded-lg font-mono text-6xl text-center clock-text">
              {{ formatTime(nextSeconds) }}
            </div>
            <div class="clip-path-bottom-digit absolute z-1 bg-component w-full flex items-center justify-center rounded-lg font-mono text-6xl text-center clock-text">
              {{ formatTime(seconds) }}
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

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

const formatTime = (val: number) => (val < 10 ? `0${val}` : val)

let intervalId: any

const updateTime = () => {
  // Reset flip states
  flipState.value = { hours: false, minutes: false, seconds: false }

  const now = new Date()
  const sec = now.getSeconds()
  const min = now.getMinutes()
  const hr = now.getHours()

  // Determine if flipping should happen
  // Logic derived from reference: check if next number is different
  const isSecFlip = sec !== seconds.value
  const isMinFlip = isSecFlip && sec === 59 // Simplified flip logic trigger
  // Wait, standard clock logic:
  // Current stores the OLD time, Next stores the NEW time.
  // Actually, usually we show Current, and we flip TO Next.
  
  // Let's align with the reference logic:
  // s = new Date
  // a = seconds, l = minutes, n = hours
  // o = a !== e (seconds changed)
  // d = o && 59 === a (seconds changed AND it IS 59? No, flip minutes when seconds GOES TO 0. Reference says 59... maybe it flips early?)
  
  // Let's implement robust flip logic:
  // 1. Get current time.
  // 2. Diff against stored time.
  // 3. If diff, trigger flip.
  
  // Logic: 
  // We desire to flip FROM the old time TO the new time.
  // So 'hours', 'minutes', 'seconds' refs should hold the OLD time (Current Top).
  // 'nextHours' etc should hold the NEW time (Back/Bottom).
  
  // When a second passes (now.getSeconds() !== seconds.value):
  // 1. Set nextSeconds = now.getSeconds()
  // 2. Trigger flip animation.
  // 3. AFTER animation (600ms), set seconds = nextSeconds. 
  //    (This effectively "locks in" the new number so it's ready for the next flip).

  if (!intervalId) {
     // Initial setup layout
     hours.value = hr
     minutes.value = min
     seconds.value = sec
     
     nextHours.value = hr
     nextMinutes.value = min
     nextSeconds.value = sec
  } else {
      // Check for changes
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
.flip-container {
  overflow: hidden;
  perspective: 250px;
  perspective-origin: 50% 50%;
}

.clip-path-top-digit {
  clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%);
  top: 0;
}

.clip-path-bottom-digit {
  clip-path: polygon(0 50%, 100% 50%, 100% 100%, 0 100%);
  top: 0;
}

/* Fallback color & line-height fix */
.clock-text {
  color: black;
  line-height: normal; /* Ensure consistent height alignment */
}

/* Force white color in dark mode */
:global(.dark) .clock-text {
  color: white !important;
}
</style>
