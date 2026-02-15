<template>
    <Transition name="fade">
        <div v-if="show" class="fixed inset-0 z-210 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
            <div
                class="relative w-full max-w-4xl max-h-[90vh] bg-background border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in-up">
                <!-- Modal Header -->
                <div class="p-8 border-b border-border flex items-center justify-between shrink-0">
                    <div class="flex items-center gap-4">
                        <div
                            class="w-10 h-10 rounded-xl bg-foreground text-background flex items-center justify-center">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-background"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 4.5H9V8.5H15V4.5Z" ></path> <path d="M4 10.5H9V14.5H15V10.5H20V19.5H4V10.5Z" ></path> </g></svg>
                        </div>
                        <div>
                            <h3 class="text-lg font-black uppercase tracking-mega text-foreground">Unsplash Search
                            </h3>
                            <p class="text-xxs font-bold uppercase tracking-widest text-muted-foreground">
                                High-quality royalty-free images
                            </p>
                        </div>
                    </div>
                    <button
                        class="w-10 h-10 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
                        @click="close">
                        <X :size="20" stroke-width="2.5" />
                    </button>
                </div>

                <!-- Search Bar -->
                <div class="px-8 py-6 bg-muted/20 shrink-0">
                    <div class="relative group">
                        <input v-model="unsplashQuery" type="text"
                            placeholder="Search for anything (e.g. 'minimal architecture', 'technologies')..."
                            class="w-full bg-background border border-border rounded-xl px-12 py-4 focus:outline-none focus:border-blue-500 transition-all font-medium text-foreground text-sm"
                            @keyup.enter="searchUnsplash">
                        <div
                            class="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-blue-500 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
                                stroke-linejoin="round">
                                <circle cx="11" cy="11" r="8"/>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                            </svg>
                        </div>
                        <button class="absolute right-3 top-1/2 -translate-y-1/2 px-4 py-2 bg-foreground text-background text-xxs font-black uppercase tracking-mega rounded-lg hover:bg-blue-600 hover:text-white transition-all active:scale-95 shadow-lg shadow-black/5"
                            @click="searchUnsplash">
                            Search
                        </button>
                    </div>
                </div>

                <!-- Results Area -->
                <div class="p-8 overflow-y-auto grow min-h-[400px]">
                    <div v-if="isSearchingUnsplash"
                        class="h-full flex flex-col items-center justify-center gap-4 opacity-50">
                        <div class="w-8 h-8 rounded-full border-t-2 border-blue-600 animate-spin"/>
                        <p class="text-xxs font-black uppercase tracking-mega">Searching Unsplash...</p>
                    </div>
                    <div v-else-if="unsplashResults.length > 0" class="columns-2 md:columns-3 gap-4">
                        <div v-for="img in unsplashResults" :key="img.id"
                            class="relative group mb-4 break-inside-avoid rounded-xl overflow-hidden cursor-pointer border border-border/50 hover:border-blue-500 transition-all shadow-sm hover:shadow-xl hover:-translate-y-1"
                            @click="selectImage(img)">
                            <img :src="img.urls.small" :alt="img.alt_description" class="w-full object-cover">
                            <div
                                class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                                <p class="text-xxs text-white/70 font-medium line-clamp-1 italic">{{
                                    img.alt_description
                                    || 'View image' }}</p>
                                <div class="h-0.5 w-0 group-hover:w-full bg-blue-500 transition-all duration-500 mt-2"/>
                                <div class="flex items-center justify-between mt-2">
                                    <p class="text-white text-[9px] font-black uppercase tracking-mega">by {{
                                        img.user.name }}</p>
                                    <div
                                        class="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                                        <Check :size="14" stroke-width="3" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else-if="unsplashQuery && !isSearchingUnsplash"
                        class="h-full flex flex-col items-center justify-center gap-2 opacity-30 italic">
                        <p class="text-sm font-medium">No images found for "{{ unsplashQuery }}"</p>
                    </div>
                    <div v-else
                        class="h-full flex flex-col items-center justify-center gap-2 text-muted-foreground opacity-30">
                        <svg viewBox="0 0 32 32" class="w-16 h-16 fill-current mb-4">
                            <path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"/>
                        </svg>
                        <p class="text-sm font-black uppercase tracking-widest">Ready to search</p>
                    </div>
                </div>
            </div>
            
            <!-- Uploading Overlay -->
            <div v-if="isUploadingToBlob"
                class="absolute inset-0 bg-black/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center gap-4">
                <div class="w-12 h-12 rounded-full border-t-2 border-blue-500 animate-spin"/>
                <p class="text-white text-sm font-black uppercase tracking-mega">Optimizing image...</p>
                <p class="text-white/60 text-xs">Uploading to CDN for faster load times</p>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { ImageIcon, X, Check } from 'lucide-vue-next'

const props = defineProps<{
    show: boolean
    initialQuery?: string
}>()

const emit = defineEmits<{
    (e: 'update:show', value: boolean): void
    (e: 'select', image: any): void
}>()

const unsplashQuery = ref('')
const unsplashResults = ref<any[]>([])
const isSearchingUnsplash = ref(false)
const isUploadingToBlob = ref(false)

watch(() => props.show, (newVal) => {
    if (newVal) {
        if (props.initialQuery && !unsplashQuery.value && unsplashResults.value.length === 0) {
            unsplashQuery.value = props.initialQuery
            searchUnsplash()
        }
    }
})

const close = () => {
    emit('update:show', false)
}

const searchUnsplash = async () => {
    if (!unsplashQuery.value.trim()) return
    isSearchingUnsplash.value = true
    try {
        const response: any = await $fetch('/api/unsplash/search', {
            params: { query: unsplashQuery.value }
        })
        unsplashResults.value = response.results || []
    } catch (error) {
        console.error('Unsplash search failed', error)
    } finally {
        isSearchingUnsplash.value = false
    }
}

const selectImage = async (image: any) => {
    try {
        isUploadingToBlob.value = true
        
        // Upload the Unsplash image to Vercel Blob for CDN optimization
        const uploadResponse: any = await $fetch('/api/blob/upload', {
            method: 'POST',
            body: {
                url: image.urls.regular,
                filename: `unsplash-${image.id}.jpg`
            }
        })
        
        // Emit the optimized Blob URL instead of direct Unsplash URL
        const optimizedImage = {
            ...image,
            urls: {
                ...image.urls,
                regular: uploadResponse.url,
                small: uploadResponse.url,
                full: uploadResponse.url
            }
        }
        
        emit('select', optimizedImage)
        emit('update:show', false)
    } catch (error) {
        console.error('Failed to upload image to Blob:', error)
        // Fallback to original Unsplash URL if Blob upload fails
        emit('select', image)
        emit('update:show', false)
    } finally {
        isUploadingToBlob.value = false
    }
}
</script>

<style scoped>
.animate-fade-in-up {
    animation: fadeInUp 0.3s ease-out;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
