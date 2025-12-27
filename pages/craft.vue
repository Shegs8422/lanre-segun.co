<template>
    <div class="min-h-screen bg-background text-foreground py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <!-- Header -->
        <div class="mb-16">
            <h1 class="text-4xl md:text-5xl font-bold mb-4">Laboratory</h1>
            <p class="text-muted-foreground text-lg max-w-2xl">
                A collection of interactive components and experiments crafted with Vue, Tailwind, and GSAP.
                Explore the building blocks of this portfolio.
            </p>
        </div>

        <div class="flex flex-col gap-24">

            <!-- Item 1: Menu Toolbar -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div class="lg:col-span-4 flex flex-col gap-4">
                    <h2 class="text-2xl font-semibold">Menu Toolbar</h2>
                    <p class="text-muted-foreground leading-relaxed">
                        A responsive, floating navigation dock with active state tracking, theme toggling, and
                        integrated
                        music controls. Features a springy "eject" animation for the mini player.
                    </p>
                    <div class="flex flex-wrap gap-2 mt-2">
                        <span
                            class="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">Vue</span>
                        <span
                            class="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">Tailwind</span>
                        <span
                            class="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">GSAP</span>
                    </div>
                </div>
                <div
                    class="lg:col-span-8 bg-[#0A0A0A] dark:bg-[#111111] rounded-2xl border border-white/10 p-12 flex items-center justify-center min-h-[300px] relative overflow-hidden">
                    <div
                        class="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px]">
                    </div>
                    <FloatingDock :demo="true" />
                </div>
            </div>

            <!-- Item 2: Flip Clock -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div class="lg:col-span-4 flex flex-col gap-4">
                    <h2 class="text-2xl font-semibold">Flip Clock</h2>
                    <p class="text-muted-foreground leading-relaxed">
                        A realistic retro flip clock component. It breaks down time into individual digits, each
                        animating with a 3D fold effect when the value changes.
                    </p>
                    <div class="flex flex-wrap gap-2 mt-2">
                        <span
                            class="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">Vue</span>
                        <span
                            class="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">CSS
                            3D</span>
                    </div>
                </div>
                <div
                    class="lg:col-span-8 bg-[#0A0A0A] dark:bg-[#111111] rounded-2xl border border-white/10 p-12 flex items-center justify-center min-h-[300px] relative overflow-hidden">
                    <div
                        class="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px]">
                    </div>
                    <FlipClock />
                </div>
            </div>

            <!-- Item 3: Simple Book -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div class="lg:col-span-4 flex flex-col gap-4">
                    <h2 class="text-2xl font-semibold">Simple Book</h2>
                    <p class="text-muted-foreground leading-relaxed">
                        A 3D book that subtly opens on hover. Uses CSS 3D transforms to create the spine, cover, and
                        page
                        thickness effects.
                    </p>
                    <div class="flex flex-wrap gap-2 mt-2">
                        <span
                            class="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">Vue</span>
                        <span
                            class="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">CSS
                            3D</span>
                    </div>
                </div>
                <div
                    class="lg:col-span-8 bg-[#0A0A0A] dark:bg-[#111111] rounded-2xl border border-white/10 p-12 flex items-center justify-center min-h-[300px] relative overflow-hidden">
                    <div
                        class="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px]">
                    </div>
                    <Book3D cover="/images/image_3.png" color="#E32A24" :width="160" :height="220" />
                </div>
            </div>

            <!-- Item 4: Turbulence Canvas -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div class="lg:col-span-4 flex flex-col gap-4">
                    <h2 class="text-2xl font-semibold">Turbulence Canvas</h2>
                    <p class="text-muted-foreground leading-relaxed">
                        An interactive drawing canvas with SVG turbulence filters. The line has a "wobbly" organic feel
                        created by displacing the SVG path with noise.
                    </p>
                    <div class="flex flex-wrap gap-2 mt-2">
                        <span
                            class="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">Vue</span>
                        <span
                            class="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">SVG
                            Filters</span>
                        <span
                            class="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">Pointer
                            Events</span>
                    </div>
                </div>
                <div
                    class="lg:col-span-8 bg-[#0A0A0A] dark:bg-[#111111] rounded-2xl border border-white/10 p-12 flex items-center justify-center min-h-[400px] relative overflow-hidden">
                    <div
                        class="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px]">
                    </div>
                    <!-- Wrapper to reset rotation for demo -->
                    <div class="scale-110">
                        <DrawingCanvas />
                    </div>
                </div>
            </div>

            <!-- Item 5: Music Album Player -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div class="lg:col-span-4 flex flex-col gap-4">
                    <h2 class="text-2xl font-semibold">Music Album Player</h2>
                    <p class="text-muted-foreground leading-relaxed">
                        An interactive vinyl record player. Clicking starts the track, slides out the sleeve, and spins
                        the record. Integrated with the global `useAlbumPlayer` store.
                    </p>
                    <div class="flex flex-wrap gap-2 mt-2">
                        <span
                            class="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">Vue</span>
                        <span
                            class="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">Howler.js</span>
                        <span
                            class="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">Animations</span>
                    </div>
                </div>
                <div
                    class="lg:col-span-8 bg-[#0A0A0A] dark:bg-[#111111] rounded-2xl border border-white/10 p-12 flex items-center justify-center min-h-[400px] relative overflow-hidden">
                    <div
                        class="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px]">
                    </div>
                    <VinylRecord :key="`demo-record`" cover="/images/image_16.jpg" album="Super Eurobeat Demo"
                        artist="Initial D" musicFile="/audio/interaction-sound.mp3" />
                </div>
            </div>

            <!-- Item 6: Interactive Scratch Card -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div class="lg:col-span-4 flex flex-col gap-4">
                    <h2 class="text-2xl font-semibold">Interactive Scratch Card</h2>
                    <p class="text-muted-foreground leading-relaxed">
                        A scratch-to-reveal component using HTML5 Canvas. Supports touch and mouse input, plays scratch
                        sounds, and detects the percentage revealed to trigger a completion animation.
                    </p>
                    <div class="flex flex-wrap gap-2 mt-2">
                        <span
                            class="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">Vue</span>
                        <span
                            class="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">Canvas
                            API</span>
                        <span
                            class="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">Sound</span>
                    </div>
                </div>
                <div
                    class="lg:col-span-8 bg-[#0A0A0A] dark:bg-[#111111] rounded-2xl border border-white/10 p-12 flex items-center justify-center min-h-[450px] relative overflow-hidden">
                    <div
                        class="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px]">
                    </div>
                    <ChessPoster />
                </div>
            </div>

            <!-- Item 7: Brazil Stamp -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div class="lg:col-span-4 flex flex-col gap-4">
                    <h2 class="text-2xl font-semibold">Brazil Stamp</h2>
                    <p class="text-muted-foreground leading-relaxed">
                        A decorative stamp component with a fixed rotation. Simple yet effective for adding visual flair
                        to layouts.
                    </p>
                    <div class="flex flex-wrap gap-2 mt-2">
                        <span
                            class="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">Vue</span>
                        <span
                            class="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">Tailwind</span>
                    </div>
                </div>
                <div
                    class="lg:col-span-8 bg-[#0A0A0A] dark:bg-[#111111] rounded-2xl border border-white/10 p-12 flex items-center justify-center min-h-[300px] relative overflow-hidden">
                    <div
                        class="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px]">
                    </div>
                    <div class="scale-125">
                        <BrazilStamp />
                    </div>
                </div>
            </div>

            <!-- Item 8: Draggable Polaroid -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div class="lg:col-span-4 flex flex-col gap-4">
                    <h2 class="text-2xl font-semibold">Draggable Polaroid</h2>
                    <p class="text-muted-foreground leading-relaxed">
                        A polaroid photo frame that can be dragged around using GSAP Draggable. Features tilt rotation,
                        hover lift effects, and z-index management.
                    </p>
                    <div class="flex flex-wrap gap-2 mt-2">
                        <span
                            class="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">Vue</span>
                        <span
                            class="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">GSAP
                            Draggable</span>
                    </div>
                </div>
                <div
                    class="lg:col-span-8 bg-[#0A0A0A] dark:bg-[#111111] rounded-2xl border border-white/10 p-12 flex items-center justify-center min-h-[600px] relative overflow-hidden">
                    <div
                        class="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px]">
                    </div>
                    <PolaroidPhoto :x="100" :y="150" :rotation="-5" caption="Memories"
                        src="/images/gallery/grid-6.jpg" />
                    <PolaroidPhoto :x="300" :y="180" :rotation="5" caption="Travel" src="/images/gallery/grid-2.jpg" />
                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import FloatingDock from '~/components/FloatingDock.vue'
import FlipClock from '~/components/widgets/FlipClock.vue'
import Book3D from '~/components/widgets/Book3D.vue'
import DrawingCanvas from '~/components/widgets/DrawingCanvas.vue'
import VinylRecord from '~/components/widgets/VinylRecord.vue'
import ChessPoster from '~/components/widgets/ChessPoster.vue'
import BrazilStamp from '~/components/widgets/BrazilStamp.vue'
import PolaroidPhoto from '~/components/PolaroidPhoto.vue'

useHead({
    title: 'Craft | Olanrewaju Segun',
    meta: [
        { name: 'description', content: 'A collection of interactive components and experiments.' }
    ]
})
</script>
