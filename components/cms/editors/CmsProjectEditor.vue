<template>
    <div class="flex flex-col gap-8">
        <!-- Main Content Identity Section -->
        <section
            class="flex flex-col gap-10 bg-component/30 p-8 rounded-2xl border border-border/40 shadow-sm relative overflow-hidden group/identity">
            <div class="flex flex-col lg:flex-row gap-10">
                <!-- Core Details Grid -->
                <div class="flex-1 flex flex-col gap-8">
                    <div class="flex items-center gap-4">
                        <div class="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                            </svg>
                        </div>
                        <div>
                            <h3 class="text-xs font-black uppercase tracking-mega text-foreground/80">
                                Project Identity</h3>
                            <p class="text-xxs text-muted-foreground font-bold uppercase tracking-widest">
                                Base definition and identifiers</p>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="flex flex-col gap-2.5 md:col-span-2">
                            <label
                                class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">Entry
                                Title</label>
                            <input :value="modelValue.title"
                                @input="$emit('update:modelValue', { ...modelValue, title: ($event.target as HTMLInputElement).value })"
                                type="text" placeholder="The Next Great Innovation"
                                class="bg-background border border-border/60 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-all font-bold text-lg">
                        </div>
                        <div class="flex flex-col gap-2.5">
                            <label class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">Slug
                                (URL)</label>
                            <input :value="modelValue.slug"
                                @input="$emit('update:modelValue', { ...modelValue, slug: ($event.target as HTMLInputElement).value })"
                                type="text" placeholder="project-name"
                                class="bg-background border border-border/60 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-all font-mono text-sm">
                        </div>
                        <div class="flex flex-col gap-2.5">
                            <label
                                class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">Project
                                Year</label>
                            <input :value="modelValue.year"
                                @input="$emit('update:modelValue', { ...modelValue, year: ($event.target as HTMLInputElement).value })"
                                type="number" placeholder="2024"
                                class="bg-background border border-border/60 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-all">
                        </div>
                        <div class="flex flex-col gap-2.5">
                            <label
                                class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">Role</label>
                            <input :value="modelValue.role"
                                @input="$emit('update:modelValue', { ...modelValue, role: ($event.target as HTMLInputElement).value })"
                                type="text" placeholder="Lead Product Designer"
                                class="bg-background border border-border/60 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-all font-medium">
                        </div>
                    </div>
                </div>

                <!-- Cover Image Sidecar -->
                <div class="w-full lg:w-72 flex flex-col gap-4">
                    <label class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">Cover
                        Asset</label>
                    <div class="relative aspect-square rounded-2xl border border-border/40 bg-muted/20 overflow-hidden group/cover cursor-pointer hover:border-blue-500/50 transition-all"
                        @click="$emit('open-unsplash', 'coverImage')">
                        <img v-if="modelValue.coverImage" :src="modelValue.coverImage"
                            class="w-full h-full object-cover transition-transform group-hover/cover:scale-105">
                        <div v-else class="w-full h-full flex flex-col items-center justify-center gap-3 opacity-40">
                            <ImageIcon :size="24" />
                            <span class="text-xxs font-bold uppercase tracking-widest">Select
                                Image</span>
                        </div>
                        <div
                            class="absolute inset-0 bg-black/60 opacity-0 group-hover/cover:opacity-100 transition-opacity flex items-center justify-center">
                            <Pencil class="text-white" :size="20" />
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        <input :value="modelValue.coverImage"
                            @input="$emit('update:modelValue', { ...modelValue, coverImage: ($event.target as HTMLInputElement).value })"
                            type="text" placeholder="Image URL..."
                            class="flex-1 bg-background border border-border/60 rounded-lg px-4 py-2 text-xxs font-mono focus:outline-none focus:border-blue-500">
                        <label
                            class="cursor-pointer p-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                            title="Upload Local Image">
                            <input type="file" class="hidden" @change="$emit('upload-image', $event, 'coverImage')">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="17 8 12 3 7 8" />
                                <line x1="12" y1="3" x2="12" y2="15" />
                            </svg>
                        </label>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section 2: Technical Specs (Premium Compact Grid) -->
        <section class="p-8 bg-component/20 border border-border/40 rounded-2xl relative overflow-hidden group/specs">
            <div
                class="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-blue-500/20 to-transparent">
            </div>
            <div class="flex items-center gap-4 mb-8">
                <div class="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m18 16 4-4-4-4" />
                        <path d="m6 8-4 4 4 4" />
                        <path d="m14.5 4-5 16" />
                    </svg>
                </div>
                <div>
                    <h3 class="text-xs font-black uppercase tracking-mega text-foreground/80">
                        Engineering Blueprint
                    </h3>
                    <p class="text-xxs text-muted-foreground font-bold uppercase tracking-widest">
                        Stack,
                        performance, and accessibility</p>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div class="flex flex-col gap-1.5 lg:col-span-2">
                    <label class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">Technical
                        Stack</label>
                    <input v-model="techStackString" type="text" placeholder="Vue, Nuxt, GSAP, Supabase..."
                        class="bg-background border border-border/60 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-all text-sm font-medium">
                </div>
                <div class="flex flex-col gap-1.5">
                    <label class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">Repo
                        URL</label>
                    <input :value="modelValue.repositoryUrl"
                        @input="$emit('update:modelValue', { ...modelValue, repositoryUrl: ($event.target as HTMLInputElement).value })"
                        type="text" placeholder="GitHub link..."
                        class="bg-background border border-border/60 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-all text-xs font-mono">
                </div>
                <div class="flex flex-col gap-1.5">
                    <label class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">Live
                        Demo</label>
                    <input :value="modelValue.liveDemoUrl"
                        @input="$emit('update:modelValue', { ...modelValue, liveDemoUrl: ($event.target as HTMLInputElement).value })"
                        type="text" placeholder="Live site..."
                        class="bg-background border border-border/60 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-all text-xs font-mono">
                </div>
                <div class="flex flex-col gap-1.5 lg:col-span-2">
                    <label class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">Performance
                        Metrics</label>
                    <input :value="modelValue.performanceMetrics"
                        @input="$emit('update:modelValue', { ...modelValue, performanceMetrics: ($event.target as HTMLInputElement).value })"
                        type="text" placeholder="Lighthouse scores, render times..."
                        class="bg-background border border-border/60 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-all text-sm">
                </div>
                <div class="flex flex-col gap-1.5">
                    <label
                        class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">Industry</label>
                    <input :value="modelValue.industry"
                        @input="$emit('update:modelValue', { ...modelValue, industry: ($event.target as HTMLInputElement).value })"
                        type="text" placeholder="Fintech, SaaS..."
                        class="bg-background border border-border/60 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-all text-sm font-medium">
                </div>
                <div class="flex flex-col gap-1.5">
                    <label
                        class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">Duration</label>
                    <input :value="modelValue.duration"
                        @input="$emit('update:modelValue', { ...modelValue, duration: ($event.target as HTMLInputElement).value })"
                        type="text" placeholder="3 Months"
                        class="bg-background border border-border/60 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-all text-sm font-medium">
                </div>
            </div>
        </section>

        <!-- Legacy: Project Links & Assets -->
        <section class="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-component/30 p-8 rounded-2xl border border-border/40">
            <div class="flex flex-col gap-6">
                <div class="flex flex-col gap-2.5">
                    <label class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">
                        {{ modelValue.isFigma ? 'Figma File / Embed Link' : 'Project Link' }}
                    </label>
                    <input :value="modelValue.projectLink"
                        @input="$emit('update:modelValue', { ...modelValue, projectLink: ($event.target as HTMLInputElement).value })"
                        type="text" :placeholder="modelValue.isFigma ? 'https://www.figma.com/file/...' : 'https://...'"
                        class="bg-background border border-border/60 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-all font-mono text-xs">
                    <p class="text-xxs text-muted-foreground px-1">{{ projectLinkHelpText }}</p>
                </div>
                <div class="flex items-center gap-4 p-4 border border-border/60 rounded-xl bg-background/50">
                    <label class="flex items-center gap-3 cursor-pointer group">
                        <input :checked="modelValue.isFigma"
                            @change="$emit('update:modelValue', { ...modelValue, isFigma: ($event.target as HTMLInputElement).checked })"
                            type="checkbox" class="sr-only peer">
                        <div
                            class="w-10 h-6 bg-border rounded-full relative transition-colors peer-checked:bg-purple-600">
                            <div
                                class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4" />
                        </div>
                        <span
                            class="text-xxs font-bold uppercase tracking-widest text-muted-foreground group-hover:text-foreground">Embed
                            Figma Prototype</span>
                    </label>
                </div>
            </div>
        </section>

        <!-- Legacy: Product Strategy & Context -->
        <section class="flex flex-col gap-8 bg-component/30 p-8 rounded-2xl border border-border/40">
            <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                </div>
                <div>
                    <h3 class="text-xs font-black uppercase tracking-mega text-foreground/80">Product Strategy</h3>
                    <p class="text-xxs text-muted-foreground font-bold uppercase tracking-widest">Problem, Goals & Users
                    </p>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="flex flex-col gap-2.5 md:col-span-2">
                    <label class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">Problem
                        Statement</label>
                    <textarea :value="modelValue.problemStatement"
                        @input="$emit('update:modelValue', { ...modelValue, problemStatement: ($event.target as HTMLTextAreaElement).value })"
                        rows="3" placeholder="What user pain point are we solving?"
                        class="bg-background border border-border/60 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-sm leading-relaxed" />
                </div>
                <div class="flex flex-col gap-2.5">
                    <label class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">Business
                        Goal</label>
                    <textarea :value="modelValue.businessGoal"
                        @input="$emit('update:modelValue', { ...modelValue, businessGoal: ($event.target as HTMLTextAreaElement).value })"
                        rows="3" placeholder="Revenue, Acquisition, Retention..."
                        class="bg-background border border-border/60 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-sm leading-relaxed" />
                </div>
                <div class="flex flex-col gap-2.5">
                    <label class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">User
                        Goal</label>
                    <textarea :value="modelValue.userGoal"
                        @input="$emit('update:modelValue', { ...modelValue, userGoal: ($event.target as HTMLTextAreaElement).value })"
                        rows="3" placeholder="What is the user trying to achieve?"
                        class="bg-background border border-border/60 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-sm leading-relaxed" />
                </div>
                <div class="flex flex-col gap-2.5 md:col-span-2">
                    <label class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">Target
                        Users</label>
                    <textarea :value="modelValue.targetUsers"
                        @input="$emit('update:modelValue', { ...modelValue, targetUsers: ($event.target as HTMLTextAreaElement).value })"
                        rows="2" placeholder="Primary personas..."
                        class="bg-background border border-border/60 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-sm leading-relaxed" />
                </div>
            </div>
        </section>

        <!-- Legacy: Design Process & Visuals -->
        <section class="flex flex-col gap-8 bg-component/30 p-8 rounded-2xl border border-border/40">
            <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <path d="m14.31 8-5.74 9.94" />
                        <path d="M9.69 8h11.48" />
                    </svg>
                </div>
                <div>
                    <h3 class="text-xs font-black uppercase tracking-mega text-foreground/80">Design Process</h3>
                    <p class="text-xxs text-muted-foreground font-bold uppercase tracking-widest">Methods, Tools &
                        Artifacts</p>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="flex flex-col gap-2.5">
                    <label class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">Design
                        Approach</label>
                    <textarea :value="modelValue.designApproach"
                        @input="$emit('update:modelValue', { ...modelValue, designApproach: ($event.target as HTMLTextAreaElement).value })"
                        rows="3" placeholder="Methodology used..."
                        class="bg-background border border-border/60 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-sm leading-relaxed" />
                </div>
                <div class="flex flex-col gap-2.5">
                    <label class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">Research
                        Methods</label>
                    <textarea :value="modelValue.researchMethods"
                        @input="$emit('update:modelValue', { ...modelValue, researchMethods: ($event.target as HTMLTextAreaElement).value })"
                        rows="3" placeholder="Interviews, Surveys, Testing..."
                        class="bg-background border border-border/60 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-sm leading-relaxed" />
                </div>
                <div class="flex flex-col gap-2.5 md:col-span-2">
                    <label class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">Key
                        Insights</label>
                    <textarea :value="modelValue.keyInsights"
                        @input="$emit('update:modelValue', { ...modelValue, keyInsights: ($event.target as HTMLTextAreaElement).value })"
                        rows="3" placeholder="What did we learn?"
                        class="bg-background border border-border/60 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-sm leading-relaxed" />
                </div>
                <div class="flex flex-col gap-2.5 md:col-span-2">
                    <label class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">Design
                        Tools</label>
                    <input v-model="toolsString" type="text" placeholder="Figma, Principle, After Effects..."
                        class="bg-background border border-border/60 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-all text-sm font-medium">
                </div>
            </div>

            <!-- Wireframes Upload -->
            <div class="flex flex-col gap-4 pt-6 border-t border-border/20">
                <div class="flex justify-between items-center">
                    <label class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">Wireframes &
                        Sketches</label>
                    <label
                        class="cursor-pointer bg-muted hover:bg-muted/80 px-3 py-1.5 rounded-lg text-xxs font-bold uppercase transition-colors flex items-center gap-2">
                        <span>Upload</span>
                        <input type="file" multiple class="hidden"
                            @change="$emit('upload-image', $event, 'wireframes')">
                    </label>
                </div>
                <div v-if="modelValue.wireframes?.length" class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div v-for="(img, i) in modelValue.wireframes" :key="i"
                        class="relative group aspect-video bg-muted rounded-lg overflow-hidden border border-border/40">
                        <img :src="img" class="w-full h-full object-cover">
                        <button type="button"
                            @click="() => { const newArr = [...modelValue.wireframes]; newArr.splice(Number(i), 1); $emit('update:modelValue', { ...modelValue, wireframes: newArr }) }"
                            class="absolute top-1 right-1 bg-black/50 hover:bg-red-500 text-white p-1 rounded-md opacity-0 group-hover:opacity-100 transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path d="M18 6 6 18" />
                                <path d="m6 6 12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Final Designs Upload -->
            <div class="flex flex-col gap-4 pt-4 border-t border-border/20">
                <div class="flex justify-between items-center">
                    <label class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">Final Design
                        Gallery</label>
                    <label
                        class="cursor-pointer bg-muted hover:bg-muted/80 px-3 py-1.5 rounded-lg text-xxs font-bold uppercase transition-colors flex items-center gap-2">
                        <span>Upload</span>
                        <input type="file" multiple class="hidden"
                            @change="$emit('upload-image', $event, 'finalDesigns')">
                    </label>
                </div>
                <div v-if="modelValue.finalDesigns?.length" class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div v-for="(img, i) in modelValue.finalDesigns" :key="i"
                        class="relative group aspect-video bg-muted rounded-lg overflow-hidden border border-border/40">
                        <img :src="img" class="w-full h-full object-cover">
                        <button type="button"
                            @click="() => { const newArr = [...modelValue.finalDesigns]; newArr.splice(Number(i), 1); $emit('update:modelValue', { ...modelValue, finalDesigns: newArr }) }"
                            class="absolute top-1 right-1 bg-black/50 hover:bg-red-500 text-white p-1 rounded-md opacity-0 group-hover:opacity-100 transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path d="M18 6 6 18" />
                                <path d="m6 6 12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section 3: Technical Narrative -->
        <section class="flex flex-col gap-10 bg-component/30 p-8 rounded-2xl border border-border/40">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <div class="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                            <path d="M8 7h6" />
                            <path d="M8 11h8" />
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-xs font-black uppercase tracking-mega text-foreground/80">
                            Case Study Detail
                        </h3>
                        <p class="text-xxs text-muted-foreground font-bold uppercase tracking-widest">
                            Storytelling and implementation deep-dive</p>
                    </div>
                </div>
                <GeminiButton
                    @click="$emit('open-ai', { field: 'content.introduction', suggestion: 'Write a technical introduction for this project' })" />
            </div>

            <div class="flex flex-col gap-8">
                <div class="flex flex-col gap-2.5">
                    <label class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">The
                        Technical Challenge</label>
                    <textarea :value="modelValue.challenge"
                        @input="$emit('update:modelValue', { ...modelValue, challenge: ($event.target as HTMLTextAreaElement).value })"
                        rows="3" placeholder="Constraint, problem, or technical hurdle..."
                        class="bg-background border border-border/60 rounded-lg px-4 py-4 focus:outline-none focus:border-blue-500 transition-all text-sm leading-relaxed" />
                </div>
                <div class="flex flex-col gap-2.5">
                    <label
                        class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">Architectural
                        Decisions</label>
                    <textarea :value="modelValue.architecture"
                        @input="$emit('update:modelValue', { ...modelValue, architecture: ($event.target as HTMLTextAreaElement).value })"
                        rows="4" placeholder="Scalability, patterns, choice of tools..."
                        class="bg-background border border-border/60 rounded-lg px-4 py-4 focus:outline-none focus:border-blue-500 transition-all text-sm leading-relaxed" />
                </div>
                <div class="flex flex-col gap-2.5">
                    <label
                        class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">Implementation
                        Highlights</label>
                    <textarea :value="modelValue.implementationHighlights"
                        @input="$emit('update:modelValue', { ...modelValue, implementationHighlights: ($event.target as HTMLTextAreaElement).value })"
                        rows="4" placeholder="Key breakthroughs and optimizations..."
                        class="bg-background border border-border/60 rounded-lg px-4 py-4 focus:outline-none focus:border-blue-500 transition-all text-sm leading-relaxed" />
                </div>
            </div>
        </section>



        <!-- Legacy: Results & Impact -->
        <section class="flex flex-col gap-8 bg-component/30 p-8 rounded-2xl border border-border/40">
            <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                        <polyline points="16 7 22 7 22 13" />
                    </svg>
                </div>
                <div>
                    <h3 class="text-xs font-black uppercase tracking-mega text-foreground/80">Project Outcomes</h3>
                    <p class="text-xxs text-muted-foreground font-bold uppercase tracking-widest">Results & Reflection
                    </p>
                </div>
            </div>

            <div class="flex flex-col gap-6">
                <div class="flex flex-col gap-2.5">
                    <label class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">Solution
                        Summary</label>
                    <textarea :value="modelValue.solutionSummary"
                        @input="$emit('update:modelValue', { ...modelValue, solutionSummary: ($event.target as HTMLTextAreaElement).value })"
                        rows="3" placeholder="What was the final solution?"
                        class="bg-background border border-border/60 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-sm leading-relaxed" />
                </div>
                <div class="flex flex-col gap-2.5">
                    <label class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">Key
                        Outcomes</label>
                    <textarea :value="modelValue.outcome"
                        @input="$emit('update:modelValue', { ...modelValue, outcome: ($event.target as HTMLTextAreaElement).value })"
                        rows="3" placeholder="Impact, metrics, results..."
                        class="bg-background border border-border/60 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-sm leading-relaxed" />
                </div>
                <div class="flex flex-col gap-2.5">
                    <label
                        class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">Learnings</label>
                    <textarea :value="modelValue.learnings"
                        @input="$emit('update:modelValue', { ...modelValue, learnings: ($event.target as HTMLTextAreaElement).value })"
                        rows="3" placeholder="What would you do differently?"
                        class="bg-background border border-border/60 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-sm leading-relaxed" />
                </div>
            </div>
        </section>

        <!-- Section 4: Metadata & Visibility -->
        <section class="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-component/10 border border-border/20 rounded-2xl">
            <div class="flex flex-col gap-3">
                <label class="text-xxs font-black uppercase tracking-widest text-muted-foreground px-1">Tags
                    (Visibility)</label>
                <input v-model="tagsString" type="text" placeholder="Design, Engineering, Mobile..."
                    class="bg-background/50 border border-border/40 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-all text-sm">
            </div>
            <div class="flex items-center gap-10">
                <label class="flex items-center gap-3 cursor-pointer group">
                    <input :checked="modelValue.featured"
                        @change="$emit('update:modelValue', { ...modelValue, featured: ($event.target as HTMLInputElement).checked })"
                        type="checkbox" class="sr-only peer">
                    <div class="w-8 h-4 bg-border rounded-full relative transition-colors peer-checked:bg-blue-600">
                        <div
                            class="absolute left-1 top-1 w-2 h-2 bg-white rounded-full transition-transform peer-checked:translate-x-4" />
                    </div>
                    <span
                        class="text-xxs font-black uppercase tracking-widest text-muted-foreground group-hover:text-foreground">Featured</span>
                </label>
                <label class="flex items-center gap-3 cursor-pointer group">
                    <input :checked="modelValue.hidden"
                        @change="$emit('update:modelValue', { ...modelValue, hidden: ($event.target as HTMLInputElement).checked })"
                        type="checkbox" class="sr-only peer">
                    <div class="w-8 h-4 bg-border rounded-full relative transition-colors peer-checked:bg-red-500">
                        <div
                            class="absolute left-1 top-1 w-2 h-2 bg-white rounded-full transition-transform peer-checked:translate-x-4" />
                    </div>
                    <span
                        class="text-xxs font-black uppercase tracking-widest text-muted-foreground group-hover:text-foreground">Archive</span>
                </label>
            </div>


        </section>

        <!-- Sticky Action Bar -->
        <div
            class="sticky bottom-0 z-10 flex items-center justify-between p-4 bg-background/80 backdrop-blur-md border-t border-border/60 -mx-8 -mb-8 mt-8 rounded-b-2xl">
            <button @click="$emit('cancel')" type="button"
                class="px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
                Cancel
            </button>
            <button @click="$emit('save')" type="button" :disabled="isUploading"
                class="px-8 py-2.5 rounded-xl bg-foreground text-background font-black text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-lg shadow-black/5 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed">
                <span v-if="isUploading"
                    class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {{ isUploading ? 'Saving...' : 'Save Changes' }}
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ImageIcon, Pencil } from 'lucide-vue-next'
import GeminiButton from '@/components/cms/GeminiButton.vue'

