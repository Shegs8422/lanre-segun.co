export default defineEventHandler(async (event) => {
    // Check authentication via cookie
    const authCookie = getCookie(event, 'cms-auth')
    if (authCookie !== 'true') {
        throw createError({
            statusCode: 401,
            message: 'Unauthorized - CMS authentication required'
        })
    }

    const { query, page = 1, per_page = 20 } = getQuery(event)

    if (!query) {
        throw createError({
            statusCode: 400,
            message: 'Search query is required'
        })
    }

    const accessKey = process.env.UNSPLASH_ACCESS_KEY

    if (!accessKey) {
        throw createError({
            statusCode: 500,
            message: 'Unsplash API key not configured'
        })
    }

    try {
        const response = await $fetch(`https://api.unsplash.com/search/photos`, {
            params: {
                query,
                page,
                per_page,
                client_id: accessKey
            }
        })

        return response
    } catch (error: any) {
        throw createError({
            statusCode: error.statusCode || 500,
            message: error.message || 'Failed to fetch images from Unsplash'
        })
    }
})
