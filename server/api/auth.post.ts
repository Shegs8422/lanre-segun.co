export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const password = body.password

    // Simple hardcoded password for now. 
    // In a real app, use runtime status or env variables.
    const CORRECT_PASSWORD = process.env.CMS_PASSWORD || 'admin123'

    if (password === CORRECT_PASSWORD) {
        // Set cookie
        setCookie(event, 'auth_token', 'logged-in-secret-token', {
            httpOnly: false, // Allow client JS to read for UI state if needed, but better true for security. 
            // For this simple case, we might check cookie existence in middleware.
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/'
        })
        return { success: true }
    } else {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized'
        })
    }
})
