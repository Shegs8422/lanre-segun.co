<template>
    <div class="flex flex-col gap-6">
        <div v-for="(section, index) in sections" :key="index"
            class="group relative bg-component/10 border border-border/50 rounded-3xl p-8 transition-all hover:border-blue-500/30 shadow-sm overflow-hidden">

            <!-- Controls -->
            <div
                class="absolute right-6 top-6 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all transform translate-y-[-10px] group-hover:translate-y-0 bg-background/80 backdrop-blur-md rounded-xl p-1.5 border border-border shadow-lg z-20">
                <button type="button" :disabled="index === 0"
                    class="p-2 hover:bg-muted rounded-lg disabled:opacity-30 transition-colors"
                    @click="move(index, -1)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m18 15-6-6-6 6" />
                    </svg>
                </button>
                <button type="button" :disabled="index === sections.length - 1"
                    class="p-2 hover:bg-muted rounded-lg disabled:opacity-30 transition-colors" @click="move(index, 1)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m6 9 6 6 6-6" />
                    </svg>
                </button>
                <div class="w-px h-4 bg-border mx-1" />
                <button type="button"
                    class="p-2 hover:bg-red-500/10 text-muted-foreground hover:text-red-500 rounded-lg transition-colors"
                    @click="remove(index)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div class="flex flex-col gap-8">
                <!-- Header Info -->
                <div class="flex items-center gap-3 border-b border-border/30 pb-4">
                    <span
                        class="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-black">{{
                            index + 1 }}</span>
                    <input v-model="section.title" type="text" placeholder="Section Title (e.g. Discovery)"
                        class="grow bg-transparent border-none text-lg font-bold placeholder:text-muted-foreground/30 focus:ring-0 p-0 text-foreground">
                </div>

                <div class="grid grid-cols-1 md:grid-cols-12 gap-10">
                    <!-- Left: Configuration -->
                    <div class="md:col-span-12 flex flex-col gap-6">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="flex flex-col gap-2">
                                <label
                                    class="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground px-1">Layout
                                    Strategy</label>
                                <select v-model="section.layout"
                                    class="cms-input bg-background/50 border-2 border-border rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none appearance-none cursor-pointer">
                                    <option value="text-only">Text Only</option>
                                    <option value="image-full">Full Width Image</option>
                                    <option value="split-left">Image Left / Text Right</option>
                                    <option value="split-right">Text Left / Image Right</option>
                                    <option value="grid">Image Grid</option>
                                </select>
                            </div>

                            <!-- Upload Button Wrapper -->
                            <div v-if="section.layout !== 'text-only'" class="flex flex-col gap-2">
                                <label
                                    class="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground px-1">Actions</label>
                                <button v-if="['image-full', 'split-left', 'split-right'].includes(section.layout)"
                                    type="button"
                                    class="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-dashed border-border hover:border-blue-500 hover:bg-blue-500/5 transition-all text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-blue-500"
                                    @click="triggerUpload(index)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"
                                        stroke-linejoin="round">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                                    </svg>
                                    {{ section.image ? 'Change Asset' : 'Upload Asset' }}
                                </button>
                                <button v-else-if="section.layout === 'grid'" type="button"
                                    class="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-dashed border-border hover:border-blue-500 hover:bg-blue-500/5 transition-all text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-blue-500"
                                    @click="triggerGridUpload(index)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"
                                        stroke-linejoin="round">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                                    </svg>
                                    Add Photos to Grid
                                </button>
                                <input :ref="el => fileInputs[index] = el" type="file" class="hidden" accept="image/*"
                                    @change="e => handleUpload(e, index)">
                                <input :ref="el => gridFileInputs[index] = el" type="file" class="hidden"
                                    accept="image/*" multiple @change="e => handleGridUpload(e, index)">
                            </div>
                        </div>

                        <!-- Asset Details (URLs/Inputs) -->
                        <div v-if="section.layout !== 'text-only'" class="flex flex-col gap-4">
                            <input v-if="['image-full', 'split-left', 'split-right'].includes(section.layout)"
                                v-model="section.image" type="text" placeholder="External Asset URL..."
                                class="cms-input bg-background/50 border-2 border-border rounded-xl px-4 py-2 text-[10px] font-mono focus:border-blue-500 outline-none w-full">

                            <textarea v-if="section.layout === 'grid'" v-model="section.gridInput" rows="3"
                                placeholder="Grid Image URLs (one per line)..."
                                class="cms-input bg-background/50 border-2 border-border rounded-xl px-4 py-3 text-[10px] font-mono focus:border-blue-500 outline-none resize-none shadow-inner w-full"
                                @input="updateGrid(index)" />
                        </div>

                        <!-- Thumbnails Row (The 'owe' of thumbnails) -->
                        <div v-if="section.layout !== 'text-only' && (section.image || (section.images && section.images.length > 0))"
                            class="flex flex-wrap gap-4 p-4 bg-muted/20 rounded-2xl border border-border/30">
                            <!-- Single Image Thumbnail -->
                            <div v-if="['image-full', 'split-left', 'split-right'].includes(section.layout) && section.image"
                                class="relative w-28 h-28 rounded-xl overflow-hidden border-2 border-border hover:border-blue-500 transition-all cursor-pointer group/thumb shadow-md"
                                @click="openCarousel([section.image], 0)">
                                <img :src="section.image"
                                    class="w-full h-full object-cover transition-transform group-hover/thumb:scale-110">
                                <div
                                    class="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
                                        stroke-linejoin="round" class="text-white">
                                        <circle cx="11" cy="11" r="8" />
                                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                        <line x1="11" y1="8" x2="11" y2="14" />
                                        <line x1="8" y1="11" x2="14" y2="11" />
                                    </svg>
                                </div>
                            </div>

                            <!-- Grid Images Thumbnails -->
                            <template v-if="section.layout === 'grid'">
                                <div v-for="(img, imgIdx) in section.images" :key="imgIdx"
                                    class="relative w-28 h-28 rounded-xl overflow-hidden border-2 border-border hover:border-blue-500 transition-all cursor-pointer group/thumb shadow-md"
                                    @click="openCarousel(section.images, Number(imgIdx))">
                                    <img :src="img"
                                        class="w-full h-full object-cover transition-transform group-hover/thumb:scale-110">
                                    <div
                                        class="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                                            stroke-linecap="round" stroke-linejoin="round" class="text-white">
                                            <circle cx="11" cy="11" r="8" />
                                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                            <line x1="11" y1="8" x2="11" y2="14" />
                                            <line x1="8" y1="11" x2="14" y2="11" />
                                        </svg>
                                    </div>
                                    <button
                                        class="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-all hover:scale-110 shadow-lg"
                                        @click.stop="removeGridImage(index, Number(imgIdx))">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"
                                            stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M18 6 6 18M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </template>
                        </div>

                        <!-- Narrative Content -->
                        <div class="flex flex-col gap-2">
                            <label
                                class="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground px-1">Narrative
                                Content</label>
                            <textarea v-model="section.content" rows="6" placeholder="Type the story for this step..."
                                class="cms-input bg-background/50 border-2 border-border rounded-2xl px-6 py-5 text-sm focus:border-blue-500 outline-none resize-none leading-relaxed shadow-inner" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <button type="button"
            class="w-full py-8 border-2 border-dashed border-border/50 rounded-[2.5rem] text-muted-foreground font-black uppercase tracking-[0.2em] text-[12px] hover:border-blue-500 hover:text-blue-500 hover:bg-blue-500/5 transition-all flex items-center justify-center gap-4 group active:scale-[0.98]"
            @click="add">
            <div
                class="w-12 h-12 rounded-2xl bg-muted/50 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all transform group-hover:rotate-90">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
            </div>
            Add Story Section
        </button>

        <!-- Carousel Modal -->
        <Teleport to="body">
            <Transition name="carousel">
                <div v-if="carousel.open"
                    class="fixed inset-0 z-max flex items-center justify-center p-6 md:p-20 bg-black/95 backdrop-blur-2xl">
                    <button
                        class="absolute top-8 right-8 p-4 text-white/50 hover:text-white transition-all hover:rotate-90 z-10"
                        @click="carousel.open = false">
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M18 6 6 18M6 6l12 12" />
                        </svg>
                    </button>

                    <div class="relative w-full h-full flex items-center justify-center">
                        <button v-if="carousel.images.length > 1"
                            class="absolute left-0 p-6 bg-white/5 hover:bg-white/10 text-white rounded-full transition-all border border-white/10 backdrop-blur-md z-10"
                            @click="carouselPrev">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path d="m15 18-6-6 6-6" />
                            </svg>
                        </button>

                        <div class="max-w-7xl max-h-full flex flex-col gap-8 items-center">
                            <img :src="carousel.images[carousel.index]"
                                class="max-w-full max-h-[85vh] object-contain rounded-3xl shadow-[0_0_100px_rgba(59,130,246,0.3)] animate-carousel-in">
                            <div v-if="carousel.images.length > 1" class="flex items-center gap-3">
                                <div v-for="(_, i) in carousel.images" :key="i"
                                    class="w-2.5 h-2.5 rounded-full transition-all cursor-pointer"
                                    :class="i === carousel.index ? 'bg-blue-500 w-10 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-white/20 hover:bg-white/40'"
                                    @click="carousel.index = i" />
                            </div>
                        </div>

                        <button v-if="carousel.images.length > 1"
                            class="absolute right-0 p-6 bg-white/5 hover:bg-white/10 text-white rounded-full transition-all border border-white/10 backdrop-blur-md z-10"
                            @click="carouselNext">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        </button>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    modelValue: any[]
}>()

