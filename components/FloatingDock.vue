<template>
  <div :class="[
    demo ? 'relative flex justify-center' : 'fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-4'
  ]">

    <!-- Drag to Move Label (Bouncy) - Only show on home page -->
    <div v-if="route.path === '/' && !demo"
      class="flex items-center gap-2 px-3 py-1.5 bg-[#1A1A1A] text-white rounded-full text-xs font-medium animate-bounce shadow-lg border border-white/10">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5">
        <path d="M5 9l-3 3 3 3M9 5l3-3 3 3M19 9l3 3-3 3M15 19l-3 3-3-3M2 12h20M12 2v20" />
      </svg>
      <span>Drag to move</span>
    </div>

    <!-- Container needs to be relative for absolute positioning of music controller -->
    <div class="relative">

      <!-- Mini Music Controller (GSAP Animated) -->
      <Transition @enter="onMiniControlEnter" @leave="onMiniControlLeave" :css="false">
        <div v-if="currentTrack"
          class="absolute right-full mr-2 top-1/2 -translate-y-1/2 flex items-center gap-3 px-3 py-2 rounded-2xl bg-white dark:bg-[#1A1A1A] text-black dark:text-white shadow-2xl transition-colors duration-300 border border-black/5 dark:border-white/10">
          <!-- Album Cover Thumbnail -->
          <div class="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
            <img :src="currentTrack.albumCover" :alt="currentTrack.albumTitle" class="w-full h-full object-cover" />
          </div>

          <!-- Track Info -->
          <div class="flex flex-col min-w-0 max-w-[180px]">
            <p class="text-sm font-medium truncate">{{ currentTrack.albumTitle }}</p>
            <p class="text-xs text-black/60 dark:text-white/60 truncate">{{ currentTrack.artist }}</p>
          </div>

          <!-- Stop Button -->
          <button @click="handleStopMusic"
            class="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors group relative flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </Transition>

      <!-- Main Floating Dock (Updated with Active Logic) -->
      <div
        class="w-full px-2 py-2 bg-component border scrollbar-none overflow-y-hidden overflow-x-auto sm:overflow-visible rounded-2xl w-fit flex h-[3.5rem] items-center gap-2 relative z-10 shadow-[_0_1px_1px_-0.5px_rgba(0,0,0,0.04),_0_3px_3px_-1.5px_rgba(0,0,0,0.04),_0_12px_12px_-6px_rgba(0,0,0,0.04)]"
        style="will-change: auto; transform: none;">
        <!-- Nav Links with Active State Logic -->
        <!-- Home -->
        <template v-if="!demo">
          <NuxtLink to="/" @click="playInteraction"
            class="shrink-0 overflow-hidden flex h-10 rounded-xl items-center justify-center transition-all duration-300 hover:bg-accent relative"
            :class="isActive('/') ? 'w-auto px-4 bg-secondary text-secondary-foreground' : 'w-10 px-[10px]'">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"
              class="h-5 w-5 shrink-0 relative z-10">
              <path stroke="currentColor" stroke-linejoin="round" stroke-width="2"
                d="M9.5 16.5V20H6a2 2 0 0 1-2-2v-7.948a2 2 0 0 1 .867-1.648l6-4.125a2 2 0 0 1 2.266 0l6 4.125A2 2 0 0 1 20 10.052V18a2 2 0 0 1-2 2h-3.5v-3.5a2.5 2.5 0 0 0-5 0Z">
              </path>
            </svg>
            <span v-if="isActive('/')" class="ml-2 font-medium text-sm whitespace-nowrap">Home</span>
          </NuxtLink>
        </template>
        <template v-else>
          <div @click="handleDemoClick('/')"
            class="shrink-0 overflow-hidden flex h-10 rounded-xl items-center justify-center transition-all duration-300 hover:bg-accent relative cursor-pointer"
            :class="isActive('/') ? 'w-auto px-4 bg-secondary text-secondary-foreground' : 'w-10 px-[10px]'">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"
              class="h-5 w-5 shrink-0 relative z-10">
              <path stroke="currentColor" stroke-linejoin="round" stroke-width="2"
                d="M9.5 16.5V20H6a2 2 0 0 1-2-2v-7.948a2 2 0 0 1 .867-1.648l6-4.125a2 2 0 0 1 2.266 0l6 4.125A2 2 0 0 1 20 10.052V18a2 2 0 0 1-2 2h-3.5v-3.5a2.5 2.5 0 0 0-5 0Z">
              </path>
            </svg>
            <span v-if="isActive('/')" class="ml-2 font-medium text-sm whitespace-nowrap">Home</span>
          </div>
        </template>

        <!-- Projects -->
        <template v-if="!demo">
          <NuxtLink to="/projects" @click="playInteraction"
            class="shrink-0 overflow-hidden flex h-10 rounded-xl items-center justify-center transition-all duration-300 hover:bg-accent relative"
            :class="isActive('/projects') ? 'w-auto px-4 bg-secondary text-secondary-foreground' : 'w-10 px-[10px]'">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"
              class="h-5 w-5 shrink-0 relative z-10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 12 4.5 7.781m7.5 4.22v8.5m0-8.5 7.5-4.22m.5.889v6.66a2 2 0 0 1-1.02 1.744l-6 3.375a2 2 0 0 1-1.96 0l-6-3.375A2 2 0 0 1 4 15.33V8.67a2 2 0 0 1 1.02-1.743l6-3.375a2 2 0 0 1 1.96 0l6 3.375A2 2 0 0 1 20 8.67">
              </path>
            </svg>
            <span v-if="isActive('/projects')" class="ml-2 font-medium text-sm whitespace-nowrap">Projects</span>
          </NuxtLink>
        </template>
        <template v-else>
          <div @click="handleDemoClick('/projects')"
            class="shrink-0 overflow-hidden flex h-10 rounded-xl items-center justify-center transition-all duration-300 hover:bg-accent relative cursor-pointer"
            :class="isActive('/projects') ? 'w-auto px-4 bg-secondary text-secondary-foreground' : 'w-10 px-[10px]'">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"
              class="h-5 w-5 shrink-0 relative z-10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 12 4.5 7.781m7.5 4.22v8.5m0-8.5 7.5-4.22m.5.889v6.66a2 2 0 0 1-1.02 1.744l-6 3.375a2 2 0 0 1-1.96 0l-6-3.375A2 2 0 0 1 4 15.33V8.67a2 2 0 0 1 1.02-1.743l6-3.375a2 2 0 0 1 1.96 0l6 3.375A2 2 0 0 1 20 8.67">
              </path>
            </svg>
            <span v-if="isActive('/projects')" class="ml-2 font-medium text-sm whitespace-nowrap">Projects</span>
          </div>
        </template>

        <!-- Craft -->
        <template v-if="!demo">
          <NuxtLink to="/craft" @click="playInteraction"
            class="shrink-0 overflow-hidden flex h-10 rounded-xl items-center justify-center transition-all duration-300 hover:bg-accent relative"
            :class="isActive('/craft') ? 'w-auto px-4 bg-secondary text-secondary-foreground' : 'w-10 px-[10px]'">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              class="h-5 w-5 shrink-0 relative z-10">
              <path
                d="M6.70694 14.7929C6.31641 15.1834 5.68325 15.1834 5.29272 14.7929L2.45696 11.9571C2.06643 11.5666 2.06643 10.9334 2.45696 10.5429L9.70694 3.29289C9.89447 3.10536 10.1488 3 10.414 3L14.0857 3C14.3509 3 14.6052 3.10536 14.7928 3.29289L15.7927 4.29286C16.1832 4.68338 16.1832 5.31655 15.7927 5.70707L6.70694 14.7929Z"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              <path
                d="M9.5 12.5L16.3358 19.3358C17.1168 20.1168 18.3832 20.1168 19.1642 19.3358L19.3358 19.1642C20.1168 18.3832 20.1168 17.1168 19.3358 16.3358L12.5 9.5"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            <span v-if="isActive('/craft')" class="ml-2 font-medium text-sm whitespace-nowrap">Craft</span>
          </NuxtLink>
        </template>
        <template v-else>
          <div @click="handleDemoClick('/craft')"
            class="shrink-0 overflow-hidden flex h-10 rounded-xl items-center justify-center transition-all duration-300 hover:bg-accent relative cursor-pointer"
            :class="isActive('/craft') ? 'w-auto px-4 bg-secondary text-secondary-foreground' : 'w-10 px-[10px]'">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              class="h-5 w-5 shrink-0 relative z-10">
              <path
                d="M6.70694 14.7929C6.31641 15.1834 5.68325 15.1834 5.29272 14.7929L2.45696 11.9571C2.06643 11.5666 2.06643 10.9334 2.45696 10.5429L9.70694 3.29289C9.89447 3.10536 10.1488 3 10.414 3L14.0857 3C14.3509 3 14.6052 3.10536 14.7928 3.29289L15.7927 4.29286C16.1832 4.68338 16.1832 5.31655 15.7927 5.70707L6.70694 14.7929Z"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              <path
                d="M9.5 12.5L16.3358 19.3358C17.1168 20.1168 18.3832 20.1168 19.1642 19.3358L19.3358 19.1642C20.1168 18.3832 20.1168 17.1168 19.3358 16.3358L12.5 9.5"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            <span v-if="isActive('/craft')" class="ml-2 font-medium text-sm whitespace-nowrap">Craft</span>
          </div>
        </template>

        <!-- Notes -->
        <template v-if="!demo">
          <NuxtLink to="/notes" @click="playInteraction"
            class="shrink-0 overflow-hidden flex h-10 rounded-xl items-center justify-center transition-all duration-300 hover:bg-accent relative"
            :class="isActive('/notes') ? 'w-auto px-4 bg-secondary text-secondary-foreground' : 'w-10 px-[10px]'">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"
              class="h-5 w-5 shrink-0 relative z-10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 3.5H6.5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2H9m0-17h8.5a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H9m0-17v17M13 8h2.5M13 12h2.5">
              </path>
            </svg>
            <span v-if="isActive('/notes')" class="ml-2 font-medium text-sm whitespace-nowrap">Notes</span>
          </NuxtLink>
        </template>
        <template v-else>
          <div @click="handleDemoClick('/notes')"
            class="shrink-0 overflow-hidden flex h-10 rounded-xl items-center justify-center transition-all duration-300 hover:bg-accent relative cursor-pointer"
            :class="isActive('/notes') ? 'w-auto px-4 bg-secondary text-secondary-foreground' : 'w-10 px-[10px]'">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"
              class="h-5 w-5 shrink-0 relative z-10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 3.5H6.5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2H9m0-17h8.5a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H9m0-17v17M13 8h2.5M13 12h2.5">
              </path>
            </svg>
            <span v-if="isActive('/notes')" class="ml-2 font-medium text-sm whitespace-nowrap">Notes</span>
          </div>
        </template>

        <!-- Photos -->
        <template v-if="!demo">
          <NuxtLink to="/photos" @click="playInteraction"
            class="shrink-0 overflow-hidden flex h-10 rounded-xl items-center justify-center transition-all duration-300 hover:bg-accent relative"
            :class="isActive('/photos') ? 'w-auto px-4 bg-secondary text-secondary-foreground' : 'w-10 px-[10px]'">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"
              class="h-5 w-5 shrink-0 relative z-10">
              <path stroke="currentColor" stroke-linecap="square" stroke-linejoin="round" stroke-width="2"
                d="M5 7h1.43a2 2 0 0 0 1.664-.89l.812-1.22A2 2 0 0 1 10.57 4h2.86a2 2 0 0 1 1.664.89l.812 1.22A2 2 0 0 0 17.57 7H19a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z">
              </path>
              <path stroke="currentColor" stroke-linecap="square" stroke-linejoin="round" stroke-width="2"
                d="M15 13a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
            </svg>
            <span v-if="isActive('/photos')" class="ml-2 font-medium text-sm whitespace-nowrap">Gallery</span>
          </NuxtLink>
        </template>
        <template v-else>
          <div @click="handleDemoClick('/photos')"
            class="shrink-0 overflow-hidden flex h-10 rounded-xl items-center justify-center transition-all duration-300 hover:bg-accent relative cursor-pointer"
            :class="isActive('/photos') ? 'w-auto px-4 bg-secondary text-secondary-foreground' : 'w-10 px-[10px]'">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"
              class="h-5 w-5 shrink-0 relative z-10">
              <path stroke="currentColor" stroke-linecap="square" stroke-linejoin="round" stroke-width="2"
                d="M5 7h1.43a2 2 0 0 0 1.664-.89l.812-1.22A2 2 0 0 1 10.57 4h2.86a2 2 0 0 1 1.664.89l.812 1.22A2 2 0 0 0 17.57 7H19a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z">
              </path>
              <path stroke="currentColor" stroke-linecap="square" stroke-linejoin="round" stroke-width="2"
                d="M15 13a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
            </svg>
            <span v-if="isActive('/photos')" class="ml-2 font-medium text-sm whitespace-nowrap">Gallery</span>
          </div>
        </template>

        <div data-orientation="vertical" role="none" class="shrink-0 bg-border h-full w-[1px] mx-1.5"></div>

        <!-- Theme Toggle -->
        <button @click="toggleTheme"
          class="whitespace-nowrap text-base font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground shrink-0 aspect-square w-[2.5rem] h-[2.5rem] bg-component' rounded-xl relative flex items-center justify-center undefined"
          aria-label="Toggle Theme" data-state="closed">
          <!-- Sun Icon (Show in Dark Mode) -->
          <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"
            class="h-5 w-5">
            <path
              d="M12 3V2M12 22V21M18.3598 5.64005L19.0698 4.93005M4.93016 19.07L5.64016 18.36M21 12H22M2 12H3M18.3598 18.36L19.0698 19.07M4.93016 4.93005L5.64016 5.64005M15.5355 8.46447C17.4882 10.4171 17.4882 13.5829 15.5355 15.5355C13.5829 17.4882 10.4171 17.4882 8.46447 15.5355C6.51185 13.5829 6.51185 10.4171 8.46447 8.46447C10.4171 6.51185 13.5829 6.51185 15.5355 8.46447Z"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
          <!-- Moon Icon (Show in Light Mode) -->
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"
            class="h-5 w-5">
            <path
              d="M20.9638 12.7674C19.8361 13.5447 18.4693 13.9998 16.9961 13.9998C13.1301 13.9998 9.99609 10.8657 9.99609 6.99975C9.99609 5.52667 10.4511 4.15987 11.2283 3.03223C6.61911 3.42277 3 7.28768 3 11.9979C3 16.9674 7.0286 20.996 11.9981 20.996C16.7084 20.996 20.5734 17.3767 20.9638 12.7674Z"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
        </button>

        <!-- Audio Toggle -->
        <button @click="handleToggleSound"
          class="whitespace-nowrap text-base font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground shrink-0 aspect-square w-[2.5rem] h-[2.5rem] bg-component rounded-xl relative flex items-center justify-center audio-toggle-button"
          aria-label="Toggle Audio" data-state="closed">
          <!-- Volume On -->
          <svg v-if="isSoundEnabled" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
            viewBox="0 0 24 24" class="h-5 w-5">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19.071 4.92968C20.8807 6.73932 22 9.23932 22 12.0007C22 14.7622 20.8807 17.2622 19.071 19.0718M15.8891 8.11132C16.8844 9.10662 17.5 10.4816 17.5 12.0004C17.5 13.5192 16.8844 14.8942 15.8891 15.8895M4 7.99999H5.33333C5.76607 7.99999 6.18714 7.85964 6.53333 7.59999L11.2 4.09999C11.5296 3.85278 12 4.08797 12 4.49999V19.5C12 19.912 11.5296 20.1472 11.2 19.9L6.53333 16.4C6.18714 16.1403 5.76607 16 5.33333 16H4C2.89543 16 2 15.1046 2 14V9.99999C2 8.89542 2.89543 7.99999 4 7.99999Z">
            </path>
          </svg>

          <!-- Volume Off (Muted) -->
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"
            class="h-5 w-5">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m21.5 10-2.121 2.121m0 0-2.122 2.121m2.122-2.12L17.257 10m2.122 2.121 2.121 2.121M4 8h1.333a2 2 0 0 0 1.2-.4L11.2 4.1a.5.5 0 0 1 .8.4v15a.5.5 0 0 1-.8.4l-4.667-3.5a2 2 0 0 0-1.2-.4H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2Z">
            </path>
          </svg>
        </button>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

