<template>
    <div class="min-h-screen bg-background text-foreground selection:bg-blue-500/20">
        <div class="max-w-5xl mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-24 md:pb-40 flex flex-col gap-8 md:gap-12">
            <!-- Back Button -->
            <NuxtLink to="/blog"
                class="w-fit flex items-center gap-2 px-4 py-2 bg-component border border-border rounded-xl text-sm font-bold text-muted-foreground hover:text-foreground hover:border-blue-500/40 transition-all active:scale-95 group">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
                    class="transition-transform group-hover:-translate-x-1">
                    <path d="M19 12H5" />
                    <path d="M12 19l-7-7 7-7" />
                </svg>
                Blog
            </NuxtLink>

            <div v-if="pending" class="flex items-center justify-center py-20">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
            </div>

            <main v-else-if="note" class="flex flex-col gap-8 md:gap-12">
                <script v-if="note" type="application/ld+json" v-text="jsonLd" />
                <!-- Header -->
                <header class="flex flex-col gap-4 md:gap-6">
                    <img v-if="note.cover_image" :src="note.cover_image" :alt="note.title"
                        class="w-full aspect-video object-cover rounded-4xl border border-border shadow-2xl mb-4">

                    <div v-if="note.tags && note.tags.length" class="flex flex-wrap gap-2">
                        <span v-for="tag in note.tags" :key="tag"
                            class="px-3 py-1 bg-blue-500/10 text-blue-500 text-xxs font-black uppercase tracking-widest rounded-full border border-blue-500/20">
                            {{ tag }}
                        </span>
                    </div>

                    <h1
                        class="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-foreground break-words">
                        {{ note.title }}
                    </h1>

                    <p v-if="note.subtitle"
                        class="text-xl md:text-2xl text-muted-foreground font-medium italic leading-relaxed">
                        {{ note.subtitle }}
                    </p>

                    <div class="flex items-center gap-4 text-sm font-medium text-muted-foreground">
                        <time :datetime="note.date" class="flex items-center gap-2">
                            <span class="w-1.5 h-1.5 rounded-full bg-blue-500" />
                            {{ formattedDate }}
                        </time>
                        <span v-if="note.reading_time" class="w-1 h-1 rounded-full bg-border" />
                        <span v-if="note.reading_time" class="uppercase tracking-widest text-xxs font-bold">
                            {{ note.reading_time }}
                        </span>
                    </div>
                </header>

                <!-- Content -->
                <div class="prose dark:prose-invert prose-blue max-w-none prose-headings:font-black prose-headings:tracking-tight prose-p:leading-relaxed prose-p:text-foreground/80"
                    v-html="parsedContent" />
            </main>

            <div v-if="!note && !pending" class="text-center py-20 bg-component rounded-3xl border border-border">
                <p class="text-muted-foreground font-medium">Post not found.</p>
                <NuxtLink to="/blog" class="mt-4 inline-block text-blue-500 font-bold hover:underline">Back to all
                    posts</NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { BlogPost } from '~/composables/useBlog'

const route = useRoute()
const { fetchPostBySlug } = useBlog()

const note = ref<BlogPost | null>(null)
const pending = ref(true)

const noteData = await fetchPostBySlug(route.params.slug as string)
note.value = noteData
pending.value = false

const formattedDate = computed(() => {
    if (!note.value?.date) return ''
    const d = new Date(note.value.date)
    return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    })
})
// No parsing needed if stored as HTML, but fallback for raw markdown
const parsedContent = computed(() => {
    const content = note.value?.content || ''
    if (content.trim().startsWith('<')) return content
    return parseMarkdown(content)
})

const siteUrl = 'https://lanre-segun.co'
const ogImage = computed(() => note.value?.cover_image || 'https://pqmcl2p95v0ptrae.public.blob.vercel-storage.com/public/og-image.png')

