<template>
  <div ref="containerRef" class="flip-clock-container" data-no-drag="true">
    <div class="countdown flex gap-4 lg:gap-8 items-center h-[100px] w-fit">
      <!-- Hours Group -->
      <div class="flex gap-1 group-h">
        <ul class="flip">
          <li v-for="n in 3" :key="`h1-${n - 1}`" :class="getDigitClass(0, n - 1)">
            <span>
              <div class="up">
                <div class="shadow"/>
                <div class="inn">{{ n - 1 }}</div>
              </div>
              <div class="down">
                <div class="shadow"/>
                <div class="inn">{{ n - 1 }}</div>
              </div>
            </span>
          </li>
        </ul>
        <ul class="flip">
          <li v-for="n in 10" :key="`h2-${n - 1}`" :class="getDigitClass(1, n - 1)">
            <span>
              <div class="up">
                <div class="shadow"/>
                <div class="inn">{{ n - 1 }}</div>
              </div>
              <div class="down">
                <div class="shadow"/>
                <div class="inn">{{ n - 1 }}</div>
              </div>
            </span>
          </li>
        </ul>
      </div>

      <!-- Minutes Group -->
      <div class="flex gap-1 group-m">
        <ul class="flip">
          <li v-for="n in 6" :key="`m1-${n - 1}`" :class="getDigitClass(2, n - 1)">
            <span>
              <div class="up">
                <div class="shadow"/>
                <div class="inn">{{ n - 1 }}</div>
              </div>
              <div class="down">
                <div class="shadow"/>
                <div class="inn">{{ n - 1 }}</div>
              </div>
            </span>
          </li>
        </ul>
        <ul class="flip">
          <li v-for="n in 10" :key="`m2-${n - 1}`" :class="getDigitClass(3, n - 1)">
            <span>
              <div class="up">
                <div class="shadow"/>
                <div class="inn">{{ n - 1 }}</div>
              </div>
              <div class="down">
                <div class="shadow"/>
                <div class="inn">{{ n - 1 }}</div>
              </div>
            </span>
          </li>
        </ul>
      </div>

      <!-- Seconds Group -->
      <div class="flex gap-1 group-s">
        <ul class="flip">
          <li v-for="n in 6" :key="`s1-${n - 1}`" :class="getDigitClass(4, n - 1)">
            <span>
              <div class="up">
                <div class="shadow"/>
                <div class="inn">{{ n - 1 }}</div>
              </div>
              <div class="down">
                <div class="shadow"/>
                <div class="inn">{{ n - 1 }}</div>
              </div>
            </span>
          </li>
        </ul>
        <ul class="flip">
          <li v-for="n in 10" :key="`s2-${n - 1}`" :class="getDigitClass(5, n - 1)">
            <span>
              <div class="up">
                <div class="shadow"/>
                <div class="inn">{{ n - 1 }}</div>
              </div>
              <div class="down">
                <div class="shadow"/>
                <div class="inn">{{ n - 1 }}</div>
              </div>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// State for each of the 6 digits (H1, H2, M1, M2, S1, S2)
// Store current and previous values to manage classes
const digits = ref([
  { current: 0, previous: -1 }, // H1
  { current: 0, previous: -1 }, // H2
  { current: 0, previous: -1 }, // M1
  { current: 0, previous: -1 }, // M2
  { current: 0, previous: -1 }, // S1
  { current: 0, previous: -1 }  // S2
])

const containerRef = ref<HTMLElement | null>(null)
let intervalId: any = null

const getDigitClass = (digitIndex: number, value: number) => {
  const digitState = digits.value[digitIndex]
  if (!digitState) return ''
  if (digitState.current === value) return 'current'
  if (digitState.previous === value) return 'previous'
  return ''
}

const updateTime = () => {
  const now = new Date()
  const h = now.getHours()
  const m = now.getMinutes()
  const s = now.getSeconds()

  const h1 = Math.floor(h / 10)
  const h2 = h % 10
  const m1 = Math.floor(m / 10)
  const m2 = m % 10
  const s1 = Math.floor(s / 10)
  const s2 = s % 10

  const newValues = [h1, h2, m1, m2, s1, s2]

  newValues.forEach((val, index) => {
    const digit = digits.value[index]
    if (digit && digit.current !== val) {
      // Before updating, set the current one to previous
      digit.previous = digit.current
      // Set new current
      digit.current = val
    }
  })
}

