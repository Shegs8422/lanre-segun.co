<template>
    <div
        class="min-h-screen bg-background text-foreground font-sans selection:bg-neutral-800 transition-colors duration-300">
        <!-- Toast Notification -->
        <Transition name="toast">
            <div v-if="toast.show"
                class="fixed top-20 lg:top-6 right-6 z-[200] flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl border backdrop-blur-md min-w-[300px] lg:min-w-[320px]"
                :class="toastClasses">
                <div class="flex-shrink-0">
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
                <div class="flex-grow">
                    <p class="text-sm font-bold tracking-tight">{{ toast.title }}</p>
                    <p class="text-xs opacity-80">{{ toast.message }}</p>
                </div>
                <button @click="toast.show = false" class="opacity-50 hover:opacity-100 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
            </div>
        </Transition>

        <!-- Mobile Header Toggle -->
        <div
            class="lg:hidden fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-md border-b border-border z-160 flex items-center justify-between px-6 transition-colors">
            <h1 class="text-xl font-bold tracking-tight text-foreground">Local CMS</h1>
            <button @click="isSidebarOpen = !isSidebarOpen"
                class="p-2 -mr-2 text-muted-foreground hover:text-foreground">
                <svg v-if="!isSidebarOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
                <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>

        <!-- Sidebar Overlay -->
        <div v-show="isSidebarOpen" @click="isSidebarOpen = false"
            class="lg:hidden fixed inset-0 bg-black/40 dark:bg-black/60 z-140 backdrop-blur-sm transition-opacity duration-300">
        </div>

        <!-- Sidebar / Nav -->
        <aside :class="[
            'fixed left-0 top-0 h-full w-64 border-r border-border bg-component dark:bg-black/90 p-6 flex flex-col gap-8 backdrop-blur-xl z-150 transition-transform duration-300 lg:translate-x-0',
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        ]">
            <h1 class="hidden lg:block text-2xl font-bold tracking-tight text-foreground">Local CMS</h1>

            <nav class="flex flex-col gap-2 pt-20 lg:pt-0">
                <button @click="handleTabChange('notes')"
                    class="px-4 py-2 rounded-lg text-left transition-all duration-200"
                    :class="activeTab === 'notes' ? 'bg-foreground text-background font-medium shadow-md' : 'text-muted-foreground hover:bg-muted hover:text-foreground'">
                    Notes
                </button>
                <button @click="handleTabChange('projects')"
                    class="px-4 py-2 rounded-lg text-left transition-all duration-200"
                    :class="activeTab === 'projects' ? 'bg-foreground text-background font-medium shadow-md' : 'text-muted-foreground hover:bg-muted hover:text-foreground'">
                    Projects
                </button>
            </nav>

            <div class="mt-auto">
                <NuxtLink to="/"
                    class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                    Back to Website
                </NuxtLink>
            </div>
        </aside>

        <!-- Main Content -->
        <main :class="['lg:ml-64 p-6 lg:p-12 max-w-full lg:max-w-5xl transition-all pt-24 lg:pt-12']">
            <div v-if="loading" class="flex items-center justify-center py-20">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>

            <template v-else>
                <!-- List View -->
                <div v-if="view === 'list'" class="flex flex-col gap-8">
                    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                        <h2 class="text-2xl lg:text-3xl font-medium tracking-tight text-foreground">{{ cmsHeaderTitle }}
                        </h2>
                        <button @click="createNew"
                            class="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/10 flex items-center justify-center gap-2 active:scale-95">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
                                stroke-linejoin="round">
                                <line x1="12" y1="5" x2="12" y2="19" />
                                <line x1="5" y1="12" x2="19" />
                            </svg>
                            New {{ activeTabLabel }}
                        </button>
                    </div>

                    <div class="flex flex-col gap-4">
                        <!-- Items -->
                        <div v-for="item in activeItems" :key="item.slug || item.id"
                            class="p-5 rounded-2xl border border-border bg-component/50 dark:bg-white/2 shadow-sm hover:shadow-md hover:border-blue-500/40 transition-all flex flex-col sm:flex-row justify-between sm:items-center gap-4 group">
                            <div class="flex flex-col gap-1.5">
                                <h3
                                    class="font-bold text-base lg:text-lg text-foreground group-hover:text-blue-500 transition-colors leading-tight">
                                    {{ item.title }}</h3>
                                <div class="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                                    <span class="px-2 py-0.5 bg-muted rounded uppercase tracking-wider">{{ item.year
                                        }}</span>
                                    <span class="opacity-40">•</span>
                                    <span class="font-mono">{{ item.slug }}</span>
                                </div>
                            </div>
                            <div class="flex items-center gap-3">
                                <button @click="editItem(item)"
                                    class="flex-1 lg:flex-initial text-sm font-bold px-4 py-2 rounded-lg bg-muted text-foreground hover:bg-foreground hover:text-background transition-all">
                                    Edit
                                </button>
                                <button @click="deleteItem(item, activeTab === 'notes' ? 'note' : 'project')"
                                    class="flex-1 lg:flex-initial text-sm font-bold px-4 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all">
                                    Delete
                                </button>
                            </div>
                        </div>

                        <div v-if="activeItems.length === 0"
                            class="text-center py-20 bg-muted/30 rounded-3xl border border-dashed border-border">
                            <p class="text-muted-foreground font-medium">No items found in {{ activeTab }}.</p>
                            <button @click="createNew" class="mt-4 text-blue-500 font-bold hover:underline">Create your
                                first now</button>
                        </div>
                    </div>
                </div>

                <!-- Editor View -->
                <div v-else class="flex flex-col gap-8">
                    <div class="flex items-center gap-4 mb-4">
                        <button @click="view = 'list'"
                            class="p-2 bg-muted hover:bg-accent rounded-full transition-colors text-muted-foreground hover:text-foreground">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path d="M19 12H5" />
                                <path d="M12 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <h2 class="text-xl lg:text-2xl font-bold text-foreground">{{ editHeaderTitle }}</h2>
                    </div>

                    <form @submit.prevent="saveItem" class="flex flex-col gap-10 lg:max-w-5xl pb-32">
                        <!-- Basic Info Section -->
                        <section
                            class="flex flex-col gap-8 bg-component/30 p-6 lg:p-8 rounded-3xl border border-border">
                            <div class="flex items-center gap-3">
                                <div
                                    class="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 class="text-sm font-bold uppercase tracking-widest text-foreground/60">Basic
                                    Metadata</h3>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div class="flex flex-col gap-2.5">
                                    <label
                                        class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">Display
                                        Title</label>
                                    <input v-model="formData.title" type="text" required placeholder="Project Name"
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
                                    <input v-model="formData.subtitle" type="text"
                                        placeholder="Design System Architecture"
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
                                        <button type="button" @click="$refs.coverInput.click()" :disabled="isUploading"
                                            class="text-[11px] font-bold text-blue-500 uppercase flex items-center gap-1.5 hover:text-blue-400">
                                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                            </svg>
                                            {{ isUploading ? 'Uploading...' : 'Upload Image' }}
                                        </button>
                                        <input type="file" ref="coverInput" class="hidden"
                                            @change="handleImageUpload($event, 'coverImage')" accept="image/*">
                                    </div>
                                    <input v-model="formData.coverImage" type="text" placeholder="https://..."
                                        class="cms-input bg-background border-2 border-border rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-foreground font-mono text-sm leading-relaxed">
                                    <p class="text-[10px] text-muted-foreground px-1 font-medium italic">Max 5MB. Ideal
                                        ratio 16:9 for optimal accessibility.</p>
                                </div>
                            </div>
                        </section>

                        <!-- Content Section -->
                        <section
                            class="flex flex-col gap-8 bg-component/30 p-6 lg:p-8 rounded-3xl border border-border">
                            <div class="flex items-center gap-3">
                                <div
                                    class="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </div>
                                <h3 class="text-sm font-bold uppercase tracking-widest text-foreground/60">Rich Content
                                </h3>
                            </div>

                            <div v-if="activeTab === 'notes'" class="flex flex-col gap-8">
                                <div class="flex flex-col gap-2.5">
                                    <label
                                        class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">Excerpt
                                        (Card Preview)</label>
                                    <textarea v-model="formData.excerpt" rows="2"
                                        placeholder="Brief summary of the note..."
                                        class="cms-input bg-background border-2 border-border rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-foreground leading-relaxed"></textarea>
                                </div>
                                <div class="flex flex-col gap-2.5">
                                    <div class="flex justify-between items-center px-1">
                                        <label
                                            class="text-xs font-bold uppercase tracking-wider text-muted-foreground">Body
                                            Text (Supports Markdown)</label>
                                        <button type="button" @click="$refs.noteImageInput.click()"
                                            :disabled="isUploading"
                                            class="text-[11px] font-bold text-blue-500 uppercase flex items-center gap-1.5 hover:text-blue-400">
                                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h14a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            Insert Image
                                        </button>
                                        <input type="file" ref="noteImageInput" class="hidden"
                                            @change="handleImageUpload($event, 'noteContent')" accept="image/*">
                                    </div>
                                    <textarea v-model="formData.content" rows="12" placeholder="# Introduction..."
                                        class="cms-input bg-background border-2 border-border rounded-xl px-4 py-4 focus:outline-none focus:border-blue-500 transition-all text-foreground font-mono text-sm leading-relaxed"></textarea>
                                </div>
                            </div>

                            <div v-if="activeTab === 'projects'" class="flex flex-col gap-8">
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
                                            class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">Your
                                            Role</label>
                                        <input v-model="formData.role" type="text"
                                            class="cms-input bg-background border-2 border-border rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-foreground font-medium">
                                    </div>
                                    <div class="flex flex-col gap-2.5 col-span-1 lg:col-span-2">
                                        <label
                                            class="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">Tags
                                            (Comma Separated)</label>
                                        <input v-model="tagsInput" type="text" placeholder="Design System, SaaS, React"
                                            class="cms-input bg-background border-2 border-border rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-foreground">
                                    </div>
                                </div>

                                <div class="flex flex-col gap-4">
                                    <div class="flex justify-between items-end px-1">
                                        <label
                                            class="text-xs font-bold uppercase tracking-wider text-muted-foreground">Gallery
                                            Assets</label>
                                        <button type="button" @click="$refs.galleryInput.click()"
                                            :disabled="isUploading"
                                            class="text-[11px] font-bold text-blue-500 uppercase bg-blue-500/10 px-4 py-1.5 rounded-full hover:bg-blue-500/20 transition-colors">
                                            {{ isUploading ? '...' : 'Add to Gallery' }}
                                        </button>
                                        <input type="file" ref="galleryInput" class="hidden"
                                            @change="handleImageUpload($event, 'wireframes')" multiple accept="image/*">
                                    </div>
                                    <textarea v-model="wireframesInput" rows="6"
                                        placeholder="https://image1.jpg&#10;https://image2.jpg"
                                        class="cms-input bg-background border-2 border-border rounded-xl px-4 py-4 focus:outline-none focus:border-blue-500 transition-all text-foreground font-mono text-sm leading-relaxed"></textarea>
                                </div>
                            </div>
                        </section>

                        <!-- Sticky Actions -->
                        <div
                            class="fixed bottom-0 left-0 right-0 lg:left-64 bg-background/90 dark:bg-black/90 backdrop-blur-xl border-t border-border p-5 lg:p-8 z-100 flex gap-4 lg:justify-end shadow-2xl transition-colors">
                            <button type="button" @click="view = 'list'"
                                class="flex-1 lg:flex-none px-8 py-3.5 rounded-2xl border-2 border-border font-bold text-foreground hover:bg-muted active:scale-95 transition-all text-sm uppercase tracking-widest">
                                Cancel
                            </button>
                            <button type="submit" :disabled="isUploading"
                                class="flex-2 lg:flex-none px-12 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black transition-all shadow-xl shadow-blue-500/20 text-sm uppercase tracking-widest disabled:opacity-50 active:scale-95">
                                {{ isUploading ? 'Syncing...' : (isEditing ? 'Update Entry' : 'Publish Entry') }}
                            </button>
                        </div>
                    </form>
                </div>
            </template>
        </main>
    </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()
