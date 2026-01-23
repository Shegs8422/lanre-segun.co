<template>
    <div class="min-h-screen bg-background text-foreground font-sans selection:bg-neutral-800">

        <!-- Full Page Initial Loader (Stops FOUC) -->
        <div v-if="loading" class="fixed inset-0 z-200 flex items-center justify-center"
            style="background-color: #0A0A0A;">
            <div class="flex flex-col items-center gap-6">
                <div class="relative">
                    <div class="w-16 h-16 rounded-full border-t-2 border-r-2 border-blue-600 animate-spin" />
                    <div class="absolute inset-0 flex items-center justify-center">
                        <svg class="w-6 h-6 text-blue-600/50 animate-pulse" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L14.85 9.15L22 12L14.85 14.85L12 22L9.15 14.85L2 12L9.15 9.15L12 2Z" />
                        </svg>
                    </div>
                </div>
                <div class="flex flex-col items-center gap-1">
                    <p class="text-[11px] font-black uppercase tracking-[0.4em] text-foreground/80">Synchronizing</p>
                    <p class="text-[9px] font-bold uppercase tracking-mega text-muted-foreground/60">CMS Control
                        Center</p>
                </div>
            </div>
        </div>

        <!-- Toast Notification -->
        <Transition name="toast">
            <div v-if="toast.show"
                class="fixed top-20 lg:top-6 right-6 z-200 flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl border backdrop-blur-md min-w-[300px] lg:min-w-[320px]"
                :class="toastClasses">
                <div class="shrink-0">
                    <svg v-if="toast.type === 'success'" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"
                        stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <svg v-else-if="toast.type === 'error'" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"
                        stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="15" y1="9" x2="9" y2="15" />
                        <line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"
                        stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                </div>
                <div class="grow">
                    <p class="text-sm font-bold tracking-tight">{{ toast.title }}</p>
                    <p class="text-xs opacity-80">{{ toast.message }}</p>
                </div>
                <button class="opacity-50 hover:opacity-100 transition-opacity" @click="toast.show = false">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
            </div>
        </Transition>

        <template v-if="!loading">
            <!-- Mobile Header Toggle -->
            <div
                class="lg:hidden fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-md border-b border-border z-160 flex items-center justify-between px-6 transition-colors">
                <h1 class="text-xl font-display font-medium tracking-tight text-foreground">Local CMS</h1>
                <button class="p-2 -mr-2 text-muted-foreground hover:text-foreground"
                    @click="isSidebarOpen = !isSidebarOpen">
                    <svg v-if="!isSidebarOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                    <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <!-- Sidebar Overlay -->
            <div v-show="isSidebarOpen"
                class="lg:hidden fixed inset-0 bg-black/40 dark:bg-black/60 z-140 backdrop-blur-sm transition-opacity duration-300"
                @click="isSidebarOpen = false" />

            <!-- Sidebar / Nav -->
            <aside :class="['fixed left-0 top-0 h-full w-72 bg-background border-r border-border z-50 transition-transform duration-500 lg:translate-x-0 overflow-hidden flex flex-col',
                isSidebarOpen ? 'translate-x-0' : '-translate-x-full']">

                <!-- Sidebar Header -->
                <div class="h-20 shrink-0 flex items-center px-8 border-b border-border/40">
                    <div class="flex flex-col gap-0.5">
                        <h1 class="text-xl font-display font-black tracking-tight text-foreground">Local CMS</h1>
                        <span class="text-xxs uppercase font-bold tracking-widest text-muted-foreground/60">Control
                            Center</span>
                    </div>
                </div>

                <!-- Navigation -->
                <nav class="flex-1 overflow-y-auto px-4 py-8 flex flex-col gap-2">
                    <p class="px-4 text-[11px] font-bold uppercase tracking-widest text-muted-foreground/40 mb-2">Manage
                    </p>

                    <button
                        class="w-full px-4 py-3 rounded-xl text-left transition-all duration-200 flex items-center gap-3.5 group relative overflow-hidden"
                        :class="activeTab === 'blog' ? 'bg-foreground text-background font-medium shadow-md' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'"
                        @click="handleTabChange('blog')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="transition-opacity"
                            :class="activeTab === 'blog' ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'">
                            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                            <polyline points="14 2 14 8 20 8" />
                        </svg>
                        <span class="text-sm">Blog Posts</span>
                    </button>

                    <button
                        class="w-full px-4 py-3 rounded-xl text-left transition-all duration-200 flex items-center gap-3.5 group relative overflow-hidden"
                        :class="activeTab === 'projects' ? 'bg-foreground text-background font-medium shadow-md' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'"
                        @click="handleTabChange('projects')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="transition-opacity"
                            :class="activeTab === 'projects' ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'">
                            <path d="M12 2H2v10h10V2zM12 12H2v10h10V12zM22 2h-10v10h10V2zM22 12h-10v10h10V12z" />
                        </svg>
                        <span class="text-sm">Projects</span>
                    </button>

                    <button
                        class="w-full px-4 py-3 rounded-xl text-left transition-all duration-200 flex items-center gap-3.5 group relative overflow-hidden"
                        :class="activeTab === 'gallery' ? 'bg-foreground text-background font-medium shadow-md' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'"
                        @click="handleTabChange('gallery')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="transition-opacity"
                            :class="activeTab === 'gallery' ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                        </svg>
                        <span class="text-sm">Gallery</span>
                    </button>
                </nav>

                <!-- Sidebar Footer -->
                <div class="p-6 border-t border-border/40 bg-muted/5">
                    <NuxtLink to="/"
                        class="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-background border border-border hover:border-foreground/20 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-all group shadow-sm hover:shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
                            class="opacity-60 group-hover:opacity-100 transition-transform group-hover:-translate-x-1">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                        Back to Website
                    </NuxtLink>
                </div>
            </aside>

            <!-- Main Content -->
            <!-- Main Content -->
            <main
                class="flex-1 lg:ml-72 h-screen overflow-hidden flex flex-col transition-all duration-500 relative bg-background">
                <!-- Items List View -->
                <div v-if="view === 'list'" class="flex-1 overflow-y-auto p-6 lg:p-12">
                    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                        <div class="flex flex-col gap-1">
                            <h2 class="text-2xl lg:text-3xl font-bold tracking-tight text-foreground">{{ cmsHeaderTitle
                            }}</h2>
                            <p class="text-xs text-muted-foreground font-medium">Manage and curate your {{
                                activeTabLabel.toLowerCase() }} collection</p>
                        </div>
                        <button
                            class="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2.5 active:scale-95 group"
                            @click="createNew">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"
                                stroke-linejoin="round" class="group-hover:rotate-90 transition-transform duration-300">
                                <line x1="12" y1="5" x2="12" y2="19" />
                                <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                            <span class="uppercase tracking-widest text-[11px]">New {{ activeTabLabel }}</span>
                        </button>
                    </div>

                    <div class="mt-10 flex flex-col gap-4">
                        <!-- Gallery View -->
                        <div v-if="activeTab === 'gallery'"
                            class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            <div v-for="item in galleryItems" :key="item.id"
                                class="group relative aspect-4/3 bg-muted rounded-xl overflow-hidden border border-border">
                                <img :src="item.url"
                                    class="w-full h-full object-cover transition-transform duration-500">
                                <div
                                    class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                                    <button
                                        class="w-full py-2 bg-red-500 text-white text-xs font-bold rounded-lg hover:bg-red-600 transition-colors"
                                        @click="deleteItem(item, 'gallery')">Delete</button>
                                </div>
                            </div>
                            <button
                                class="aspect-4/3 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-3 hover:bg-muted/50 transition-all group bg-component/10"
                                @click="(($refs.massGalleryInput as any).click())">
                                <div
                                    class="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"
                                        stroke-linejoin="round">
                                        <line x1="12" y1="5" x2="12" y2="19" />
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                    </svg>
                                </div>
                                <span
                                    class="text-xxs font-black text-muted-foreground tracking-mega uppercase group-hover:text-foreground transition-colors">Add
                                    Photos</span>
                                <input ref="massGalleryInput" type="file" class="hidden" multiple accept="image/*"
                                    @change="handleImageUpload($event, 'massGallery')">
                            </button>
                        </div>

                        <!-- Blog/Projects View -->
                        <template v-else>
                            <div v-for="item in activeItems" :key="item.slug"
                                class="p-5 rounded-2xl border border-border bg-component/50 dark:bg-white/2 shadow-sm hover:shadow-md hover:border-blue-500/40 transition-all flex flex-col sm:flex-row justify-between sm:items-center gap-4 group">
                                <div class="flex flex-col gap-1.5 grow">
                                    <div class="flex items-center gap-2">
                                        <h3
                                            class="font-bold text-base lg:text-lg text-foreground group-hover:text-blue-500 transition-colors leading-tight">
                                            {{ item.title }}</h3>
                                        <NuxtLink
                                            :to="activeTab === 'blog' ? `/blog/${item.slug}` : `/projects/${item.slug}`"
                                            target="_blank"
                                            class="p-1.5 text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10 rounded-lg transition-all">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                                                stroke-linecap="round" stroke-linejoin="round">
                                                <path
                                                    d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" />
                                            </svg>
                                        </NuxtLink>
                                    </div>
                                    <div class="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                                        <span class="px-2 py-0.5 bg-muted rounded uppercase tracking-wider">{{ item.year
                                        }}</span>
                                        <span class="opacity-40">•</span>
                                        <span class="font-mono text-xxs">{{ item.slug }}</span>
                                    </div>
                                </div>
                                <div class="flex items-center gap-3">
                                    <button
                                        class="flex-1 lg:flex-initial text-sm font-bold px-4 py-2 rounded-lg bg-muted text-foreground hover:bg-foreground hover:text-background transition-all"
                                        @click="editItem(item)">Edit</button>
                                    <button
                                        class="flex-1 lg:flex-initial text-sm font-bold px-4 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                                        @click="deleteItem(item, (activeTab === 'blog' ? 'post' : 'project'))">Delete</button>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>

                <!-- Editor View -->
                <div v-else class="flex-1 overflow-y-auto p-6 lg:p-12 relative">
                    <div class="flex items-center gap-4 mb-8 max-w-5xl mx-auto">
                        <button
                            class="p-2 bg-muted hover:bg-accent rounded-full transition-colors text-muted-foreground hover:text-foreground"
                            @click="view = 'list'">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path d="M19 12H5" />
                                <path d="M12 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <h2 class="text-xl lg:text-2xl font-bold text-foreground">{{ editHeaderTitle }}</h2>
                    </div>

                    <form class="flex flex-col gap-10 lg:max-w-5xl pb-32 mx-auto" @submit.prevent="saveItem">
                        <!-- Immersive Blog Header (Blog only) -->
                        <section v-if="activeTab === 'blog'"
                            class="flex flex-col gap-12 bg-transparent p-0 border-none shadow-none relative max-w-3xl mx-auto w-full">

                            <!-- Cover Image Dropzone -->
                            <div class="relative group/cover w-full aspect-21/9 bg-muted/30 rounded-3xl overflow-hidden border-2 border-dashed border-border/50 hover:border-blue-500/50 transition-all cursor-pointer"
                                @click="(($refs.coverInput as any).click())">
                                <img v-if="formData.coverImage" :src="formData.coverImage"
                                    class="w-full h-full object-cover transition-transform duration-700">
                                <div v-else
                                    class="absolute inset-0 flex flex-col items-center justify-center gap-4 text-muted-foreground">
                                    <div
                                        class="w-16 h-16 rounded-full bg-muted flex items-center justify-center transition-transform">
                                        <ImageIcon :size="32" class="opacity-30" />
                                    </div>
                                    <span class="text-sm font-bold uppercase tracking-widest">Add a header image</span>
                                </div>
                                <div v-if="formData.coverImage"
                                    class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span
                                        class="text-white font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                                        <Pencil :size="16" />
                                        Change Header
                                    </span>
                                </div>
                                <input ref="coverInput" type="file" class="hidden" accept="image/*"
                                    @change="handleImageUpload($event, 'coverImage')">
                            </div>

                            <!-- Title & Subtitle center -->
                            <div class="flex flex-col gap-6">
                                <textarea v-model="formData.title" rows="1" placeholder="Blog Post Title"
                                    class="w-full bg-transparent text-5xl lg:text-6xl font-black placeholder:text-muted-foreground/20 border-none outline-none focus:ring-0 p-0 text-foreground tracking-tight resize-none overflow-hidden"
                                    @input="autoResizeTextarea($event)" />

                                <textarea v-model="formData.subtitle" rows="1"
                                    placeholder="An interesting subtitle for your story..."
                                    class="w-full bg-transparent text-xl lg:text-2xl text-muted-foreground font-medium placeholder:text-muted-foreground/20 border-none outline-none focus:ring-0 p-0 italic resize-none overflow-hidden"
                                    @input="autoResizeTextarea($event)" />
                            </div>

                            <!-- Meta Grid (Subtle) -->
                            <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-border/50">
                                <div class="flex flex-col gap-2">
                                    <label
                                        class="text-xxs font-black uppercase tracking-widest text-muted-foreground">Identifier</label>
                                    <input v-model="formData.slug" type="text" placeholder="slug"
                                        class="bg-transparent border-none p-0 text-sm font-mono text-blue-500 outline-none">
                                </div>
                                <div class="flex flex-col gap-2">
                                    <label
                                        class="text-xxs font-black uppercase tracking-widest text-muted-foreground">Year</label>
                                    <input v-model="formData.year" type="text" placeholder="2024"
                                        class="bg-transparent border-none p-0 text-sm font-bold outline-none">
                                </div>
                                <div class="flex flex-col gap-2">
                                    <label
                                        class="text-xxs font-black uppercase tracking-widest text-muted-foreground">Reading
                                        Time</label>
                                    <input v-model="formData.readingTime" type="text" placeholder="5 min read"
                                        class="bg-transparent border-none p-0 text-sm font-bold outline-none">
                                </div>
                                <div class="flex flex-col gap-2 items-end justify-center">
                                    <label class="flex items-center gap-2 cursor-pointer group">
                                        <input v-model="formData.featured" type="checkbox" class="sr-only peer">
                                        <div
                                            class="w-8 h-4 bg-border rounded-full relative transition-colors peer-checked:bg-blue-600">
                                            <div
                                                class="absolute left-1 top-1 w-2 h-2 bg-white rounded-full transition-transform peer-checked:translate-x-4" />
                                        </div>
                                        <span
                                            class="text-xxs font-black uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors">Featured</span>
                                    </label>
                                </div>
                            </div>
                        </section>

                        <!-- Basic Metadata (Projects only) -->
                        <section v-if="activeTab === 'projects'"
                            class="flex flex-col gap-10 bg-component p-8 lg:p-10 rounded-[2.5rem] border border-border/60 shadow-sm relative overflow-hidden group/section">
                            <div
                                class="absolute top-0 left-0 w-1 h-full bg-blue-600 opacity-0 group-focus-within/section:opacity-100 transition-opacity" />
                            <div class="flex items-center gap-4">
                                <div
                                    class="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 shadow-inner">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
                                        stroke-linejoin="round">
                                        <path
                                            d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                                        <polyline points="14 2 14 8 20 8" />
                                    </svg>
                                </div>
                                <div class="flex flex-col gap-0.5">
                                    <h3 class="text-sm font-black uppercase tracking-mega text-foreground/80">Basic
                                        Metadata</h3>
                                    <p class="text-xxs text-muted-foreground font-bold uppercase tracking-widest">
                                        Core project
                                        identification</p>
                                </div>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div class="flex flex-col gap-2.5">
                                    <label
                                        class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">Display
                                        Title</label>
                                    <input v-model="formData.title" type="text" required placeholder="Project Title"
                                        class="cms-input bg-background border-2 border-border rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-foreground font-medium">
                                </div>
                                <div class="flex flex-col gap-2.5">
                                    <label
                                        class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">Identifier
                                        (Slug)</label>
                                    <input v-model="formData.slug" type="text" required placeholder="project-slug"
                                        class="cms-input bg-background border-2 border-border rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-foreground font-mono">
                                </div>
                                <div class="flex flex-col gap-2.5">
                                    <label
                                        class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">Short
                                        Subtitle</label>
                                    <input v-model="formData.subtitle" type="text" placeholder="Project Subtitle"
                                        class="cms-input bg-background border-2 border-border rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-foreground font-medium">
                                </div>
                                <div class="flex flex-col gap-2.5">
                                    <label
                                        class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">Publication
                                        Year</label>
                                    <input v-model="formData.year" type="text" placeholder="2024"
                                        class="cms-input bg-background border-2 border-border rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-foreground font-medium">
                                </div>
                                <div class="flex flex-col gap-3 lg:col-span-2">
                                    <div class="flex justify-between items-center px-1">
                                        <label
                                            class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">Featured
                                            Image / Cover</label>
                                        <button type="button" :disabled="isUploading"
                                            class="text-[11px] font-bold text-blue-500 uppercase flex items-center gap-1.5 hover:text-blue-400"
                                            @click="(($refs.coverInput as any).click())">
                                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                            </svg>
                                            {{ isUploading ? 'Uploading...' : 'Upload Image' }}
                                        </button>
                                        <input ref="coverInput" type="file" class="hidden" accept="image/*"
                                            @change="handleImageUpload($event, 'coverImage')">
                                    </div>
                                    <input v-model="formData.coverImage" type="text" placeholder="https://..."
                                        class="cms-input bg-background border-2 border-border rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-foreground font-mono text-sm leading-relaxed">
                                </div>
                            </div>
                        </section>

                        <!-- Content Metadata (Shared) -->
                        <section v-if="activeTab !== 'gallery'"
                            class="flex flex-col gap-10 bg-component p-8 lg:p-10 rounded-[2.5rem] border border-border/60 shadow-sm relative overflow-hidden group/section">
                            <div
                                class="absolute top-0 left-0 w-1 h-full bg-blue-600 opacity-0 group-focus-within/section:opacity-100 transition-opacity" />
                            <div class="flex items-center gap-4">
                                <div
                                    class="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 shadow-inner">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
                                        stroke-linejoin="round">
                                        <path
                                            d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
                                        <path d="M12 10v6" />
                                        <path d="M9 13h6" />
                                    </svg>
                                </div>
                                <div class="flex flex-col gap-0.5">
                                    <h3 class="text-sm font-black uppercase tracking-mega text-foreground/80">
                                        Additional Details</h3>
                                    <p class="text-xxs text-muted-foreground font-bold uppercase tracking-widest">
                                        Tags and visibility</p>
                                </div>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div class="flex flex-col gap-2.5">
                                    <label
                                        class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">Tags</label>
                                    <input v-model="tagsInput" type="text" placeholder="Design, Tech, Life..."
                                        class="cms-input bg-background border-2 border-border rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-foreground font-medium">
                                </div>

                                <div v-if="activeTab === 'projects'" class="flex flex-col gap-2.5">
                                    <label
                                        class="text-xs font-bold uppercase tracking-wider text-muted-foreground">Featured
                                        State</label>
                                    <label class="relative inline-flex items-center cursor-pointer mt-2">
                                        <input v-model="formData.featured" type="checkbox" class="sr-only peer">
                                        <div
                                            class="w-11 h-6 bg-border rounded-full peer peer-checked:bg-blue-600 appearance-none after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
                                        <span class="ml-3 text-xs font-bold uppercase text-muted-foreground">Featured
                                            Project</span>
                                    </label>
                                </div>

                                <div class="flex items-center gap-6 mt-2 col-span-2 bg-foreground/5 p-4 rounded-2xl">
                                    <label class="relative inline-flex items-center cursor-pointer">
                                        <input v-model="formData.hidden" type="checkbox" class="sr-only peer">
                                        <div
                                            class="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500" />
                                        <span
                                            class="ml-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Hidden
                                            / Draft</span>
                                    </label>
                                </div>
                            </div>
                        </section>

                        <!-- Content Section -->
                        <section
                            class="flex flex-col gap-10 bg-component p-8 lg:p-10 rounded-[2.5rem] border border-border/60 shadow-sm relative overflow-hidden group/section">
                            <div
                                class="absolute top-0 left-0 w-1 h-full bg-emerald-600 opacity-0 group-focus-within/section:opacity-100 transition-opacity" />
                            <div class="flex items-center gap-4">
                                <div
                                    class="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shadow-inner">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
                                        stroke-linejoin="round">
                                        <path d="M11 4H4v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                    </svg>
                                </div>
                                <div class="flex flex-col gap-0.5">
                                    <h3 class="text-sm font-black uppercase tracking-mega text-foreground/80">Rich
                                        Content</h3>
                                    <p class="text-xxs text-muted-foreground font-bold uppercase tracking-widest">
                                        Storytelling and
                                        case study details</p>
                                </div>
                            </div>

                            <div v-if="activeTab === 'blog'" class="flex flex-col gap-8">
                                <label
                                    class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">Excerpt
                                    (Card Preview)</label>
                                <textarea v-model="formData.excerpt" rows="2" placeholder="Brief summary of the note..."
                                    class="cms-input bg-background border-2 border-border rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-foreground leading-relaxed" />
                                <div class="flex flex-col gap-2.5 mt-8">
                                    <div class="flex justify-between items-center px-1">
                                        <label
                                            class="text-xs font-bold uppercase tracking-wider text-muted-foreground">Body
                                            Text (Supports Markdown)</label>
                                        <div class="flex items-center gap-3">
                                            <GeminiButton
                                                @click="openFieldAiModal('content', 'Draft a professional and detailed post about this topic')" />
                                            <button type="button" :disabled="isUploading"
                                                class="text-[11px] font-bold text-blue-500 uppercase flex items-center gap-1.5 hover:text-blue-400"
                                                @click="(($refs.noteImageInput as any).click())">
                                                <svg class="w-3 h-3" fill="none" stroke="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2.5"
                                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h14a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                Insert Image
                                            </button>
                                        </div>
                                        <input ref="noteImageInput" type="file" class="hidden" accept="image/*"
                                            @change="handleImageUpload($event, 'noteContent')">
                                    </div>
                                    <div class="min-h-[500px]">
                                        <ContentBuilder v-model="formData.content" />
                                    </div>
                                </div>
                            </div>

                            <div v-if="activeTab === 'projects'" class="flex flex-col gap-10">
                                <!-- Core Details -->
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div class="flex flex-col gap-2.5">
                                        <label
                                            class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">Client
                                            Name</label>
                                        <input v-model="formData.client" type="text"
                                            class="cms-input bg-background border-2 border-border rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-foreground font-medium">
                                    </div>
                                    <div class="flex flex-col gap-2.5">
                                        <label
                                            class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">Role</label>
                                        <input v-model="formData.role" type="text" placeholder="Lead Product Designer"
                                            class="cms-input bg-background border-2 border-border rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-foreground font-medium">
                                    </div>
                                    <div class="flex flex-col gap-2.5">
                                        <label
                                            class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">Industry</label>
                                        <input v-model="formData.industry" type="text" placeholder="Fintech, SaaS, etc."
                                            class="cms-input bg-background border-2 border-border rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-foreground font-medium">
                                    </div>
                                    <div class="flex flex-col gap-2.5">
                                        <label
                                            class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">Duration</label>
                                        <input v-model="formData.duration" type="text" placeholder="3 Months"
                                            class="cms-input bg-background border-2 border-border rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-foreground font-medium">
                                    </div>
                                    <div class="flex flex-col gap-2.5">
                                        <label
                                            class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">Team
                                            Size</label>
                                        <input v-model="formData.teamSize" type="text" placeholder="5 Members"
                                            class="cms-input bg-background border-2 border-border rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-foreground font-medium">
                                    </div>
                                    <div class="flex flex-col gap-2.5 md:col-span-2 pt-4">
                                        <div class="flex flex-col gap-4">
                                            <div class="flex items-center justify-between px-1">
                                                <label
                                                    class="text-xs font-bold uppercase tracking-wider text-muted-foreground">External
                                                    Project Link</label>
                                                <div class="flex items-center gap-4">
                                                    <label class="flex items-center gap-2 cursor-pointer group">
                                                        <input v-model="formData.isFigma" type="radio" :value="false"
                                                            class="hidden">
                                                        <div class="w-3.5 h-3.5 rounded-full border-2 border-border flex items-center justify-center transition-all group-hover:border-blue-500"
                                                            :class="{ 'bg-blue-500 border-blue-500': !formData.isFigma }">
                                                            <div v-show="!formData.isFigma"
                                                                class="w-1 h-1 rounded-full bg-white" />
                                                        </div>
                                                        <span
                                                            class="text-xxs font-black uppercase tracking-widest transition-colors"
                                                            :class="formData.isFigma ? 'text-muted-foreground' : 'text-blue-500'">Live
                                                            Website</span>
                                                    </label>

                                                    <label class="flex items-center gap-2 cursor-pointer group">
                                                        <input v-model="formData.isFigma" type="radio" :value="true"
                                                            class="hidden">
                                                        <div class="w-3.5 h-3.5 rounded-full border-2 border-border flex items-center justify-center transition-all group-hover:border-blue-500"
                                                            :class="{ 'bg-blue-500 border-blue-500': formData.isFigma }">
                                                            <div v-show="formData.isFigma"
                                                                class="w-1 h-1 rounded-full bg-white" />
                                                        </div>
                                                        <span
                                                            class="text-xxs font-black uppercase tracking-widest transition-colors"
                                                            :class="!formData.isFigma ? 'text-muted-foreground' : 'text-blue-500'">Figma
                                                            File Preview</span>
                                                    </label>
                                                </div>
                                            </div>
                                            <input v-model="formData.projectLink" type="text" placeholder="https://..."
                                                class="cms-input bg-background border-2 border-border rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-foreground font-mono text-sm leading-relaxed">
                                            <p class="text-xxs text-muted-foreground px-1 font-medium italic">
                                                {{ projectLinkHelpText }}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Narrative / Strategy -->
                                <div class="flex flex-col gap-8 pt-6 border-t border-border">
                                    <h4 class="text-sm font-bold uppercase tracking-widest text-blue-500">Project
                                        Narrative</h4>

                                    <label
                                        class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">Project
                                        Introduction</label>
                                    <textarea v-model="formData.content.introduction" rows="3"
                                        placeholder="A brief hook about the project..."
                                        class="cms-input bg-background border-2 border-border rounded-xl px-4 py-4 focus:outline-none focus:border-blue-500 transition-all text-foreground text-sm leading-relaxed" />

                                    <div class="flex flex-col gap-2.5">
                                        <label
                                            class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">Problem
                                            Statement</label>
                                        <textarea v-model="formData.problemStatement" rows="3"
                                            placeholder="What challenge were we solving?"
                                            class="cms-input bg-background border-2 border-border rounded-xl px-4 py-4 focus:outline-none focus:border-blue-500 transition-all text-foreground text-sm leading-relaxed" />
                                    </div>

                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div class="flex flex-col gap-2.5">
                                            <label
                                                class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">Business
                                                Goal</label>
                                            <textarea v-model="formData.businessGoal" rows="2"
                                                class="cms-input bg-background border-2 border-border rounded-xl px-4 py-4 focus:outline-none focus:border-blue-500 transition-all text-foreground text-sm leading-relaxed" />
                                        </div>
                                        <div class="flex flex-col gap-2.5">
                                            <label
                                                class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">User
                                                Goal</label>
                                            <textarea v-model="formData.userGoal" rows="2"
                                                class="cms-input bg-background border-2 border-border rounded-xl px-4 py-4 focus:outline-none focus:border-blue-500 transition-all text-foreground text-sm leading-relaxed" />
                                        </div>
                                    </div>

                                    <div class="flex flex-col gap-2.5">
                                        <label
                                            class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">Design
                                            Approach</label>
                                        <textarea v-model="formData.designApproach" rows="3"
                                            class="cms-input bg-background border-2 border-border rounded-xl px-4 py-4 focus:outline-none focus:border-blue-500 transition-all text-foreground text-sm leading-relaxed" />
                                    </div>

                                    <div class="flex flex-col gap-2.5">
                                        <label
                                            class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">Target
                                            Users</label>
                                        <input v-model="formData.targetUsers" type="text"
                                            placeholder="Gen Z, Professionals, etc."
                                            class="cms-input bg-background border-2 border-border rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-foreground text-sm">
                                    </div>

                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div class="flex flex-col gap-2.5">
                                            <label
                                                class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">Research
                                                Methods</label>
                                            <textarea v-model="formData.researchMethods" rows="2"
                                                class="cms-input bg-background border-2 border-border rounded-xl px-4 py-4 focus:outline-none focus:border-blue-500 transition-all text-foreground text-sm leading-relaxed" />
                                        </div>
                                        <div class="flex flex-col gap-2.5">
                                            <label
                                                class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">Key
                                                Insights</label>
                                            <textarea v-model="formData.keyInsights" rows="2"
                                                class="cms-input bg-background border-2 border-border rounded-xl px-4 py-4 focus:outline-none focus:border-blue-500 transition-all text-foreground text-sm leading-relaxed" />
                                        </div>
                                    </div>
                                </div>

                                <!-- Assets & Metadata -->
                                <div class="flex flex-col gap-8 pt-6 border-t border-border">
                                    <h4 class="text-sm font-bold uppercase tracking-widest text-blue-500">Assets & Tools
                                    </h4>

                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div class="flex flex-col gap-2.5">
                                            <label
                                                class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">Tags
                                                (Comma Separated)</label>
                                            <input v-model="tagsInput" type="text"
                                                placeholder="Design System, SaaS, React"
                                                class="cms-input bg-background border-2 border-border rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-foreground">
                                        </div>
                                        <div class="flex flex-col gap-2.5">
                                            <label
                                                class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">Tools
                                                (Comma Separated)</label>
                                            <input v-model="toolsInput" type="text"
                                                placeholder="Figma, Adobe, Midjourney"
                                                class="cms-input bg-background border-2 border-border rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-foreground">
                                        </div>
                                    </div>

                                    <div class="flex flex-col gap-4">
                                        <div class="flex justify-between items-end px-1">
                                            <label
                                                class="text-xs font-bold uppercase tracking-wider text-muted-foreground">Gallery
                                                Assets (Wireframes)</label>
                                            <button type="button" :disabled="isUploading"
                                                class="text-[11px] font-bold text-blue-500 uppercase bg-blue-500/10 px-4 py-1.5 rounded-full hover:bg-blue-500/20 transition-colors"
                                                @click="(($refs.galleryInput as any).click())">
                                                Add to Gallery
                                            </button>
                                            <input ref="galleryInput" type="file" class="hidden" multiple
                                                accept="image/*" @change="handleImageUpload($event, 'wireframes')">
                                        </div>
                                        <textarea v-model="wireframesInput" rows="4"
                                            placeholder="Full URLs to images, one per line"
                                            class="cms-input bg-background border-2 border-border rounded-xl px-4 py-4 focus:outline-none focus:border-blue-500 transition-all text-foreground font-mono text-sm leading-relaxed" />
                                    </div>

                                    <div class="flex flex-col gap-2.5">
                                        <label
                                            class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">Solution
                                            Summary</label>
                                        <textarea v-model="formData.solutionSummary" rows="3"
                                            placeholder="Direct response to the problem..."
                                            class="cms-input bg-background border-2 border-border rounded-xl px-4 py-4 focus:outline-none focus:border-blue-500 transition-all text-foreground text-sm leading-relaxed" />
                                    </div>

                                    <div class="flex flex-col gap-2.5">
                                        <label
                                            class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">Outcome
                                            / Conclusion</label>
                                        <textarea v-model="formData.outcome" rows="3"
                                            class="cms-input bg-background border-2 border-border rounded-xl px-4 py-4 focus:outline-none focus:border-blue-500 transition-all text-foreground text-sm leading-relaxed" />
                                    </div>

                                    <div class="flex flex-col gap-2.5">
                                        <label
                                            class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">Key
                                            Learnings</label>
                                        <textarea v-model="formData.learnings" rows="3"
                                            class="cms-input bg-background border-2 border-border rounded-xl px-4 py-4 focus:outline-none focus:border-blue-500 transition-all text-foreground text-sm leading-relaxed" />
                                    </div>
                                </div>

                                <!-- Process Sections -->
                                <div class="flex flex-col gap-8 pt-6 border-t border-border">
                                    <div class="flex items-center justify-between gap-4">
                                        <div class="flex flex-col gap-1">
                                            <h4 class="text-sm font-bold uppercase tracking-widest text-blue-500">
                                                Execution Process</h4>
                                            <p class="text-xxs text-muted-foreground px-1 font-medium italic">Define
                                                the step-by-step
                                                journey of this project (Research, Ideation, etc).</p>
                                        </div>
                                        <GeminiButton @click="openSectionsAiModal" />
                                    </div>
                                    <ProjectSectionBuilder v-model="formData.content.sections" />
                                </div>
                            </div>
                        </section>

                        <!-- Sticky Actions -->
                        <div
                            class="fixed bottom-0 left-0 right-0 lg:left-64 bg-background/90 dark:bg-black/90 backdrop-blur-xl border-t border-border p-5 lg:p-8 z-modal flex gap-4 lg:justify-end shadow-2xl transition-colors">
                            <button type="button"
                                class="flex-1 lg:flex-none px-8 py-3.5 rounded-2xl border-2 border-border font-bold text-foreground hover:bg-muted active:scale-95 transition-all text-sm uppercase tracking-widest"
                                @click="view = 'list'">
                                Cancel
                            </button>
                            <button type="submit" :disabled="isUploading"
                                class="flex-2 lg:flex-none px-12 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black transition-all shadow-xl shadow-blue-500/20 text-sm uppercase tracking-widest disabled:opacity-50 active:scale-95">
                                {{ isUploading ? 'Syncing...' : (isEditing ? 'Update Entry' : 'Publish Entry') }}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </template>

        <!-- AI Generator Modal -->
        <Transition name="fade">
            <div v-if="showAiModal" class="fixed inset-0 z-200 flex items-center justify-center p-6">
                <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showAiModal = false" />
                <div
                    class="relative w-full max-w-md bg-background border border-border p-8 rounded-[32px] shadow-2xl flex flex-col gap-6 animate-fade-in-up">
                    <div class="flex items-center gap-4">
                        <div
                            class="w-10 h-10 rounded-2xl bg-linear-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-white">
                            <svg class="w-5 h-5 fill-white" viewBox="0 0 24 24">
                                <path d="M12 2L14.85 9.15L22 12L14.85 14.85L12 22L9.15 14.85L12 2L9.15 9.15L12 2Z" />
                            </svg>
                        </div>
                        <div>
                            <h3 class="font-bold text-lg">AI Content Assistant</h3>
                            <p class="text-xs text-muted-foreground">Draft your process using Gemini</p>
                        </div>
                    </div>

                    <div class="flex flex-col gap-4">
                        <label class="text-xxs font-bold uppercase tracking-widest text-muted-foreground px-1">What
                            should I
                            focus on?</label>
                        <div class="flex flex-wrap gap-2 mb-1">
                            <button v-for="chip in promptChips" :key="chip" type="button"
                                class="px-3 py-1.5 rounded-full bg-muted/50 border border-border text-xxs font-bold uppercase tracking-wider text-muted-foreground hover:bg-blue-500/10 hover:text-blue-500 hover:border-blue-500/50 transition-all"
                                @click="aiPrompt = chip">
                                {{ chip }}
                            </button>
                        </div>
                        <textarea v-model="aiPrompt" rows="4"
                            placeholder="e.g. Focus on how we built the design system and tested it with 10 user interviews..."
                            class="cms-input bg-muted/30 border-2 border-border rounded-2xl px-4 py-4 focus:outline-none focus:border-blue-500 transition-all text-sm leading-relaxed" />
                    </div>

                    <div class="flex gap-3">
                        <button
                            class="flex-1 px-6 py-3 rounded-xl border border-border text-sm font-bold hover:bg-muted transition-colors"
                            @click="showAiModal = false">Cancel</button>
                        <button :disabled="isAiGenerating || !aiPrompt" class="btn-gemini-primary flex-2"
                            @click="generateAiProcess">
                            <span v-if="isAiGenerating"
                                class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            {{ isAiGenerating ? 'Synergizing...' : 'Gemini' }}
                        </button>
                    </div>
                </div>
            </div>
        </Transition>

        <!-- Custom Delete Modal -->
        <Transition name="fade">
            <div v-if="showDeleteModal" class="fixed inset-0 z-210 flex items-center justify-center p-6">
                <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showDeleteModal = false" />
                <div
                    class="relative w-full max-w-sm bg-background border border-border p-8 rounded-[32px] shadow-2xl flex flex-col gap-6 animate-fade-in-up">
                    <div class="flex flex-col items-center text-center gap-4">
                        <div
                            class="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 px-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path
                                    d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                            </svg>
                        </div>
                        <div class="flex flex-col gap-2">
                            <h3 class="font-black text-xl tracking-tight">Delete {{ deleteIntent.type === 'gallery' ?
                                'Photo' :
                                (deleteIntent.type === 'post' ? 'Post' : 'Project') }}?</h3>
                            <p class="text-sm text-muted-foreground leading-relaxed">Are you absolutely sure? This
                                action will
                                permanently remove this entry from your portfolio. This cannot be undone.</p>
                        </div>
                    </div>

                    <div class="flex flex-col gap-3">
                        <button :disabled="isDeleting"
                            class="w-full py-4 bg-red-500 hover:bg-red-600 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] transition-all shadow-xl shadow-red-500/20 active:scale-95 disabled:opacity-50"
                            @click="confirmDelete">
                            {{ isDeleting ? 'Removing...' : 'Permanently Delete' }}
                        </button>
                        <button
                            class="w-full py-4 text-muted-foreground font-bold text-xs hover:text-foreground transition-colors"
                            @click="showDeleteModal = false">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </Transition>

        <!-- Security Setup for first-time login -->
        <LazySecuritySetup ref="securitySetup" />
    </div>
