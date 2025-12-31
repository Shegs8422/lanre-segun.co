<template>
    <ClientOnly>
        <!-- Interactive Preloader -->
        <div v-if="isPreloading"
            class="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center p-6 text-white font-mono overflow-hidden">
            <div
                class="terminal-box w-full max-w-2xl border border-white/10 rounded-xl p-8 bg-zinc-950/50 backdrop-blur-xl relative">
                <div class="absolute top-0 left-0 w-full h-1 bg-blue-500/20">
                    <div class="h-full bg-blue-500 preloader-progress-bar" :style="{ width: preloaderProgress + '%' }">
                    </div>
                </div>

                <div class="flex flex-col gap-4">
                    <div class="flex justify-between items-center border-b border-white/5 pb-4 mb-2">
                        <span
                            class="text-[10px] uppercase tracking-[0.3em] font-black text-blue-500">System.Initialize()</span>
                        <span class="text-[10px] uppercase tracking-[0.3em] font-black text-white/20">{{
                            Math.floor(preloaderProgress) }}% Complete</span>
                    </div>

                    <div class="terminal-lines flex flex-col gap-1 overflow-hidden h-32">
                        <p v-for="(line, i) in terminalLog" :key="i"
                            class="text-[10px] md:text-xs leading-relaxed opacity-70 animate-terminal-line">
                            <span class="text-blue-500">></span> {{ line }}
                        </p>
                    </div>

                    <div class="flex items-center gap-4 mt-8 opacity-40">
                        <div class="grow h-px bg-white/10"></div>
                        <div class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                        <div class="grow h-px bg-white/10"></div>
                    </div>
                </div>
            </div>

            <!-- Floating Background Elements -->
            <div class="absolute inset-0 z-[-1] opacity-20">
                <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full animate-float">
                </div>
                <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full animate-float"
                    style="animation-delay: -2s"></div>
            </div>
        </div>

        <!-- Mobile View (≤768px) -->
        <div v-if="isMobile" class="relative h-screen overflow-y-auto bg-background scrollbar-mobile touch-pan-y"
            :class="{ 'opacity-0': isPreloading }">
            <!-- Background layers - Fixed to stay behind during scroll -->
            <div class="fixed inset-0 bg-linear-grid bg-size-[16px_16px] bg-position-[12px_12px] pointer-events-none">
            </div>
            <div class="fixed inset-0 opacity-60 bg-cover bg-center z-10 pointer-events-none"
                style="background-image: url('/images/Layer-window.png')"></div>
            <div
                class="fixed inset-0 bg-linear-big-grid bg-size-[80px_80px] bg-position-[-4px_-4px] z-20 pointer-events-none">
            </div>
            <div
                class="fixed inset-0 bg-diagonal-grid bg-size-[80px_80px] bg-position-[-2.5px_-2.5px] z-30 pointer-events-none">
            </div>

            <!-- Content Area -->
            <div class="relative z-40 flex flex-col items-center gap-12 p-6 pt-24 pb-32">
                <ProfileCard />
                <EducationCard />
            </div>
        </div>

        <!-- Desktop View (>768px) -->
        <DraggableCanvas v-else :class="{ 'opacity-0': isPreloading }">
            <!-- Orchestration Grid - 8x7 layout with 360px cells -->
            <div
                class="absolute orchestration grid gap-4 grid-cols-[repeat(8,360px)] grid-rows-[repeat(7,360px)] w-[2992px] h-[2620px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">

                <!-- Background fill -->
                <div class="z-[-1] w-[2992px] h-[2240px] pointer-events-none"></div>

                <!-- Profile Card -->
                <div style="--stagger: 1"
                    class="select-none flex flex-col gap-2 relative rounded-lg w-[568px] col-start-4 row-start-4 col-span-2 row-span-2 shadow-lg h-fit entrance-stagger">
                    <ProfileCard />
                </div>

                <!-- Education Card -->
                <div style="--stagger: 39"
                    class="select-none flex flex-col gap-2 relative rounded-lg w-[568px] col-start-4 row-start-7 col-span-2 row-span-1 shadow-lg h-fit bottom-[340px] entrance-stagger">
                    <EducationCard />
                </div>

                <!-- Drawing Canvas -->
                <div style="--stagger: 9"
                    class="select-none relative col-start-2 row-start-2 w-[340px] h-[340px] left-[60px] top-[140px] rotate-[-4deg] entrance-stagger"
                    data-no-drag="true">
                    <DrawingCanvas />
                </div>

                <!-- Flip Clock -->
                <div style="--stagger: 12"
                    class="col-start-7 col-span-2 row-start-5 rotate-[4deg] relative z-50 w-fit top-[40px] left-[60px] entrance-stagger">
                    <FlipClock />
                </div>

                <!-- 3D Books -->
                <Book3D cover="/images/The Path to Senior Designer - ARTIOM DASHINSKY.jpg" :width="165" :height="201"
                    classes="col-start-3 row-start-1 rotate-[-12deg] top-[40px] left-[120px] entrance-stagger"
                    style="--stagger: 20" />
                <Book3D cover="/images/The Effective Product Designer - ARTIOM DASHINSKY.jpg" :width="133" :height="201"
                    classes="col-start-5 row-start-2 top-[40px] left-[40px] rotate-[15deg] entrance-stagger"
                    style="--stagger: 21" />
                <Book3D cover="/images/The Subtle Art of Not Giving a Fuck - Mark Manson.jpg" :width="135" :height="198"
                    classes="col-start-2 row-start-4 rotate-[6deg] entrance-stagger" style="--stagger: 22" />
                <Book3D cover="/images/Designing Brand Identity - Alina Wheeler.jpg" :width="135" :height="200"
                    classes="col-start-3 row-start-2 rotate-[-5deg] left-[10px] bottom-[20px] entrance-stagger"
                    style="--stagger: 23" />
                <Book3D cover="/images/image_1.jpg" :width="130" :height="198"
                    classes="col-start-1 row-start-5 rotate-[12deg] left-[20px] top-[80px] entrance-stagger"
                    style="--stagger: 24" />
                <Book3D cover="/images/Prompt Engineering for UX - MEDAVI.jpg" :width="145" :height="198"
                    classes="col-start-6 row-start-6 rotate-[-10deg] right-[40px] top-[40px] entrance-stagger"
                    style="--stagger: 25" />
                <Book3D cover="/images/Grid System in Graphic Design - Josef Muller Brockmann.jpg" :width="136"
                    :height="199"
                    classes="col-start-7 row-start-4 rotate-[12deg] left-[140px] bottom-[40px] entrance-stagger"
                    style="--stagger: 26" />
                <Book3D cover="/images/Design Beyond Limits with Figma - Simon Jun.jpg" :width="128" :height="197"
                    classes="col-start-3 row-start-6 rotate-[4deg] left-[80px] top-[120px] entrance-stagger"
                    style="--stagger: 27" />
                <Book3D cover="/images/Living Purposefully - Pastor Juwon Owolabi.jpg" :width="137" :height="194"
                    classes="col-start-1 row-start-4 rotate-[-12deg] left-[20px] top-[40px] entrance-stagger"
                    style="--stagger: 28" />
                <Book3D cover="/images/Inclusive Design for Accessibility - Dale Cruse & D.Bourdreau.jpg" :width="143"
                    :height="198"
                    classes="col-start-7 row-start-1 h-fit w-fit left-[360px] relative top-[400px] entrance-stagger"
                    style="--stagger: 29" />
                <Book3D cover="/images/Fall in Love with the Problem, Not the Solution - Uri Levine.jpg" :width="143"
                    :height="201"
                    classes="col-start-1 row-start-1 rotate-[-10deg] left-[60px] top-[20px] entrance-stagger"
                    style="--stagger: 30" />
                <Book3D cover="/images/image_5.png" :width="143" :height="202"
                    classes="col-start-3 row-start-7 rotate-[12deg] right-[80px] top-[40px] entrance-stagger"
                    style="--stagger: 31" />
                <Book3D cover="/images/image_13.jpg" :width="160" :height="208"
                    classes="col-start-4 row-start-6 rotate-[-15deg] left-[80px] bottom-[20px] entrance-stagger"
                    style="--stagger: 32" />

                <!-- Vinyl Records -->
                <VinylRecord :key="`tuyo-narcos`" cover="/images/tuyo-narcos-theme.jpg" album="Tuyo (Narcos Theme)"
                    artist="Rodrigo Amarante" musicFile="/audio/tuyo-narcos-theme.mp3"
                    classes="col-start-5 row-start-1 rotate-[-15deg] top-[40px] left-[60px] entrance-stagger"
                    style="--stagger: 31" />
                <VinylRecord :key="`kendrick-heart`" cover="/images/The Heart 5 - Kendrick Lamar.jpg"
                    album="The Heart Part 5" artist="Kendrick Lamar" musicFile="/audio/the-heart-part-5.mp3"
                    classes="col-start-2 row-start-1 rotate-[12deg] top-[40px] left-[40px] entrance-stagger"
                    style="--stagger: 33" />
                <VinylRecord :key="`iba-folouwa`" cover="/images/iba%20foluwa.jpg" album="Iba Folouwa"
                    artist="Chief Commander Ebenezer Obey"
                    musicFile="/audio/chief-commander-ebenezer-obey-iba-folouwa.mp3"
                    classes="col-start-8 row-start-4 rotate-[8deg] left-[100px] bottom-[120px] entrance-stagger"
                    style="--stagger: 34" />
                <VinylRecord :key="`silk-sonic`" cover="/images/image_10.png" album="An Evening with Silk Sonic"
                    artist="Silk Sonic" musicFile="/audio/leave-the-door-open.mp3"
                    classes="col-start-6 row-start-6 rotate-[8deg] left-[180px] bottom-[100px] entrance-stagger"
                    style="--stagger: 35" />
                <VinylRecord :key="`keane`" cover="/images/Keane%20Hopes%20and%20fears.jpg"
                    album="Somewhere Only We Know" artist="Keane" musicFile="/audio/somewhere-only-we-know.mp3"
                    classes="col-start-1 row-start-7 rotate-[-8deg] left-[100px] bottom-[120px] entrance-stagger"
                    style="--stagger: 36" />
                <VinylRecord :key="`mozart`" cover="/images/Wolfgang-amadeus-mozart.jpg"
                    album="Symphony #40 in G Minor, K 550" artist="Wolfgang Amadeus Mozart"
                    musicFile="/audio/mozart-symphony-40-in-g-minor-k-550-1-molto-allegro-128-ytshorts.savetube.me.mp3"
                    classes="col-start-3 row-start-5 rotate-[8deg] right-[140px] top-[140px] entrance-stagger"
                    style="--stagger: 37" />
                <VinylRecord :key="`sunny`" cover="/images/Sunny.jpg" album="Sunny" artist="Boney M"
                    musicFile="/audio/boney-m-sunny.mp3"
                    classes="col-start-7 row-start-1 rotate-[8deg] right-[40px] top-[20px] entrance-stagger"
                    style="--stagger: 38" />

                <!-- Logos & Stills -->
                <div style="--stagger:41"
                    class="select-none bg-white p-4 border-4 border-white rounded-xl relative col-start-8 row-start-3 w-fit h-fit rotate-12 left-[40px] shadow-lg entrance-stagger">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="80" height="80" viewBox="0 0 96 96">
                        <path fill="#0acf83"
                            d="M32.3332 95.0001c8.648 0 15.6666 -7.0187 15.6666 -15.6667V63.6667H32.3332c-8.648 0 -15.6667 7.0187 -15.6667 15.6667s7.0187 15.6667 15.6667 15.6667Z">
                        </path>
                        <path fill="#a259ff"
                            d="M16.6665 47.9999c0 -8.648 7.0187 -15.6666 15.6667 -15.6666h15.6666v31.3333H32.3332c-8.648 0 -15.6667 -7.0187 -15.6667 -15.6667Z">
                        </path>
                        <path fill="#f24e1e"
                            d="M16.6665 16.6667C16.6665 8.01867 23.6852 1 32.3332 1h15.6666v31.3333H32.3332c-8.648 0 -15.6667 -7.0186 -15.6667 -15.6666Z">
                        </path>
                        <path fill="#ff7262"
                            d="M47.9995 1h15.6667c8.648 0 15.6666 7.01867 15.6666 15.6667 0 8.648 -7.0186 15.6666 -15.6666 15.6666H47.9995V1Z">
                        </path>
                        <path fill="#1abcfe"
                            d="M79.3328 47.9999c0 8.648 -7.0186 15.6667 -15.6666 15.6667s-15.6667 -7.0187 -15.6667 -15.6667 7.0187 -15.6666 15.6667 -15.6666 15.6666 7.0186 15.6666 15.6666Z">
                        </path>
                    </svg>
                </div>

                <div style="--stagger:42"
                    class="select-none relative col-start-1 row-start-5 w-[200px] h-[200px] shadow-2xl rounded-2xl overflow-hidden right-[60px] top-[120px] rotate-[4deg] entrance-stagger">
                    <div
                        class="relative w-full h-full bg-white flex items-center justify-center p-8 rounded-2xl shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 96 96" class="w-full h-auto">
                            <path fill="#ff302f"
                                d="m92.2344 51.4194 2.6162 1.7442c-0.8491 1.2507 -2.8801 3.3965 -6.3914 3.3965 -4.3603 0 -7.6076 -3.3736 -7.6076 -7.6651 0 -4.5669 3.2817 -7.665 7.2404 -7.665 3.9817 0 5.9324 3.167 6.5635 4.8767l0.3443 0.8721 -10.2583 4.2456c0.7802 1.5376 1.9965 2.3178 3.7177 2.3178 1.7212 0 2.9146 -0.8491 3.7752 -2.1228Zm-8.0437 -2.7653 6.8503 -2.8457c-0.3786 -0.9524 -1.5032 -1.6294 -2.8457 -1.6294 -1.7097 0 -4.0849 1.5146 -4.0046 4.4751Z">
                            </path>
                            <path fill="#20b15a" d="M75.9062 33.4158h3.3047v22.4443h-3.3047V33.4158Z"></path>
                            <path fill="#3686f7"
                                d="M70.6968 41.8267h3.1899v13.6318c0 5.657 -3.3391 7.9863 -7.2864 7.9863 -3.7177 0 -5.9553 -2.5014 -6.7929 -4.5324l2.926 -1.2164c0.5278 1.2508 1.8015 2.731 3.8669 2.731 2.5359 0 4.0965 -1.572 4.0965 -4.5095v-1.1016h-0.1148c-0.7573 0.918 -2.2031 1.7442 -4.039 1.7442 -3.8326 0 -7.3438 -3.3392 -7.3438 -7.6421 0 -4.326 3.5112 -7.6995 7.3438 -7.6995 1.8244 0 3.2817 0.8147 4.039 1.7097h0.1148v-1.1015Zm0.2295 7.0913c0 -2.708 -1.8015 -4.6817 -4.0965 -4.6817 -2.3178 0 -4.2685 1.9737 -4.2685 4.6817 0 2.6736 1.9507 4.6128 4.2685 4.6128 2.295 0.0114 4.0965 -1.9392 4.0965 -4.6128Z">
                            </path>
                            <path fill="#ff302f"
                                d="M41.0576 48.8606c0 4.4177 -3.4424 7.665 -7.665 7.665 -4.2227 0 -7.6651 -3.2588 -7.6651 -7.665 0 -4.4407 3.4424 -7.6765 7.6651 -7.6765 4.2226 0 7.665 3.2358 7.665 7.6765Zm-3.3506 0c0 -2.7539 -1.9966 -4.6472 -4.3144 -4.6472 -2.3179 0 -4.3145 1.8933 -4.3145 4.6472 0 2.731 1.9966 4.6472 4.3145 4.6472 2.3178 0 4.3144 -1.9162 4.3144 -4.6472Z">
                            </path>
                            <path fill="#ffba40"
                                d="M57.7993 48.895c0 4.4177 -3.4424 7.6651 -7.665 7.6651 -4.2227 0 -7.6651 -3.2474 -7.6651 -7.6651 0 -4.4407 3.4424 -7.665 7.6651 -7.665 4.2226 0 7.665 3.2129 7.665 7.665Zm-3.362 0c0 -2.7539 -1.9966 -4.6472 -4.3145 -4.6472s-4.3145 1.8933 -4.3145 4.6472c0 2.731 1.9966 4.6472 4.3145 4.6472 2.3293 0 4.3145 -1.9277 4.3145 -4.6472Z">
                            </path>
                            <path fill="#3686f7"
                                d="M13.1287 53.198c-4.8079 0 -8.57157 -3.8784 -8.57157 -8.6863 0 -4.8078 3.76367 -8.6863 8.57157 -8.6863 2.5932 0 4.4865 1.0213 5.8864 2.3294l2.3064 -2.3064c-1.9507 -1.8704 -4.5554 -3.2932 -8.1928 -3.2932C6.54224 32.5552 1 37.9253 1 44.5117s5.54224 11.9566 12.1287 11.9566c3.5571 0 6.2421 -1.1704 8.342 -3.3506 2.1572 -2.1572 2.8228 -5.1865 2.8228 -7.6421 0 -0.7688 -0.0918 -1.5606 -0.1951 -2.1458H13.1287v3.19h7.8142c-0.2295 1.9966 -0.8606 3.362 -1.7901 4.2915 -1.1245 1.136 -2.903 2.3867 -6.0241 2.3867Z">
                            </path>
                        </svg>
                    </div>
                </div>

                <!-- Next.js Logo Box -->
                <div style="--stagger:13"
                    class="select-none relative col-start-4 row-start-3 w-[300px] h-[300px] shadow-2xl rounded-2xl overflow-hidden left-[40px] bottom-[20px] rotate-[4deg] entrance-stagger">
                    <img alt="Logo variation 1" draggable="false" width="1024" height="1024"
                        class="w-full h-full object-contain bg-black" src="/images/image_12.png">
                </div>

                <!-- Stamps & Photos -->
                <div class="col-start-7 row-start-1 h-fit w-fit left-[360px] relative top-[40px] entrance-stagger"
                    style="--stagger:35">
                    <BrazilStamp />
                </div>
                <div class="col-start-6 row-start-2 h-[360px] w-[360px] left-[130px] top-[80px] relative entrance-stagger"
                    style="--stagger:38">
                    <ChessPoster />
                </div>

                <!-- Polaroid Photos -->
                <DraggableWidget
                    class="relative col-start-3 row-start-4 w-fit h-fit bottom-[160px] left-[100px] entrance-stagger"
                    style="--stagger: 3">
                    <div class="rotate-14 transition-transform hover:scale-105 duration-300">
                        <PolaroidPhoto src="/images/image_21.jpg" alt="Profile example" />
                    </div>
                </DraggableWidget>
                <DraggableWidget
                    class="relative col-start-2 row-start-5 w-fit h-fit bottom-[160px] left-[240px] entrance-stagger"
                    style="--stagger: 4">
                    <div class="-rotate-12 transition-transform hover:scale-105 duration-300">
                        <PolaroidPhoto src="/images/image_2.jpg" alt="Profile example" />
                    </div>
                </DraggableWidget>
                <DraggableWidget
                    class="relative col-start-6 row-start-4 w-fit h-fit bottom-[180px] left-[80px] entrance-stagger"
                    style="--stagger: 5">
                    <div class="rotate-2 transition-transform hover:scale-105 duration-300">
                        <PolaroidPhoto src="/images/image_14.png" alt="Profile example" />
                    </div>
                </DraggableWidget>
                <DraggableWidget
                    class="relative col-start-6 row-start-5 w-fit h-fit bottom-[200px] right-[70px] entrance-stagger"
                    style="--stagger: 6">
                    <div class="rotate-[8deg] transition-transform hover:scale-105 duration-300">
                        <PolaroidPhoto src="/images/segun.jpg" alt="Lanre Segun" />
                    </div>
                </DraggableWidget>

            </div>
        </DraggableCanvas>
    </ClientOnly>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'

