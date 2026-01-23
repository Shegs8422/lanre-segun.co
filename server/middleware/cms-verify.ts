export default defineEventHandler((event) => {
    // Only check for CMS data modification routes
    const isCmsRoute = event.path.startsWith('/api/cms') ||
        event.path.startsWith('/api/security/setup')

    if (isCmsRoute) {
        const authToken = getCookie(event, 'auth_token')

        // Simple token verification
        // In a real app, this would verify a JWT or session in a database
        if (!authToken || authToken !== 'logged-in-secret-token') {
            throw createError({
                statusCode: 401,
                statusMessage: 'Unauthorized access to CMS API'
            })
        }
    }
})