</template>

<script setup lang="ts">
import GeminiButton from '@/components/cms/GeminiButton.vue'

const supabase = useSupabaseClient()
const { fetchPosts, posts: blogPosts } = useBlog()
const { fetchProjects, projects } = useProjects()
const { galleryItems, fetchGallery } = useGallery()

// UX State
const loading = ref(true)
const isSidebarOpen = ref(false)
const activeTab = ref<'blog' | 'projects' | 'gallery'>('blog')
const view = ref<'list' | 'edit'>('list')
const isEditing = ref(false)
const isUploading = ref(false)
const pendingUploads = ref(0)

// Form State
const formData = ref<any>({})
const tagsInput = ref('')
const toolsInput = ref('')
const wireframesInput = ref('')

// AI State
const isAiGenerating = ref(false)
const aiPrompt = ref('')
const showAiModal = ref(false)
const aiMode = ref<'sections' | 'text'>('sections')
const aiTargetField = ref('')

const openFieldAiModal = (field: string, suggestion: string) => {
    aiMode.value = 'text'
    aiTargetField.value = field
    aiPrompt.value = suggestion
    showAiModal.value = true
}

const openSectionsAiModal = () => {
    aiMode.value = 'sections'
    aiPrompt.value = 'Draft a complete process for this project focusing on discovery, design, and results...'
    showAiModal.value = true
}

