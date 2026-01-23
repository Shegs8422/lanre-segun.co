<template>
    <div class="flex flex-col h-full overflow-hidden">
        <!-- Header -->
        <div
            class="shrink-0 h-16 border-b border-border flex items-center justify-between px-6 bg-background/50 backdrop-blur-md">
            <h2 class="text-sm font-bold uppercase tracking-widest text-muted-foreground">Blog Database</h2>
            <button
                class="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all shadow-lg shadow-blue-900/20 active:scale-95"
                @click="createNew">
                + New Post
            </button>
        </div>

        <!-- Content Area -->
        <div class="grow flex overflow-hidden">
            <!-- List Column -->
            <div class="w-1/3 border-r border-border flex flex-col bg-muted/5 overflow-y-auto">
                <div v-for="post in blogPosts" :key="post.id"
                    class="p-4 border-b border-border/50 cursor-pointer hover:bg-muted/10 transition-colors group"
                    :class="{ 'bg-blue-500/5 border-l-2 border-l-blue-500': selectedPost?.id === post.id }"
                    @click="selectPost(post)">
                    <div class="flex items-center justify-between mb-1">
                        <span class="text-xxs font-mono text-muted-foreground">{{ post.date }}</span>
                        <div v-if="post.hidden"
                            class="px-1.5 py-0.5 rounded-full bg-yellow-500/10 text-yellow-500 text-[9px] font-bold uppercase border border-yellow-500/20">
                            Hidden
                        </div>
                    </div>
                    <h3
                        class="font-bold text-sm text-foreground group-hover:text-blue-500 transition-colors mb-2 line-clamp-1">
                        {{ post.title || 'Untitled Post' }}
                    </h3>
                    <p class="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {{ post.excerpt || 'No excerpt...' }}
                    </p>
                </div>
            </div>

            <!-- Editor Column -->
            <div v-if="selectedPost" class="w-2/3 flex flex-col h-full bg-background overflow-y-auto">
                <div class="p-8 max-w-3xl mx-auto w-full flex flex-col gap-6">
                    <!-- Meta Controls -->
                    <div class="flex items-center gap-4">
                        <div class="flex items-center gap-2">
                            <label
                                class="text-xxs font-black uppercase tracking-widest text-muted-foreground">Status</label>
                            <button class="px-3 py-1.5 rounded-lg border text-xs font-bold transition-all"
                                :class="selectedPost.hidden ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500' : 'bg-green-500/10 border-green-500/20 text-green-500'"
                                @click="toggleVisibility">
                                {{ selectedPost.hidden ? 'Hidden' : 'Published' }}
                            </button>
                        </div>
                        <div class="grow" />
                        <button
                            class="text-red-500 hover:bg-red-500/10 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors"
                            @click="deleteCurrent">
                            Delete Post
                        </button>
                    </div>

                    <!-- Title -->
                    <div class="flex flex-col gap-2">
                        <label class="text-xxs font-black uppercase tracking-widest text-muted-foreground">Title</label>
                        <input v-model="selectedPost.title" type="text"
                            class="text-2xl font-bold bg-transparent border-none focus:ring-0 p-0 placeholder:text-muted-foreground/30"
                            placeholder="Enter post title...">
                    </div>

                    <!-- Slug & Date -->
                    <div class="grid grid-cols-2 gap-4">
                        <div class="flex flex-col gap-2">
                            <label
                                class="text-xxs font-black uppercase tracking-widest text-muted-foreground">Slug</label>
                            <input v-model="selectedPost.slug" type="text"
                                class="bg-muted/30 border border-border rounded-lg px-3 py-2 text-xs font-mono focus:border-blue-500 outline-none"
                                placeholder="my-awesome-post">
                        </div>
                        <div class="flex flex-col gap-2">
                            <label class="text-xxs font-black uppercase tracking-widest text-muted-foreground">Date
                                (YYYY-MM-DD)</label>
                            <input v-model="selectedPost.date" type="text"
                                class="bg-muted/30 border border-border rounded-lg px-3 py-2 text-xs font-mono focus:border-blue-500 outline-none"
                                placeholder="2024-01-01">
                        </div>
                    </div>

                    <!-- Excerpt -->
                    <div class="flex flex-col gap-2">
                        <label
                            class="text-xxs font-black uppercase tracking-widest text-muted-foreground">Excerpt</label>
                        <textarea v-model="selectedPost.excerpt" rows="2"
                            class="bg-muted/30 border border-border rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none resize-none"
                            placeholder="Brief summary for the list view..." />
                    </div>

                    <!-- Content (Markdown) -->
                    <div class="flex flex-col gap-2 h-full min-h-[400px]">
                        <label
                            class="text-xxs font-black uppercase tracking-widest text-muted-foreground flex justify-between">
                            <span>Content (Markdown)</span>
                            <span class="text-blue-500 cursor-pointer hover:underline">Preview</span>
                        </label>
                        <textarea v-model="selectedPost.content"
                            class="grow bg-muted/10 border border-border rounded-xl p-6 text-sm font-mono leading-relaxed focus:border-blue-500 outline-none resize-none shadow-inner"
                            placeholder="# Write your thoughts here..." />
                    </div>

                    <!-- Action Bar -->
                    <div class="sticky bottom-4 z-10 flex justify-end">
                        <button
                            class="bg-foreground text-background px-6 py-3 rounded-xl font-bold shadow-xl hover:scale-105 transition-transform flex items-center gap-2"
                            @click="save">
                            <span v-if="saving" class="animate-spin">⟳</span>
                            {{ saving ? 'Saving...' : 'Save Changes' }}
                        </button>
                    </div>

                </div>
            </div>

            <!-- Empty State -->
            <div v-else class="w-2/3 flex flex-col items-center justify-center text-muted-foreground gap-4">
                <div class="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <line x1="10" y1="9" x2="8" y2="9" />
                    </svg>
                </div>
                <p>Select a post to edit or create a new one.</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const { posts: blogPosts, fetchPosts, createPost, updatePost, deletePost } = useBlog()