// Widget Imports
import Book3D from '~/components/widgets/Book3D.vue'
import VinylRecord from '~/components/widgets/VinylRecord.vue'
import FlipClock from '~/components/widgets/FlipClock.vue'
import DraggableCanvas from '~/components/widgets/DraggableCanvas.vue'
import DraggableWidget from '~/components/widgets/DraggableWidget.vue'
import ProfileCard from '~/components/ProfileCard.vue'
import EducationCard from '~/components/EducationCard.vue'
import PolaroidPhoto from '~/components/PolaroidPhoto.vue'
import DrawingCanvas from '~/components/widgets/DrawingCanvas.vue'
import BrazilStamp from '~/components/widgets/LocationStamp.vue'
import ChessPoster from '~/components/widgets/ChessPoster.vue'

// Preloader State
const isPreloading = ref(true)
const preloaderProgress = ref(0)
const terminalLog = ref<string[]>([])
const fullLogLines = [
    "Establishing neural link with grid...",
    "Retrieving interactive widget modules...",
    "Accessing high-fidelity visual assets...",
    "Synchronizing layout parameters...",
    "Decrypting orchestration matrices...",
    "Compiling interactive sub-systems...",
    "Finalizing design atmosphere...",
    "Grid stable. Welcome, user."
]

// Mobile detection
const isMobile = ref(false)