// Auto-resize textarea
const autoResizeTextarea = (event: any) => {
    const element = event.target || event
    if (element) {
        element.style.height = 'auto'
        element.style.height = element.scrollHeight + 'px'
    }
}

// Delete State
const showDeleteModal = ref(false)
const isDeleting = ref(false)
const deleteIntent = ref<{ item: any, type: 'post' | 'project' | 'gallery' }>({ item: null, type: 'post' })

const deleteItem = (item: any, type: 'post' | 'project' | 'gallery') => {
    deleteIntent.value = { item, type }
    showDeleteModal.value = true
}

const toast = ref({
    show: false,
    title: '',
    message: '',
    type: 'success' as 'success' | 'error' | 'warning'
})

const showToast = (title: string, message: string, type: 'success' | 'error' | 'warning' = 'success') => {
    toast.value = { show: true, title, message, type }
    setTimeout(() => { toast.value.show = false }, 4000)
}

// Keyboard Shortcuts (Ctrl+S for save)
const onKeyDown = (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        if (view.value === 'edit') saveItem()
    }
    if (e.key === 'Escape') {
        if (showAiModal.value) showAiModal.value = false
        if (showDeleteModal.value) showDeleteModal.value = false
    }
}

onMounted(() => {
    window.addEventListener('keydown', onKeyDown)
})

