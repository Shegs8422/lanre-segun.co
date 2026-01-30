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
    const validTables = ['projects', 'notes', 'gallery']
    if (!validTables.includes(table)) {
        throw createError({
            statusCode: 400,
            message: 'Invalid table'
        })
    }

    try {
        // Use service role to bypass RLS
        const supabaseAdmin = await serverSupabaseServiceRole(event)
        
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
