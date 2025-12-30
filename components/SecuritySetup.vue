<template>
    <Transition name="fade">
        <div v-if="isOpen" class="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div
                class="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl w-full max-w-md shadow-2xl relative max-h-[90vh] overflow-y-auto">
                <h2 class="text-xl font-bold text-white mb-2">Security Setup Required</h2>
                <p class="text-neutral-400 text-sm mb-6">Set up security questions to recover your password if you
                    forget it.</p>

                <form @submit.prevent="handleSetup" class="flex flex-col gap-6">
                    <!-- Question 1 -->
                    <div class="flex flex-col gap-2">
                        <label class="text-xs font-bold uppercase text-neutral-500">{{ questionOptions[0] }}</label>
                        <input v-model="answers[0]" type="text" placeholder="Your answer" required autocomplete="off"
                            class="bg-black/50 border border-neutral-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors" />
                    </div>

                    <!-- Question 2 -->
                    <div class="flex flex-col gap-2">
                        <label class="text-xs font-bold uppercase text-neutral-500">{{ questionOptions[1] }}</label>
                        <input v-model="answers[1]" type="text" placeholder="Your answer" required autocomplete="off"
                            class="bg-black/50 border border-neutral-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors" />
                    </div>

                    <!-- Question 3 -->
                    <div class="flex flex-col gap-2">
                        <label class="text-xs font-bold uppercase text-neutral-500">{{ questionOptions[2] }}</label>
                        <input v-model="answers[2]" type="text" placeholder="Your answer" required autocomplete="off"
                            class="bg-black/50 border border-neutral-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors" />
                    </div>

                    <button type="submit"
                        class="bg-white text-black font-medium py-3 rounded-lg hover:bg-neutral-200 transition-colors mt-2"
                        :disabled="loading">
                        {{ loading ? 'Saving...' : 'Save Security Questions' }}
                    </button>
                </form>

                <p v-if="error" class="text-red-500 text-sm mt-4 text-center">{{ error }}</p>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
const isOpen = ref(false)
const answers = ref(['', '', ''])
const error = ref('')
const loading = ref(false)

const questionOptions = [
    "In what city or town did your parents meet?",
    "What was the name of the first company you worked for?",
    "What is the middle name of your youngest sibling"
]

const open = () => {
    isOpen.value = true
    answers.value = ['', '', '']
    error.value = ''
}

const close = () => {
    isOpen.value = false
}

const handleSetup = async () => {
    loading.value = true
    error.value = ''

    try {
        await $fetch('/api/security/setup', {
            method: 'POST',
            body: {
                questions: questionOptions,
                answers: answers.value
            }
        })

        close()
    } catch (e: any) {
        error.value = e.data?.message || 'Failed to save security questions'
    } finally {
        loading.value = false
    }
}

defineExpose({ open, close })
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