onUnmounted(() => {
    window.removeEventListener('keydown', onKeyDown)
})

// Smart Slug Generation
watch(() => formData.value.title, (newTitle) => {
    if (!isEditing.value && newTitle) {
        formData.value.slug = newTitle
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim()
    }
})

const promptChips = computed(() => {
    if (aiMode.value === 'sections') {
        return ['Discovery', 'Design Process', 'Final Results', 'Tech Stack']
    }
    return ['Summarize accurately', 'Make it compelling', 'Professional tone', 'Focus on impact']
})

const toastClasses = computed(() => {
    switch (toast.value.type) {
        case 'success': return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400 dark:bg-emerald-500/20'
        case 'error': return 'bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400 dark:bg-red-500/20'
        case 'warning': return 'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400 dark:bg-amber-500/20'
        default: return 'bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400 dark:bg-blue-500/20'
    }
})

// const monthOptions = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// Computed
const activeItems = computed(() => activeTab.value === 'blog' ? blogPosts.value : projects.value)

// Logic
const securitySetup = ref<any>(null)

onMounted(async () => {
    // Auth check - redirect if not authenticated via cookie
    const authCookie = useCookie('cms-auth')
    const isAuthenticated = authCookie.value === 'true'

    if (!isAuthenticated) {
        await navigateTo('/')
        return
    }

    try {
        await Promise.all([fetchPosts(), fetchProjects(), fetchGallery()])

        // Check if security questions are set up
        const { data: qData } = await supabase
            .from('security_questions')
            .select('id')
            .limit(1)
            .maybeSingle()

        if (!qData) {
            securitySetup.value?.open()
        }
    } catch {
        showToast('Sync Error', 'Database connection failed.', 'error')
    } finally {
        loading.value = false
    }
})

