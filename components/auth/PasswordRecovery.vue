<template>
    <div class="flex flex-col gap-6">
        <!-- Step 1: Verify Security Questions -->
        <div v-if="!isVerified">
            <h3 class="text-lg font-bold text-white mb-4">Answer Your Security Questions</h3>

            <div class="flex flex-col gap-4">
                <div v-for="(question, index) in securityQuestions" :key="index" class="flex flex-col gap-2">
                    <label class="text-sm text-neutral-400">{{ question }}</label>
                    <input
v-model="userAnswers[index]" type="text" placeholder="Your answer" required
                        class="bg-black/50 border border-neutral-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors" >
                </div>

                <button
type="button" class="bg-white text-black font-medium py-3 rounded-lg hover:bg-neutral-200 transition-colors mt-2"
                    :disabled="loading"
                    @click="verifyAnswers">
                    {{ loading ? 'Verifying...' : 'Verify Answers' }}
                </button>
            </div>
        </div>

        <!-- Step 2: Reset Password -->
        <div v-else>
            <h3 class="text-lg font-bold text-white mb-4">Set New Password</h3>

            <div class="flex flex-col gap-4">
                <input
v-model="newPassword" type="password" placeholder="New password" required
                    class="bg-black/50 border border-neutral-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors" >

                <input
v-model="confirmPassword" type="password" placeholder="Confirm new password" required
                    class="bg-black/50 border border-neutral-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors" >

                <button
type="button" class="bg-white text-black font-medium py-3 rounded-lg hover:bg-neutral-200 transition-colors"
                    :disabled="loading"
                    @click="resetPassword">
                    {{ loading ? 'Resetting...' : 'Reset Password' }}
                </button>
            </div>
        </div>

        <p v-if="error" class="text-red-500 text-sm text-center">{{ error }}</p>
        <p v-if="success" class="text-green-500 text-sm text-center">{{ success }}</p>
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['success', 'cancel'])

const securityQuestions = ref<string[]>([])
const userAnswers = ref(['', '', ''])
const isVerified = ref(false)
const newPassword = ref('')
const confirmPassword = ref('')
const error = ref('')
const success = ref('')
const loading = ref(false)

onMounted(async () => {
    const supabase = useSupabaseClient()
    // Fetch security questions from the database directly
    try {
        const { data, error: fetchError } = await supabase
            .from('security_questions')
            .select('question_1, question_2, question_3')
            .limit(1)
            .maybeSingle<{ question_1: string, question_2: string, question_3: string }>()

        if (fetchError) throw fetchError

        if (data) {
            securityQuestions.value = [data.question_1, data.question_2, data.question_3]
        } else {
            error.value = 'Security questions have not been set up yet. Please log into the CMS to configure them.'
        }
    } catch (e) {
        console.error('Failed to load security questions:', e)
        error.value = 'Failed to load security questions. Please ensure you have set them up in the CMS.'
    }
})

const verifyAnswers = async () => {
    loading.value = true
    error.value = ''

    try {
        await $fetch('/api/security/verify', {
            method: 'POST',
            body: { answers: userAnswers.value }
        })

        isVerified.value = true
    } catch (e: any) {
        error.value = e.data?.message || 'Incorrect answers. Please try again.'
    } finally {
        loading.value = false
    }
}

const resetPassword = async () => {
    if (newPassword.value !== confirmPassword.value) {
        error.value = 'Passwords do not match'
        return
    }

    if (newPassword.value.length < 8) {
        error.value = 'Password must be at least 8 characters'
        return
    }

    loading.value = true
    error.value = ''

    try {
        await $fetch('/api/auth/reset-password', {
            method: 'POST',
            body: { newPassword: newPassword.value }
        })

        success.value = 'Password reset successfully! Redirecting...'
        setTimeout(() => {
            emit('success')
        }, 2000)
    } catch (e: any) {
        error.value = e.data?.message || 'Failed to reset password'
    } finally {
        loading.value = false
    }
}
</script>
