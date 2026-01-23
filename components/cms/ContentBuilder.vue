<template>
    <div class="flex flex-col gap-4 max-w-3xl mx-auto py-12">
        <!-- New Block Inserter (Start) -->
        <div class="relative group/inserter h-8 -mt-4 mb-4 flex items-center justify-center">
            <div
                class="absolute inset-x-0 h-px bg-border/50 opacity-0 group-hover/inserter:opacity-100 transition-opacity" />
            <button type="button"
                class="relative w-8 h-8 rounded-full bg-component border border-border shadow-sm flex items-center justify-center text-muted-foreground hover:text-blue-500 hover:border-blue-500 hover:scale-110 transition-all opacity-0 group-hover/inserter:opacity-100"
                @click="addBlockAt(0)">
                <Plus :size="16" />
            </button>
        </div>

        <!-- Block List -->
        <template v-for="(block, index) in blocks" :key="block.id">
            <div
                class="group relative bg-transparent transition-all border-l-2 border-transparent hover:border-blue-500/20 px-6 py-4">

                <!-- Block Controls (Far Left) -->
                <div
                    class="absolute -left-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button type="button" :disabled="index === 0"
                        class="p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
                        @click="moveBlock(index, -1)">
                        <ArrowUp :size="14" />
                    </button>
                    <button type="button" :disabled="index === blocks.length - 1"
                        class="p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
                        @click="moveBlock(index, 1)">
                        <ArrowDown :size="14" />
                    </button>
                    <button type="button"
                        class="p-1.5 hover:bg-red-500/10 rounded text-muted-foreground hover:text-red-500 transition-colors"
                        title="Remove Section" @click="removeBlock(index)">
                        <X :size="14" />
                    </button>
                </div>

                <!-- Text Block -->
                <div v-if="block.type === 'text'" class="flex flex-col gap-4">
                    <input v-model="block.heading" type="text" placeholder="Section Heading (Optional)"
                        class="w-full bg-transparent text-2xl font-bold placeholder:text-muted-foreground/30 border-none outline-none focus:ring-0 p-0 text-foreground leading-tight"
                        @input="emitUpdate">

                    <textarea v-model="block.body" rows="1" placeholder="Type your content here..."
                        class="w-full bg-transparent text-lg leading-relaxed placeholder:text-muted-foreground/30 border-none outline-none focus:ring-0 p-0 text-foreground/90 resize-none overflow-hidden min-h-[1.5em]"
                        @input="autoResizeTextarea($event); emitUpdate()" @focus="autoResizeTextarea($event)" />
                </div>

                <!-- Image Block -->
                <div v-else-if="block.type === 'image'" class="flex flex-col gap-4">
                    <div v-if="block.url" class="relative group/image">
                        <div class="rounded-xl overflow-hidden border border-border/50 bg-muted/30">
                            <img :src="block.url" class="w-full object-cover" alt="Section Image">
                        </div>
                        <button type="button"
                            class="absolute top-4 right-4 p-2 bg-background/80 backdrop-blur-md text-foreground rounded-full border border-border shadow-lg opacity-0 group-hover/image:opacity-100 transition-opacity hover:bg-blue-500 hover:text-white"
                            @click="block.url = ''; emitUpdate()">
                            <Pencil :size="14" />
                        </button>

                        <!-- Caption Input -->
                        <input v-model="block.caption" type="text" placeholder="Add a caption..."
                            class="w-full text-center text-sm text-muted-foreground mt-4 italic bg-transparent border-none outline-none focus:ring-0 p-0"
                            @input="emitUpdate">
                    </div>

                    <div v-else
                        class="border-2 border-dashed border-border/50 rounded-2xl p-12 flex flex-col items-center justify-center gap-4 text-muted-foreground hover:border-blue-500/50 hover:bg-blue-500/5 transition-all cursor-pointer group/upload"
                        @click="triggerImageUpload(index)">
                        <div
                            class="w-16 h-16 rounded-full bg-muted flex items-center justify-center group-hover/upload:scale-110 transition-transform">
                            <ImagePlus :size="32" class="opacity-50" />
                        </div>
                        <div class="flex flex-col items-center gap-1">
                            <span class="text-sm font-bold text-foreground">Click to upload image</span>
                            <span class="text-xs">Supports JPG, PNG, WebP. Recommended width 1200px+.</span>
                        </div>
                        <input :ref="el => fileInputs[index] = el" type="file" class="hidden" accept="image/*"
                            @change="e => handleImageUpload(e, index)">
                    </div>
                </div>
            </div>

            <!-- Contextual Inserter between blocks -->
            <div class="relative group/inserter h-8 flex items-center justify-center">
                <div
                    class="absolute inset-x-0 h-px bg-border/50 opacity-0 group-hover/inserter:opacity-100 transition-opacity" />
                <button type="button"
                    class="relative w-8 h-8 rounded-full bg-component border border-border shadow-sm flex items-center justify-center text-muted-foreground hover:text-blue-500 hover:border-blue-500 hover:scale-110 transition-all opacity-0 group-hover/inserter:opacity-100"
                    @click="addBlockAt(index + 1)">
                    <Plus :size="16" />
                </button>
            </div>
        </template>

        <!-- Dynamic Insertion Menu (Overlay) -->
        <div v-if="showInserter" :style="{ top: inserterY + 'px' }"
            class="fixed left-1/2 -translate-x-1/2 z-200 bg-component border border-border shadow-2xl rounded-2xl p-2 flex gap-2 animate-in fade-in zoom-in duration-200">
            <button @click="insertBlock('text')"
                class="flex items-center gap-2 px-4 py-2 hover:bg-muted rounded-xl transition-colors text-sm font-bold">
                <FileText :size="16" class="text-blue-500" />
                Text
            </button>
            <button @click="insertBlock('image')"
                class="flex items-center gap-2 px-4 py-2 hover:bg-muted rounded-xl transition-colors text-sm font-bold">
                <ImageIcon :size="16" class="text-emerald-500" />
                Image
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ArrowUp, ArrowDown, X, ImageIcon, Pencil, ImagePlus, FileText, Plus } from 'lucide-vue-next'