const generateAiProcess = async () => {
    if (!aiPrompt.value) return
    isAiGenerating.value = true

    try {
        const isSections = aiMode.value === 'sections'

        // Pass relevant project context to the AI
        const context = {
            title: formData.value.title,
            role: formData.value.role,
            industry: formData.value.industry,
            problemStatement: formData.value.problemStatement,
            designApproach: formData.value.designApproach,
            activeTab: activeTab.value
        }

        const response: any = await $fetch('/api/ai-generate', {
            method: 'POST',
            body: {
                prompt: aiPrompt.value,
                type: aiMode.value,
                context,
                currentField: aiTargetField.value
            }
        })

        if (isSections && response.sections) {
            if (formData.value.content.sections?.length > 0) {
                if (confirm('Replace current process sections with AI generated draft?')) {
                    formData.value.content.sections = response.sections
                } else if (confirm('Append AI results to your current process?')) {
                    formData.value.content.sections.push(...response.sections)
                }
            } else {
                if (!formData.value.content) formData.value.content = { sections: [] }
                formData.value.content.sections = response.sections
            }
            showToast('Ready', 'Process steps generated by AI.', 'success')
        } else if (!isSections && response.text) {
            // Logic to update specific fields including nested ones (like content.introduction)
            const fieldPath = aiTargetField.value
            const keys = fieldPath.split('.')

            if (keys.length === 2) {
                const k1 = keys[0] as keyof typeof formData.value
                if (k1 && formData.value) {
                    if (!(formData.value as any)[k1]) (formData.value as any)[k1] = {}
                    const k2 = keys[1]!
                        ; (formData.value as any)[k1][k2] = response.text
                }
            } else if (fieldPath === 'tags') {
                tagsInput.value = response.text
            } else {
                ; (formData.value as any)[fieldPath] = response.text
            }
            showToast('Success', 'Content drafted by AI.', 'success')
        }

        showAiModal.value = false
        aiPrompt.value = ''
    } catch (e: any) {
        console.error('AI Generation Error:', e)
        showToast('AI Failure', e.message || 'Gemini processing failed', 'error')
    } finally {
        isAiGenerating.value = false
    }
}

