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
                    <p class="text-xxs font-black uppercase tracking-[0.4em] text-foreground/80">Synchronizing</p>
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
                    <p class="px-4 text-xxs font-bold uppercase tracking-widest text-muted-foreground/40 mb-2">Manage
                    </p>

                    <button
                        class="w-full px-4 py-3 rounded-lg text-left transition-all duration-200 flex items-center gap-3.5 group relative overflow-hidden"
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
                        class="w-full px-4 py-3 rounded-lg text-left transition-all duration-200 flex items-center gap-3.5 group relative overflow-hidden"
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
                        class="w-full px-4 py-3 rounded-lg text-left transition-all duration-200 flex items-center gap-3.5 group relative overflow-hidden"
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
                        class="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-background border border-border hover:border-foreground/20 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-all group shadow-sm hover:shadow-md">
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
                            class="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-black transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2.5 active:scale-95 group"
                            @click="createNew">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"
                                stroke-linejoin="round" class="group-hover:rotate-90 transition-transform duration-300">
                                <line x1="12" y1="5" x2="12" y2="19" />
                                <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                            <span class="uppercase tracking-widest text-xxs">New {{ activeTabLabel }}</span>
                        </button>
                    </div>

                    <div class="mt-10 flex flex-col gap-4">
                        <!-- Gallery View -->
                        <CmsGalleryGrid v-if="activeTab === 'gallery'" :items="galleryItems"
                            @delete="deleteItem($event, 'gallery')"
                            @upload="handleImageUpload($event, 'massGallery')" />

                        <!-- Blog/Projects View -->
                        <CmsContentList v-else :items="activeItems" :type="activeTab" @edit="editItem"
                            @delete="deleteItem($event, (activeTab === 'blog' ? 'post' : 'project'))" />
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

                    <div class="lg:max-w-5xl mx-auto pb-32">
                        <!-- Blog Editor -->
                        <CmsBlogEditor v-if="activeTab === 'blog'" v-model="formData" :is-uploading="isUploading"
                            @save="saveItem" @cancel="view = 'list'" @open-unsplash="openUnsplashModal"
                            @open-ai="openFieldAiModal" @upload-image="handleImageUpload" />

                        <!-- Project Editor -->
                        <CmsProjectEditor v-else-if="activeTab === 'projects'" v-model="formData"
                            :is-uploading="isUploading" @save="saveItem" @cancel="view = 'list'"
                            @open-unsplash="openUnsplashModal" @open-ai="openFieldAiModal"
                            @upload-image="handleImageUpload" />
                    </div>
                </div>
            </main>

            <!-- AI Generator Modal -->
            <AiGeneratorModal v-model:show="showAiModal" :is-generating="isAiGenerating" :prompt-chips="promptChips"
                :initial-prompt="aiPrompt" @generate="(p) => { aiPrompt = p; generateAiProcess() }" />

            <!-- Custom Delete Modal -->
            <DeleteConfirmationModal v-model:show="showDeleteModal" :is-deleting="isDeleting"
                :item-type="deleteIntent.type" @confirm="confirmDelete" />

            <!-- Security Setup for first-time login -->
            <LazySecuritySetup ref="securitySetup" />

            <!-- Unsplash Search Modal -->
            <UnsplashSearchModal v-model:show="showUnsplashModal" :initial-query="formData.title"
                @select="handleUnsplashSelect" />
        </template>
    </div>
</template>

<script setup lang="ts">
import { Pencil } from 'lucide-vue-next'
import AiGeneratorModal from '@/components/cms/modals/AiGeneratorModal.vue'
import DeleteConfirmationModal from '@/components/cms/modals/DeleteConfirmationModal.vue'
import UnsplashSearchModal from '@/components/cms/modals/UnsplashSearchModal.vue'
import CmsGalleryGrid from '@/components/cms/lists/CmsGalleryGrid.vue'
import CmsContentList from '@/components/cms/lists/CmsContentList.vue'
import CmsProjectEditor from '@/components/cms/editors/CmsProjectEditor.vue'
import CmsBlogEditor from '@/components/cms/editors/CmsBlogEditor.vue'
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

// AI State
const isAiGenerating = ref(false)
const aiPrompt = ref('')
const showAiModal = ref(false)
const aiMode = ref<'sections' | 'text'>('sections')
const aiTargetField = ref('')

// Unsplash State
const showUnsplashModal = ref(false)
const unsplashTarget = ref<'coverImage' | 'noteContent'>('coverImage')

const handleUnsplashSelect = (image: any) => {
    const imageUrl = image.urls.regular
    if (unsplashTarget.value === 'coverImage') {
        formData.value.coverImage = imageUrl
    } else {
        // Link copied for use in Markdown/ContentBuilder
        showToast('Link Copied', 'Unsplash image URL is ready to paste into your post.', 'success')
        navigator.clipboard.writeText(imageUrl)
    }
}

