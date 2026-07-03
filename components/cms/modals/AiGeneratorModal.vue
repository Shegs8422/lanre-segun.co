<template>
    <Transition name="fade">
        <div v-if="show" class="fixed inset-0 z-200 flex items-center justify-center font-sans"
            @keydown.escape="close">
            <!-- Backdrop -->
            <div class="absolute inset-0 bg-white dark:bg-[#131314] transition-colors" @click="close" />

            <!-- Gemini-style soft glow background -->
            <div class="absolute inset-0 pointer-events-none">
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_center,#4285F4_0%,#4796E3_20%,#C4DCFB_50%,transparent_70%)] opacity-15 dark:opacity-10 blur-3xl" />
            </div>

            <!-- Content Container -->
            <div class="relative z-10 flex flex-col items-center justify-center w-full max-w-2xl px-6 animate-fade-in">
                <!-- Greeting -->
                <h1 class="text-3xl md:text-4xl font-light text-gray-800 dark:text-gray-100 mb-10 text-center tracking-tight">
                    {{ greeting }}
                </h1>

                <!-- Input Bar -->
                <div class="w-full max-w-xl">
                    <div
                        class="flex items-center gap-2 bg-white dark:bg-[#1E1F20] border border-gray-200 dark:border-white/10 rounded-full px-4 py-3 shadow-lg shadow-black/5 dark:shadow-none transition-all focus-within:shadow-xl focus-within:shadow-blue-500/10 dark:focus-within:shadow-blue-500/5 focus-within:border-blue-300 dark:focus-within:border-blue-500/30">
                        <!-- Plus icon / Attachments -->
                        <button type="button"
                            class="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 dark:text-gray-400 transition-colors shrink-0"
                            title="Add context">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path d="M5 12h14" />
                                <path d="M12 5v14" />
                            </svg>
                        </button>

                        <!-- Text Input -->
                        <textarea ref="inputRef" v-model="localPrompt" :rows="1"
                            placeholder="Ask Gemini..."
                            class="flex-1 bg-transparent border-none outline-none ring-0 focus:ring-0 focus:border-none focus:outline-none text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 resize-none leading-relaxed min-h-[24px] max-h-[120px] py-0.5"
                            @input="autoResize" @keydown.enter.exact.prevent="handleEnter" />

                        <!-- Model Selector -->
                        <div class="relative shrink-0">
                            <button type="button"
                                class="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 border border-gray-200 dark:border-white/10 transition-colors"
                                @click="showModelDropdown = !showModelDropdown">
                                <span>{{ selectedModelLabel }}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" :class="{ 'rotate-180': showModelDropdown }"
                                    class="transition-transform">
                                    <path d="m6 9 6 6 6-6" />
                                </svg>
                            </button>

                            <!-- Dropdown -->
                            <Transition name="dropdown">
                                <div v-if="showModelDropdown"
                                    class="absolute bottom-full mb-2 right-0 w-56 bg-white dark:bg-[#2D2E30] border border-gray-200 dark:border-white/10 rounded-2xl shadow-xl shadow-black/10 dark:shadow-black/30 overflow-hidden py-1.5 z-50">
                                    <button v-for="model in models" :key="model.id" type="button"
                                        class="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                                        :class="{ 'bg-blue-50 dark:bg-blue-500/10': model.id === selectedModel }"
                                        @click="selectModel(model)">
                                        <div class="flex-1 min-w-0">
                                            <div class="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                                                {{ model.label }}
                                            </div>
                                            <div class="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                                                {{ model.description }}
                                            </div>
                                        </div>
                                        <div v-if="model.id === selectedModel"
                                            class="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                                    </button>
                                </div>
                            </Transition>
                        </div>

                        <!-- Send Button -->
                        <button type="button"
                            class="flex items-center justify-center w-8 h-8 rounded-full transition-all shrink-0"
                            :class="localPrompt.trim()
                                ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-md shadow-blue-500/30'
                                : 'bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-gray-500'"
                            :disabled="!localPrompt.trim() || isGenerating" @click="generate">
                            <span v-if="isGenerating"
                                class="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                            <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                fill="currentColor">
                                <path
                                    d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                            </svg>
                        </button>
                    </div>

                    <!-- Suggestion Chips -->
                    <div class="flex flex-wrap gap-2 mt-3 justify-center">
                        <button v-for="chip in promptChips" :key="chip" type="button"
                            class="px-3.5 py-1.5 rounded-full bg-white dark:bg-[#1E1F20] border border-gray-200 dark:border-white/10 hover:border-blue-300 dark:hover:border-blue-500/30 hover:bg-blue-50 dark:hover:bg-blue-500/5 text-xs text-gray-600 dark:text-gray-400 transition-all"
                            @click="insertChip(chip)">
                            {{ chip }}
                        </button>
                    </div>
                </div>
            </div>

            <!-- Close button -->
            <button type="button"
                class="absolute top-6 right-6 z-20 p-2 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                @click="close">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                </svg>
            </button>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted, nextTick } from 'vue'

