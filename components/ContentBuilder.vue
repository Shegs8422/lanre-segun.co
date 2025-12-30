<template>
    <div class="flex flex-col gap-8">
        <!-- Block List -->
        <div v-for="(block, index) in blocks" :key="block.id"
            class="group relative bg-component border border-border rounded-xl p-4 transition-all hover:border-blue-500/30">

            <!-- Block Controls (Top Right) -->
            <div
                class="absolute right-2 top-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur rounded-lg p-1 border border-border shadow-sm">
                <button type="button" @click="moveBlock(index, -1)" :disabled="index === 0"
                    class="p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors">
                    <ArrowUp :size="16" />
                </button>
                <button type="button" @click="moveBlock(index, 1)" :disabled="index === blocks.length - 1"
                    class="p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors">
                    <ArrowDown :size="16" />
                </button>
                <div class="w-px h-3 bg-border mx-0.5"></div>
                <button type="button" @click="removeBlock(index)"
                    class="p-1.5 hover:bg-red-500/10 rounded text-muted-foreground hover:text-red-500 transition-colors"
                    title="Remove Section">
                    <X :size="16" />
                </button>
            </div>

            <!-- Text Block -->
            <div v-if="block.type === 'text'" class="flex flex-col gap-3">
                <label
                    class="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <Type :size="14" />
                    Text Section
                </label>

                <input v-model="block.heading" type="text" placeholder="Section Heading (Optional)"
                    class="w-full bg-transparent text-lg font-bold placeholder:text-muted-foreground/50 border-none outline-none focus:ring-0 p-0 text-foreground"
                    @input="emitUpdate">

                <textarea v-model="block.body" rows="4" placeholder="Type your content here..."
                    class="w-full bg-muted/30 rounded-lg p-3 text-sm leading-relaxed border border-transparent focus:border-border outline-none resize-y transition-colors min-h-[100px]"
                    @input="emitUpdate"></textarea>
            </div>

            <!-- Image Block -->
            <div v-else-if="block.type === 'image'" class="flex flex-col gap-3">
                <label
                    class="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <ImageIcon :size="14" />
                    Image Section
                </label>

                <div v-if="block.url" class="relative rounded-lg overflow-hidden border border-border group/image">
                    <img :src="block.url" class="w-full max-h-[300px] object-cover bg-muted/50" alt="Section Image">
                    <button type="button" @click="block.url = ''; emitUpdate()"
                        class="absolute top-2 right-2 p-2 bg-black/50 text-white rounded-lg opacity-0 group-hover/image:opacity-100 transition-opacity hover:bg-black/70">
                        <Pencil :size="14" />
                    </button>
                </div>

                <div v-else
                    class="border-2 border-dashed border-border rounded-lg p-8 flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-blue-500/50 hover:bg-blue-500/5 transition-all cursor-pointer"
                    @click="triggerImageUpload(index)">
                    <ImagePlus :size="32" class="opacity-50" />
                    <span class="text-xs font-bold uppercase">Upload Image</span>
                    <input type="file" :ref="el => fileInputs[index] = el" class="hidden" accept="image/*"
                        @change="e => handleImageUpload(e, index)">
                </div>
            </div>

        </div>

        <!-- Empty State / Add Buttons -->
        <div class="flex gap-4">
            <button type="button" @click="addBlock('text')"
                class="flex-1 py-4 border-2 border-dashed border-border rounded-xl text-muted-foreground font-bold hover:border-blue-500 hover:text-blue-500 hover:bg-blue-500/5 transition-all flex items-center justify-center gap-2 group">
                <FileText class="group-active:scale-90 transition-transform" :size="20" />
                Add Text
            </button>
            <button type="button" @click="addBlock('image')"
                class="flex-1 py-4 border-2 border-dashed border-border rounded-xl text-muted-foreground font-bold hover:border-blue-500 hover:text-blue-500 hover:bg-blue-500/5 transition-all flex items-center justify-center gap-2 group">
                <ImagePlus class="group-active:scale-90 transition-transform" :size="20" />
                Add Image
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ArrowUp, ArrowDown, X, Type, ImageIcon, Pencil, ImagePlus, FileText } from 'lucide-vue-next'

interface Block {
    id: string
    type: 'text' | 'image'
    heading?: string
    body?: string
    url?: string
}

const props = defineProps<{
    modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])
const supabase = useSupabaseClient()

// Initialize blocks from HTML string (simple parsing) or start empty
const initializeBlocks = (): Block[] => {
    if (!props.modelValue) return []

    return [{
        id: Math.random().toString(36).substr(2, 9),
        type: 'text',
        heading: 'Legacy Content',
        body: props.modelValue
    }]
}

const blocks = ref<Block[]>(initializeBlocks())
const fileInputs = ref<any>({})

const addBlock = (type: 'text' | 'image') => {
    blocks.value.push({
        id: Math.random().toString(36).substr(2, 9),
        type,
        heading: '',
        body: '',
        url: ''
    })
    emitUpdate()
}

const removeBlock = (index: number) => {
    blocks.value.splice(index, 1)
    emitUpdate()
}

const moveBlock = (index: number, direction: number) => {
    const newIndex = index + direction
    if (newIndex >= 0 && newIndex < blocks.value.length) {
        const item = blocks.value.splice(index, 1)[0]
        blocks.value.splice(newIndex, 0, item)
        emitUpdate()
    }
}

const triggerImageUpload = (index: number) => {
    const input = fileInputs.value[index]
    if (input) input.click()
}

const handleImageUpload = async (event: Event, index: number) => {
    const input = event.target as HTMLInputElement
    if (!input.files?.length) return

    const file = input.files[0]
    const fileExt = file.name.split('.').pop()
    const filePath = `uploads/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`

    try {
        const { error: uploadError } = await supabase.storage.from('portfolio').upload(filePath, file)
        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage.from('portfolio').getPublicUrl(filePath)
        blocks.value[index].url = publicUrl
        emitUpdate()
    } catch (e) {
        console.error('Upload failed', e)
        alert('Upload failed')
    }
}

const emitUpdate = () => {
    // Serialize blocks to HTML
    let html = ''

    blocks.value.forEach(block => {
        if (block.type === 'text') {
            html += `<section class="mb-12">`
            if (block.heading) {
                html += `<h2 class="text-2xl font-bold mb-4 text-foreground">${block.heading}</h2>`
            }
            if (block.body) {
                const paragraphs = block.body.split(/\n\s*\n/)
                paragraphs.forEach(p => {
                    if (p.trim()) {
                        if (p.trim().startsWith('<')) {
                            html += p
                        } else {
                            html += `<p class="mb-4 text-lg leading-relaxed opacity-80">${p.trim()}</p>`
                        }
                    }
                })
            }
            html += `</section>`
        } else if (block.type === 'image' && block.url) {
            html += `<figure class="my-12">
                <img src="${block.url}" class="w-full rounded-2xl border border-border shadow-2xl" alt="Section Image" loading="lazy">
            </figure>`
        }
    })

    emit('update:modelValue', html)
}
</script>
