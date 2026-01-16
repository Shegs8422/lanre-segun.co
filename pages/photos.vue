<!-- Custom Gallery Component -->
<template>
    <div class="min-h-screen bg-background pt-24 pb-20 px-5 transition-colors duration-500">
        <div class="w-full">
            <!-- Grid View -->
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-3">
                <div
v-for="(item, index) in galleryItems" :key="item.id" class="aspect-3/4 overflow-hidden rounded-md bg-muted border border-border cursor-pointer group relative"
                    @click="openLightbox(index)">
                    <img :src="item.url" class="w-full h-full object-cover" loading="lazy" >
                </div>
            </div>

            <div v-if="galleryItems.length === 0" class="text-center py-40">
                <p class="text-muted-foreground font-medium">Capture the world. Gallery is empty.</p>
            </div>
        </div>

        <!-- Custom Lightbox -->
        <Transition name="fade">
            <div
v-if="isLightboxOpen"
                class="fixed inset-0 z-100 bg-background overflow-hidden select-none transition-colors duration-500">

                <!-- Close Button -->
                <button
class="absolute top-10 right-10 z-120 w-12 h-12 flex items-center justify-center bg-foreground/10 hover:bg-foreground/20 rounded-full text-foreground transition-all active:scale-95 shadow-2xl"
                    @click="closeLightbox">
                    <svg
xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>

                <!-- Carousel Container -->
                <div class="relative w-full h-full flex items-center justify-center overflow-hidden">

                    <!-- Navigation (Desktop Only) -->
                    <button
v-if="!isMobile" class="fixed left-8 lg:left-12 z-130 w-14 h-14 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 rounded-full text-white transition-all active:scale-90 shadow-2xl"
                        @click.stop="prev">
                        <svg
xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                    </button>

                    <button
v-if="!isMobile" class="fixed right-8 lg:right-12 z-130 w-14 h-14 flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 rounded-full text-white transition-all active:scale-90 shadow-2xl"
                        @click.stop="next">
                        <svg
xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </button>

                    <!-- The Track -->
                    <div
ref="trackRef"
                        class="flex items-center h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.2,1,0.2,1)] will-change-transform"
                        :class="[
                            isMobile ? 'overflow-x-auto snap-x snap-mandatory no-scrollbar' : ''
                        ]" :style="!isMobile ? {
                            transform: `translateX(calc(50vw - (var(--card-width) / 2) - (${currentIndex} * (var(--card-width) + var(--carousel-gap)))))`,
                            gap: 'var(--carousel-gap)'
                        } : {}" @scroll="handleMobileScroll">
                        <div
v-for="(item, index) in galleryItems" :id="'slide-' + index" :key="item.id + '-slide'"
                            class="relative shrink-0 transition-all duration-700 ease-[cubic-bezier(0.2,1,0.2,1)]"
                            :class="[
                                isMobile ? 'w-screen h-full flex items-center justify-center snap-center' : 'opacity-40 scale-[0.85]',
                                !isMobile && index === currentIndex ? 'opacity-100 scale-100 z-10' : ''
                            ]" :style="!isMobile ? { width: 'var(--card-width)', height: '75vh' } : {}">
                            <!-- Portrait Image -->
                            <img
:src="item.url"
                                class="object-cover rounded-2xl shadow-2xl border border-white/10 pointer-events-none"
                                :class="isMobile ? 'w-[85vw] h-[70vh] rounded-3xl' : 'w-full h-full'" >
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
const { galleryItems, fetchGallery } = useGallery()
const { isDockVisible } = useLayout()

const isLightboxOpen = ref(false)
const currentIndex = ref(0)
const isMobile = ref(false)
const trackRef = ref<HTMLElement | null>(null)

const checkMobile = () => {
    if (import.meta.client) {
        isMobile.value = window.innerWidth < 1024
    }
}

onMounted(() => {
    fetchGallery()
    checkMobile()
    window.addEventListener('resize', checkMobile)
    window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
    document.body.style.overflow = 'auto'
    window.removeEventListener('resize', checkMobile)
    window.removeEventListener('keydown', handleKeydown)
})

const openLightbox = (index: number) => {
    currentIndex.value = index
    isLightboxOpen.value = true
    isDockVisible.value = false
    document.body.style.overflow = 'hidden'

    if (isMobile.value) {
        nextTick(() => {
            syncMobileScroll(index)
        })
    }
}

const closeLightbox = () => {
    isLightboxOpen.value = false
    isDockVisible.value = true
    document.body.style.overflow = 'auto'
}

const syncMobileScroll = (index: number) => {
    const slide = document.getElementById(`slide-${index}`)
    if (slide && trackRef.value) {
        trackRef.value.scrollLeft = slide.offsetLeft
    }
}

// Support for hash fragments (e.g. #slide-2)
const handleHash = () => {
    const hash = window.location.hash
    if (hash && hash.startsWith('#slide-')) {
        const index = parseInt(hash.replace('#slide-', ''))
        if (!isNaN(index) && index >= 0 && index < galleryItems.value.length) {
            openLightbox(index)
        }
    }
}

watch(galleryItems, (newItems) => {
    if (newItems.length > 0) {
        handleHash()
    }
}, { immediate: true })

const handleMobileScroll = (e: Event) => {
    if (!isMobile.value) return
    const target = e.target as HTMLElement
    const index = Math.round(target.scrollLeft / window.innerWidth)
    if (index !== currentIndex.value) {
        currentIndex.value = index
    }
}

const next = () => {
    if (currentIndex.value < galleryItems.value.length - 1) {
        currentIndex.value++
    } else {
        currentIndex.value = 0
    }
}

const prev = () => {
    if (currentIndex.value > 0) {
        currentIndex.value--
    } else {
        currentIndex.value = galleryItems.value.length - 1
    }
}

const handleKeydown = (e: KeyboardEvent) => {
    if (!isLightboxOpen.value) return
    if (e.key === 'ArrowRight') next()
    if (e.key === 'ArrowLeft') prev()
    if (e.key === 'Escape') closeLightbox()
}

useSeoMeta({
    title: 'Photos - Lanre Segun',
    description: 'A visual collection of moments and captures.'
})
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.6s cubic-bezier(0.2, 1, 0.2, 1);
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.will-change-transform {
    will-change: transform;
}

:root {
    --card-width: 450px;
    --carousel-gap: 3rem;
}

@media (min-width: 1024px) {
    :root {
        --card-width: 30vw;
        --carousel-gap: 4rem;
    }
}
</style>
