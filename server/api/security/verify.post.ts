import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const { answers } = await readBody(event)

    if (!answers || answers.length !== 3) {
        throw createError({
            statusCode: 400,
            message: 'Invalid request. 3 answers required.'
        })
    }

    try {
        const supabase = await serverSupabaseClient(event)
        const bcrypt = await import('bcryptjs')

        // Fetch security questions
        const { data, error } = await supabase
            .from('security_questions')
            .select('*')
            .limit(1)
            .maybeSingle()

        if (error || !data) {
            throw createError({
                statusCode: 404,
                message: 'Security questions not found. Please set them up in the CMS first.'
            })
        }

        // Strong normalization: remove ALL spaces and lowercase
        const normalize = (val: string) => val.replace(/\s/g, '').toLowerCase()

        // Verify all answers
        const isValid = await Promise.all([
            bcrypt.compare(normalize(answers[0]), data.answer_1_hash),
            bcrypt.compare(normalize(answers[1]), data.answer_2_hash),
            bcrypt.compare(normalize(answers[2]), data.answer_3_hash)
        ])

        if (isValid.every(v => v === true)) {
            // Store a secure reset token in cookie
            // Since we are single admin, we just need to know they verified
            setCookie(event, 'reset_token', 'verified-admin-reset', {
                maxAge: 600, // 10 minutes
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict'
            })

            return { success: true }
        } else {
            throw createError({
                statusCode: 401,
                message: 'Verification failed. Answers are incorrect.'
            })
        }
    } catch (error: any) {
        if (error.statusCode) throw error

        console.error('Verification error:', error)
        throw createError({
            statusCode: 500,
            message: 'Verification failed'
        })
    }
})