const { fetchNotes, notes } = useNotes()
const { fetchProjects, projects } = useProjects()

// UX State
const loading = ref(true)
const isSidebarOpen = ref(false)
const activeTab = ref<'notes' | 'projects'>('notes')
const view = ref<'list' | 'edit'>('list')
const isEditing = ref(false)
const isUploading = ref(false)

// Form State
const formData = ref<any>({})
const tagsInput = ref('')
const wireframesInput = ref('')

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

const toastClasses = computed(() => {
    switch (toast.value.type) {
        case 'success': return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400 dark:bg-emerald-500/20'
        case 'error': return 'bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400 dark:bg-red-500/20'
        case 'warning': return 'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400 dark:bg-amber-500/20'
        default: return 'bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400 dark:bg-blue-500/20'
    }
})

const monthOptions = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// Computed
const activeItems = computed(() => activeTab.value === 'notes' ? notes.value : projects.value)

// Logic
onMounted(async () => {
    try {
        await Promise.all([fetchNotes(), fetchProjects()])
    } catch (e) {
        showToast('Sync Error', 'Database connection failed.', 'error')
    } finally {
        loading.value = false
    }
})

const handleTabChange = (tab: 'notes' | 'projects') => {
    activeTab.value = tab
    view.value = 'list'
    isSidebarOpen.value = false
}

