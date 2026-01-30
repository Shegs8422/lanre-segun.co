<template>
    <Transition name="fade">
        <div v-if="show" class="fixed inset-0 z-210 flex items-center justify-center p-6">
            <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="close" />
            <div
                class="relative w-full max-w-sm bg-background border border-border p-8 rounded-2xl shadow-2xl flex flex-col gap-6 animate-fade-in-up">
                <div class="flex flex-col items-center text-center gap-4">
                    <div
                        class="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 px-1">
                        <Trash2 :size="32" stroke-width="2.5" />
                    </div>
                    <div class="flex flex-col gap-2">
                        <h3 class="font-black text-xl tracking-tight text-foreground">
                            Delete {{ itemTypeLabel }}?
                        </h3>
                        <p class="text-sm text-muted-foreground leading-relaxed">
                            Are you absolutely sure? This action will permanently remove this entry from your portfolio.
                            This cannot be undone.
                        </p>
                    </div>
                </div>

                <div class="flex flex-col gap-3">
                    <button :disabled="isDeleting"
                        class="w-full py-4 bg-red-500 hover:bg-red-600 text-white rounded-xl font-black uppercase tracking-widest text-xxs transition-all shadow-xl shadow-red-500/20 active:scale-95 disabled:opacity-50"
                        @click="confirm">
                        {{ isDeleting ? 'Removing...' : 'Permanently Delete' }}
                    </button>
                    <button
                        class="w-full py-4 text-muted-foreground font-bold text-xs hover:text-foreground transition-colors"
                        @click="close">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Trash2 } from 'lucide-vue-next'

const props = defineProps<{
    show: boolean
    isDeleting: boolean
    itemType: 'post' | 'project' | 'gallery'
}>()

const emit = defineEmits<{
    (e: 'update:show', value: boolean): void
    (e: 'confirm'): void
}>()

const itemTypeLabel = computed(() => {
    switch (props.itemType) {
        case 'gallery': return 'Photo'
        case 'post': return 'Post'
        case 'project': return 'Project'
        default: return 'Item'
    }
})

const close = () => {
    emit('update:show', false)
}

const confirm = () => {
    emit('confirm')
}
</script>

<style scoped>
.animate-fade-in-up {
    animation: fadeInUp 0.3s ease-out;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
