<template>
    <div class="min-h-screen bg-background text-foreground selection:bg-blue-500/20">
        <div class="max-w-3xl mx-auto px-6 pt-32 pb-40 flex flex-col gap-12">
            <!-- Back Button -->
            <NuxtLink to="/notes"
                class="w-fit flex items-center gap-2 px-4 py-2 bg-component border border-border rounded-xl text-sm font-bold text-muted-foreground hover:text-foreground hover:border-blue-500/40 transition-all active:scale-95 group">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
                    class="transition-transform group-hover:-translate-x-1">
                    <path d="M19 12H5" />
                    <path d="M12 19l-7-7 7-7" />
                </svg>
                Notes
            </NuxtLink>

            <div v-if="pending" class="flex items-center justify-center py-20">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>

            <article v-else-if="note" class="flex flex-col gap-12">
                <!-- Header -->
                <header class="flex flex-col gap-4">
                    <h1 class="text-4xl md:text-5xl font-black tracking-tight leading-[1.1] text-foreground">
                        {{ note.title }}
                    </h1>
                    <time :datetime="note.date"
                        class="text-sm font-medium text-muted-foreground flex items-center gap-2">
                        <span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                        {{ formattedDate }}
                    </time>
                </header>

                <!-- Content -->
                <div class="prose prose-invert prose-blue max-w-none prose-headings:font-black prose-headings:tracking-tight prose-p:leading-relaxed prose-p:text-foreground/80"
                    v-html="parsedContent">
                </div>
            </article>

            <div v-else class="text-center py-20 bg-component rounded-3xl border border-border">
                <p class="text-muted-foreground font-medium">Note not found.</p>
                <NuxtLink to="/notes" class="mt-4 inline-block text-blue-500 font-bold hover:underline">Back to all
                    notes</NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { marked } from 'marked'

const route = useRoute()
const { getNoteBySlug, notes, fetchNotes } = useNotes()

// Fetch if notes are not already in state
if (notes.value.length === 0) {
    await fetchNotes()
}

const note = computed(() => getNoteBySlug(route.params.slug as string))
const pending = ref(false)

const formattedDate = computed(() => {
    if (!note.value?.date) return ''
    const d = new Date(note.value.date)
    return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    })
})

const parsedContent = computed(() => {
    if (!note.value?.content) return ''
    return marked.parse(note.value.content)
})

useSeoMeta({
    title: () => note.value ? `${note.value.title} - Lanre Segun` : 'Note Not Found',
    description: () => note.value?.excerpt || 'Detailed view of the note.',
    ogTitle: () => note.value?.title,
    ogDescription: () => note.value?.excerpt,
})
</script>

<style>
/* Custom prose styles for the detail page using standard CSS to avoid @apply issues */
.prose h2 {
    font-size: 1.5rem;
    font-weight: 800;
    margin-top: 3rem;
    margin-bottom: 1.5rem;
    color: var(--foreground);
}

.prose h3 {
    font-size: 1.25rem;
    font-weight: 800;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: var(--foreground);
}

.prose p {
    margin-bottom: 1.5rem;
    font-size: 1.125rem;
    line-height: 1.75;
    color: var(--foreground);
    opacity: 0.8;
}

.prose img {
    border-radius: 1rem;
    border: 1px solid var(--border);
    margin: 3rem auto;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.prose ul {
    margin-bottom: 1.5rem;
    list-style-type: disc;
    padding-left: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.prose li {
    font-size: 1.125rem;
    color: var(--foreground);
    opacity: 0.8;
}

.prose strong {
    color: var(--foreground);
    font-weight: 900;
}

.prose blockquote {
    border-left: 4px solid #3b82f6;
    padding-left: 1.5rem;
    font-style: italic;
    margin: 2rem 0;
    color: var(--foreground);
    opacity: 0.7;
}
</style>