const cmsHeaderTitle = computed(() => activeTab.value === 'notes' ? 'Notes Database' : 'Project Portfolio')
const activeTabLabel = computed(() => activeTab.value === 'notes' ? 'Note' : 'Project')
const editHeaderTitle = computed(() => `${isEditing.value ? 'Refine' : 'Add'} ${activeTabLabel.value}`)

const createNew = () => {
    isEditing.value = false
    formData.value = { featured: false, isFigma: false, projectLink: '' }
    tagsInput.value = ''
    wireframesInput.value = ''

    if (activeTab.value === 'notes') {
        const d = new Date()
        formData.value.year = d.getFullYear()
        formData.value.month = d.toLocaleString('default', { month: 'short' })
        formData.value.date = d.toISOString().split('T')[0]
    } else {
        formData.value.content = { introduction: '', sections: [], results: { metrics: [], description: '' } }
    }
    view.value = 'edit'
    if (process.client) window.scrollTo({ top: 0, behavior: 'smooth' })
}

const editItem = (item: any) => {
    isEditing.value = true
    formData.value = { ...item }
    tagsInput.value = item.tags ? item.tags.join(', ') : ''
    wireframesInput.value = item.wireframes ? item.wireframes.join('\n') : ''
    view.value = 'edit'
    if (process.client) window.scrollTo({ top: 0, behavior: 'smooth' })
}

