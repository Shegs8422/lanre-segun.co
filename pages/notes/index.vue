<template>
    <div class="min-h-screen bg-background text-foreground flex flex-col pt-32 pb-20 px-6 sm:px-12 md:px-24">
        <div class="max-w-3xl mx-auto w-full flex flex-col gap-16">

            <!-- Group by Year -->
            <div v-for="year in sortedYears" :key="year" class="flex flex-col gap-8">
                <h2 class="text-xl font-medium text-white/40">{{ year }}</h2>

                <div class="flex flex-col gap-8">
                    <NuxtLink v-for="note in notesByYear[year]" :key="note.id" :to="`/notes/${note.slug}`"
                        class="group flex items-baseline justify-between gap-8 border-b border-border pb-4 hover:border-blue-500/40 transition-colors">
                        <div class="flex flex-col gap-1">
                            <h3 class="text-lg font-bold group-hover:text-blue-500 transition-colors">{{ note.title }}
                            </h3>
                            <span
                                class="text-sm text-muted-foreground hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity -translate-y-2 group-hover:translate-y-0 duration-300 transform">{{
                                    note.excerpt }}</span>
                        </div>
                        <span
                            class="text-xs font-mono font-medium text-muted-foreground whitespace-nowrap uppercase tracking-widest">{{
                            note.month }} {{
                                note.year }}</span>
                    </NuxtLink>
                </div>
            </div>

            <div v-if="years.length === 0" class="text-center text-muted-foreground py-20">
                No notes found.
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
const { fetchNotes, notes } = useNotes()
await fetchNotes()

// Computed properties for grouping
const years = computed(() => {
    const uniqueYears = new Set(notes.value.map(n => n.year))
    return Array.from(uniqueYears).sort((a, b) => Number(b) - Number(a))
})

const sortedYears = computed(() => years.value)

const notesByYear = computed(() => {
    const grouped: Record<string, typeof notes.value> = {}
    years.value.forEach(year => {
        grouped[year] = notes.value.filter(n => n.year === year)
    })
    return grouped
})

useSeoMeta({
    title: 'Notes - Lanre Segun',
    description: 'Thoughts, ideas, and ramblings. A collection of notes on design, engineering, and personal growth.',
    ogTitle: 'Notes - Lanre Segun',
    ogDescription: 'Thoughts, ideas, and ramblings. A collection of notes on design, engineering, and personal growth.',
    ogImage: '/og-image.png',
    ogUrl: 'https://lanre-segun.vercel.app/notes',
    twitterTitle: 'Notes - Lanre Segun',
    twitterDescription: 'Thoughts, ideas, and ramblings. A collection of notes on design, engineering, and personal growth.',
    twitterImage: '/og-image.png',
    twitterCard: 'summary'
})
</script>