const selectedPost = ref<any>(null)
const saving = ref(false)

// Initial fetch
onMounted(async () => {
    await fetchPosts()
})

const selectPost = (post: any) => {
    selectedPost.value = { ...post } // Clone to avoid direct mutation before save
}

const createNew = async () => {
    const dateStr = new Date().toISOString().split('T')[0]
    if (!dateStr) return

    const newPost = {
        title: '',
        date: dateStr,
        year: dateStr.split('-')[0],
        month: new Date().toLocaleString('default', { month: 'long' }),
        slug: `post-${Date.now()}`,
        hidden: true,
        excerpt: '',
        content: ''
    } as any

    saving.value = true
    const created = await createPost(newPost)
    saving.value = false

    if (created) {
        selectedPost.value = { ...(created as any) }
    }
}

const toggleVisibility = () => {
    if (selectedPost.value) {
        selectedPost.value.hidden = !selectedPost.value.hidden
    }
}

const deleteCurrent = async () => {
    if (!selectedPost.value || !confirm('Are you sure you want to delete this blog post?')) return

    const id = selectedPost.value.id
    if (await deletePost(id)) {
        selectedPost.value = null
    }
}

const save = async () => {
    if (!selectedPost.value) return

    saving.value = true
    const postData = selectedPost.value as any
    const { id, ...updates } = postData

    // Auto-update year/month from date
    if (updates.date) {
        updates.year = updates.date.split('-')[0]
        const d = new Date(updates.date)
        if (!isNaN(d.getTime())) {
            updates.month = d.toLocaleString('default', { month: 'long' })
        }
    }

    const success = await updatePost(id, updates)
    saving.value = false

    if (success) {
        // Optimistic update handled by useBlog mostly
    }
}
</script>
