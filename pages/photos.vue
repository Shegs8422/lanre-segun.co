<!-- Custom Gallery Component -->
<template>
    <div class="min-h-screen bg-background pt-16 pb-20 px-6 sm:px-12 md:px-24 transition-colors duration-500">
        <div class="max-w-7xl mx-auto w-full">
            <PageHeader title="Moments" subtitle="Captured fragments of time, perspective, and light." />

            <!-- Grid View -->
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-3">
                <div v-for="(item, index) in galleryItems" :key="item.id"
                    class="aspect-3/4 overflow-hidden rounded-md bg-muted border border-border cursor-pointer group relative"
                    @click="openLightbox(index)">
                    <img :src="item.url" class="w-full h-full object-cover" loading="lazy">
                </div>
            </div>

            <div v-if="galleryItems.length === 0" class="text-center py-40">
                <p class="text-muted-foreground font-medium">Capture the world. Gallery is empty.</p>
            </div>
        </div>

        <!-- Custom Swiper Lightbox -->
        <Transition name="fade">
            <div v-if="isLightboxOpen"
                class="fixed inset-0 z-modal bg-black/98 backdrop-blur-2xl overflow-hidden select-none">

                <!-- Cinematic Vignette Overlay -->
                <div class="absolute inset-0 pointer-events-none bg-radial-vignette opacity-80 z-20"></div>

                <!-- Close Button -->
                <button
                    class="absolute top-6 right-6 md:top-10 md:right-10 z-max w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-2xl border border-white/10 transition-all active:scale-95 shadow-2xl"
                    @click="closeLightbox">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>

                <!-- Swiper Container -->
                <div class="w-full h-full">
                    <Swiper ref="swiperRef"
                        :modules="[SwiperNavigation, SwiperPagination, SwiperKeyboard, SwiperParallax, SwiperEffectCreative]"
                        :slides-per-view="1" :centered-slides="true" :keyboard="{ enabled: true }" :parallax="true"
                        :initial-slide="currentIndex" :effect="'creative'" :creative-effect="{
                            prev: {
                                shadow: true,
                                translate: ['-20%', 0, -1],
                            },
                            next: {
                                translate: ['100%', 0, 0],
                            },
                        }" class="w-full h-full" @swiper="onSwiper" @slideChange="onSlideChange">
                        <SwiperSlide v-for="item in galleryItems" :key="item.id"
                            class="flex items-center justify-center">
                            <div class="relative w-full h-full flex items-center justify-center p-4 md:p-12 lg:p-24">
                                <!-- Lighting Aura -->
                                <div
                                    class="absolute inset-0 bg-white/5 blur-[120px] rounded-full opacity-20 -z-10 animate-pulse-slow">
                                </div>

                                <img :src="item.url"
                                    class="max-w-full max-h-[85vh] md:max-h-[90vh] object-contain rounded-2xl md:rounded-3xl shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-white/10 select-none pointer-events-none"
                                    data-swiper-parallax="-300">

                                <div
                                    class="absolute inset-0 bg-linear-to-b from-white/5 to-transparent rounded-3xl pointer-events-none opacity-50">
                                </div>
                            </div>
                        </SwiperSlide>

                        <!-- Navigation (Desktop Only) -->
                        <div v-if="!isMobile" class="hidden md:block">
                            <button
                                class="swiper-button-prev-custom absolute left-8 top-1/2 -translate-y-1/2 z-max w-16 h-16 flex items-center justify-center bg-white/5 hover:bg-white/15 backdrop-blur-2xl border border-white/10 rounded-full text-white/40 hover:text-white transition-all active:scale-90 shadow-2xl">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path d="m15 18-6-6 6-6" />
                                </svg>
                            </button>
                            <button
                                class="swiper-button-next-custom absolute right-8 top-1/2 -translate-y-1/2 z-max w-16 h-16 flex items-center justify-center bg-white/5 hover:bg-white/15 backdrop-blur-2xl border border-white/10 rounded-full text-white/40 hover:text-white transition-all active:scale-90 shadow-2xl">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path d="m9 18 6-6-6-6" />
                                </svg>
                            </button>
                        </div>
                    </Swiper>
                </div>

                <!-- Immersive Footer -->
                <div
                    class="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-3 z-max pointer-events-none">
                    <p class="text-white/40 text-[10px] font-black uppercase tracking-[0.4em] drop-shadow-lg">
                        IMAGE {{ currentIndex + 1 }} <span class="mx-2 text-white/10">/</span> {{ galleryItems.length }}
                    </p>
                    <div
                        class="flex gap-2 p-1.5 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 shadow-2xl">
                        <div v-for="(_, i) in galleryItems" :key="i"
                            class="h-1 rounded-full transition-all duration-500 cursor-pointer"
                            :class="i === currentIndex ? 'bg-white w-6' : 'bg-white/20 w-1'"></div>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation as SwiperNavigation, Pagination as SwiperPagination, Keyboard as SwiperKeyboard, Parallax as SwiperParallax, EffectCreative as SwiperEffectCreative } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-creative'

