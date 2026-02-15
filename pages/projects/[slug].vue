<template>
    <div ref="containerRef"
        class="fixed inset-0 bg-background text-foreground overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent z-50 project-page-container overscroll-x-none"
        @scroll="handleScroll">

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
            class="max-w-360 mx-auto px-6 md:px-12 pt-32 md:pt-40 pb-12 md:pb-24 flex flex-col gap-24 project-content-wrapper"
            :class="{ 'opacity-0': isPreloading }">

            <!-- Header Section -->
            <header class="flex flex-col gap-10">
                <div class="flex items-center justify-between entrance-reveal">
                    <NuxtLink to="/projects"
                        class="w-fit flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-400 dark:border-white/10 bg-zinc-200 dark:bg-white/5 hover:bg-zinc-300 dark:hover:bg-white/10 transition-colors text-sm font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                        Back to Projects
                    </NuxtLink>


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
                <div
                    class="grid grid-cols-2 md:grid-cols-5 gap-6 pt-10 border-t border-black/10 dark:border-white/10 mt-6 meta-grid">
                    <div v-for="(val, label) in { Client: project.client, Role: project.role, Industry: project.industry, Duration: project.duration, Team: project.teamSize }"
                        :key="label"
                        class="flex flex-col gap-2 p-4 rounded-xl bg-zinc-200 dark:bg-white/5 border-zinc-400 dark:border-white/5 hover:bg-zinc-300 dark:hover:bg-white/10 transition-all duration-300 group/meta">
                        <span
                            class="text-xxs uppercase tracking-mega text-muted-foreground/60 font-black group-hover/meta:text-blue-400 transition-colors">{{
                                label }}</span>
                        <span class="text-xs md:text-sm font-bold text-foreground/90 truncate">{{ val || 'N/A' }}</span>
                    </div>
                </div>
            </header>

            <!-- Hero Section: Image with Interactive Toggle -->
            <div class="w-full rounded-3xl overflow-hidden shadow-2xl bg-black/40 border border-white/10 relative group hero-container"
                :class="isFigmaLink ? 'aspect-video' : 'aspect-video'">

                <!-- Interactive Figma Embed (Active State) -->
                <div v-if="showPrototype && isFigmaLink && formattedLink" class="absolute inset-0 z-20 bg-black">
                    <iframe :src="formattedLink" class="w-full h-full border-0"
                        allow="autoplay; clipboard-read; clipboard-write; draw-viewer; encrypted-media; fullscreen; picture-in-picture; xr-spatial-tracking"
                        referrerpolicy="no-referrer-when-downgrade" allowfullscreen loading="eager" />

                    <button
                        class="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/80 text-white/50 hover:text-white rounded-full transition-colors backdrop-blur-md border border-white/10 z-30"
                        @click="showPrototype = false">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                <!-- Default Cover Image & Overlay -->
                <div class="relative w-full h-full overflow-hidden">
                    <img v-if="project.coverImage || project.content?.heroImage"
                        :src="project.coverImage || project.content?.heroImage" :alt="project.title"
                        class="w-full h-full object-cover transition-transform duration-700 ease-out">

                    <div
                        class="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60 dark:opacity-100 transition-opacity" />
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />

                    <!-- Prototype Trigger Overlay -->
                    <div v-if="project.projectLink"
                        class="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button v-if="isFigmaLink"
                            class="flex items-center gap-3 px-8 py-4 rounded-full bg-black/20 dark:bg-white/10 hover:bg-black/40 dark:hover:bg-white/20 backdrop-blur-xl border border-black/10 dark:border-white/20 text-white font-bold tracking-widest uppercase text-sm transition-all transform translate-y-4 group-hover:translate-y-0 shadow-2xl"
                            @click="showPrototype = true">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path d="M5 3l14 9-14 9V3z" />
                            </svg>
                            Launch Prototype
                        </button>

                        <a v-else :href="project.projectLink" target="_blank"
                            class="flex items-center gap-3 px-8 py-4 rounded-full bg-black/20 dark:bg-white/10 hover:bg-black/40 dark:hover:bg-white/20 backdrop-blur-xl border border-black/10 dark:border-white/20 text-white font-bold tracking-widest uppercase text-sm transition-all transform translate-y-4 group-hover:translate-y-0 shadow-2xl">
                            <span>Visit Live Site</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                <polyline points="15 3 21 3 21 9" />
                                <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            <!-- Problem & Goals: Premium Cards -->
            <section class="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 scroll-reveal">
                <div class="md:col-span-4 flex flex-col gap-6 md:sticky md:top-32 h-fit">
                    <div class="w-12 h-1 bg-linear-to-r from-blue-500 to-purple-500 rounded-full" />
                    <div class="flex flex-col gap-2">
                        <h3 class="text-xs font-black text-muted-foreground/50 uppercase tracking-mega">01. The Context
                        </h3>
                        <h2
                            class="text-4xl md:text-5xl font-display font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-b from-foreground to-muted-foreground scale-reveal">
                            The Challenge</h2>
                    </div>
                </div>
                <div class="md:col-span-8 flex flex-col gap-12">
                    <div
                        class="p-8 md:p-10 rounded-3xl bg-zinc-200 dark:bg-white/10 border-zinc-400 dark:border-white/10 backdrop-blur-sm relative overflow-hidden group">
                        <div
                            class="absolute top-0 right-0 w-64 h-64 bg-blue-500/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/40 transition-colors duration-700" />
                        <div class="relative z-10 text-xl md:text-2xl leading-relaxed text-foreground/90 font-light markdown-container"
                            v-html="parseMarkdown(project.problemStatement || project.description)" />
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div
                            class="flex flex-col gap-6 p-8 rounded-3xl bg-zinc-200 dark:bg-white/5 border-zinc-400 dark:border-white/10 hover:bg-white/4 transition-colors">
                            <h4
                                class="flex items-center gap-3 text-xs font-black uppercase tracking-mega text-blue-400">
                                <span class="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                                Business Goal
                            </h4>
                            <div class="text-sm md:text-base text-muted-foreground leading-relaxed markdown-container"
                                v-html="parseMarkdown(project.businessGoal || `Defining objectives for the project revival.`)" />
                        </div>
                        <div
                            class="flex flex-col gap-6 p-8 rounded-3xl bg-zinc-200 dark:bg-white/5 border-zinc-400 dark:border-white/10 hover:bg-white/4 transition-colors">
                            <h4
                                class="flex items-center gap-3 text-xs font-black uppercase tracking-mega text-purple-400">
                                <span
                                    class="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                                User Goal
                            </h4>
                            <div class="text-sm md:text-base text-muted-foreground leading-relaxed markdown-container"
                                v-html="parseMarkdown(project.userGoal || `Prioritizing user needs and experiences.`)" />
                        </div>
                    </div>
                </div>
            </section>

            <!-- Process & Approach -->
            <section class="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 scroll-reveal">
                <div class="md:col-span-4 flex flex-col gap-6 md:sticky md:top-32 h-fit">
                    <div class="w-12 h-1 bg-linear-to-r from-pink-500 to-rose-500 rounded-full" />
                    <div class="flex flex-col gap-2">
                        <h3 class="text-xs font-black text-muted-foreground/50 uppercase tracking-mega">02. Execution
                        </h3>
                        <h2
                            class="text-4xl md:text-5xl font-display font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-b from-foreground to-muted-foreground scale-reveal">
                            Design Process</h2>
                    </div>
                </div>
                <div class="md:col-span-8 flex flex-col gap-12">
                    <div class="text-lg md:text-xl leading-relaxed text-muted-foreground markdown-container"
                        v-html="parseMarkdown(project.designApproach || project.content?.introduction)" />

                    <div
                        class="grid grid-cols-1 md:grid-cols-2 gap-8 bg-black/5 dark:bg-white/2 p-8 md:p-10 rounded-3xl border border-black/5 dark:border-white/5 backdrop-blur-sm relative overflow-hidden">
                        <div
                            class="absolute inset-0 bg-linear-to-br from-black/10 dark:from-white/10 to-transparent pointer-events-none" />

                        <div v-for="(val, label) in { Methods: project.researchMethods, 'Target Users': project.targetUsers }"
                            :key="label" class="flex flex-col gap-4 relative z-10">
                            <h4 class="text-xs font-black uppercase tracking-mega text-muted-foreground/70">{{ label }}
                            </h4>
                            <div class="text-sm md:text-base text-muted-foreground leading-relaxed markdown-container"
                                v-html="parseMarkdown(val || 'In-depth analysis.')" />
                        </div>
                        <div class="flex flex-col gap-4 md:col-span-2 border-t border-white/5 pt-8 relative z-10">
                            <h4 class="text-xs font-black uppercase tracking-mega text-muted-foreground/70">Key Insights
                            </h4>
                            <div class="text-sm md:text-base text-muted-foreground leading-relaxed markdown-container"
                                v-html="parseMarkdown(project.keyInsights || `Identifying core pain points in workflows.`)" />
                        </div>
                    </div>
                </div>
            </section>

            <!-- Wireframes Gallery -->
            <section v-if="project.wireframes?.length" class="flex flex-col gap-10">
                <div class="flex flex-col gap-6">
                    <div class="w-12 h-1 bg-linear-to-r from-violet-500 to-indigo-500 rounded-full" />
                    <div class="flex flex-col gap-2">
                        <h3 class="text-xs font-black text-muted-foreground/50 uppercase tracking-mega">03. Iteration
                        </h3>
                        <h2
                            class="text-4xl md:text-5xl font-display font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-b from-foreground to-muted-foreground scale-reveal">
                            Wireframes & Workflows</h2>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div v-for="(img, i) in project.wireframes" :key="i"
                        class="rounded-2xl overflow-hidden bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 group relative">
                        <img :src="img" loading="lazy" class="w-full h-auto object-cover">
                        <div
                            class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    </div>
                </div>
            </section>

            <!-- Final Designs Gallery -->
            <section v-if="project.finalDesigns?.length" class="flex flex-col gap-10">
                <div class="flex flex-col gap-6">
                    <div class="w-12 h-1 bg-linear-to-r from-emerald-500 to-teal-500 rounded-full" />
                    <div class="flex flex-col gap-2">
                        <h3 class="text-xs font-black text-muted-foreground/50 uppercase tracking-mega">04. Visual
                            System</h3>
                        <h2
                            class="text-4xl md:text-5xl font-display font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-b from-foreground to-muted-foreground scale-reveal">
                            The Final Solution</h2>
                    </div>
                </div>
                <div class="flex flex-col gap-12">
                    <div v-for="(img, i) in project.finalDesigns" :key="i"
                        class="rounded-3xl overflow-hidden bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 group relative">
                        <img :src="img" loading="lazy" class="w-full h-auto object-cover">
                        <div
                            class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
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
                            <img :src="section.image || section.url" loading="lazy"
                                class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105">
                        </div>
                    </div>

                    <!-- Layout: Split Left -->
                    <div v-else-if="section.layout === 'split-left'"
                        class="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                        <div
                            class="md:col-span-7 aspect-video rounded-2xl overflow-hidden bg-white/5 border border-white/10 group">
                            <img :src="section.image" loading="lazy"
                                class="w-full h-full object-cover transition-transform group-hover:scale-105">
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
                            <img :src="section.image" loading="lazy"
                                class="w-full h-full object-cover transition-transform group-hover:scale-105">
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
                                <img :src="img" loading="lazy"
                                    class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
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
                <div class="md:col-span-4 flex flex-col gap-6 md:sticky md:top-32 h-fit">
                    <div class="w-12 h-1 bg-linear-to-r from-orange-500 to-amber-500 rounded-full" />
                    <div class="flex flex-col gap-2">
                        <h3 class="text-xs font-black text-white/40 uppercase tracking-mega">05. Conclusion</h3>
                        <h2
                            class="text-4xl md:text-5xl font-display font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-b from-foreground to-muted-foreground scale-reveal">
                            The Impact</h2>
                    </div>
                </div>
                <div class="md:col-span-8 flex flex-col gap-12">
                    <div
                        class="p-8 md:p-10 rounded-3xl bg-zinc-200 dark:bg-white/10 border-zinc-400 dark:border-white/10 backdrop-blur-sm relative overflow-hidden">
                        <div
                            class="absolute top-0 right-0 w-64 h-64 bg-orange-500/30 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
                        <div class="relative z-10 text-lg md:text-xl leading-relaxed text-foreground/90 font-light markdown-container"
                            v-html="parseMarkdown(project.outcome || project.content?.results?.description)" />
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div
                            class="flex flex-col gap-6 p-8 rounded-3xl bg-zinc-200 dark:bg-white/5 border-zinc-400 dark:border-white/10">
                            <h4 class="text-xs font-black uppercase tracking-mega text-orange-400">Learnings</h4>
                            <div class="text-sm md:text-base text-muted-foreground leading-relaxed markdown-container"
                                v-html="parseMarkdown(project.learnings || `Iterative testing is key to solving complex UX problems.`)" />
                        </div>
                        <div
                            class="flex flex-col gap-6 p-8 rounded-3xl bg-black/10 dark:bg-white/5 border-black/10 dark:border-white/10">
                            <h4 class="text-xs font-black uppercase tracking-mega text-amber-400">Tools Used</h4>
                            <div class="flex flex-wrap gap-2">
                                <span v-for="tool in project.tools" :key="tool"
                                    class="px-3 py-1.5 bg-white/5 rounded-lg text-xs font-mono font-medium text-muted-foreground border border-white/10 hover:bg-white/10 hover:text-white transition-colors cursor-default">{{
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
                    class="text-primary hover:underline font-bold uppercase tracking-widest text-xs">Back
                    to Projects
                </NuxtLink>
            </div>
        </div>


    </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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
const isFigmaLink = computed(() => {
    if (!project.value) return false
    if (project.value.isFigma) return true
    return (project.value.projectLink || '').includes('figma.com')
})

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
    if (isFigmaLink.value) {
        const isFigmaURL = link.includes('figma.com')
        const isEmbedURL = link.includes('/embed') || link.includes('embed?') || link.includes('embed.figma.com')

        if (isFigmaURL && !isEmbedURL) {
            // Clean common link noise before encoding to be safe
            return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(link)}`
        }
    }

    return link
})


// SEO
useSeoMeta({
    title: () => project.value ? `${project.value.title} - Lanre Segun` : 'Project',
    description: () => project.value?.description || 'Case study.',
    ogImage: () => project.value?.coverImage || 'https://pqmcl2p95v0ptrae.public.blob.vercel-storage.com/public/og-image.png'
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

onMounted(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Reveal Headings with Scale
    gsap.utils.toArray('.scale-reveal').forEach((el: any) => {
        gsap.fromTo(el,
            { scale: 0.9, opacity: 0, y: 30 },
            {
                scale: 1,
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    scroller: containerRef.value,
                    start: 'top 85%',
                }
            }
        )
    })
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
