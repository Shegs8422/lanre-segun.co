<template>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <div v-for="item in items" :key="item.id"
            class="group relative aspect-square bg-component/40 rounded-2xl overflow-hidden border border-border/40 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500">
            <img :src="item.url"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
            <div
                class="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-5">
                <div
                    class="flex flex-col gap-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div class="flex flex-col">
                        <span class="text-xxs font-black uppercase tracking-mega text-blue-400">Captured
                            Asset</span>
                        <span class="text-xs font-bold text-white truncate">{{ item.name ||
                            'Untitled Frame' }}</span>
                    </div>
                    <div class="flex gap-2">
                        <button
                            class="flex-1 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xxs font-black uppercase tracking-widest rounded-lg transition-all border border-white/10"
                            @click="$emit('delete', item)">Delete</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Add Button Container -->
        <div class="aspect-square relative group">
            <div
                class="absolute inset-0 bg-blue-500/5 rounded-2xl border-2 border-dashed border-blue-500/20 group-hover:border-blue-500/50 transition-all" />
            <button
                class="absolute inset-2 bg-background border border-border/40 rounded-xl flex flex-col items-center justify-center gap-4 hover:bg-muted/30 transition-all group/btn shadow-sm"
                @click="(($refs.fileInput as any).click())">
                <div
                    class="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover/btn:bg-blue-500 group-hover/btn:text-white group-hover/btn:rotate-90 transition-all duration-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                </div>
                <div class="flex flex-col items-center gap-1">
                    <span
                        class="text-xxs font-black text-muted-foreground tracking-mega uppercase group-hover/btn:text-foreground transition-colors">Import
                        Assets</span>
                    <span class="text-xxs font-bold text-muted-foreground/50 uppercase tracking-widest">Multiple
                        Selection</span>
                </div>
                <input ref="fileInput" type="file" class="hidden" multiple accept="image/*"
                    @change="$emit('upload', $event)">
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    items: any[]
}>()

defineEmits<{
    (e: 'delete', item: any): void
    (e: 'upload', event: Event): void
}>()
</script>
