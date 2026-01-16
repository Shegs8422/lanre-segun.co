<template>
    <div ref="containerRef" @scroll="handleScroll"
        class="fixed inset-0 bg-background text-foreground overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent z-50 project-page-container">

        <!-- Reading Progress Bar -->
        <div v-show="!isPreloading"
            class="fixed top-0 left-0 h-1 bg-blue-500 z-overlay transition-all duration-100 ease-out"
            :style="{ width: readingProgress + '%' }" />

        <!-- Interactive Preloader -->
        <div v-if="isPreloading"
            class="fixed inset-0 z-modal bg-black flex flex-col items-center justify-center p-6 text-white font-mono overflow-hidden">
            <div
                class="terminal-box w-full max-w-2xl border border-white/10 rounded-xl p-8 bg-zinc-950/50 backdrop-blur-xl relative">
                <div class="absolute top-0 left-0 w-full h-1 bg-blue-500/20">
                    <div class="h-full bg-blue-500 preloader-progress-bar"
                        :style="{ width: preloaderProgress + '%' }" />
                </div>

                <div class="flex flex-col gap-4">
                    <div class="flex justify-between items-center border-b border-white/5 pb-4 mb-2">
                        <span
                            class="text-xxs uppercase tracking-giga font-black text-blue-500">System.Initialize()</span>
                        <span class="text-xxs uppercase tracking-giga font-black text-white/20">{{
                            Math.floor(preloaderProgress) }}% Complete</span>
                    </div>

                    <div class="terminal-lines flex flex-col gap-1 overflow-hidden h-32">
                        <p v-for="(line, i) in terminalLog" :key="i"
                            class="text-xxs md:text-xs leading-relaxed opacity-70 animate-terminal-line">
                            <span class="text-blue-500">></span> {{ line }}
                        </p>
                    </div>

                    <div class="flex items-center gap-4 mt-8 opacity-40">
                        <div class="grow h-px bg-white/10" />
                        <div class="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        <div class="grow h-px bg-white/10" />
                    </div>
                </div>
            </div>

            <!-- Floating Background Elements -->
            <div class="absolute inset-0 z-negative opacity-20">
                <div
                    class="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full animate-float" />
                <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full animate-float"
                    style="animation-delay: -2s" />
            </div>
        </div>

        <div v-if="project"
            class="max-w-5xl mx-auto px-6 pt-32 md:pt-40 pb-12 md:pb-24 flex flex-col gap-24 project-content-wrapper"
            :class="{ 'opacity-0': isPreloading }">

            <!-- Header Section -->
            <header class="flex flex-col gap-10">
                <div class="flex items-center justify-between entrance-reveal">
                    <NuxtLink to="/projects"
                        class="w-fit flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                        Back to Projects
                    </NuxtLink>

                    <button v-if="project.projectLink"
                        class="w-fit flex items-center gap-2 px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-500 transition-colors text-sm font-bold text-white shadow-lg shadow-blue-500/20"
                        @click="handleProjectLink">
                        {{ project.isFigma ? 'View File Preview' : 'See Live Project' }}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                    </button>
                </div>

                <div class="flex flex-col gap-6">
                    <div class="flex flex-wrap gap-2 entrance-reveal">
                        <span v-for="tag in project.tags" :key="tag"
                            class="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-medium rounded-full border border-blue-500/20 uppercase tracking-widest">{{
                                tag }}</span>
                    </div>
                    <h1
                        class="text-5xl md:text-7xl font-display font-bold tracking-tighter leading-tight overflow-hidden project-title-reveal">
                        <span v-for="(word, i) in (project.title || '').split(' ')" :key="i"
                            class="inline-block project-title-word mr-[0.3em]">
                            {{ word }}
                        </span>
                    </h1>
                    <p
                        class="text-muted-foreground text-xl md:text-2xl font-light max-w-2xl leading-relaxed entrance-reveal">
                        {{ project.subtitle || project.description }}
                    </p>
                </div>

                <!-- Snapshot Meta Grid -->
                <div class="grid grid-cols-2 md:grid-cols-5 gap-8 pt-8 border-t border-white/10 mt-4 meta-grid">
                    <div v-for="(val, label) in { Client: project.client, Role: project.role, Industry: project.industry, Duration: project.duration, Team: project.teamSize }"
                        :key="label" class="flex flex-col gap-1 meta-item">
                        <span class="text-xxs uppercase tracking-widest text-muted-foreground font-bold">{{ label
                            }}</span>
                        <span class="text-sm font-medium truncate">{{ val || 'N/A' }}</span>
                    </div>
                </div>
            </header>

            <!-- Hero Image -->
            <div
                class="w-full aspect-video rounded-3xl overflow-hidden shadow-2xl bg-white/5 relative group hero-image-container">
                <NuxtImage v-if="project.coverImage || project.content?.heroImage"
                    :src="project.coverImage || project.content?.heroImage" :alt="project.title" format="webp"
                    placeholder
                    class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 hero-image-parallax" />
                <div class="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
            </div>

            <!-- Problem & Goals -->
            <section class="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 scroll-reveal">
                <div class="md:col-span-4 flex flex-col gap-4">
                    <h3 class="text-xs font-display font-bold text-blue-500 uppercase tracking-widest">01. Context</h3>
                    <h2 class="text-3xl font-display font-bold tracking-tight">The Challenge</h2>
                </div>
                <div class="md:col-span-8 flex flex-col gap-12">
                    <div class="text-xl leading-relaxed text-foreground/90 font-light italic border-l-2 border-blue-500 pl-8 py-2 markdown-container"
                        v-html="parseMarkdown(project.problemStatement || project.description)" />

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div class="flex flex-col gap-4">
                            <h4 class="text-sm font-bold uppercase tracking-widest opacity-40">Business Goal</h4>
                            <div class="text-muted-foreground leading-relaxed markdown-container"
                                v-html="parseMarkdown(project.businessGoal || `Defining objectives for the project revival.`)" />
                        </div>
                        <div class="flex flex-col gap-4">
                            <h4 class="text-sm font-bold uppercase tracking-widest opacity-40">User Goal</h4>
                            <div class="text-muted-foreground leading-relaxed markdown-container"
                                v-html="parseMarkdown(project.userGoal || `Prioritizing user needs and experiences.`)" />
                        </div>
                    </div>
                </div>
            </section>

            <!-- Process & Approach -->
            <section class="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 scroll-reveal">
                <div class="md:col-span-4 flex flex-col gap-4">
                    <h3 class="text-xs font-bold text-blue-500 uppercase tracking-widest">02. Execution</h3>
                    <h2 class="text-3xl font-bold tracking-tight">Design Approach</h2>
                </div>
                <div class="md:col-span-8 flex flex-col gap-12">
                    <div class="text-lg leading-relaxed text-muted-foreground markdown-container"
                        v-html="parseMarkdown(project.designApproach || project.content?.introduction)" />

                    <div
                        class="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white/5 p-8 rounded-2xl border border-white/10">
                        <div v-for="(val, label) in { Methods: project.researchMethods, 'Target Users': project.targetUsers }"
                            :key="label" class="flex flex-col gap-4">
                            <h4 class="text-sm font-bold uppercase tracking-widest opacity-40">{{ label }}</h4>
                            <div class="text-muted-foreground leading-relaxed markdown-container"
                                v-html="parseMarkdown(val || 'In-depth analysis.')" />
                        </div>
                        <div class="flex flex-col gap-4 md:col-span-2 border-t border-white/5 pt-8">
                            <h4 class="text-sm font-bold uppercase tracking-widest opacity-40">Key Insights</h4>
                            <div class="text-muted-foreground leading-relaxed markdown-container"
                                v-html="parseMarkdown(project.keyInsights || `Identifying core pain points in workflows.`)" />
                        </div>
                    </div>
                </div>
            </section>

            <!-- Wireframes Gallery -->
            <section v-if="project.wireframes?.length" class="flex flex-col gap-10 scroll-reveal">
                <div class="flex flex-col gap-4">
                    <h3 class="text-xs font-bold text-blue-500 uppercase tracking-widest">03. Iteration</h3>
                    <h2 class="text-3xl font-bold tracking-tight">Wireframes & Workflows</h2>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div v-for="(img, i) in project.wireframes" :key="i"
                        class="rounded-2xl overflow-hidden bg-white/5 aspect-16/10 border border-white/5 group">
                        <NuxtImage :src="img" format="webp" loading="lazy"
                            class="w-full h-full object-cover transition-transform group-hover:scale-105" />
                    </div>
                </div>
            </section>

            <!-- Final Designs Gallery -->
            <section v-if="project.finalDesigns?.length" class="flex flex-col gap-10 scroll-reveal">
                <div class="flex flex-col gap-4">
                    <h3 class="text-xs font-bold text-blue-500 uppercase tracking-widest">04. Visual System</h3>
                    <h2 class="text-3xl font-bold tracking-tight">The Final Solution</h2>
                </div>
                <div class="flex flex-col gap-12">
                    <div v-for="(img, i) in project.finalDesigns" :key="i"
                        class="rounded-3xl overflow-hidden bg-white/5 border border-white/10 group">
                        <NuxtImage :src="img" format="webp" loading="lazy"
                            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
                    </div>
                </div>
            </section>

            <!-- Dynamic Process Sections -->
            <div v-if="project.content?.sections?.length" class="flex flex-col gap-32 py-20 border-y border-white/5">
                <div v-for="(section, idx) in project.content.sections" :key="idx"
                    class="flex flex-col gap-10 scroll-reveal">
                    <!-- Section Header -->
                    <div v-if="section.title" class="flex flex-col gap-4">
                        <h3 class="text-xs font-bold text-blue-500 uppercase tracking-widest">Process Stage</h3>
                        <h2 class="text-3xl font-bold tracking-tight">{{ section.title }}</h2>
                    </div>

                    <!-- Layout: Text Only -->
                    <div v-if="section.layout === 'text-only' || !section.layout" class="max-w-3xl">
                        <div class="text-lg leading-relaxed text-muted-foreground markdown-container"
                            v-html="parseMarkdown(section.content)" />
                    </div>

                    <!-- Layout: Full Width Image -->
                    <div v-else-if="section.layout === 'image-full' || section.type === 'image'"
                        class="w-full flex flex-col gap-8">
                        <div v-if="section.content"
                            class="text-lg leading-relaxed text-muted-foreground max-w-3xl mb-4 markdown-container"
                            v-html="parseMarkdown(section.content)" />
                        <div
                            class="w-full aspect-video rounded-3xl overflow-hidden bg-white/5 border border-white/10 group">
                            <NuxtImage :src="section.image || section.url" format="webp" loading="lazy"
                                class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                        </div>
                    </div>

                    <!-- Layout: Split Left -->
                    <div v-else-if="section.layout === 'split-left'"
                        class="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                        <div
                            class="md:col-span-7 aspect-video rounded-2xl overflow-hidden bg-white/5 border border-white/10 group">
                            <NuxtImage :src="section.image" format="webp" loading="lazy"
                                class="w-full h-full object-cover transition-transform group-hover:scale-105" />
                        </div>
                        <div class="md:col-span-5 flex flex-col gap-6">
                            <div class="text-lg leading-relaxed text-muted-foreground markdown-container"
                                v-html="parseMarkdown(section.content)" />
                        </div>
                    </div>

                    <!-- Layout: Split Right -->
                    <div v-else-if="section.layout === 'split-right'"
                        class="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                        <div class="md:col-span-5 flex flex-col gap-6 order-2 md:order-1">
                            <div class="text-lg leading-relaxed text-muted-foreground markdown-container"
                                v-html="parseMarkdown(section.content)" />
                        </div>
                        <div
                            class="md:col-span-7 aspect-video rounded-2xl overflow-hidden bg-white/5 border border-white/10 order-1 md:order-2 group">
                            <NuxtImage :src="section.image" format="webp" loading="lazy"
                                class="w-full h-full object-cover transition-transform group-hover:scale-105" />
                        </div>
                    </div>

                    <!-- Layout: Grid -->
                    <div v-else-if="section.layout === 'grid' || section.type === 'grid'" class="flex flex-col gap-8">
                        <div v-if="section.content"
                            class="text-lg leading-relaxed text-muted-foreground max-w-3xl markdown-container"
                            v-html="parseMarkdown(section.content)" />
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div v-for="(img, i) in (section.images || [])" :key="i"
                                class="rounded-2xl overflow-hidden bg-white/5 aspect-4/3 border border-white/5 group">
                                <NuxtImage :src="img" format="webp" loading="lazy"
                                    class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Solution Highlights -->
            <section v-if="project.solutionSummary" class="flex flex-col gap-10 scroll-reveal">
                <div class="flex flex-col gap-4">
                    <h3 class="text-xs font-bold text-emerald-500 uppercase tracking-widest">The Fix</h3>
                    <h2 class="text-3xl font-bold tracking-tight">Solution Summary</h2>
                </div>
                <div class="p-10 rounded-3xl bg-emerald-500/5 border border-emerald-500/10 backdrop-blur-sm">
                    <div class="text-xl leading-relaxed text-foreground/90 font-light italic pl-4 border-l-2 border-emerald-500 markdown-container"
                        v-html="parseMarkdown(project.solutionSummary)" />
                </div>
            </section>

            <!-- Outcomes & Tools -->
            <section class="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 scroll-reveal">
                <div class="md:col-span-4 flex flex-col gap-4">
                    <h3 class="text-xs font-bold text-blue-500 uppercase tracking-widest">05. Conclusion</h3>
                    <h2 class="text-3xl font-bold tracking-tight">The Impact</h2>
                </div>
                <div class="md:col-span-8 flex flex-col gap-12">
                    <div class="text-lg leading-relaxed text-muted-foreground markdown-container"
                        v-html="parseMarkdown(project.outcome || project.content?.results?.description)" />

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div class="flex flex-col gap-4">
                            <h4 class="text-sm font-bold uppercase tracking-widest opacity-40">Learnings</h4>
                            <div class="text-muted-foreground leading-relaxed markdown-container"
                                v-html="parseMarkdown(project.learnings || `Iterative testing is key to solving complex UX problems.`)" />
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

            <!-- Footer Navigation -->
            <footer class="flex justify-between items-center py-12 border-t border-white/10 mt-12 scroll-reveal">
                <NuxtLink v-if="adjacent.prev" :to="`/projects/${adjacent.prev.slug}`"
                    class="flex flex-col gap-1 group text-left max-w-[40%]">
                    <span
                        class="text-xs text-muted-foreground group-hover:text-primary transition-colors uppercase tracking-widest font-bold">Previous
                        Project</span>
                    <span class="text-xl font-bold group-hover:-translate-x-2 transition-transform truncate">{{
                        adjacent.prev.title }}</span>
                </NuxtLink>
                <div v-else class="w-1" />
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

        <!-- Not Found State -->
        <div v-else class="h-screen flex items-center justify-center">
            <div class="flex flex-col items-center gap-4">
                <p class="text-muted-foreground">Project not found</p>
                <NuxtLink to="/projects"
                    class="text-primary hover:underline font-bold uppercase tracking-widest text-xs">Back to Projects
                </NuxtLink>
            </div>
        </div>

        <!-- Figma Prototype Modal -->
        <Teleport to="body">
            <Transition name="fade">
                <div v-if="showPrototype && project?.projectLink"
                    class="fixed inset-0 z-max flex items-center justify-center p-4 md:p-12 bg-black/95 backdrop-blur-2xl">
                    <div class="absolute inset-0 z-0" @click="showPrototype = false" />
                    <div
                        class="relative w-full h-full max-w-7xl bg-terminal-bg rounded-3xl overflow-hidden border border-white/10 flex flex-col shadow-2xl animate-modal-in z-10">
                        <div class="flex items-center justify-between p-6 border-b border-white/5 bg-tooltip-bg">
                            <div class="flex flex-col">
                                <h3 class="text-lg font-bold text-white uppercase tracking-tighter">{{ project.title }}
                                    {{ project.isFigma ? 'Design Feed' : 'Session' }}</h3>
                                <p class="text-xxs text-white/40 uppercase tracking-widest">Interactive Cloud Preview
                                </p>
                            </div>
                            <div class="flex items-center gap-3">
                                <a :href="formattedLink" target="_blank"
                                    class="p-3 hover:bg-white/5 rounded-full transition-all text-white/30 hover:text-white group flex items-center gap-2">
                                    <span
                                        class="text-xxs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Open
                                        Original</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
                                        stroke-linejoin="round">
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                        <polyline points="15 3 21 3 21 9" />
                                        <line x1="10" y1="14" x2="21" y2="3" />
                                    </svg>
                                </a>
                                <button
                                    class="p-3 hover:bg-white/5 rounded-full transition-all hover:rotate-90 text-white/50 hover:text-white"
                                    @click="showPrototype = false">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
                                        stroke-linejoin="round">
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div class="flex-1 w-full relative bg-black flex items-center justify-center overflow-hidden">
                            <div class="absolute inset-0 flex flex-col items-center justify-center gap-4 z-0">
                                <div
                                    class="w-12 h-12 border-4 border-white/10 border-t-blue-500 rounded-full animate-spin" />
                                <p class="text-xxs text-white/30 uppercase tracking-mega font-black">Initializing
                                    Simulation</p>
                            </div>
                            <iframe v-if="formattedLink" :src="formattedLink"
                                class="absolute inset-0 w-full h-full border-0 z-10 bg-black"
                                allow="autoplay; clipboard-read; clipboard-write; draw-viewer; encrypted-media; fullscreen; picture-in-picture; xr-spatial-tracking"
                                referrerpolicy="no-referrer-when-downgrade" allowfullscreen loading="eager" />
                        </div>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (import.meta.client) {
    gsap.registerPlugin(ScrollTrigger)
}

