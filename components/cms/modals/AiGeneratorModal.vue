<template>
    <Transition name="fade">
        <div v-if="show" class="fixed inset-0 z-200 flex items-center justify-center p-6 font-sans">
            <!-- Backdrop -->
            <div class="absolute inset-0 bg-white/60 dark:bg-black/80 backdrop-blur-md transition-colors" @click="close" />
            
            <!-- Modal Container -->
            <div
                class="relative w-full max-w-lg bg-white dark:bg-[#131314] text-gray-900 dark:text-white p-1 rounded-[24px] shadow-2xl animate-fade-in-up overflow-hidden group transition-colors">
                
                <!-- Border Gradient Animation -->
                <div class="absolute inset-0 bg-linear-to-r from-blue-500 via-purple-500 to-red-500 opacity-20 group-hover:opacity-40 transition-opacity duration-500"/>
                <div class="absolute inset-px bg-white dark:bg-[#131314] rounded-[23px] transition-colors"/>

                <!-- Content -->
                <div class="relative p-6 md:p-8 flex flex-col gap-6">
                    <!-- Header -->
                    <div class="flex items-start justify-between">
                        <div class="flex items-center gap-3">
                            <div class="relative">
                                <img src="https://pqmcl2p95v0ptrae.public.blob.vercel-storage.com/public/gemini.svg" alt="Google Gemini Logo" class="w-6 h-6 animate-pulse-slow" >
                                <div class="absolute inset-0 bg-blue-500 blur-lg opacity-40"/>
                            </div>
                            <div>
                                <h3 class="font-medium text-lg bg-linear-to-r from-blue-600 via-purple-600 to-red-500 dark:from-blue-200 dark:via-purple-200 dark:to-white bg-clip-text text-transparent transition-all">
                                    Google Gemini
                                </h3>
                                <p class="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wide">AI SYSTEMS ARCHITECT</p>
                            </div>
                        </div>
                        <button class="p-2 text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white transition-colors" @click="close">
                            <X :size="18" />
                        </button>
                    </div>

                    <!-- Input Area -->
                    <div class="flex flex-col gap-4">
                        <div class="bg-gray-50 dark:bg-[#1E1F20] rounded-2xl p-4 border border-gray-200 dark:border-white/5 focus-within:border-blue-500/50 dark:focus-within:border-white/10 transition-colors shadow-inner dark:shadow-none">
                            <textarea 
                                v-model="localPrompt" 
                                rows="3"
                                placeholder="Ask Gemini to draft your design process, engineering challenges, or architecture docs..."
                                class="w-full bg-transparent border-none focus:ring-0 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 resize-none leading-relaxed" 
                            />
                            
                            <!-- Chips -->
                            <div class="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-white/5">
                                <button v-for="chip in promptChips" :key="chip" type="button"
                                    class="px-3 py-1.5 rounded-lg bg-white border border-gray-200 hover:bg-gray-100 hover:border-gray-300 text-gray-600 dark:bg-[#2D2E30] dark:border-transparent dark:hover:bg-[#3C3D40] text-xxs uppercase font-bold tracking-wider dark:text-gray-300 transition-all"
                                    @click="localPrompt = chip">
                                    {{ chip }}
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Footer Actions -->
                    <div class="flex items-center justify-between mt-2">
                        <div class="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
                           <ShieldCheck :size="12" />
                           <span>Enterprise Grade Security</span>
                        </div>
                        <button 
                            :disabled="isGenerating || !localPrompt" 
                            class="gemini-button relative group/btn overflow-hidden rounded-full px-6 py-2.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg dark:shadow-none"
                            @click="generate">
                            <div class="absolute inset-0 bg-linear-to-r from-[#4285F4] via-[#9B72CB] to-[#D96570] opacity-90 group-hover/btn:opacity-100 transition-opacity"/>
                            <div class="relative flex items-center gap-2 font-medium text-sm text-white">
                                <span v-if="isGenerating" class="w-3 h-3 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                                <Sparkles v-else :size="14" class="text-white fill-white" />
                                <span>{{ isGenerating ? 'Generating...' : 'Generate' }}</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Sparkles, X, ShieldCheck } from 'lucide-vue-next'

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
/* Gemini Specific Animation */
@keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
}

.gemini-button {
    color: white;
    text-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

.animate-pulse-slow {
    animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-fade-in-up {
    animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: scale(0.95) translateY(10px);
    }
    to {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}
</style>
