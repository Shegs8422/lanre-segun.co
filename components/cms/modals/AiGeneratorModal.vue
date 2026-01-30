<template>
    <Transition name="fade">
        <div v-if="show" class="fixed inset-0 z-200 flex items-center justify-center p-6">
            <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="close" />
            <div
                class="relative w-full max-w-md bg-background border border-border p-8 rounded-2xl shadow-2xl flex flex-col gap-6 animate-fade-in-up">
                <div class="flex items-center gap-4">
                    <div
                        class="w-10 h-10 rounded-xl bg-linear-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-white">
                        <Bot :size="20" />
                    </div>
                    <div>
                        <h3 class="font-bold text-lg text-foreground">AI Content Assistant</h3>
                        <p class="text-xs text-muted-foreground">Draft your process using Gemini</p>
                    </div>
                </div>

                <div class="flex flex-col gap-4">
                    <label class="text-xxs font-bold uppercase tracking-widest text-muted-foreground px-1">What should I
                        focus on?</label>
                    <div class="flex flex-wrap gap-2 mb-1">
                        <button v-for="chip in promptChips" :key="chip" type="button"
                            class="px-3 py-1.5 rounded-full bg-muted/50 border border-border text-xxs font-black uppercase tracking-wider text-muted-foreground hover:bg-blue-500/10 hover:text-blue-500 hover:border-blue-500/50 transition-all"
                            @click="localPrompt = chip">
                            {{ chip }}
                        </button>
                    </div>
                    <textarea v-model="localPrompt" rows="4"
                        placeholder="e.g. Focus on how we built the design system and tested it with 10 user interviews..."
                        class="bg-muted/30 border border-border rounded-xl px-4 py-4 focus:outline-none focus:border-blue-500 transition-all text-sm leading-relaxed" />
                </div>

                <div class="flex gap-3">
                    <button
                        class="flex-1 px-6 py-3 rounded-xl border border-border text-sm font-bold hover:bg-muted transition-colors"
                        @click="close">Cancel</button>
                    <button :disabled="isGenerating || !localPrompt" class="btn-gemini-primary flex-2"
                        @click="generate">
                        <span v-if="isGenerating"
                            class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {{ isGenerating ? 'Synergizing...' : 'Gemini' }}
                    </button>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Bot } from 'lucide-vue-next'

const props = defineProps<{
    show: boolean
    isGenerating: boolean
    promptChips: string[]
    initialPrompt?: string
}>()

const emit = defineEmits<{
    (e: 'update:show', value: boolean): void
    (e: 'generate', prompt: string): void
}>()

const localPrompt = ref('')

watch(() => props.initialPrompt, (newVal) => {
    if (newVal) localPrompt.value = newVal
}, { immediate: true })

// Reset prompt when opening
watch(() => props.show, (newVal) => {
    if (newVal && !localPrompt.value) {
        localPrompt.value = props.initialPrompt || ''
    }
})

const close = () => {
    emit('update:show', false)
}

const generate = () => {
    emit('generate', localPrompt.value)
}
</script>

<style scoped>
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