const props = defineProps<{
    show: boolean
    isGenerating: boolean
    promptChips: string[]
    initialPrompt?: string
}>()

const emit = defineEmits<{
    (e: 'update:show', value: boolean): void
    (e: 'generate', prompt: string, model: string): void
}>()

const localPrompt = ref('')
const selectedModel = ref('gemini-2.5-flash')
const showModelDropdown = ref(false)
const inputRef = ref<HTMLTextAreaElement | null>(null)

const models = [
    { id: 'gemini-2.5-flash', label: 'Flash', description: 'Fast & efficient' },
    { id: 'gemini-2.5-pro', label: 'Pro', description: 'Advanced reasoning' },
    { id: 'gemini-3-flash-preview', label: '3 Flash', description: 'Latest preview' },
    { id: 'gemini-3.1-pro-preview', label: '3.1 Pro', description: 'Most capable' },
]

const selectedModelLabel = computed(() => {
    return models.find(m => m.id === selectedModel.value)?.label || 'Flash'
})

const selectModel = (model: { id: string }) => {
    selectedModel.value = model.id
    showModelDropdown.value = false
}

// Dynamic fun greeting
const greeting = computed(() => {
    const hour = new Date().getHours()
    const name = 'Oluwasegun'

    const greetings = [
        `What's the vibe, ${name}?`,
        `What's good, ${name}?`,
        `${name}, what are we cooking today?`,
        `What should we focus on, ${name}?`,
        `Let's build something fire, ${name}`,
        `What's the move, ${name}?`,
        `Ready to cook, ${name}?`,
        `${name}, what's on the agenda?`,
        `What are we creating, ${name}?`,
        `${name}, let's make magic`,
        `What's the plan, ${name}?`,
        `What's poppin', ${name}?`,
    ]

    const timeBased = hour < 6
        ? `Burning the midnight oil, ${name}?`
        : hour < 12
            ? `Good morning, ${name} — what's the vision?`
            : hour < 17
                ? `Good afternoon, ${name} — what are we building?`
                : hour < 21
                    ? `Good evening, ${name} — what's the mission?`
                    : `Late night grind, ${name}?`

    return Math.random() > 0.3 ? greetings[Math.floor(Math.random() * greetings.length)] : timeBased
})

// Auto-resize textarea
const autoResize = () => {
    const el = inputRef.value
    if (!el) return
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 120) + 'px'
}

const handleEnter = () => {
    if (localPrompt.value.trim() && !props.isGenerating) {
        generate()
    }
}

const insertChip = (chip: string) => {
    localPrompt.value = chip
    nextTick(() => inputRef.value?.focus())
}

watch(() => props.initialPrompt, (newVal) => {
    if (newVal) localPrompt.value = newVal
}, { immediate: true })

watch(() => props.show, (newVal) => {
    if (newVal) {
        showModelDropdown.value = false
        nextTick(() => inputRef.value?.focus())
    }
})

// Close dropdown on outside click
const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    if (!target.closest('.relative')) {
        showModelDropdown.value = false
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

const close = () => {
    emit('update:show', false)
}

const generate = () => {
    if (localPrompt.value.trim()) {
        emit('generate', localPrompt.value, selectedModel.value)
    }
}
</script>

<style scoped>
textarea {
    border: none !important;
    outline: none !important;
    box-shadow: none !important;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(8px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in {
    animation: fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.dropdown-enter-active,
.dropdown-leave-active {
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.dropdown-enter-from,
.dropdown-leave-to {
    opacity: 0;
    transform: translateY(8px) scale(0.96);
}
</style>