interface Block {
    id: string
    type: 'text' | 'image'
    heading?: string
    body?: string
    url?: string
    caption?: string
}

const props = defineProps<{
    modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])
const supabase = useSupabaseClient()

// Inserter State
const showInserter = ref(false)
const inserterY = ref(0)
const insertIndex = ref(0)

const addBlockAt = (index: number) => {
    insertIndex.value = index
    showInserter.value = true
    // We could calculate Y position but fixed center is simpler for now
}

const insertBlock = (type: 'text' | 'image') => {
    const newBlock: Block = {
        id: Math.random().toString(36).substr(2, 9),
        type,
        heading: '',
        body: '',
        url: '',
        caption: ''
    }
    blocks.value.splice(insertIndex.value, 0, newBlock)
    showInserter.value = false
    emitUpdate()
}

// Auto-resize textarea
const autoResizeTextarea = (event: any) => {
    const element = event.target || event
    if (element) {
        element.style.height = 'auto'
        element.style.height = element.scrollHeight + 'px'
    }
}

// Initialize blocks from HTML string
const initializeBlocks = (htmlValue: string): Block[] => {
    if (!htmlValue) return [{ id: 'init', type: 'text', body: '' }]

    const blocksArr: Block[] = []

    // Improved parser (Basic implementation)
    // In a real app we'd use a proper HTML parser library
    const wrapper = document.createElement('div')
    wrapper.innerHTML = htmlValue

    const sections = wrapper.querySelectorAll('section, figure')
    if (sections.length === 0 && htmlValue) {
        // Fallback for raw content
        blocksArr.push({ id: Math.random().toString(36).substr(2, 9), type: 'text', body: htmlValue })
    }

    sections.forEach(el => {
        if (el.tagName === 'SECTION') {
            const h2 = el.querySelector('h2')
            const content = el.innerHTML.replace(/<h2[^>]*>.*?<\/h2>/, '').trim()
            blocksArr.push({
                id: Math.random().toString(36).substr(2, 9),
                type: 'text',
                heading: h2?.innerText || '',
                body: content.replace(/<p[^>]*>(.*?)<\/p>/g, '$1\n\n').replace(/<br\s*\/?>/g, '\n').replace(/<[^>]+>/g, '').trim()
            })
        } else if (el.tagName === 'FIGURE') {
            const img = el.querySelector('img')
            const figcaption = el.querySelector('figcaption')
            if (img) {
                blocksArr.push({
                    id: Math.random().toString(36).substr(2, 9),
                    type: 'image',
                    url: img.getAttribute('src') || '',
                    caption: figcaption?.innerText || ''
                })
            }
        }
    })

    return blocksArr.length > 0 ? blocksArr : [{ id: 'init', type: 'text', body: '' }]
}