onMounted(() => {
  updateTime() // Initial set
  intervalId = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<style scoped>
.flip-clock-container {
  display: flex;
  justify-content: center;
  user-select: none;
}

.countdown {
  height: 100px;
  /* display: flex; handled in template */
  /* gap: 4px; handled in template */
}

ul.flip {
  position: relative;
  /* float: left removed to avoid flex conflicts */
  margin: 0 2px;
  width: 60px;
  min-width: 60px;
  height: 100px;
  /* Explicit height */
  font-size: 80px;
  font-weight: bold;
  line-height: 100px;
  border-radius: 6px;
  list-style: none;
  padding: 0;
  perspective: 400px;
  /* Increased for better 3D depth */
}

ul.flip li {
  z-index: 1;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  line-height: inherit;
}

ul.flip li span {
  display: block;
  height: 100%;
  perspective: 400px;
  transform-style: preserve-3d;
  backface-visibility: hidden;
}

ul.flip li span div {
  z-index: 1;
  position: absolute;
  left: 0;
  width: 100%;
  height: 50%;
  overflow: hidden;
  backface-visibility: hidden;
}

ul.flip li span div .shadow {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
}

ul.flip li span div.up {
  transform-origin: 50% 100%;
  top: 0;
}

/* Divider line */
ul.flip li span div.up:after {
  content: "";
  position: absolute;
  bottom: 0px;
  left: 0;
  z-index: 5;
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.4);
}

ul.flip li span div.down {
  transform-origin: 50% 0%;
  bottom: 0;
}

ul.flip li span div div.inn {
  position: absolute;
  left: 0;
  z-index: 3;
  /* Increased to stay above shadows */
  width: 100%;
  height: 200%;
  color: #fff;
  /* True white for maximum contrast */
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.8);
  text-align: center;
  background-color: #0c0c0c;
  /* Deeper black */
  border-radius: 6px;
  font-family: 'DM Mono', 'Space Mono', 'Courier New', monospace;
  will-change: transform;
}

/* Light/Dark mode adjustments */
:global(.dark) ul.flip li span div div.inn {
  background-color: #1a1a1a;
  color: #e5e5e5;
}

/* Explicitly set color for light mode if needed, assuming dark theme logic prevails for this widget type */
/* Using user provided #127C02 as ci-color-dark or #333 as backup. Let's stick to a clean dark grey/black for "ui ui" or custom.
   User CSS had: background-color: $ci-color-dark; ($ci-color-dark: #127C02;)
   Let's use a neutralized dark styling compatible with the portfolio.
   User requested "I like the UI". CodePen had simplified style.
   I'll maintain the #333-ish style from CodePen logic but use Tailwind colors if possible. 
   Keeping the standard CodePen style for now.
*/

ul.flip li span div.up div.inn {
  top: 0;
}

ul.flip li span div.down div.inn {
  bottom: 0;
}

/* ANIMATION LOGIC */

/* PLAY */
ul.flip li.previous {
  z-index: 2;
}

ul.flip li.current {
  z-index: 3;
  animation: asd 0.5s linear both;
}

@keyframes asd {
  0% {
    z-index: 2;
  }

  5% {
    z-index: 4;
  }

  100% {
    z-index: 4;
  }
}

ul.flip li.current .down {
  z-index: 2;
  animation: turn 0.5s linear both;
}

@keyframes turn {
  0% {
    transform: rotateX(90deg);
  }

  100% {
    transform: rotateX(0deg);
  }
}

ul.flip li.previous .up {
  z-index: 2;
  animation: turn2 0.5s linear both;
}

@keyframes turn2 {
  0% {
    transform: rotateX(0deg);
  }

  100% {
    transform: rotateX(-90deg);
  }
}

/* SHADOWS */
ul.flip li.previous .up .shadow {
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 1) 100%);
  animation: show 0.5s linear both;
}

ul.flip li.current .up .shadow {
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 1) 100%);
  animation: hide 0.5s 0.3s linear both;
}

ul.flip li.previous .down .shadow {
  background: linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.1) 100%);
  animation: show 0.5s linear both;
}

ul.flip li.current .down .shadow {
  background: linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.1) 100%);
  animation: hide 0.5s 0.3s linear both;
}

@keyframes show {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes hide {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

/* Responsive Scaling */
@media (max-width: 600px) {
  ul.flip {
    width: 40px;
    font-size: 50px;
    height: 70px;
    line-height: 70px;
  }
}
</style>
