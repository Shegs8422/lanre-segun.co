<template>
    <div
        class="fixed inset-0 bg-background text-foreground overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent z-50">
        <div v-if="project" class="max-w-5xl mx-auto px-6 py-12 md:py-24 flex flex-col gap-24">

            <!-- Header Section -->
            <header class="flex flex-col gap-10 animate-fade-in-up">
                <div class="flex items-center justify-between">
                    <NuxtLink to="/projects"
                        class="w-fit flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                        Back to Projects
                    </NuxtLink>

                    <button v-if="project.projectLink" @click="handleProjectLink"
                        class="w-fit flex items-center gap-2 px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-500 transition-colors text-sm font-bold text-white shadow-lg shadow-blue-500/20">
                        {{ project.isFigma ? 'View Prototype' : 'See Live Project' }}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                    </button>
                </div>

                <div class="flex flex-col gap-6">
                    <div class="flex flex-wrap gap-2">
                        <span v-for="tag in project.tags" :key="tag"
                            class="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-medium rounded-full border border-blue-500/20 uppercase tracking-widest">{{
                                tag }}</span>
                    </div>
                    <h1 class="text-5xl md:text-7xl font-bold tracking-tighter leading-tight">{{ project.title }}</h1>
                    <p class="text-muted-foreground text-xl md:text-2xl font-light max-w-2xl leading-relaxed">{{
                        project.subtitle || project.description }}</p>
                </div>

                <!-- Snapshot Meta Grid -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-white/10 mt-4">
                    <div class="flex flex-col gap-1">
                        <span
                            class="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Client</span>
                        <span class="text-sm font-medium">{{ project.client || 'N/A' }}</span>
                    </div>
                    <div class="flex flex-col gap-1">
                        <span class="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Role</span>
                        <span class="text-sm font-medium">{{ project.role || 'N/A' }}</span>
                    </div>
                    <div class="flex flex-col gap-1">
                        <span
                            class="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Industry</span>
                        <span class="text-sm font-medium">{{ project.industry || 'N/A' }}</span>
                    </div>
                    <div class="flex flex-col gap-1">
                        <span
                            class="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Duration</span>
                        <span class="text-sm font-medium">{{ project.duration || 'N/A' }}</span>
                    </div>
                </div>
            </header>

            <!-- Hero Image -->
            <div
                class="w-full aspect-video rounded-3xl overflow-hidden shadow-2xl animate-fade-in-up delay-100 bg-white/5 relative group">
                <img v-if="project.coverImage || project.content.heroImage"
                    :src="project.coverImage || project.content.heroImage" :alt="project.title"
                    class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105">
                <div class="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
            </div>

            <!-- Problem & Goals -->
            <section class="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 animate-fade-in-up delay-200">
                <div class="md:col-span-4 flex flex-col gap-4">
                    <h3 class="text-xs font-bold text-blue-500 uppercase tracking-widest">01. Context</h3>
                    <h2 class="text-3xl font-bold tracking-tight">The Challenge</h2>
                </div>
                <div class="md:col-span-8 flex flex-col gap-12">
                    <p
                        class="text-xl leading-relaxed text-foreground/90 font-light italic border-l-2 border-blue-500 pl-8 py-2">
                        "{{ project.problemStatement || project.description }}"
                    </p>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div class="flex flex-col gap-4">
                            <h4 class="text-sm font-bold uppercase tracking-widest opacity-40">Business Goal</h4>
                            <p class="text-muted-foreground leading-relaxed">{{ project.businessGoal || `Defining key
                                business objectives for the project revival.` }}</p>
                        </div>
                        <div class="flex flex-col gap-4">
                            <h4 class="text-sm font-bold uppercase tracking-widest opacity-40">User Goal</h4>
                            <p class="text-muted-foreground leading-relaxed">{{ project.userGoal || `Prioritizing user
                                needs and friction-less experiences.` }}</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Process & Approach -->
            <section class="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 animate-fade-in-up">
                <div class="md:col-span-4 flex flex-col gap-4">
                    <h3 class="text-xs font-bold text-blue-500 uppercase tracking-widest">02. Execution</h3>
                    <h2 class="text-3xl font-bold tracking-tight">Design Approach</h2>
                </div>
                <div class="md:col-span-8 flex flex-col gap-12">
                    <p class="text-lg leading-relaxed text-muted-foreground">{{ project.designApproach ||
                        project.content.introduction }}</p>

                    <div
                        class="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white/5 p-8 rounded-2xl border border-white/10">
                        <div class="flex flex-col gap-4">
                            <h4 class="text-sm font-bold uppercase tracking-widest opacity-40">Methods</h4>
                            <p class="text-muted-foreground leading-relaxed">{{ project.researchMethods || `User
                                Research, Audits, Benchmarking.` }}</p>
                        </div>
                        <div class="flex flex-col gap-4">
                            <h4 class="text-sm font-bold uppercase tracking-widest opacity-40">Key Insights</h4>
                            <p class="text-muted-foreground leading-relaxed">{{ project.keyInsights || `Identifying core
                                pain points in existing workflows.` }}</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Wireframes Gallery -->
            <section v-if="project.wireframes?.length" class="flex flex-col gap-10 animate-fade-in-up">
                <div class="flex flex-col gap-4">
                    <h3 class="text-xs font-bold text-blue-500 uppercase tracking-widest">03. Iteration</h3>
                    <h2 class="text-3xl font-bold tracking-tight">Wireframes & Workflows</h2>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div v-for="(img, i) in project.wireframes" :key="i"
                        class="rounded-2xl overflow-hidden bg-white/5 aspect-16/10 border border-white/5">
                        <img :src="img" class="w-full h-full object-cover">
                    </div>
                </div>
            </section>

            <!-- Final Designs Gallery -->
            <section v-if="project.finalDesigns?.length" class="flex flex-col gap-10 animate-fade-in-up">
                <div class="flex flex-col gap-4">
                    <h3 class="text-xs font-bold text-blue-500 uppercase tracking-widest">04. Visual System</h3>
                    <h2 class="text-3xl font-bold tracking-tight">The Final Solution</h2>
                </div>
                <div class="flex flex-col gap-12">
                    <div v-for="(img, i) in project.finalDesigns" :key="i"
                        class="rounded-3xl overflow-hidden bg-white/5 border border-white/10">
                        <img :src="img" class="w-full h-full object-cover">
                    </div>
                </div>
            </section>

            <!-- Dynamic Process Sections -->
            <div v-if="project.content.sections?.length" class="flex flex-col gap-32 py-20 border-y border-white/5">
                <div v-for="(section, idx) in project.content.sections" :key="idx"
                    class="flex flex-col gap-10 animate-fade-in-up">

                    <!-- Section Header -->
                    <div v-if="section.title" class="flex flex-col gap-4">
                        <h3 class="text-xs font-bold text-blue-500 uppercase tracking-widest">Process Stage</h3>
                        <h2 class="text-3xl font-bold tracking-tight">{{ section.title }}</h2>
                    </div>

                    <!-- Layout: Text Only -->
                    <div v-if="section.layout === 'text-only' || !section.layout" class="max-w-3xl">
                        <p class="text-lg leading-relaxed text-muted-foreground">{{ section.content }}</p>
                    </div>

                    <!-- Layout: Full Width Image -->
                    <div v-else-if="section.layout === 'image-full' || section.type === 'image'"
                        class="w-full flex flex-col gap-8">
                        <p v-if="section.content" class="text-lg leading-relaxed text-muted-foreground max-w-3xl mb-4">
                            {{ section.content }}</p>
                        <div
                            class="w-full aspect-video rounded-3xl overflow-hidden bg-white/5 border border-white/10 group">
                            <img :src="section.image || section.url"
                                class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105">
                        </div>
                    </div>

                    <!-- Layout: Split Left (Image Left, Text Right) -->
                    <div v-else-if="section.layout === 'split-left'"
                        class="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                        <div
                            class="md:col-span-7 aspect-video rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                            <img :src="section.image" class="w-full h-full object-cover">
                        </div>
                        <div class="md:col-span-5 flex flex-col gap-6">
                            <p class="text-lg leading-relaxed text-muted-foreground">{{ section.content }}</p>
                        </div>
                    </div>

                    <!-- Layout: Split Right (Text Left, Image Right) -->
                    <div v-else-if="section.layout === 'split-right'"
                        class="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                        <div class="md:col-span-5 flex flex-col gap-6 order-2 md:order-1">
                            <p class="text-lg leading-relaxed text-muted-foreground">{{ section.content }}</p>
                        </div>
                        <div
                            class="md:col-span-7 aspect-video rounded-2xl overflow-hidden bg-white/5 border border-white/10 order-1 md:order-2">
                            <img :src="section.image" class="w-full h-full object-cover">
                        </div>
                    </div>

                    <!-- Layout: Grid -->
                    <div v-else-if="section.layout === 'grid' || section.type === 'grid'" class="flex flex-col gap-8">
                        <p v-if="section.content" class="text-lg leading-relaxed text-muted-foreground max-w-3xl">{{
                            section.content }}</p>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div v-for="(img, i) in (section.images || [])" :key="i"
                                class="rounded-2xl overflow-hidden bg-white/5 aspect-4/3 border border-white/5 group">
                                <img :src="img"
                                    class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <!-- Outcomes & Tools -->
            <section class="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 animate-fade-in-up">
                <div class="md:col-span-4 flex flex-col gap-4">
                    <h3 class="text-xs font-bold text-blue-500 uppercase tracking-widest">05. Conclusion</h3>
                    <h2 class="text-3xl font-bold tracking-tight">The Impact</h2>
                </div>
                <div class="md:col-span-8 flex flex-col gap-12">
                    <p class="text-lg leading-relaxed text-muted-foreground">{{ project.outcome ||
                        project.content.results.description }}</p>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div class="flex flex-col gap-4">
                            <h4 class="text-sm font-bold uppercase tracking-widest opacity-40">Learnings</h4>
                            <p class="text-muted-foreground leading-relaxed">{{ project.learnings || `Iterative testing
                                is key to solving complex UX problems.` }}</p>
                        </div>
                        <div class="flex flex-col gap-4">
                            <h4 class="text-sm font-bold uppercase tracking-widest opacity-40">Tools Used</h4>
                            <div class="flex flex-wrap gap-2">
                                <span v-for="tool in project.tools" :key="tool"
                                    class="px-3 py-1 bg-white/5 rounded-md text-xs font-mono text-muted-foreground border border-white/5">{{
                                        tool }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Metadata Metrics (Legacy Support) -->
            <div v-if="project.content.results.metrics?.length"
                class="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up">
                <div v-for="(metric, mIdx) in project.content.results.metrics" :key="mIdx"
                    class="p-8 rounded-2xl border border-white/10 bg-white/5 flex flex-col gap-2 group hover:bg-white/10 transition-colors">
                    <span
                        class="text-xs text-muted-foreground font-bold uppercase tracking-widest group-hover:text-blue-400 transition-colors">{{
                            metric.label }}</span>
                    <span class="text-4xl font-bold text-white">{{ metric.value }}</span>
                </div>
            </div>

            <!-- Footer Navigation -->
            <footer class="flex justify-between items-center py-12 border-t border-white/10 mt-12">
                <NuxtLink v-if="adjacent.prev" :to="`/projects/${adjacent.prev.slug}`"
                    class="flex flex-col gap-1 group text-left max-w-[40%]">
                    <span
                        class="text-xs text-muted-foreground group-hover:text-primary transition-colors uppercase tracking-widest font-bold">Previous
                        Project</span>
                    <span class="text-xl font-bold group-hover:-translate-x-2 transition-transform truncate">{{
                        adjacent.prev.title }}</span>
                </NuxtLink>
                <div v-else class="w-1"></div>

                <NuxtLink v-if="adjacent.next" :to="`/projects/${adjacent.next.slug}`"
                    class="flex flex-col gap-1 group text-right items-end max-w-[40%]">
                    <span
                        class="text-xs text-muted-foreground group-hover:text-primary transition-colors uppercase tracking-widest font-bold">Next
                        Project</span>
                    <span class="text-xl font-bold group-hover:translate-x-2 transition-transform truncate">{{
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

    <!-- Figma Prototype Modal -->
    <Transition name="fade">
        <div v-if="showPrototype && project?.projectLink"
            class="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-12">
            <div class="absolute inset-0 bg-black/90 backdrop-blur-xl" @click="showPrototype = false"></div>

            <div
                class="relative w-full h-full max-w-7xl bg-[#1e1e1e] rounded-3xl overflow-hidden border border-white/10 flex flex-col shadow-2xl animate-modal-in">
                <!-- Modal Header -->
                <div class="flex items-center justify-between p-6 border-b border-white/5 order-last md:order-first">
                    <div class="flex flex-col">
                        <h3 class="text-lg font-bold">{{ project.title }} Prototype</h3>
                        <p class="text-xs text-muted-foreground">Interactive Figma Preview</p>
                    </div>
                    <button @click="showPrototype = false" class="p-3 hover:bg-white/5 rounded-full transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                <!-- Iframe Container -->
                <div class="flex-1 w-full relative bg-black">
                    <iframe :src="project.projectLink" class="absolute inset-0 w-full h-full border-0"
                        allowfullscreen></iframe>
                </div>

                <!-- Mobile Close (Extra) -->
                <button @click="showPrototype = false"
                    class="md:hidden absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-white z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
const route = useRoute()
const { getProjectBySlug, getAdjacentProjects, fetchProjects } = useProjects()
await fetchProjects()

const project = computed(() => getProjectBySlug(route.params.slug as string))
const adjacent = computed(() => getAdjacentProjects(route.params.slug as string))

const showPrototype = ref(false)

const handleProjectLink = () => {
    if (!project.value?.projectLink) return

    if (project.value.isFigma) {
        showPrototype.value = true
    } else {
        window.open(project.value.projectLink, '_blank')
    }
}

// SEO
useSeoMeta({
    title: () => project.value ? `${project.value.title} - Lanre Segun` : 'Project Not Found',
    description: () => project.value?.description || 'Project details and case study.',
    ogTitle: () => project.value ? `${project.value.title} - Lanre Segun` : 'Project Not Found',
    ogDescription: () => project.value?.description || 'Project details and case study.',
    ogImage: () => project.value?.coverImage || '/og-image.png',
    ogUrl: () => `https://lanre-segun.vercel.app/projects/${project.value?.slug || ''}`,
    twitterTitle: () => project.value ? `${project.value.title} - Lanre Segun` : 'Project Not Found',
    twitterDescription: () => project.value?.description || 'Project details and case study.',
    twitterImage: () => project.value?.coverImage || '/og-image.png',
    twitterCard: 'summary'
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

.animate-modal-in {
    animation: modalIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes modalIn {
    from {
        opacity: 0;
        transform: scale(0.95) translateY(20px);
    }

    to {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
