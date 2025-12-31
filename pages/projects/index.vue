<template>
    <div class="h-screen w-full bg-background text-foreground overflow-y-auto scroll-smooth scrollbar-none transition-colors duration-300"
        style="scroll-snap-type: y mandatory;">
        <main class="flex flex-col max-w-3xl mx-auto items-center pt-16 pb-12 px-8 gap-12">
            <!-- Header Section -->
            <header class="w-full flex justify-between items-center pb-4 shrink-0 scroll-snap-align-start"
                style="scroll-snap-align: start;">
                <h2 class="text-3xl font-medium tracking-tight">Projects</h2>
            </header>

            <!-- Project List -->
            <div v-for="(project, index) in projects" :key="index" :ref="(el) => projectRefs[index] = el"
                class="project-item flex flex-col gap-6 w-full shrink-0 transition-all duration-700 ease-in-out"
                :class="activeProject === index ? 'opacity-100 scale-100' : 'opacity-40 scale-90 grayscale-[0.5]'"
                style="scroll-snap-align: center; min-height: 80vh; justify-content: center;">
                <NuxtLink :to="`/projects/${project.slug}`"
                    class="group relative overflow-hidden rounded-2xl shadow-2xl border border-white/10 aspect-video block">
                    <img :src="project.coverImage" :alt="project.title"
                        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                    <div class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500">
                    </div>
                </NuxtLink>

                <div class="flex flex-col gap-3 px-2">
                    <div class="flex justify-between items-center">
                        <span class="text-sm font-mono text-blue-500 font-bold uppercase tracking-widest">{{
                            project.year || '2024' }}</span>
                        <div v-if="project.featured"
                            class="px-2 py-0.5 bg-yellow-500/10 text-yellow-500 text-[10px] font-bold rounded border border-yellow-500/20 uppercase tracking-tighter">
                            Featured</div>
                    </div>
                    <h3 class="text-4xl font-black tracking-tighter leading-none">{{ project.title }}</h3>
                    <p v-if="project.subtitle" class="text-lg text-blue-400/80 font-medium italic -mt-1">{{
                        project.subtitle }}</p>
                    <p class="text-muted-foreground text-lg max-w-xl leading-relaxed mt-1">
                        {{ project.description }}
                    </p>
                    <div class="flex flex-wrap gap-2 mt-1">
                        <span v-for="tag in project.tags" :key="tag"
                            class="text-[10px] text-neutral-500 uppercase tracking-widest border border-neutral-800 px-2 py-0.5 rounded">{{
                                tag }}</span>
                    </div>
                    <NuxtLink :to="`/projects/${project.slug}`"
                        class="text-white bg-white/5 border border-white/10 px-6 py-2 rounded-full font-medium flex items-center gap-2 hover:bg-white/10 transition-all w-fit mt-4 text-sm">
                        View Case Study
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                        </svg>
                    </NuxtLink>
                </div>
            </div>

            <!-- Footer Spacer -->
            <footer class="h-[20vh] shrink-0"></footer>
        </main>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const { fetchProjects, projects } = useProjects()
await fetchProjects()

const activeProject = ref(0)
const projectRefs = ref<any[]>([])

let observer: IntersectionObserver | null = null

onMounted(() => {
    const options = {
        threshold: 0.6, // Fire when 60% of the item is visible
        rootMargin: '-10% 0px -10% 0px' // Focus on the center area
    }

    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = projectRefs.value.indexOf(entry.target)
                if (index !== -1) {
                    activeProject.value = index
                }
            }
        })
    }, options)

    projectRefs.value.forEach(ref => {
        if (ref) observer?.observe(ref)
    })

    // Initial focus on the first project
    if (projectRefs.value[0]) {
        activeProject.value = 0
    }
})

onUnmounted(() => {
    observer?.disconnect()
})

useSeoMeta({
    title: 'Projects - Lanre Segun',
    description: 'Explore my latest design and development projects. Senior Product Designer bridging complex engineering and premium UI.',
    ogTitle: 'Projects - Lanre Segun',
    ogDescription: 'Explore my latest design and development projects. Senior Product Designer bridging complex engineering and premium UI.',
    ogImage: '/og-image.png',
    ogUrl: 'https://lanre-segun.vercel.app/projects',
    twitterTitle: 'Projects - Lanre Segun',
    twitterDescription: 'Explore my latest design and development projects. Senior Product Designer bridging complex engineering and premium UI.',
    twitterImage: '/og-image.png',
    twitterCard: 'summary'
})
</script>

<style scoped>
.scrollbar-none::-webkit-scrollbar {
    display: none;
}

.scrollbar-none {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.project-item {
    will-change: transform, opacity;
}
</style>