const jsonLd = computed(() => {
    if (!note.value) return ''
    return JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: note.value.title,
        description: note.value.excerpt,
        image: note.value.cover_image,
        datePublished: note.value.date,
        dateModified: note.value.date,
        author: { '@type': 'Person', name: 'Lanre Segun', url: siteUrl },
        publisher: { '@type': 'Person', name: 'Lanre Segun' },
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteUrl}/blog/${note.value.slug}` },
        articleBody: note.value.content.replace(/<[^>]+>/g, '').slice(0, 5000)
    })
})

useSeoMeta({
    title: () => note.value ? `${note.value.title} - Lanre Segun` : 'Post Not Found',
    description: () => note.value?.excerpt || 'Detailed view of the blog post.',
    ogTitle: () => note.value?.title,
    ogDescription: () => note.value?.excerpt,
    ogImage: () => ogImage.value,
    ogUrl: () => note.value ? `${siteUrl}/blog/${note.value.slug}` : siteUrl,
    ogType: () => 'article',
    twitterTitle: () => note.value?.title,
    twitterDescription: () => note.value?.excerpt,
    twitterImage: () => ogImage.value,
    twitterCard: 'summary_large_image',
})

useHead({
    link: () => note.value ? [{ rel: 'canonical', href: `${siteUrl}/blog/${note.value.slug}` }] : [],
    meta: () => note.value ? [
        { property: 'article:published_time', content: note.value.date },
        ...(note.value.tags || []).map(tag => ({ property: 'article:tag', content: tag }))
    ] : [],

    bodyAttrs: {
        class: 'bg-background overflow-y-auto h-auto'
    }
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
}

.prose img {
    border-radius: 1.5rem;
    border: 1px solid var(--border);
    margin: 0;
    width: 100%;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.prose figure {
    margin: 4rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

.prose figcaption {
    font-size: 0.875rem;
    color: var(--muted-foreground);
    font-style: italic;
    font-weight: 500;
    text-align: center;
}

.prose section {
    margin-bottom: 4rem;
}

.prose ul {
    margin-bottom: 1.5rem;
    list-style-type: disc;
    padding-left: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.prose li {
    font-size: 1.125rem;
    color: var(--foreground);
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
    color: var(--muted-foreground);
}

.prose table {
    width: 100%;
    margin: 2rem 0;
    border-collapse: collapse;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 1rem;
    overflow: hidden;
    border: 1px solid var(--border);
}

.prose th {
    background: rgba(255, 255, 255, 0.05);
    padding: 1rem;
    font-weight: 800;
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    border-bottom: 2px solid var(--border);
}

.prose td {
    padding: 1rem;
    border-bottom: 1px solid var(--border);
    font-size: 0.95rem;
    color: var(--foreground);
}

.prose pre {
    background: #0d1117;
    padding: 1.5rem;
    border-radius: 1rem;
    border: 1px solid var(--border);
    margin: 2rem 0;
    overflow-x: auto;
    font-size: 0.875rem;
    line-height: 1.6;
}

.prose code {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}

.prose p code {
    background: rgba(59, 130, 246, 0.1);
    color: #60a5fa;
    padding: 0.2rem 0.4rem;
    border-radius: 0.4rem;
    font-size: 0.9em;
}

@media (max-width: 767px) {
    .prose h2 {
        font-size: 1.25rem;
        margin-top: 1.5rem;
        margin-bottom: 1rem;
    }

    .prose h3 {
        font-size: 1.125rem;
        margin-top: 1.25rem;
        margin-bottom: 0.75rem;
    }

    .prose p {
        margin-bottom: 1rem;
        font-size: 1rem;
        line-height: 1.65;
    }

    .prose figure {
        margin: 2rem 0;
    }

    .prose section {
        margin-bottom: 2rem;
    }

    .prose blockquote {
        margin: 1.5rem 0;
        padding-left: 1rem;
    }

    .prose table {
        margin: 1.5rem 0;
    }

    .prose pre {
        margin: 1.5rem 0;
        padding: 1rem;
    }

    .prose li {
        font-size: 1rem;
    }

    .prose ul {
        margin-bottom: 1rem;
    }
}
</style>