const props = defineProps<{
    modelValue: any
    isUploading?: boolean
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: any): void
    (e: 'open-ai', payload: { field: string, suggestion: string }): void
    (e: 'open-unsplash', target: string): void
    (e: 'upload-image', event: Event, field: string): void
    (e: 'save'): void
    (e: 'cancel'): void
}>()

const techStackString = computed({
    get: () => Array.isArray(props.modelValue.techStack) ? props.modelValue.techStack.join(', ') : (props.modelValue.techStack || ''),
    set: (val: string) => {
        const arr = val.split(',').map(s => s.trim()).filter(Boolean)
        emit('update:modelValue', { ...props.modelValue, techStack: arr })
    }
})

const tagsString = computed({
    get: () => Array.isArray(props.modelValue.tags) ? props.modelValue.tags.join(', ') : (props.modelValue.tags || ''),
    set: (val: string) => {
        const arr = val.split(',').map(s => s.trim()).filter(Boolean)
        emit('update:modelValue', { ...props.modelValue, tags: arr })
    }
})

const toolsString = computed({
    get: () => Array.isArray(props.modelValue.tools) ? props.modelValue.tools.join(', ') : (props.modelValue.tools || ''),
    set: (val: string) => {
        const arr = val.split(',').map(s => s.trim()).filter(Boolean)
        emit('update:modelValue', { ...props.modelValue, tools: arr })
    }
})

const projectLinkHelpText = computed(() => {
    return props.modelValue.isFigma
        ? 'Paste the direct Figma file link or embed code. We will handle the generation.'
        : 'Enter the public URL for the live project or case study.'
})
</script>