const handleTabChange = (tab: 'blog' | 'projects' | 'gallery') => {
    activeTab.value = tab
    view.value = 'list'
    isSidebarOpen.value = false
}

const cmsHeaderTitle = computed(() => {
    if (activeTab.value === 'gallery') return 'Photo Gallery'
    return activeTab.value === 'blog' ? 'Blog Database' : 'Project Portfolio'
})
const activeTabLabel = computed(() => {
    if (activeTab.value === 'gallery') return 'Photo'
    return activeTab.value === 'blog' ? 'Post' : 'Project'
})
const editHeaderTitle = computed(() => `${isEditing.value ? 'Refine' : 'Add'} ${activeTabLabel.value}`)

const projectLinkHelpText = computed(() => {
    return formData.value.isFigma
        ? 'Paste the direct Figma file link or embed code. We will handle the rest.'
        : 'Enter the public URL for the live project.'
})


const createNew = () => {
    isEditing.value = false
    formData.value = { featured: false, isFigma: false, projectLink: '' }
    tagsInput.value = ''
    toolsInput.value = ''
    wireframesInput.value = ''

    if (activeTab.value === 'blog') {
        const d = new Date()
        formData.value.year = d.getFullYear()
        formData.value.month = d.toLocaleString('default', { month: 'short' })
        formData.value.date = d.toISOString().split('T')[0]
        formData.value.featured = false
        formData.value.hidden = false
        formData.value.readingTime = ''
        formData.value.coverImage = ''
        formData.value.subtitle = ''
    } else {
        formData.value.content = { introduction: '', sections: [], results: { metrics: [], description: '' } }
        formData.value.featured = false
        formData.value.hidden = false
        formData.value.isFigma = false
        formData.value.teamSize = ''
        formData.value.projectLink = ''
    }
    view.value = 'edit'
    if (import.meta.client) window.scrollTo({ top: 0, behavior: 'smooth' })
}

