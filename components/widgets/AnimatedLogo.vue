<template>
    <div
class="select-none relative w-full h-full overflow-hidden bg-black" @mouseenter="startCycling"
        @mouseleave="stopCycling">
        <transition name="fade" mode="out-in">
            <img
:key="currentImage" :src="currentImage" alt="Lanre Segun Logo" draggable="false" width="1024"
                height="1024" class="w-full h-full object-contain" >
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'

const baseDir = '/images/lanre logo/'
const images = [
    'ai.webp',
    'archetecture.webp',
    'blur.webp',
    'clay 2.webp',
    'clay.webp',
    'clear fill.webp',
    'colorful.webp',
    'electric.webp',
    'glass-apple (1).webp',
    'glow.webp',
    'gold.webp',
    'grafitti.webp',
    'green mesh.webp',
    'ink.webp',
    'nueromorphism.webp',
    'outline.webp',
    'pencil.webp',
    'shadow.webp'
].map(img => encodeURI(`${baseDir}${img}`))

const currentIndex = ref(0)
const currentImage = computed(() => images[currentIndex.value])
const isHovering = ref(false)
let intervalId: any = null

const startCycling = () => {
    isHovering.value = true
    if (intervalId) return

    intervalId = setInterval(() => {
        currentIndex.value = (currentIndex.value + 1) % images.length
    }, 500) // 0.5s
}

const stopCycling = () => {
    isHovering.value = false
    if (intervalId) {
        clearInterval(intervalId)
        intervalId = null
    }
}

onUnmounted(() => {
    if (intervalId) clearInterval(intervalId)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
