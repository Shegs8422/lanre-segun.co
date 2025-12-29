<template>
    <div class="h-screen w-full bg-background text-foreground overflow-y-auto scroll-smooth scrollbar-none transition-colors duration-300"
        style="scroll-snap-type: y mandatory;">
        <main class="flex flex-col max-w-3xl mx-auto items-center pt-16 pb-12 px-8 gap-12">
            <!-- Header Section -->
            <header class="w-full flex justify-between items-center pb-4 flex-shrink-0 scroll-snap-align-start"
                style="scroll-snap-align: start;">
                <h2 class="text-3xl font-medium tracking-tight">Projects</h2>
            </header>

            <!-- Project List -->
            <div v-for="(project, index) in projects" :key="index" :ref="(el) => projectRefs[index] = el"
                class="project-item flex flex-col gap-6 w-full flex-shrink-0 transition-all duration-700 ease-in-out"
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
                    <h3 class="text-2xl font-semibold tracking-tight">{{ project.title }}</h3>
                    <p class="text-muted-foreground text-lg max-w-xl leading-relaxed">
                        {{ project.description }}
                    </p>
                    <NuxtLink :to="`/projects/${project.slug}`"
                        class="text-primary font-medium flex items-center gap-2 hover:gap-3 transition-all w-fit mt-2">
                        View Project Details
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                        </svg>
                    </NuxtLink>
                </div>
            </div>

            <!-- Footer Spacer -->
            <footer class="h-[20vh] flex-shrink-0"></footer>
        </main>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const { getAllProjects } = useProjects()
const projects = getAllProjects()

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

useHead({
    title: 'Projects - Lanre Segun',
    meta: [
        { name: 'description', content: 'Explore my latest design and development projects.' }
    ]
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