onMounted(() => {
    if (process.client) {
        const checkMobile = () => {
            isMobile.value = window.innerWidth <= 768
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)

        // 1. Run Preloader Animation
        const preloaderTimeline = gsap.timeline({
            onComplete: () => {
                gsap.to(".terminal-box", {
                    scale: 1.1,
                    opacity: 0,
                    duration: 0.6,
                    ease: "power4.in",
                    onComplete: () => {
                        isPreloading.value = false
                        initEntranceAnimations()
                    }
                })
            }
        })

        preloaderTimeline.to(preloaderProgress, {
            value: 100,
            duration: 3,
            ease: "none",
            onUpdate: () => {
                const currentLine = Math.floor((preloaderProgress.value / 100) * fullLogLines.length)
                if (fullLogLines[currentLine] && !terminalLog.value.includes(fullLogLines[currentLine])) {
                    terminalLog.value.push(fullLogLines[currentLine])
                }
            }
        })

        const initEntranceAnimations = () => {
            nextTick(() => {
                gsap.from(".entrance-stagger", {
                    y: 50,
                    opacity: 0,
                    duration: 1.2,
                    stagger: 0.08,
                    ease: "power4.out",
                    clearProps: "all"
                })
            })
        }
    }
})

// Conditional overflow based on device
const bodyClass = computed(() => {
    return isMobile.value ? 'bg-background' : 'overflow-hidden bg-background'
})