const editItem = (item: any) => {
    isEditing.value = true
    formData.value = {
        ...item,
        // Common mappings
        coverImage: item.cover_image || '',
        // Blog specific
        readingTime: item.reading_time || '',
        // Projects specific
        teamSize: item.team_size || '',
        projectLink: item.project_link || '',
        isFigma: item.is_figma || false,
        problemStatement: item.problem_statement || '',
        businessGoal: item.business_goal || '',
        userGoal: item.user_goal || '',
        targetUsers: item.target_users || '',
        designApproach: item.design_approach || '',
        researchMethods: item.research_methods || '',
        keyInsights: item.key_insights || '',
        solutionSummary: item.solution_summary || ''
    }
    tagsInput.value = item.tags ? item.tags.join(', ') : ''
    toolsInput.value = (item.tools && Array.isArray(item.tools)) ? item.tools.join(', ') : ''
    wireframesInput.value = item.wireframes ? item.wireframes.join('\n') : ''
    view.value = 'edit'
    if (import.meta.client) window.scrollTo({ top: 0, behavior: 'smooth' })
}

const saveItem = async () => {
    if (!formData.value.title || !formData.value.slug) {
        showToast('Attention', 'Title and slug are required.', 'warning')
        return
    }

    isUploading.value = true
    try {
        const isBlogPost = activeTab.value === 'blog'
        const table = isBlogPost ? 'notes' : 'projects'

        // Define clean payload to avoid 400 errors from extra fields
        const payload: any = {}

        if (isBlogPost) {
            // Strict fields for Blog table
            const postFields = ['id', 'title', 'subtitle', 'date', 'year', 'month', 'slug', 'hidden', 'excerpt', 'content', 'featured', 'reading_time', 'cover_image']
            postFields.forEach(f => {
                const dbField = f
                let formField = f

                // Map camelCase to snake_case if needed
                if (f === 'reading_time') formField = 'readingTime'
                if (f === 'cover_image') formField = 'coverImage'

                if (formData.value[formField] !== undefined) payload[dbField] = formData.value[formField]
            })

            // Array fields
            if (tagsInput.value) payload.tags = tagsInput.value.split(',').map(s => s.trim()).filter(Boolean)
        } else {
            // Mapping for Projects table
            const projectFields = [
                'id', 'title', 'year', 'slug', 'client', 'industry', 'duration',
                'role', 'problemStatement', 'businessGoal', 'userGoal',
                'targetUsers', 'designApproach', 'researchMethods', 'keyInsights',
                'solutionSummary', 'outcome', 'learnings', 'content', 'featured',
                'subtitle', 'teamSize', 'projectLink', 'isFigma', 'coverImage', 'hidden'
            ]

            projectFields.forEach(f => {
                if (formData.value[f] !== undefined) {
                    // Convert camelCase to snake_case for DB
                    const dbField = f.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
                    payload[dbField] = formData.value[f]
                }
            })

            // Array fields
            if (tagsInput.value) payload.tags = tagsInput.value.split(',').map(s => s.trim()).filter(Boolean)
            if (toolsInput.value) payload.tools = toolsInput.value.split(',').map(s => s.trim()).filter(Boolean)
            if (wireframesInput.value) payload.wireframes = wireframesInput.value.split('\n').map(s => s.trim()).filter(Boolean)
            if (formData.value.finalDesigns) payload.final_designs = formData.value.finalDesigns
        }

        // Remove ID if empty to let Supabase generate one (for new items)
        if (!isEditing.value || !payload.id) {
            delete payload.id
        }

        const { error } = await supabase.from(table).upsert(payload, { onConflict: 'slug' })
        if (error) throw error

        await (isBlogPost ? fetchPosts() : fetchProjects())
        showToast('Success', 'Content published to live site.', 'success')
        view.value = 'list'
    } catch (e) {
        console.error('CMS Save Error:', e)
        showToast('Publish Failed', 'Supabase payload error.', 'error')
    } finally {
        isUploading.value = false
    }
}