const emit = defineEmits(['update:modelValue'])
const supabase = useSupabaseClient()

const sections = ref(props.modelValue.map((s: any) => ({
    ...s,
    layout: s.layout || (s.type === 'grid' ? 'grid' : s.type === 'image' ? 'image-full' : 'text-only'),
    gridInput: s.images ? s.images.join('\n') : ''
})))

const fileInputs = ref<any>({})
const gridFileInputs = ref<any>({})

watch(sections, (newVal) => {
    emit('update:modelValue', newVal.map(s => {
        const { gridInput, ...rest } = s
        return rest
    }))
}, { deep: true })

const add = () => {
    sections.value.push({
        title: '',
        content: '',
        layout: 'text-only',
        image: '',
        images: []
    })
}

const remove = (index: number) => {
    sections.value.splice(index, 1)
}

const move = (index: number, dir: number) => {
    const newIdx = index + dir
    const item = sections.value.splice(index, 1)[0]
    sections.value.splice(newIdx, 0, item)
}

const carousel = ref({
    open: false,
    images: [] as string[],
    index: 0
})

const openCarousel = (images: string[], index: number) => {
    carousel.value = {
        open: true,
        images,
        index
    }
}

const carouselNext = () => {
    carousel.value.index = (carousel.value.index + 1) % carousel.value.images.length
}