const route = useRoute()
const { getProjectBySlug, getAdjacentProjects, fetchProjects } = useProjects()

// Preloader State
const isPreloading = ref(true)
const preloaderProgress = ref(0)
const terminalLog = ref<string[]>([])
const fullLogLines = [
    "Establishing neural link with archive...",
    "Retrieving encrypted project metadata...",
    "Accessing high-fidelity visual assets...",
    "Synchronizing layout parameters...",
    "Decrypting solution summaries...",
    "Compiling interaction modules...",
    "Finalizing design matrices...",
    "Connection stable. Redirecting user..."
]

// Data Fetching
await fetchProjects()
const project = computed(() => getProjectBySlug(route.params.slug as string))
const adjacent = computed(() => getAdjacentProjects(route.params.slug as string))
const showPrototype = ref(false)

// GSAP Animations
onMounted(() => {
    if (!project.value) return

    // 1. Terminal Preloader Animation
    const preloaderTimeline = gsap.timeline({
        onComplete: () => {
            gsap.to(".terminal-box", {
                scale: 1.1,
                opacity: 0,
                duration: 0.6,
                ease: "power4.in",
                onComplete: () => {
                    isPreloading.value = false
                    initProjectAnimations()
                }
            })
        }
    })

    preloaderTimeline.to(preloaderProgress, {
        value: 100,
        duration: 3,
        ease: "none",
        onUpdate: () => {
            const currentLine = Math.floor((preloaderProgress.value / 100) * fullLogLines.length)
            if (fullLogLines[currentLine] && !terminalLog.value.includes(fullLogLines[currentLine])) {
                terminalLog.value.push(fullLogLines[currentLine])
            }
        }
    })

    const initProjectAnimations = () => {
        nextTick(() => {
            gsap.context(() => {
                // Entrance Sequence
                const entranceTl = gsap.timeline()

                entranceTl.from(".project-page-container", {
                    clipPath: "inset(0% 0% 100% 0%)",
                    duration: 1.4,
                    ease: "power4.inOut"
                })

                entranceTl.from(".project-title-word", {
                    y: 100,
                    opacity: 0,
                    rotateX: -45,
                    stagger: 0.05,
                    duration: 1,
                    ease: "power4.out"
                }, "-=0.6")

                entranceTl.from(".entrance-reveal", {
                    y: 30,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 0.8,
                    ease: "power2.out"
                }, "-=0.8")

                entranceTl.from(".meta-item", {
                    scaleX: 0,
                    transformOrigin: "left",
                    opacity: 0,
                    stagger: 0.08,
                    duration: 0.8,
                    ease: "power3.out"
                }, "-=1")

                entranceTl.from(".hero-image-container", {
                    scale: 0.95,
                    opacity: 0,
                    duration: 1.2,
                    ease: "power3.out"
                }, "-=1")

                // Scroll Reveals
                gsap.utils.toArray<HTMLElement>('.scroll-reveal').forEach((section) => {
                    gsap.from(section, {
                        scrollTrigger: {
                            trigger: section,
                            scroller: ".project-page-container",
                            start: "top 95%",
                            toggleActions: "play none none none"
                        },
                        y: 40,
                        opacity: 0,
                        duration: 1,
                        ease: "power3.out"
                    })
                })

                // Hero Parallax
                gsap.to('.hero-image-parallax', {
                    scrollTrigger: {
                        trigger: '.hero-image-container',
                        scroller: ".project-page-container",
                        start: "top top",
                        end: "bottom top",
                        scrub: true
                    },
                    yPercent: 30,
                    scale: 1.15,
                    opacity: 0.5,
                    ease: "none"
                })
            })
        })
    }
})

