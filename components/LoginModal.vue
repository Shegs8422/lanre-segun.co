<template>
    <Transition name="fade">
        <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div class="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl w-full max-w-sm shadow-2xl relative">
                <button @click="close" class="absolute top-4 right-4 text-neutral-500 hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <h2 class="text-xl font-bold text-white mb-6">Restricted Access</h2>

                <form @submit.prevent="handleLogin" class="flex flex-col gap-4">
                    <input ref="passwordInput" v-model="password" type="password" placeholder="Enter password..."
                        autocomplete="current-password"
                        class="bg-black/50 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" />
                    <button type="submit"
                        class="bg-white text-black font-medium py-3 rounded-lg hover:bg-neutral-200 transition-colors"
                        :disabled="loading">
                        {{ loading ? 'Checking...' : 'Enter CMS' }}
                    </button>
                </form>

                <p v-if="error" class="text-red-500 text-sm mt-4 text-center">{{ error }}</p>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
const isOpen = ref(false)
const password = ref('')
const error = ref('')
const loading = ref(false)
const passwordInput = ref<HTMLInputElement | null>(null)
const router = useRouter()

const open = () => {
    isOpen.value = true
    nextTick(() => {
        passwordInput.value?.focus()
    })
}

const close = () => {
    isOpen.value = false
    password.value = ''
    error.value = ''
}

const handleLogin = async () => {
    loading.value = true
    error.value = ''

    try {
        await $fetch('/api/auth', {
            method: 'POST',
            body: { password: password.value }
        })

        // Success
        close()
        router.push('/cms')
    } catch (e) {
        error.value = 'Incorrect password'
    } finally {
        loading.value = false
    }
}

// Expose open method
defineExpose({ open })
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