const saveItem = async () => {
    if (!formData.value.title || !formData.value.slug) {
        showToast('Attention', 'Title and slug are required.', 'warning')
        return
    }

    isUploading.value = true
    try {
        const isNote = activeTab.value === 'notes'
        const table = isNote ? 'notes' : 'projects'

        // Define clean payload to avoid 400 errors from extra fields
        const payload: any = {}

        if (isNote) {
            // Strict fields for Notes table
            const noteFields = ['id', 'title', 'date', 'year', 'month', 'slug', 'hidden', 'excerpt', 'content']
            noteFields.forEach(f => {
                if (formData.value[f] !== undefined) payload[f] = formData.value[f]
            })
        } else {
            // Strict fields for Projects table
            const projectFields = [
                'id', 'title', 'year', 'slug', 'client', 'industry', 'duration',
                'role', 'problemStatement', 'businessGoal', 'userGoal',
                'targetUsers', 'designApproach', 'researchMethods', 'keyInsights',
                'solutionSummary', 'outcome', 'learnings', 'content', 'featured'
            ]

            projectFields.forEach(f => {
                const dbField = f.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
                if (formData.value[f] !== undefined) payload[dbField] = formData.value[f]
            })

            // Map arrays and specific fields
            payload.tags = tagsInput.value.split(',').map(s => s.trim()).filter(Boolean)
            payload.wireframes = wireframesInput.value.split('\n').map(s => s.trim()).filter(Boolean)
            payload.tools = (formData.value.tools || [])
            payload.final_designs = (formData.value.finalDesigns || [])
            payload.cover_image = formData.value.coverImage
            payload.project_link = formData.value.projectLink
            payload.is_figma = formData.value.isFigma
            payload.team_size = formData.value.teamSize
        }

        // Remove ID if empty to let Supabase generate one (for new items)
        if (!isEditing.value || !payload.id) {
            delete payload.id
        }

        const { error } = await supabase.from(table).upsert(payload, { onConflict: 'slug' })
        if (error) throw error

        await (isNote ? fetchNotes() : fetchProjects())
        showToast('Success', 'Content published to live site.', 'success')
        view.value = 'list'
    } catch (e) {
        console.error('CMS Save Error:', e)
        showToast('Publish Failed', 'Supabase payload error.', 'error')
    } finally {
        isUploading.value = false
    }
}