const { galleryItems, fetchGallery } = useGallery()
const { isDockVisible } = useLayout()

const isLightboxOpen = ref(false)
const currentIndex = ref(0)
const isMobile = ref(false)
const swiperInstance = ref<any>(null)

const checkMobile = () => {
    if (import.meta.client) {
        isMobile.value = window.innerWidth < 1024
    }
}

const onSwiper = (swiper: any) => {
    swiperInstance.value = swiper
    // Set navigation buttons after Swiper is initialized
    swiper.params.navigation.prevEl = '.swiper-button-prev-custom'
    swiper.params.navigation.nextEl = '.swiper-button-next-custom'
    swiper.navigation.init()
    swiper.navigation.update()

    // If lightbox is already open (e.g., from hash), slide to correct index
    if (isLightboxOpen.value) {
        swiper.slideTo(currentIndex.value, 0) // Slide instantly
    }
}

const onSlideChange = (swiper: any) => {
    currentIndex.value = swiper.activeIndex
}

onMounted(() => {
    fetchGallery()
    checkMobile()
    window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
    document.body.style.overflow = 'auto'
    window.removeEventListener('resize', checkMobile)
})

const openLightbox = (index: number) => {
    currentIndex.value = index
    isLightboxOpen.value = true
    isDockVisible.value = false
    document.body.style.overflow = 'hidden'

    if (swiperInstance.value) {
        swiperInstance.value.slideTo(index, 0) // Slide instantly to the selected image
    }
}

const closeLightbox = () => {
    isLightboxOpen.value = false
    isDockVisible.value = true
    document.body.style.overflow = 'auto'
}

const handleKeydown = (e: KeyboardEvent) => {
    if (!isLightboxOpen.value) return
    if (e.key === 'Escape') closeLightbox()
}

// Watch for keyboard specifically since Swiper module handles arrows but not ESC
onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
})

// Deep link support
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

useSeoMeta({
    title: 'Photos - Lanre Segun',
    description: 'A visual collection of moments and captures.'
})
</script>

<style scoped>
.bg-black\/98 {
    background-color: rgba(0, 0, 0, 0.98);
}

.bg-radial-vignette {
    background: radial-gradient(circle, transparent 30%, rgba(0, 0, 0, 0.9) 100%);
}

.fade-enter-active,
.fade-leave-active {
    transition: all 0.8s cubic-bezier(0.3, 0, 0, 1);
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: scale(1.1);
    background-color: transparent;
}

.animate-pulse-slow {
    animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {

    0%,
    100% {
        opacity: 0.1;
        transform: scale(1);
    }

    50% {
        opacity: 0.3;
        transform: scale(1.1);
    }
}

/* Custom Swiper Styles */
:deep(.swiper-button-prev-custom),
:deep(.swiper-button-next-custom) {
    cursor: pointer;
}

:deep(.swiper-slide) {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