const openUnsplashModal = (target: string) => {
    unsplashTarget.value = target as 'coverImage' | 'noteContent'
    showUnsplashModal.value = true
}

const openFieldAiModal = (payload: { field: string, suggestion: string }) => {
    aiMode.value = 'text'
    aiTargetField.value = payload.field
    aiPrompt.value = payload.suggestion
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
    // Note: Auth is handled by middleware (auth.global.ts)
    // No client-side redirect needed here

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
                // Handle tags logic if needed, or remove if unused in new editor
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
        formData.value.techStack = []
        formData.value.tools = []
        formData.value.wireframes = []
        formData.value.finalDesigns = []
    }
    view.value = 'edit'
    if (import.meta.client) window.scrollTo({ top: 0, behavior: 'smooth' })
}

const editItem = (item: any) => {
    deleteIntent.value = { item: null, type: 'post' }
    formData.value = {
        id: item.id,
        title: item.title,
        slug: item.slug,
        year: item.year,
        created_at: item.created_at,
        coverImage: item.cover_image, // map snake_case from DB
        tags: item.tags || [],
        techStack: item.tech_stack || [],

        // Blog fields
        readTime: item.reading_time,
        excerpt: item.excerpt,

        // Engineering fields
        challenge: item.challenge || '',
        architecture: item.architecture || '',
        implementationHighlights: item.implementation_highlights || '',
        repositoryUrl: item.repository_url || '',
        liveDemoUrl: item.live_demo_url || '',
        performanceMetrics: item.performance_metrics || '',

        // Project-specific fields
        client: item.client || '',
        industry: item.industry || '',
        duration: item.duration || '',
        role: item.role || '',
        tools: item.tools || [],
        wireframes: item.wireframes || [],
        finalDesigns: item.final_designs || [],

        // Content structure
        content: item.content || { introduction: '', sections: [], results: { metrics: [], description: '' } },

        // Metadata
        hidden: item.hidden,
        featured: item.featured
    }
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
        const payload: any = {}

        if (isBlogPost) {
            const postFields = ['id', 'title', 'subtitle', 'date', 'year', 'month', 'slug', 'hidden', 'excerpt', 'content', 'featured', 'reading_time', 'cover_image', 'tags']
            postFields.forEach(f => {
                const dbField = f
                let formField = f
                if (f === 'reading_time') formField = 'readTime'
                if (f === 'cover_image') formField = 'coverImage'
                if (formData.value[formField] !== undefined) payload[dbField] = formData.value[formField]
            })
        } else {
            // Project fields mapping
            const projectFields = [
                'id', 'title', 'year', 'slug', 'client', 'industry', 'duration',
                'role', 'problemStatement', 'businessGoal', 'userGoal',
                'targetUsers', 'designApproach', 'researchMethods', 'keyInsights',
                'solutionSummary', 'outcome', 'learnings', 'content', 'featured',
                'subtitle', 'teamSize', 'projectLink', 'isFigma', 'coverImage', 'hidden',
                // Engineering fields
                'challenge', 'architecture', 'implementationHighlights',
                'repositoryUrl', 'liveDemoUrl', 'performanceMetrics',
                // Array fields
                'tags', 'tools', 'wireframes', 'techStack', 'finalDesigns'
            ]

            projectFields.forEach(f => {
                const formField = f
                let dbField = f.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)

                // Handle special cases
                if (f === 'techStack') dbField = 'tech_stack'
                if (f === 'finalDesigns') dbField = 'final_designs'

                if (formData.value[formField] !== undefined) {
                    payload[dbField] = formData.value[formField]
                }
            })
        }

        // Remove ID if empty to let Supabase generate one (for new items)
        if (!isEditing.value || !payload.id) {
            delete payload.id
        }

        // Use server API to bypass RLS restrictions
        const response = await $fetch('/api/cms/save', {
            method: 'POST',
            body: { payload, table }
        })

        if (!response.success) throw new Error('Save failed')

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

        // Use server API to bypass RLS restrictions
        const response = await $fetch('/api/cms/delete', {
            method: 'POST',
            body: { table, column, value }
        })

        if (!response.success) throw new Error('Delete failed')

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
            else if (field === 'wireframes') {
                if (!formData.value.wireframes) formData.value.wireframes = []
                formData.value.wireframes.push(publicUrl)
            }
            else if (field === 'finalDesigns') {
                if (!formData.value.finalDesigns) formData.value.finalDesigns = []
                formData.value.finalDesigns.push(publicUrl)
            }
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