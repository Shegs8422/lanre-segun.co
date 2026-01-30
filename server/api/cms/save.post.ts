import { serverSupabaseServiceRole } from '#supabase/server'


export default defineEventHandler(async (event) => {
    console.log('=== CMS Save API Called ===')
    
    // Check authentication via cookie
    const authCookie = getCookie(event, 'cms-auth')
    console.log('Auth cookie:', authCookie)
    
    if (authCookie !== 'true') {
        console.error('Unauthorized - no valid CMS auth cookie')
        throw createError({
            statusCode: 401,
            message: 'Unauthorized - CMS authentication required'
        })
    }

    const body = await readBody(event)
    const { payload, table } = body
    
    console.log('Request body:', { table, payloadKeys: payload ? Object.keys(payload) : 'none' })

    if (!payload || !table) {
        console.error('Missing payload or table')
        throw createError({
            statusCode: 400,
            message: 'Payload and table required'
        })
    }

    // Valid tables for CMS
    const validTables = ['projects', 'notes', 'gallery']
    if (!validTables.includes(table)) {
        console.error('Invalid table:', table)
        throw createError({
            statusCode: 400,
            message: 'Invalid table'
        })
    }

    // Check if service role key is present
    if (!process.env.SUPABASE_SECRET_KEY) {
        console.error('CRITICAL: SUPABASE_SECRET_KEY is missing from environment')
        throw createError({
            statusCode: 500,
            message: 'Server configuration error: Missing Service Role Key'
        })
    }

    try {
        // Use service role to bypass RLS
        console.log('Attempting to get Supabase admin client...')
        let supabaseAdmin
        try {
            supabaseAdmin = await serverSupabaseServiceRole(event)
            console.log('Service role client obtained successfully')
        } catch (error: any) {
            console.error('Failed to get service role client:', error)
            throw createError({
                statusCode: 500,
                message: 'Service role initialization failed: ' + error.message
            })
        }
        
        console.log('CMS Save - Table:', table)
        console.log('CMS Save - Payload keys:', Object.keys(payload))
        
        const { data, error } = await supabaseAdmin
            .from(table)
            .upsert(payload, { onConflict: 'slug' })
            .select()

        if (error) {
            console.error('Supabase Error:', error)
            throw error
        }

        console.log('CMS Save - Success')
        return { success: true, data }
    } catch (error: any) {
        console.error('CMS Save Error:', error)
        throw createError({
            statusCode: 500,
            message: error.message || 'Database operation failed',
            data: error
        })
    }
})
