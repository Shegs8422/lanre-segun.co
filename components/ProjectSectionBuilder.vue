<template>
    <div class="flex flex-col gap-6">
        <div v-for="(section, index) in sections" :key="index"
            class="group relative bg-component/10 border border-border/50 rounded-3xl p-8 transition-all hover:border-blue-500/30 shadow-sm overflow-hidden">

            <!-- Controls -->
            <div
                class="absolute right-6 top-6 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all transform translate-y-[-10px] group-hover:translate-y-0 bg-background/80 backdrop-blur-md rounded-xl p-1.5 border border-border shadow-lg z-20">
                <button type="button" @click="move(index, -1)" :disabled="index === 0"
                    class="p-2 hover:bg-muted rounded-lg disabled:opacity-30 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m18 15-6-6-6 6"></path>
                    </svg>
                </button>
                <button type="button" @click="move(index, 1)" :disabled="index === sections.length - 1"
                    class="p-2 hover:bg-muted rounded-lg disabled:opacity-30 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m6 9 6 6 6-6"></path>
                    </svg>
                </button>
                <div class="w-px h-4 bg-border mx-1"></div>
                <button type="button" @click="remove(index)"
                    class="p-2 hover:bg-red-500/10 text-muted-foreground hover:text-red-500 rounded-lg transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 6 6 18M6 6l12 12"></path>
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
                    <div class="md:col-span-5 flex flex-col gap-6">
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

                        <!-- Image Field -->
                        <div v-if="['image-full', 'split-left', 'split-right'].includes(section.layout)"
                            class="flex flex-col gap-2">
                            <label
                                class="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground px-1">Visual
                                Asset</label>
                            <div class="flex flex-col gap-4">
                                <div v-if="section.image"
                                    class="relative aspect-video rounded-xl overflow-hidden border border-border group/preview shadow-inner">
                                    <img :src="section.image"
                                        class="w-full h-full object-cover transition-transform group-hover/preview:scale-105" />
                                    <div
                                        class="absolute inset-0 bg-black/40 opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                                        <button @click="triggerUpload(index)"
                                            class="p-3 bg-white/20 hover:bg-white/40 text-white rounded-full transition-all">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"
                                                stroke-linecap="round" stroke-linejoin="round">
                                                <path
                                                    d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div v-else @click="triggerUpload(index)"
                                    class="aspect-video border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-blue-500/5 hover:border-blue-500/50 transition-all cursor-pointer text-muted-foreground group/upload">
                                    <div
                                        class="p-3 rounded-2xl bg-muted/50 text-muted-foreground group-hover/upload:text-blue-500 group-hover/upload:scale-110 transition-all">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                                            stroke-linecap="round" stroke-linejoin="round">
                                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                            <circle cx="8.5" cy="8.5" r="1.5" />
                                            <polyline points="21 15 16 10 5 21" />
                                        </svg>
                                    </div>
                                    <span class="text-[10px] font-black uppercase tracking-widest">Upload Asset</span>
                                </div>
                                <input v-model="section.image" type="text" placeholder="External URL..."
                                    class="cms-input bg-background/50 border-2 border-border rounded-xl px-4 py-2 text-[10px] font-mono focus:border-blue-500 outline-none">
                            </div>
                            <input type="file" :ref="el => fileInputs[index] = el" class="hidden"
                                @change="e => handleUpload(e, index)" accept="image/*">
                        </div>

                        <!-- Grid Images -->
                        <div v-if="section.layout === 'grid'" class="flex flex-col gap-2">
                            <label
                                class="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground px-1">Grid
                                Images (One per line)</label>
                            <textarea v-model="section.gridInput" @input="updateGrid(index)" rows="4"
                                placeholder="https://..."
                                class="cms-input bg-background/50 border-2 border-border rounded-xl px-4 py-4 text-[10px] font-mono focus:border-blue-500 outline-none resize-none leading-relaxed"></textarea>
                        </div>
                    </div>

                    <!-- Right: Narrative -->
                    <div v-if="section.layout !== 'image-full' && section.layout !== 'grid'"
                        class="md:col-span-7 flex flex-col gap-2">
                        <label
                            class="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground px-1">Narrative
                            Content</label>
                        <textarea v-model="section.content" rows="10" placeholder="Type the story for this step..."
                            class="cms-input grow bg-background/50 border-2 border-border rounded-[2rem] px-6 py-6 text-sm focus:border-blue-500 outline-none resize-none leading-relaxed shadow-inner"></textarea>
                    </div>
                    <div v-else
                        class="md:col-span-7 flex flex-col items-center justify-center bg-muted/20 rounded-[2rem] border border-dashed border-border p-10 text-center opacity-40">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"
                            class="mb-4">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                        </svg>
                        <p class="text-[10px] font-black uppercase tracking-[0.2em]">Visual-First Layout Active</p>
                    </div>
                </div>
            </div>
        </div>

        <button type="button" @click="add"
            class="w-full py-6 border-2 border-dashed border-border/50 rounded-[2.5rem] text-muted-foreground font-black uppercase tracking-[0.2em] text-[11px] hover:border-blue-500 hover:text-blue-500 hover:bg-blue-500/5 transition-all flex items-center justify-center gap-3 group active:scale-[0.98]">
            <div
                class="w-10 h-10 rounded-2xl bg-muted/50 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all transform group-hover:rotate-90">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
            </div>
            Add Story Section
        </button>
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

const triggerUpload = (index: number) => {
    fileInputs.value[index]?.click()
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
    } catch (e) {
        alert('Upload failed')
    }
}

const updateGrid = (index: number) => {
    sections.value[index].images = sections.value[index].gridInput.split('\n').map((s: string) => s.trim()).filter(Boolean)
}
</script>