const deleteItem = async (item: any, type: 'note' | 'project') => {
    if (!confirm('Are you sure you want to remove this entry? This action cannot be undone.')) return
    try {
        const table = type === 'note' ? 'notes' : 'projects'
        // Notes use ID (UUID), Projects use Slug as primary identifiers in these tables
        const column = type === 'note' ? 'id' : 'slug'
        const value = type === 'note' ? item.id : item.slug

        if (!value) {
            showToast('Error', 'Missing identifier for deletion.', 'error')
            return
        }

        const { error } = await supabase.from(table).delete().eq(column, value)
        if (error) throw error

        await (activeTab.value === 'notes' ? fetchNotes() : fetchProjects())
        showToast('Deleted', 'Entry removed successfully.', 'success')
    } catch (e) {
        console.error('Delete Error:', e)
        showToast('Error', 'Deletion failed.', 'error')
    }
}

const handleImageUpload = async (event: Event, field: string) => {
    const input = event.target as HTMLInputElement
    if (!input.files?.length) return

    isUploading.value = true
    try {
        for (const file of Array.from(input.files)) {
            const fileExt = file.name.split('.').pop()
            const filePath = `uploads/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`

            const { error: uploadError } = await supabase.storage.from('portfolio').upload(filePath, file)
            if (uploadError) throw uploadError

            const { data: { publicUrl } } = supabase.storage.from('portfolio').getPublicUrl(filePath)

            if (field === 'coverImage') formData.value.coverImage = publicUrl
            else if (field === 'noteContent') formData.value.content = (formData.value.content || '') + `\n\n![Image](${publicUrl})\n\n`
            else wireframesInput.value += (wireframesInput.value ? '\n' : '') + publicUrl
        }
        showToast('Done', 'Images hosted successfully.', 'success')
    } catch (e) {
        showToast('Storage Error', 'Upload failed.', 'error')
    } finally {
        isUploading.value = false
        input.value = ''
    }
}

useSeoMeta({ title: 'CMS Control Center - Lanre Segun', robots: 'noindex, nofollow' })
</script>

<style scoped>
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
    transition: all 200ms ease;
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
