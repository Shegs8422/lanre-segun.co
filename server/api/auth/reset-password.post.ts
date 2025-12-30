import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const { newPassword } = await readBody(event)

    // Verify reset token (set during security question verification)
    const resetToken = getCookie(event, 'reset_token')
    if (resetToken !== 'verified-admin-reset') {
        throw createError({
            statusCode: 401,
            message: 'Unauthorized. Verification expired or invalid.'
        })
    }

    try {
        const supabase = await serverSupabaseClient(event)

        // Update the password_override in our single config row
        const { error } = await supabase
            .from('security_questions')
            .update({ password_override: newPassword })
            .eq('id', '00000000-0000-0000-0000-000000000000')

        if (error) throw error

        // Clear the reset token
        deleteCookie(event, 'reset_token')

        return { success: true, message: 'Password updated successfully' }
    } catch (error: any) {
        console.error('Reset error:', error)
        throw createError({
            statusCode: 500,
            message: 'Failed to update password'
        })
    }
})
