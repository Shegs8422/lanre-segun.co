<template>
    <div
        class="min-h-screen bg-background text-foreground flex flex-col pt-16 pb-32 px-6 sm:px-12 md:px-24 transition-colors duration-500">
        <div class="max-w-5xl mx-auto w-full flex flex-col gap-12">
            <PageHeader title="Archive" subtitle="Thoughts, design experiments, and technical notes from my journey." />

            <!-- Title (Optional, following the reference design it usually starts with the first year) -->

            <!-- Group by Year -->
            <div v-for="year in sortedYears" :key="year" class="flex flex-col gap-8">
                <h2 class="text-xl font-bold text-foreground tracking-tight">{{ year }}</h2>

                <div class="flex flex-col gap-2 -mx-4">
                    <NuxtLink v-for="note in notesByYear[year]" :key="note.id" :to="`/blog/${note.slug}`"
                        class="group relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all hover:bg-foreground/5">

                        <!-- Note Title -->
                        <span
                            class="text-[15px] font-medium text-foreground/90 group-hover:text-foreground transition-colors shrink-0">
                            {{ note.title }}
                        </span>

                        <!-- Reading Time (Mini) -->
                        <span v-if="note.reading_time"
                            class="text-xxs font-bold text-blue-500/60 uppercase tracking-widest hidden sm:inline-block">
                            {{ note.reading_time }}
                        </span>

                        <!-- Connector Line -->
                        <div class="grow h-px bg-foreground/10 transition-colors mt-1" />

                        <!-- Date -->
                        <span
                            class="text-[13px] font-medium text-foreground/40 group-hover:text-foreground/60 transition-colors whitespace-nowrap">
                            {{ note.month }} {{ note.year }}
                        </span>

                    </NuxtLink>
                </div>
            </div>

            <div v-if="years.length === 0" class="text-center text-muted-foreground py-20 font-medium">
                No blog posts found.
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
const { fetchPosts, posts: blogPosts } = useBlog()
await fetchPosts()

// Computed properties for grouping
const filteredNotes = computed(() => {
    return blogPosts.value.filter(n => !n.hidden)
})

const years = computed(() => {
    const uniqueYears = new Set(filteredNotes.value.map(n => n.year))
    return Array.from(uniqueYears).sort((a, b) => Number(b) - Number(a))
})

const sortedYears = computed(() => years.value)

const notesByYear = computed(() => {
    const grouped: Record<string, typeof blogPosts.value> = {}
    years.value.forEach(year => {
        grouped[year] = filteredNotes.value.filter(n => n.year === year)
    })
    return grouped
})

useSeoMeta({
    title: 'Blog - Lanre Segun',
    description: 'Thoughts, ideas, and ramblings. A collection of posts on design, engineering, and personal growth.',
    ogTitle: 'Blog - Lanre Segun',
    ogDescription: 'Thoughts, ideas, and ramblings. A collection of posts on design, engineering, and personal growth.',
    ogImage: '/og-image.png',
    ogUrl: 'https://lanre-segun.co/blog',
    twitterTitle: 'Blog - Lanre Segun',
    twitterDescription: 'Thoughts, ideas, and ramblings. A collection of posts on design, engineering, and personal growth.',
    twitterImage: '/og-image.png',
    twitterCard: 'summary'
})
</script>
