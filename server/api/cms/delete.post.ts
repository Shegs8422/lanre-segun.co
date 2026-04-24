import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
    // Check authentication via cookie
    const authCookie = getCookie(event, 'cms-auth')
    if (authCookie !== 'true') {
        throw createError({
            statusCode: 401,
            message: 'Unauthorized - CMS authentication required'
        })
    }

    const body = await readBody(event)
    const { table, column, value } = body

    if (!table || !column || !value) {
        throw createError({
            statusCode: 400,
            message: 'Table, column, and value required'
        })
    }

    // Valid tables for CMS
    const validTables = ['projects', 'notes', 'gallery', 'blog']
    if (!validTables.includes(table)) {
        throw createError({
            statusCode: 400,
            message: 'Invalid table'
        })
    }

    try {
        // Use service role to bypass RLS
        const supabaseAdmin = await serverSupabaseServiceRole(event)

        // If deleting from gallery, we should also delete the file from Storage
        if (table === 'gallery') {
            // First get the URL to identify the file path
            const { data: item } = await supabaseAdmin
                .from(table)
                .select('url')
                .eq(column, value)
                .single()

            if (item?.url) {
                // Extract path from public URL (e.g., .../storage/v1/object/public/portfolio/gallery/filename)
                // We know our structure is gallery/filename in the portfolio bucket
                const urlParts = item.url.split('/')
                const filename = urlParts[urlParts.length - 1]
                const path = `gallery/${filename}`

                await supabaseAdmin.storage
                    .from('portfolio')
                    .remove([path])
            }
        }

        const { error } = await supabaseAdmin
            .from(table)
            .delete()
            .eq(column, value)

        if (error) throw error

        return { success: true }
    } catch (error: any) {
        throw createError({
            statusCode: 500,
            message: error.message || 'Delete operation failed'
        })
    }
})
