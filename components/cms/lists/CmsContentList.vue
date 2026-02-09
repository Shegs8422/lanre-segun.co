<template>
    <div>
        <div v-for="item in items" :key="item.slug"
            class="p-5 rounded-xl border border-border bg-component/50 dark:bg-white/2 shadow-sm hover:shadow-md hover:border-blue-500/40 transition-all flex flex-col sm:flex-row justify-between sm:items-center gap-4 group mb-4">
            <div class="flex flex-col gap-1.5 grow">
                <div class="flex items-center gap-2">
                    <h3
                        class="font-bold text-base lg:text-lg text-foreground group-hover:text-blue-500 transition-colors leading-tight">
                        {{ item.title }}</h3>
                    <NuxtLink :to="type === 'blog' ? `/blog/${item.slug}` : `/projects/${item.slug}`" target="_blank"
                        class="p-1.5 text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10 rounded-lg transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" />
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
                    @click="$emit('edit', item)">Edit</button>
                <button
                    class="flex-1 lg:flex-initial text-sm font-bold px-4 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                    @click="$emit('delete', item)">Delete</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    items: any[]
    type: 'blog' | 'projects' | 'gallery' // 'gallery' usually won't be used here but generic
}>()

defineEmits<{
    (e: 'edit' | 'delete', item: any): void
}>()
</script>
