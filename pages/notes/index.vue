<template>
    <div
        class="min-h-screen bg-background text-foreground flex flex-col pt-32 pb-32 px-6 sm:px-12 md:px-24 transition-colors duration-500">
        <div class="max-w-xl mx-auto w-full flex flex-col gap-12">

            <!-- Title (Optional, following the reference design it usually starts with the first year) -->

            <!-- Group by Year -->
            <div v-for="year in sortedYears" :key="year" class="flex flex-col gap-8">
                <h2 class="text-xl font-bold text-foreground tracking-tight">{{ year }}</h2>

                <div class="flex flex-col gap-2 -mx-4">
                    <NuxtLink v-for="note in notesByYear[year]" :key="note.id" :to="`/notes/${note.slug}`"
                        class="group relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all hover:bg-foreground/5">

                        <!-- Note Title -->
                        <span
                            class="text-[15px] font-medium text-foreground/90 group-hover:text-foreground transition-colors shrink-0">
                            {{ note.title }}
                        </span>

                        <!-- Connector Line -->
                        <div class="grow h-px bg-foreground/10 transition-colors mt-1"></div>

                        <!-- Date -->
                        <span
                            class="text-[13px] font-medium text-foreground/40 group-hover:text-foreground/60 transition-colors whitespace-nowrap">
                            {{ note.month }} {{ note.year }}
                        </span>

                    </NuxtLink>
                </div>
            </div>

            <div v-if="years.length === 0" class="text-center text-muted-foreground py-20 font-medium">
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