// Link Processing
const formattedLink = computed(() => {
    let raw = project.value?.projectLink || ''
    if (!raw) return ''

    // 1. Extract from iframe if pasted directly
    if (raw.includes('<iframe')) {
        const match = raw.match(/src="([^"]+)"/)
        if (match && match[1]) {
            raw = match[1].replace(/&amp;/g, '&')
        }
    }

    let link = raw.trim()
    if (!link.startsWith('http') && !link.startsWith('//')) {
        link = 'https://' + link
    }

    // 2. Figma-specific embedding logic
    if (project.value?.isFigma) {
        const isFigmaURL = link.includes('figma.com')
        const isEmbedURL = link.includes('/embed') || link.includes('embed?')

        if (isFigmaURL && !isEmbedURL) {
            // Clean common link noise before encoding to be safe
            return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(link)}`
        }
    }

    return link
})

const handleProjectLink = () => {
    if (!project.value?.projectLink) return
    if (project.value.isFigma) {
        showPrototype.value = true
    } else {
        window.open(formattedLink.value, '_blank')
    }
}

// SEO
useSeoMeta({
    title: () => project.value ? `${project.value.title} - Lanre Segun` : 'Project',
    description: () => project.value?.description || 'Case study.',
    ogImage: () => project.value?.coverImage || '/og-image.png'
})


// Scroll behavior
const readingProgress = ref(0)
const containerRef = ref<HTMLElement | null>(null)

const handleScroll = () => {
    if (!containerRef.value) return
    const el = containerRef.value
    const scrollTop = el.scrollTop
    const scrollHeight = el.scrollHeight - el.clientHeight
    readingProgress.value = (scrollTop / scrollHeight) * 100
}

watch(() => route.params.slug, () => {
    if (import.meta.client) {
        if (containerRef.value) containerRef.value.scrollTop = 0
    }
})
</script>

<style scoped>
.font-mono {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}

@keyframes float {

    0%,
    100% {
        transform: translateY(0) scale(1);
    }

    50% {
        transform: translateY(-30px) scale(1.1);
    }
}

.animate-float {
    animation: float 10s ease-in-out infinite;
}

.animate-terminal-line {
    animation: terminalLineIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes terminalLineIn {
    from {
        transform: translateX(-10px);
        opacity: 0;
    }

    to {
        transform: translateX(0);
        opacity: 0.7;
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

::-webkit-scrollbar {
    width: 4px;
}

::-webkit-scrollbar-track {
    background: transparent;
}

::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.2);
}

.markdown-container :deep(strong) {
    font-weight: 700;
    color: white;
}

.markdown-container :deep(em) {
    font-style: italic;
    opacity: 0.9;
}

.markdown-container :deep(ul) {
    list-style-type: disc;
    margin-left: 1.5rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
}

.markdown-container :deep(li) {
    margin-bottom: 0.5rem;
}

.markdown-container :deep(p) {
    margin-bottom: 1rem;
}

.markdown-container :deep(a) {
    color: #3b82f6;
    text-decoration: underline;
    transition: opacity 0.2s;
}

.markdown-container :deep(a:hover) {
    opacity: 0.8;
}

.markdown-container :deep(table) {
    width: 100%;
    margin: 2rem 0;
    border-collapse: collapse;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 1rem;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.markdown-container :deep(th) {
    background: rgba(255, 255, 255, 0.05);
    padding: 1rem;
    font-weight: 800;
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    border-bottom: 2px solid rgba(255, 255, 255, 0.1);
}

.markdown-container :deep(td) {
    padding: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.8);
}

.markdown-container :deep(pre) {
    background: var(--color-code-bg);
    padding: 1.5rem;
    border-radius: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    margin: 2rem 0;
    overflow-x: auto;
    font-size: 0.875rem;
    line-height: 1.6;
}

.markdown-container :deep(code) {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}
</style>