// useRoute is auto-imported in Nuxt 3

const props = defineProps<{
  demo?: boolean
}>()

const isDark = ref(false)
const route = useRoute()
const activeDemoTab = ref('/') // Local state for demo mode active tab simulation

// GSAP Transitions for Mini Control
const onMiniControlEnter = (el: Element, done: () => void) => {
  gsap.fromTo(el,
    {
      x: '100%', // Start "inside" the dock (right side relative to its position)
      opacity: 0,
      scale: 0.8
    },
    {
      x: 0, // Move to final position
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: 'back.out(1.2)', // Springy slide out
      onComplete: done
    }
  )
}

const onMiniControlLeave = (el: Element, done: () => void) => {
  gsap.to(el, {
    x: '50%', // Slide back towards dock
    opacity: 0,
    scale: 0.8,
    duration: 0.4,
    ease: 'power2.in',
    onComplete: done
  })
}

// Get current track from album player
const { currentTrack, stopTrack, toggleSound, isSoundEnabled } = useAlbumPlayer()

// Interaction Sound - initialized client-side only using composable
const interactionSound = useClientSound('/audio/interaction-sound.mp3', {
  volume: 0.5,
  eager: true
})

// Simple route match check (Updated for nested routes and demo mode)
const isActive = (path: string) => {
  if (props.demo) return activeDemoTab.value === path
  if (path === '/') return route?.path === '/'
  return route?.path.startsWith(path)
}

const toggleTheme = () => {
  interactionSound.play()
  isDark.value = !isDark.value
  const html = document.documentElement
  if (isDark.value) {
    html.classList.remove('light')
    html.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    html.classList.remove('dark')
    html.classList.add('light')
    localStorage.setItem('theme', 'light')
  }
}

// Sound toggle now uses global state
const handleToggleSound = () => {
  interactionSound.play()
  toggleSound()
}

const playInteraction = () => {
  interactionSound.play()
}

const handleDemoClick = (path: string) => {
  playInteraction()
  activeDemoTab.value = path
}

const handleStopMusic = () => {
  interactionSound.play()
  stopTrack()
}

onMounted(() => {
  // Basic detection
  isDark.value = document.documentElement.classList.contains('dark') || window.matchMedia('(prefers-color-scheme: dark)').matches
})
</script>

<style scoped>
/* Scoped styles */
</style>
