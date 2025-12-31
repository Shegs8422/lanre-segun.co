<template>
    <div class="flex flex-col gap-8">
        <div v-for="(section, index) in sections" :key="index"
            class="group relative bg-component/50 border border-border rounded-2xl p-6 transition-all hover:border-blue-500/30">

            <!-- Controls -->
            <div
                class="absolute right-4 top-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur rounded-lg p-1 border border-border">
                <button type="button" @click="move(index, -1)" :disabled="index === 0"
                    class="p-1.5 hover:bg-muted rounded disabled:opacity-30">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m18 15-6-6-6 6"></path>
                    </svg>
                </button>
                <button type="button" @click="move(index, 1)" :disabled="index === sections.length - 1"
                    class="p-1.5 hover:bg-muted rounded disabled:opacity-30">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m6 9 6 6 6-6"></path>
                    </svg>
                </button>
                <button type="button" @click="remove(index)"
                    class="p-1.5 hover:bg-red-500/10 text-muted-foreground hover:text-red-500 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 6 6 18M6 6l12 12"></path>
                    </svg>
                </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
                <!-- Data Fields -->
                <div class="md:col-span-12 flex flex-col gap-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="flex flex-col gap-1.5">
                            <label
                                class="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-1">Section
                                Title</label>
                            <input v-model="section.title" type="text" placeholder="e.g. User Research"
                                class="bg-background border border-border rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none">
                        </div>
                        <div class="flex flex-col gap-1.5">
                            <label
                                class="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-1">Layout
                                Type</label>
                            <select v-model="section.layout"
                                class="bg-background border border-border rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none">
                                <option value="text-only">Text Only</option>
                                <option value="image-full">Full Width Image</option>
                                <option value="split-left">Image Left / Text Right</option>
                                <option value="split-right">Text Left / Image Right</option>
                                <option value="grid">Image Grid</option>
                            </select>
                        </div>
                    </div>

                    <div v-if="section.layout !== 'image-full' && section.layout !== 'grid'"
                        class="flex flex-col gap-1.5">
                        <label
                            class="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-1">Content /
                            Description</label>
                        <textarea v-model="section.content" rows="3"
                            class="bg-background border border-border rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none resize-none"></textarea>
                    </div>

                    <!-- Single Image Upload -->
                    <div v-if="['image-full', 'split-left', 'split-right'].includes(section.layout)"
                        class="flex flex-col gap-1.5">
                        <label
                            class="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-1">Section
                            Image</label>
                        <div class="flex gap-2">
                            <input v-model="section.image" type="text" placeholder="https://..."
                                class="grow bg-background border border-border rounded-lg px-3 py-2 text-xs font-mono focus:border-blue-500 outline-none">
                            <button type="button" @click="triggerUpload(index)"
                                class="shrink-0 px-3 py-2 bg-blue-500/10 text-blue-500 rounded-lg hover:bg-blue-500/20 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                                </svg>
                            </button>
                        </div>
                        <input type="file" :ref="el => fileInputs[index] = el" class="hidden"
                            @change="e => handleUpload(e, index)" accept="image/*">
                    </div>

                    <!-- Grid Images -->
                    <div v-if="section.layout === 'grid'" class="flex flex-col gap-1.5">
                        <label class="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-1">Grid
                            Images (One per line)</label>
                        <textarea v-model="section.gridInput" @input="updateGrid(index)" rows="3"
                            class="bg-background border border-border rounded-lg px-3 py-2 text-xs font-mono focus:border-blue-500 outline-none"></textarea>
                    </div>
                </div>
            </div>
        </div>

        <button type="button" @click="add"
            class="w-full py-4 border-2 border-dashed border-border rounded-2xl text-muted-foreground font-bold hover:border-blue-500 hover:text-blue-500 hover:bg-blue-500/5 transition-all flex items-center justify-center gap-2 group">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="group-active:scale-90 transition-transform">
                <path d="M5 12h14m-7-7v14" />
            </svg>
            Add Process Section
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
    sections.value[index].images = sections.value[index].gridInput.split('\n').map(s => s.trim()).filter(Boolean)
}
</script>