const blocks = ref<Block[]>(initializeBlocks(props.modelValue))

watch(() => props.modelValue, (newVal) => {
    if (newVal && newVal !== serializeCurrentBlocks()) {
        blocks.value = initializeBlocks(newVal)
    }
})

const serializeCurrentBlocks = () => {
    let html = ''
    blocks.value.forEach(block => {
        if (block.type === 'text') {
            if (!block.heading && !block.body) return
            html += `<section class="mb-12">`
            if (block.heading) {
                html += `<h2 class="text-3xl font-bold mb-6 text-foreground tracking-tight">${block.heading}</h2>`
            }
            if (block.body) {
                // Convert newlines to paragraphs
                const paragraphs = block.body.split('\n\n').filter(p => p.trim())
                paragraphs.forEach(p => {
                    html += `<p class="text-lg leading-relaxed text-foreground/80 mb-6">${p.trim().replace(/\n/g, '<br>')}</p>`
                })
            }
            html += `</section>`
        } else if (block.type === 'image' && block.url) {
            html += `<figure class="my-16 flex flex-col items-center">
                <img src="${block.url}" class="w-full rounded-2xl border border-border shadow-2xl transition-all" alt="Blog Illustration" loading="lazy">`
            if (block.caption) {
                html += `<figcaption class="mt-4 text-sm text-muted-foreground italic font-medium">${block.caption}</figcaption>`
            }
            html += `</figure>`
        }
    })
    return html
}

const fileInputs = ref<any>({})

const removeBlock = (index: number) => {
    blocks.value.splice(index, 1)
    if (blocks.value.length === 0) {
        addBlockAt(0)
    }
    emitUpdate()
}

const moveBlock = (index: number, direction: number) => {
    const newIndex = index + direction
    if (newIndex >= 0 && newIndex < blocks.value.length) {
        const [removedItem] = blocks.value.splice(index, 1)
        if (removedItem) {
            blocks.value.splice(newIndex, 0, removedItem)
            emitUpdate()
        }
    }
}

const triggerImageUpload = (index: number) => {
    const input = fileInputs.value[index]
    if (input) input.click()
}

const handleImageUpload = async (event: Event, index: number) => {
    const input = event.target as HTMLInputElement
    const file = input.files?.[0]
    if (!file) return
    const fileExt = file.name.split('.').pop()
    const filePath = `uploads/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`

    try {
        const { error: uploadError } = await supabase.storage.from('portfolio').upload(filePath, file)
        if (uploadError) throw uploadError

        const { data } = supabase.storage.from('portfolio').getPublicUrl(filePath)
        if (data?.publicUrl) {
            const block = blocks.value[index]
            if (block) {
                block.url = data.publicUrl
                emitUpdate()
            }
        }
    } catch (e) {
        console.error('Upload failed', e)
    }
}

const emitUpdate = () => {
    emit('update:modelValue', serializeCurrentBlocks())
}

// Close inserter on click outside
if (import.meta.client) {
    window.addEventListener('click', (e: any) => {
        if (showInserter.value && !e.target.closest('.group\\/inserter') && !e.target.closest('.fixed')) {
            showInserter.value = false
        }
    })
}
</script>

<style scoped>
textarea {
    transition: height 0.1s ease-out;
}
</style>
