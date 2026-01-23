import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const password = body.password

    const supabase = await serverSupabaseClient(event)

    // 1. Check if there is a password override in Supabase
    const { data: config } = await supabase
        .from('security_questions')
        .select('password_override')
        .eq('id', '00000000-0000-0000-0000-000000000000')
        .maybeSingle()

    const CORRECT_PASSWORD = config?.password_override || process.env.CMS_PASSWORD || 'admin123'

    if (password === CORRECT_PASSWORD) {
        // Secure server-side token
        setCookie(event, 'auth_token', 'logged-in-secret-token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/',
            sameSite: 'strict'
        })

        // Client-side visible cookie for UI logic/middleware
        setCookie(event, 'cms-auth', 'true', {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
            sameSite: 'strict'
        })
        return { success: true }
    } else {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized'
        })
    }
})