const confirmDelete = async () => {
    const { item, type } = deleteIntent.value
    if (!item) return

    isDeleting.value = true
    try {
        let table = ''
        let column = ''
        let value = ''

        if (type === 'gallery') {
            table = 'gallery'
            column = 'id'
            value = item.id
        } else {
            table = type === 'post' ? 'notes' : 'projects'
            column = 'slug'
            value = item.slug
        }

        if (!value) {
            showToast('Error', `Missing identifier (${column}) for deletion.`, 'error')
            return
        }

        const { error } = await supabase.from(table).delete().eq(column, value)
        if (error) throw error

        if (type === 'gallery') await fetchGallery()
        else await (type === 'post' ? fetchPosts() : fetchProjects())

        showToast('Deleted', `${type.charAt(0).toUpperCase() + type.slice(1)} removed successfully.`, 'success')
        showDeleteModal.value = false
    } catch (e: any) {
        console.error('Delete Error:', e)
        showToast('Error', e.message || 'Deletion failed.', 'error')
    } finally {
        isDeleting.value = false
    }
}

const handleImageUpload = async (event: Event, field: string) => {
    const input = event.target as HTMLInputElement
    if (!input.files?.length) return

    isUploading.value = true
    if (field === 'massGallery') pendingUploads.value = input.files.length

    try {
        for (const file of Array.from(input.files)) {
            const fileExt = file.name.split('.').pop()
            const filePath = `uploads/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`

            const { error: uploadError } = await supabase.storage.from('portfolio').upload(filePath, file)
            if (uploadError) throw uploadError

            const { data: { publicUrl } } = supabase.storage.from('portfolio').getPublicUrl(filePath)

            if (field === 'coverImage') formData.value.coverImage = publicUrl
            else if (field === 'postContent') formData.value.content = (formData.value.content || '') + `\n\n![Image](${publicUrl})\n\n`
            else if (field === 'wireframes') wireframesInput.value += (wireframesInput.value ? '\n' : '') + publicUrl
            else if (field === 'massGallery') {
                const { error: insErr } = await (supabase.from('gallery') as any).insert({ url: publicUrl, order_index: galleryItems.value.length })
                if (insErr) throw insErr
                pendingUploads.value = Math.max(0, pendingUploads.value - 1)
            }
        }
        if (field === 'massGallery') await fetchGallery()
        showToast('Done', 'Images hosted successfully.', 'success')
    } catch {
        showToast('Storage Error', 'Upload failed.', 'error')
    } finally {
        isUploading.value = false
        pendingUploads.value = 0
        input.value = ''
    }
}

useSeoMeta({ title: 'CMS Control Center - Lanre Segun', robots: 'noindex, nofollow' })
</script>

<style scoped>
/* @reference "tailwindcss"; */

.toast-enter-active,
.toast-leave-active {
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.toast-enter-from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
}

.toast-leave-to {
    opacity: 0;
    transform: scale(0.9);
}

.cms-input {
    transition: all 300ms;
    border: 1.5px solid hsl(var(--border) / 0.4);
    background-color: hsl(var(--background) / 0.5);
}

.cms-input:focus {
    border-color: #3b82f6;
    outline: none;
    box-shadow: 0 0 0 4px hsl(var(--blue-500, 217 91% 60%) / 0.1);
}

.cms-input:hover {
    background-color: hsl(var(--background));
}

.btn-gemini-primary {
    padding: 0.75rem 1.5rem;
    border-radius: 1rem;
    background: linear-gradient(to right, #FF70B8, #C084FC, #70AFFF);
    color: white;
    font-size: 0.875rem;
    font-weight: 900;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
}

.btn-gemini-primary:hover:not(:disabled) {
    transform: scale(1.02);
}

.btn-gemini-primary:active:not(:disabled) {
    transform: scale(0.95);
}

.btn-gemini-primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

/* Custom scrollbars without @apply */
::-webkit-scrollbar {
    width: 5px;
}

::-webkit-scrollbar-track {
    background: transparent;
}

::-webkit-scrollbar-thumb {
    background: rgba(128, 128, 128, 0.2);
    border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
    background: rgba(128, 128, 128, 0.4);
}
</style>