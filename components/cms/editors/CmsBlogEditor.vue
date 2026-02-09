<template>
    <div class="flex flex-col gap-8">
        <!-- Main Content Identity Section -->
        <section
            class="flex flex-col gap-10 bg-component/30 p-8 rounded-2xl border border-border/40 shadow-sm relative overflow-hidden group/identity">
            <div class="flex flex-col lg:flex-row gap-10">
                <!-- Core Details Grid -->
                <div class="flex-1 flex flex-col gap-8">
                    <div class="flex items-center gap-4">
                        <div class="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                            </svg>
                        </div>
                        <div>
                            <h3 class="text-xs font-black uppercase tracking-mega text-foreground/80">
                                Blog Identity</h3>
                            <p class="text-xxs text-muted-foreground font-bold uppercase tracking-widest">
                                Base definition and identifiers</p>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="flex flex-col gap-2.5 md:col-span-2">
                            <label
                                class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">Entry
                                Title</label>
                            <input :value="modelValue.title" type="text" placeholder="The Next Great Innovation"
                                class="bg-background border border-border/60 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-all font-bold text-lg"
                                @input="$emit('update:modelValue', { ...modelValue, title: ($event.target as HTMLInputElement).value })">
                        </div>
                        <div class="flex flex-col gap-2.5">
                            <label class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">Slug
                                (URL)</label>
                            <input :value="modelValue.slug" type="text" placeholder="project-name"
                                class="bg-background border border-border/60 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-all font-mono text-sm"
                                @input="$emit('update:modelValue', { ...modelValue, slug: ($event.target as HTMLInputElement).value })">
                        </div>
                        <div class="flex flex-col gap-2.5">
                            <label class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">Read
                                Time</label>
                            <input :value="modelValue.readTime" type="text" placeholder="5 min read"
                                class="bg-background border border-border/60 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-all"
                                @input="$emit('update:modelValue', { ...modelValue, readTime: ($event.target as HTMLInputElement).value })">
                        </div>
                    </div>
                </div>

                <!-- Cover Image Sidecar -->
                <div class="w-full lg:w-72 flex flex-col gap-4">
                    <label class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">Cover
                        Asset</label>
                    <div class="relative aspect-square rounded-2xl border border-border/40 bg-muted/20 overflow-hidden group/cover cursor-pointer hover:border-blue-500/50 transition-all"
                        @click="$emit('open-unsplash', 'coverImage')">
                        <img v-if="modelValue.coverImage" :src="modelValue.coverImage"
                            class="w-full h-full object-cover transition-transform group-hover/cover:scale-105">
                        <div v-else class="w-full h-full flex flex-col items-center justify-center gap-3 opacity-40">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                class="w-8 h-8 fill-foreground/50">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path d="M15 4.5H9V8.5H15V4.5Z"></path>
                                    <path d="M4 10.5H9V14.5H15V10.5H20V19.5H4V10.5Z"></path>
                                </g>
                            </svg>
                            <span class="text-xxs font-bold uppercase tracking-widest">Select
                                Image</span>
                        </div>
                        <div
                            class="absolute inset-0 bg-black/60 opacity-0 group-hover/cover:opacity-100 transition-opacity flex items-center justify-center">
                            <Pencil class="text-white" :size="20" />
                        </div>
                    </div>
                    <input :value="modelValue.coverImage" type="text" placeholder="Image URL..."
                        class="bg-background border border-border/60 rounded-lg px-4 py-2 text-xxs font-mono focus:outline-none focus:border-blue-500"
                        @input="$emit('update:modelValue', { ...modelValue, coverImage: ($event.target as HTMLInputElement).value })">
                </div>
            </div>
        </section>

        <!-- Content Section -->
        <section
            class="flex flex-col gap-10 bg-component/30 p-8 rounded-2xl border border-border/40 shadow-sm relative overflow-hidden group/section">
            <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M11 4H4v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                </div>
                <div class="flex flex-col gap-0.5">
                    <h3 class="text-xs font-black uppercase tracking-mega text-foreground/80">Rich
                        Narrative</h3>
                    <p class="text-xxs text-muted-foreground font-bold uppercase tracking-widest">
                        Storytelling and
                        markdown content</p>
                </div>
            </div>

            <div class="flex flex-col gap-6">
                <div class="flex flex-col gap-2.5">
                    <label class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">Excerpt
                        (Preview)</label>
                    <textarea :value="modelValue.excerpt" rows="2" placeholder="Brief summary of the note..."
                        class="bg-background border border-border/60 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-sm leading-relaxed"
                        @input="$emit('update:modelValue', { ...modelValue, excerpt: ($event.target as HTMLTextAreaElement).value })" />
                </div>

                <div class="flex flex-col gap-3">
                    <div class="flex justify-between items-center px-1">
                        <label class="text-xxs font-black uppercase tracking-widest text-muted-foreground">Body
                            Text</label>
                        <div class="flex items-center gap-4">
                            <GeminiButton
                                @click="$emit('open-ai', { field: 'content', suggestion: 'Draft a professional and detailed post about this topic' })" />
                            <button type="button"
                                class="text-xxs font-black text-blue-500 uppercase tracking-widest hover:text-blue-400 flex items-center gap-1.5 transition-colors"
                                @click="$emit('open-unsplash', 'noteContent')">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                    class="w-3 h-3 fill-current">
                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path d="M15 4.5H9V8.5H15V4.5Z"></path>
                                        <path d="M4 10.5H9V14.5H15V10.5H20V19.5H4V10.5Z"></path>
                                    </g>
                                </svg>
                                Unsplash
                            </button>
                        </div>
                    </div>
                    <div class="min-h-[400px]">
                        <ContentBuilder :model-value="modelValue.content"
                            @update:model-value="$emit('update:modelValue', { ...modelValue, content: $event })" />
                    </div>
                </div>
            </div>
        </section>

        <!-- Section 4: Metadata & Visibility -->
        <section class="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-component/10 border border-border/20 rounded-2xl">
            <div class="flex flex-col gap-3">
                <label class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">Tags
                    (Visibility)</label>
                <div
                    class="flex flex-wrap items-center gap-2 bg-background/50 border border-border/40 rounded-lg p-2 focus-within:border-blue-500 transition-all">
                    <span v-for="(tag, i) in modelValue.tags" :key="i"
                        class="flex items-center gap-1.5 px-2.5 py-1 bg-blue-500/10 text-blue-500 text-xs font-bold rounded-md border border-blue-500/20 group/tag">
                        {{ tag }}
                        <button type="button" class="opacity-40 hover:opacity-100 transition-opacity"
                            @click="removeTag(Number(i))">
                            <X :size="12" stroke-width="3" />
                        </button>
                    </span>
                    <input v-model="pendingTag" type="text" placeholder="Design, Engineering..."
                        class="flex-1 min-w-[120px] bg-transparent border-none outline-none focus:ring-0 text-sm p-1"
                        @keydown.enter.prevent="addTag" @keydown.,.prevent="addTag" @blur="addTag">
                </div>
            </div>
            <div class="flex items-center gap-10">
                <label class="flex items-center gap-3 cursor-pointer group">
                    <input :checked="modelValue.featured" type="checkbox" class="sr-only peer"
                        @change="$emit('update:modelValue', { ...modelValue, featured: ($event.target as HTMLInputElement).checked })">
                    <div class="w-8 h-4 bg-border rounded-full relative transition-colors peer-checked:bg-blue-600">
                        <div
                            class="absolute left-1 top-1 w-2 h-2 bg-white rounded-full transition-transform peer-checked:translate-x-4" />
                    </div>
                    <span
                        class="text-xxs font-black uppercase tracking-widest text-muted-foreground group-hover:text-foreground">Featured</span>
                </label>
                <label class="flex items-center gap-3 cursor-pointer group">
                    <input :checked="modelValue.hidden" type="checkbox" class="sr-only peer"
                        @change="$emit('update:modelValue', { ...modelValue, hidden: ($event.target as HTMLInputElement).checked })">
                    <div class="w-8 h-4 bg-border rounded-full relative transition-colors peer-checked:bg-red-500">
                        <div
                            class="absolute left-1 top-1 w-2 h-2 bg-white rounded-full transition-transform peer-checked:translate-x-4" />
                    </div>
                    <span
                        class="text-xxs font-black uppercase tracking-widest text-muted-foreground group-hover:text-foreground">Archive</span>
                </label>
            </div>
        </section>

        <!-- Sticky Action Bar -->
        <div
            class="sticky bottom-0 z-10 flex items-center justify-between p-4 bg-background/80 backdrop-blur-md border-t border-border/60 -mx-8 -mb-8 mt-8 rounded-b-2xl">
            <button type="button"
                class="px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                @click="$emit('cancel')">
                Cancel
            </button>
            <button type="button" :disabled="isUploading"
                class="px-8 py-2.5 rounded-xl bg-foreground text-background font-black text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-lg shadow-black/5 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                @click="$emit('save')">
                <span v-if="isUploading"
                    class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {{ isUploading ? "Saving..." : "Save Changes" }}
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ImageIcon, Pencil, X } from 'lucide-vue-next'
import GeminiButton from '@/components/cms/GeminiButton.vue'

const props = defineProps<{
    modelValue: any
    isUploading?: boolean
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: any): void
    (e: 'open-ai', payload: { field: string, suggestion: string, mode?: 'text' | 'sections' }): void
    (e: 'open-unsplash', target: string): void
    (e: 'save' | 'cancel'): void
}>()

const pendingTag = ref('')

const addTag = () => {
    const val = pendingTag.value.trim().replace(/,$/, '')
    if (!val) return

    const currentTags = [...(props.modelValue.tags || [])]
    if (!currentTags.includes(val)) {
        currentTags.push(val)
        emit('update:modelValue', { ...props.modelValue, tags: currentTags })
    }
    pendingTag.value = ''
}

const removeTag = (index: number) => {
    const currentTags = [...(props.modelValue.tags || [])]
    currentTags.splice(index, 1)
    emit('update:modelValue', { ...props.modelValue, tags: currentTags })
}

</script>
