<template>
    <div
        class="fixed inset-0 bg-background text-foreground overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent z-50">
        <div v-if="project" class="max-w-4xl mx-auto px-6 py-12 md:py-20 flex flex-col gap-12 md:gap-20">

            <!-- Header -->
            <header class="flex flex-col gap-8 animate-fade-in-up">
                <NuxtLink to="/projects"
                    class="w-fit flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m15 18-6-6 6-6" />
                    </svg>
                    Projects
                </NuxtLink>

                <div class="flex flex-col gap-4">
                    <h1 class="text-4xl md:text-5xl font-bold tracking-tight">{{ project.title }}</h1>
                    <p class="text-muted-foreground text-lg">{{ project.date }}</p>
                </div>
            </header>

            <!-- Hero Image -->
            <div
                class="w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl animate-fade-in-up delay-100 bg-white/5">
                <img v-if="project.content.heroImage" :src="project.content.heroImage" :alt="project.title"
                    class="w-full h-full object-cover">
            </div>

            <!-- Main Content -->
            <article class="flex flex-col gap-16 animate-fade-in-up delay-200">
                <!-- Introduction -->
                <div class="flex flex-col items-start gap-8">
                    <p class="text-xl md:text-2xl leading-relaxed font-light text-foreground/90 max-w-3xl">
                        {{ project.content.introduction }}
                    </p>
                </div>

                <!-- Dynamic Sections -->
                <div v-for="(section, idx) in project.content.sections" :key="idx" class="flex flex-col gap-8">
                    <!-- Full Width Image -->
                    <div v-if="section.type === 'image'"
                        class="w-full aspect-video rounded-xl overflow-hidden bg-white/5 relative group">
                        <img :src="section.image" :alt="section.caption || 'Project details'"
                            class="w-full h-full object-cover">
                        <p v-if="section.caption"
                            class="absolute bottom-4 left-4 text-xs font-medium text-white/50 bg-black/50 px-2 py-1 rounded backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                            {{ section.caption }}
                        </p>
                    </div>

                    <!-- Text Content -->
                    <!-- Text Content -->
                    <p v-if="section.type === 'text'" class="text-lg leading-relaxed text-muted-foreground max-w-2xl">
                        {{ section.content }}
                    </p>

                    <!-- Grid Layout -->
                    <div v-if="section.type === 'grid'" class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div v-for="(img, i) in section.images" :key="i"
                            class="rounded-xl overflow-hidden bg-white/5 aspect-[4/3]">
                            <img :src="img" alt="Project detail" class="w-full h-full object-cover">
                        </div>
                    </div>
                </div>

                <!-- Results / Metrics -->
                <div class="mt-8 pt-12 border-t border-white/10">
                    <h3 class="text-2xl font-bold mb-8">Results</h3>

                    <p class="text-lg text-muted-foreground leading-relaxed mb-12 max-w-3xl">
                        {{ project.content.results.description }}
                    </p>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div v-for="(metric, mIdx) in project.content.results.metrics" :key="mIdx"
                            class="p-6 rounded-xl border border-white/10 bg-white/5 flex flex-col gap-2">
                            <span class="text-sm text-muted-foreground font-medium uppercase tracking-wider">{{
                                metric.label }}</span>
                            <span class="text-3xl font-bold text-white">{{ metric.value }}</span>
                        </div>
                    </div>
                </div>
            </article>

            <!-- Footer Navigation -->
            <footer class="flex justify-between items-center py-12 border-t border-white/10 mt-12">
                <NuxtLink v-if="adjacent.prev" :to="`/projects/${adjacent.prev.slug}`"
                    class="flex flex-col gap-1 group text-left">
                    <span
                        class="text-xs text-muted-foreground group-hover:text-primary transition-colors">Previous</span>
                    <span class="text-lg font-medium group-hover:translate-x-1 transition-transform">{{
                        adjacent.prev.title }}</span>
                </NuxtLink>
                <div v-else class="w-1"></div>

                <NuxtLink v-if="adjacent.next" :to="`/projects/${adjacent.next.slug}`"
                    class="flex flex-col gap-1 group text-right items-end">
                    <span class="text-xs text-muted-foreground group-hover:text-primary transition-colors">Next</span>
                    <span class="text-lg font-medium group-hover:-translate-x-1 transition-transform">{{
                        adjacent.next.title }}</span>
                </NuxtLink>
            </footer>

        </div>

        <div v-else class="h-screen flex items-center justify-center">
            <div class="flex flex-col items-center gap-4">
                <p class="text-muted-foreground">Project not found</p>
                <NuxtLink to="/projects" class="text-primary hover:underline">Back to Projects</NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { getProjectBySlug, getAdjacentProjects } = useProjects()

const project = computed(() => getProjectBySlug(route.params.slug as string))
const adjacent = computed(() => getAdjacentProjects(route.params.slug as string))

// SEO
useHead({
    title: computed(() => project.value ? `${project.value.title} - Lanre Segun` : 'Project Not Found'),
    meta: [
        { name: 'description', content: computed(() => project.value?.description || '') }
    ]
})

// Scroll to top on route change within the component
watch(() => route.params.slug, () => {
    if (process.client) {
        window.scrollTo(0, 0)
        const container = document.querySelector('.overflow-y-auto')
        if (container) container.scrollTo(0, 0)
    }
})
</script>

<style scoped>
.animate-fade-in-up {
    animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    opacity: 0;
    transform: translateY(20px);
}

.delay-100 {
    animation-delay: 0.1s;
}

.delay-200 {
    animation-delay: 0.2s;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
