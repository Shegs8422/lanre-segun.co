<template>
  <div 
    ref="followerRef"
    class="fixed z-50 flex items-center gap-2 pointer-events-none transition-opacity duration-300"
    :class="{ 'opacity-100': isMoving, 'opacity-0': !isMoving && !isHovering }"
    style="left: 0; top: 0; transform: translate(0, 0);"
  >
     <!-- Blue Triangle Logo -->
     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-blue-500 drop-shadow-md">
        <path d="M7 18L5 5L16 11.5L10.5 13L7.5 18Z" fill="currentColor"/>
        <path d="M5.254 4.57 4.3 4.005l.209 1.09 2.5 13 .247 1.284.673-1.122 2.896-4.828 5.307-1.447 1.14-.31-1.018-.603-11-6.5Z" stroke="white" stroke-width="1.5" stroke-linecap="square"/>
     </svg>

     <!-- Name Pill with Theme Toggle (Pointer Events Auto to allow clicking) -->
     <div 
       class="flex items-center gap-2 rounded-full bg-[#0EA5E9] pl-3 pr-2 py-1.5 shadow-md pointer-events-auto"
       @mouseenter="isHovering = true"
       @mouseleave="isHovering = false"
     >
        <span class="text-xs font-bold text-white tracking-wide">ANDRE</span>
        
        <!-- Theme Toggle Button -->
        <button 
          @click="toggleTheme" 
          class="p-1 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors flex items-center justify-center w-5 h-5 ml-1"
          aria-label="Toggle Theme"
        >
            <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3 h-3">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3 h-3">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
        </button>
     </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const followerRef = ref<HTMLElement | null>(null)
const isDark = ref(false)
const isMoving = ref(false)
const isHovering = ref(false)
let moveTimeout: NodeJS.Timeout

const toggleTheme = () => {
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

const updatePosition = (e: MouseEvent) => {
    if (!followerRef.value) return
    
    // Position the follower slightly offset from cursor
    const x = e.clientX + 16
    const y = e.clientY + 16
    
    // Use transform for performance
    followerRef.value.style.transform = `translate(${x}px, ${y}px)`
    
    isMoving.value = true
    clearTimeout(moveTimeout)
    
    // Hide after 2 seconds of inactivity, unless hovering
    moveTimeout = setTimeout(() => {
        isMoving.value = false
    }, 2000)
}

onMounted(() => {
    isDark.value = document.documentElement.classList.contains('dark')
    window.addEventListener('mousemove', updatePosition)
})

onUnmounted(() => {
    window.removeEventListener('mousemove', updatePosition)
    clearTimeout(moveTimeout)
})
</script>
