<template>
    <div class="h-screen w-full bg-background text-foreground overflow-y-auto scroll-smooth scrollbar-none transition-colors duration-300"
        style="scroll-snap-type: y mandatory;">
        <main class="flex flex-col max-w-3xl mx-auto items-center pt-16 pb-12 px-8 gap-12">
            <!-- Header Section -->
            <header class="w-full flex flex-col gap-6 items-center pb-4 shrink-0 scroll-snap-align-start"
                style="scroll-snap-align: start;">
                <h1 class="text-3xl font-medium tracking-tight">Projects</h1>

                <!-- Filter Tabs -->
                <div class="flex flex-wrap justify-center gap-2">
                    <button v-for="category in categories" :key="category" @click="setCategory(category)"
                        class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border"
                        :class="activeCategory === category
                            ? 'bg-foreground text-background border-foreground scale-105'
                            : 'bg-transparent text-muted-foreground border-transparent hover:border-border hover:bg-accent hover:text-foreground'">
                        {{ category }}
                    </button>
                </div>
            </header>

            <!-- Project List -->
            <TransitionGroup name="list" tag="div" class="w-full flex flex-col gap-24 items-center">
                <div v-for="(project, index) in filteredProjects" :key="project.slug"
                    :ref="(el) => { if (el) projectRefs[index] = el as HTMLElement }"
                    class="project-item flex flex-col gap-6 w-full shrink-0 transition-all duration-700 ease-in-out"
                    :class="activeProject === index ? 'opacity-100 scale-100' : 'opacity-40 scale-90 grayscale-[0.5]'"
                    style="scroll-snap-align: center; min-height: 80vh; justify-content: center;">
                    <NuxtLink :to="`/projects/${project.slug}`"
                        class="group relative overflow-hidden rounded-2xl shadow-2xl border border-white/10 aspect-video block">
                        <img :src="project.coverImage" :alt="project.title"
                            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                        <div
                            class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                    </NuxtLink>

                    <div class="flex flex-col gap-3 px-2">
                        <div class="flex justify-between items-center">
                            <span class="text-sm font-mono text-blue-500 font-bold uppercase tracking-widest">{{
                                project.year || '2024' }}</span>
                            <div v-if="project.featured"
                                class="px-2 py-0.5 bg-yellow-500/10 text-yellow-500 text-xxs font-bold rounded border border-yellow-500/20 uppercase tracking-tighter">
                                Featured</div>
                        </div>
                        <h3 class="text-4xl font-black tracking-tighter leading-none">{{ project.title }}</h3>
                        <p v-if="project.subtitle" class="text-lg text-blue-400/80 font-medium italic -mt-1">{{
                            project.subtitle }}</p>
                        <div class="text-muted-foreground text-lg max-w-xl leading-relaxed mt-1"
                            v-html="parseMarkdown(project.description)" />
                        <div class="flex flex-wrap gap-2 mt-1">
                            <span v-for="tag in project.tags" :key="tag"
                                class="text-xxs text-muted-foreground uppercase tracking-widest border border-border px-2 py-0.5 rounded">{{
                                    tag }}</span>
                        </div>
                        <NuxtLink :to="`/projects/${project.slug}`"
                            class="text-foreground bg-component border border-border px-6 py-2 rounded-full font-medium flex items-center gap-2 hover:bg-accent transition-all w-fit mt-4 text-sm">
                            View Case Study
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                            </svg>
                        </NuxtLink>
                    </div>
                </div>
            </TransitionGroup>

            <!-- Footer Spacer -->
            <footer class="h-[20vh] shrink-0" />
        </main>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch, nextTick } from 'vue'

const { fetchProjects, projects } = useProjects()
await fetchProjects()

const activeProject = ref(0)
const projectRefs = ref<(HTMLElement | null)[]>([])
const activeCategory = ref('All')

// Compute unique categories from all projects
const categories = computed(() => {
    const tags = new Set<string>()
    projects.value.forEach(p => {
        p.tags?.forEach(t => tags.add(t))
    })
    return ['All', ...Array.from(tags).sort()]
})

// Filter projects based on active category
const filteredProjects = computed(() => {
    if (activeCategory.value === 'All') {
        return projects.value
    }
    return projects.value.filter(p => p.tags?.includes(activeCategory.value))
})

// Update active category
const setCategory = (category: string) => {
    activeCategory.value = category
    activeProject.value = 0 // Reset active focus
}

let observer: IntersectionObserver | null = null

const setupObserver = () => {
    // Disconnect previous observer
    if (observer) observer.disconnect()

    const options = {
        threshold: 0.6,
        rootMargin: '-10% 0px -10% 0px'
    }

    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = projectRefs.value.indexOf(entry.target as HTMLElement)
                if (index !== -1) {
                    activeProject.value = index
                }
            }
        })
    }, options)

    // Observe all current project refs
    projectRefs.value.forEach(ref => {
        if (ref) observer?.observe(ref)
    })
}

// Watch for changes in filtered projects to re-setup observer
watch(filteredProjects, async () => {
    await nextTick() // Wait for DOM update
    setupObserver()
}, { deep: true })

onMounted(() => {
    setupObserver()

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

:deep(.markdown-container strong) {
    font-weight: 800;
    color: white;
}


:deep(.markdown-container em) {
    font-style: italic;
    opacity: 0.9;
}

/* List Transitions */
.list-move,
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateY(30px);
}

.list-leave-active {
    position: absolute;
    width: 60%;
    /* Keep width when leaving absolutely */
}
</style>