useSeoMeta({
    title: 'Lanre Segun - Senior Product Designer | Interactive Portfolio',
    description: 'C-Suite Senior Product Designer & Design Engineer. Specializing in Web3, Fintech, and SaaS with a focus on HCD and premium UI.',
    ogTitle: 'Lanre Segun - Senior Product Designer | Interactive Portfolio',
    ogDescription: 'C-Suite Senior Product Designer & Design Engineer. Specializing in Web3, Fintech, and SaaS with a focus on HCD and premium UI.',
    ogImage: '/og-image.png',
    ogUrl: 'https://lanre-segun.vercel.app'
})

useHead({
    bodyAttrs: {
        class: bodyClass
    }
})
</script>

<style scoped>
.font-mono {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}

@keyframes float {

    0%,
    100% {
        transform: translateY(0) scale(1);
    }

    50% {
        transform: translateY(-30px) scale(1.1);
    }
}

.animate-float {
    animation: float 10s ease-in-out infinite;
}

.animate-terminal-line {
    animation: terminalLineIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes terminalLineIn {
    from {
        transform: translateX(-10px);
        opacity: 0;
    }

    to {
        transform: translateX(0);
        opacity: 0.7;
    }
}

/* Ensure scrollbars are visible on mobile */
@media (max-width: 768px) {
    .scrollbar-mobile {
        scrollbar-width: thin;
        scrollbar-color: rgba(155, 155, 155, 0.5) transparent;
        -webkit-overflow-scrolling: touch;
    }

    .scrollbar-mobile::-webkit-scrollbar {
        width: 4px;
        display: block !important;
    }

    .scrollbar-mobile::-webkit-scrollbar-track {
        background: transparent;
    }

    .scrollbar-mobile::-webkit-scrollbar-thumb {
        background-color: rgba(155, 155, 155, 0.5);
        border-radius: 20px;
    }
}
</style>