const carouselPrev = () => {
    carousel.value.index = (carousel.value.index - 1 + carousel.value.images.length) % carousel.value.images.length
}

const removeGridImage = (sectionIdx: number, imgIdx: number) => {
    sections.value[sectionIdx].images.splice(imgIdx, 1)
    sections.value[sectionIdx].gridInput = sections.value[sectionIdx].images.join('\n')
}

const triggerUpload = (index: number) => {
    fileInputs.value[index]?.click()
}

const triggerGridUpload = (index: number) => {
    gridFileInputs.value[index]?.click()
}

const handleUpload = async (event: Event, index: number) => {
    const input = event.target as HTMLInputElement
    if (!input.files?.length) return

    const file = input.files[0]
    if (!file) return

    const fileExt = file.name.split('.').pop()
    const filePath = `projects/sections/${Date.now()}.${fileExt}`

    try {
        const { error } = await supabase.storage.from('portfolio').upload(filePath, file)
        if (error) throw error
        const { data: { publicUrl } } = supabase.storage.from('portfolio').getPublicUrl(filePath)
        sections.value[index].image = publicUrl
    } catch {
        alert('Upload failed')
    }
}

const handleGridUpload = async (event: Event, index: number) => {
    const input = event.target as HTMLInputElement
    if (!input.files?.length) return

    const files = Array.from(input.files)
    const uploadPromises = files.map(async (file) => {
        const fileExt = file.name.split('.').pop()
        const filePath = `projects/sections/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`

        try {
            const { error } = await supabase.storage.from('portfolio').upload(filePath, file)
            if (error) throw error
            const { data: { publicUrl } } = supabase.storage.from('portfolio').getPublicUrl(filePath)
            return publicUrl
        } catch (e) {
            console.error('Upload failed for one of the files', e)
            return null
        }
    })

    const urls = (await Promise.all(uploadPromises)).filter(Boolean) as string[]

    if (urls.length) {
        const currentInput = sections.value[index].gridInput.trim()
        const newUrls = urls.join('\n')
        sections.value[index].gridInput = currentInput ? `${currentInput}\n${newUrls}` : newUrls
        updateGrid(index)
    }
}

const updateGrid = (index: number) => {
    sections.value[index].images = sections.value[index].gridInput.split('\n').map((s: string) => s.trim()).filter(Boolean)
}
</script>

<style scoped>
.carousel-enter-active,
.carousel-leave-active {
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.carousel-enter-from,
.carousel-leave-to {
    opacity: 0;
    backdrop-filter: blur(0px);
}

@keyframes carousel-in {
    0% {
        transform: scale(0.9) translateY(40px);
        opacity: 0;
    }

    100% {
        transform: scale(1) translateY(0);
        opacity: 1;
    }
}

.animate-carousel-in {
    animation: carousel-in 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
</style>
