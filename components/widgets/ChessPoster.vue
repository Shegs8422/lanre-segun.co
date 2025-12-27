<template>
    <div class="select-none w-[360px] h-[360px] relative rounded-lg" data-no-drag="true">
        <div class="relative w-full h-full rounded-lg bg-black flex flex-col gap-4 items-center justify-center overflow-hidden shadow-xl"
            :class="{ 'animate-wriggle': isWriggling }">

            <!-- Background SVG Pattern -->
            <img draggable="false" alt="Chess Pattern"
                class="rounded-lg absolute bottom-0 left-0 w-full h-full object-cover opacity-40"
                src="/images/background.svg">

            <!-- Scrolling Text Top -->
            <div class="scrolling-text-top absolute top-4 w-[400%] flex pointer-events-none">
                <span class="text-[90px] text-white font-bold whitespace-nowrap animate-scroll-left">
                    PLAY PLAY PLAY PLAY PLAY PLAY PLAY PLAY
                </span>
            </div>

            <!-- Scrolling Text Bottom -->
            <div class="scrolling-text-bottom absolute bottom-4 w-[400%] flex pointer-events-none">
                <span class="text-[90px] text-white font-bold whitespace-nowrap rotate-180 animate-scroll-right">
                    PLAY PLAY PLAY PLAY PLAY PLAY PLAY PLAY
                </span>
            </div>

            <!-- Chess Piece SVGs -->
            <img draggable="false" alt="Chess Knight" width="177" height="172"
                class="rounded-lg absolute top-0 left-0 pointer-events-none" src="/images/chess-poster.svg">
            <img draggable="false" alt="Chess King" width="224" height="233"
                class="rounded-lg absolute bottom-0 right-0 pointer-events-none" src="/images/king-chess-poster.svg">

            <!-- Content Button Overlay -->
            <a href="https://chess.com" target="_blank" class="absolute inset-0 z-20"></a>
        </div>

        <!-- Scratch Card Canvas Overlay -->
        <canvas v-if="!isRevealed" ref="scratchCanvas" width="360" height="360"
            class="absolute top-0 left-0 w-full h-full rounded-lg z-30 scratch-cursor" @mousedown="startScratching"
            @mousemove="scratch" @mouseup="stopScratching" @mouseleave="stopScratching" @touchstart="startScratching"
            @touchmove="scratch" @touchend="stopScratching"></canvas>
    </div>
</template>

<script setup lang="ts">
import { useSound } from '@vueuse/sound'
import { ref, onMounted } from 'vue'

const scratchCanvas = ref<HTMLCanvasElement | null>(null)
const isScratching = ref(false)
const isRevealed = ref(false)
const isWriggling = ref(false)
const scratchedPixels = ref(0)
const totalPixels = ref(0)

const loadCoverImage = () => {
    if (!scratchCanvas.value) return

    const canvas = scratchCanvas.value
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const coverImage = new Image()
    coverImage.crossOrigin = 'anonymous'
    coverImage.onload = () => {
        ctx.drawImage(coverImage, 0, 0, 360, 360)
        // Calculate total non-transparent pixels
        const imageData = ctx.getImageData(0, 0, 360, 360)
        totalPixels.value = imageData.data.length / 4
    }
    coverImage.onerror = () => {
        console.error('Failed to load chess-cover.png')
    }
    coverImage.src = '/about-me/chess-cover.png'
}

const [playScratch] = useSound('/audio/interaction sound.mp3', { volume: 0.5 })

const startScratching = (e: MouseEvent | TouchEvent) => {
    isScratching.value = true
    scratch(e)
}

const stopScratching = () => {
    isScratching.value = false
}

const scratch = (e: MouseEvent | TouchEvent) => {
    if (!isScratching.value || !scratchCanvas.value) return

    const canvas = scratchCanvas.value
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    let x: number, y: number

    if (e instanceof MouseEvent) {
        x = e.clientX - rect.left
        y = e.clientY - rect.top
    } else {
        const touch = e.touches[0]
        x = touch.clientX - rect.left
        y = touch.clientY - rect.top
    }

    // Scale coordinates to canvas size
    x = (x / rect.width) * 360
    y = (y / rect.height) * 360

    // Erase circular area
    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(x, y, 20, 0, Math.PI * 2)
    ctx.fill()

    // Play scratch sound
    playScratch()

    // Check scratch percentage
    checkScratchPercentage()
}

const checkScratchPercentage = () => {
    if (!scratchCanvas.value || isRevealed.value) return

    const canvas = scratchCanvas.value
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const imageData = ctx.getImageData(0, 0, 360, 360)
    let transparentPixels = 0

    // Count transparent pixels
    for (let i = 3; i < imageData.data.length; i += 4) {
        if (imageData.data[i] < 128) {
            transparentPixels++
        }
    }

    const scratchedPercentage = (transparentPixels / totalPixels.value) * 100

    // Trigger wriggle and reveal at 70%
    if (scratchedPercentage >= 70) {
        revealWidget()
    }
}

const revealWidget = () => {
    if (isRevealed.value) return

    // Trigger wriggle animation
    isWriggling.value = true

    // Clear canvas after a short delay
    setTimeout(() => {
        isRevealed.value = true
        isWriggling.value = false
    }, 500)
}

onMounted(() => {
    loadCoverImage()
})
</script>

<style scoped>
@keyframes scroll-left {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(-50%);
    }
}

@keyframes scroll-right {
    0% {
        transform: translateX(-50%);
    }

    100% {
        transform: translateX(0);
    }
}

@keyframes wriggle {
    0% {
        transform: rotate(0deg) translateX(0);
    }

    25% {
        transform: rotate(2deg) translateX(3px);
    }

    50% {
        transform: rotate(-2deg) translateX(-3px);
    }

    75% {
        transform: rotate(1deg) translateX(2px);
    }

    100% {
        transform: rotate(0deg) translateX(0);
    }
}

.animate-scroll-left {
    animation: scroll-left 5s linear infinite;
}

.animate-scroll-right {
    animation: scroll-right 5s linear infinite;
}

.animate-wriggle {
    animation: wriggle 0.8s ease-in-out;
}

.scratch-cursor {
    cursor: url('/about-me/promo cursor.svg'), auto;
}
</style>
