import { put } from '@vercel/blob'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event)
        const type = query.type as string

        // Accept both JSON (base64) and multipart form data
        const contentType = getRequestHeader(event, 'content-type') || ''

        let buffer: Buffer
        let filename: string
        let fileMime: string

        if (contentType.includes('application/json') || contentType.includes('text/plain')) {
            // JSON/plain-text fallback: accept base64-encoded file
            const body = await readBody(event) as any
            const raw = body?.file || body?.data || body
            if (!raw) {
                throw createError({ statusCode: 400, statusMessage: 'No file data' })
            }
            const base64Data = typeof raw === 'string' && raw.includes('base64,') ? raw.split('base64,')[1] : raw
            buffer = Buffer.from(base64Data, 'base64')
            filename = `${Date.now()}-${body?.name || 'image.jpg'}`
            fileMime = body?.mime || 'image/jpeg'
        } else if (contentType.includes('multipart/form-data')) {
            // Try Web API formData()
            try {
                const req = event.web?.request || event.request
                const formData = await req.formData()
                const fileField = formData.get('file')
                if (fileField && typeof fileField !== 'string') {
                    buffer = Buffer.from(await fileField.arrayBuffer())
                    filename = `${Date.now()}-${fileField.name}`
                    fileMime = fileField.type || 'application/octet-stream'
                } else {
                    throw new Error('fallback')
                }
            } catch {
                const parts = await readMultipartFormData(event)
                if (!parts || parts.length === 0) {
                    throw createError({ statusCode: 400, statusMessage: 'No file uploaded' })
                }
                const file = parts.find(item => item.name === 'file')
                if (!file || !file.data) {
                    throw createError({ statusCode: 400, statusMessage: 'File data is missing' })
                }
                buffer = file.data
                filename = `${Date.now()}-${file.filename || 'image.jpg'}`
                fileMime = file.type || 'application/octet-stream'
            }
        } else {
            // Raw binary body (most reliable for serverless)
            const raw = await readRawBody(event, false)
            if (!raw || raw.byteLength === 0) {
                throw createError({ statusCode: 400, statusMessage: 'No file data' })
            }
            buffer = Buffer.from(raw)
            filename = `${Date.now()}-image.jpg`
            fileMime = contentType || 'image/jpeg'
        }

        if (type === 'gallery') {
            const supabase = await serverSupabaseServiceRole(event)
            const { error } = await supabase.storage
                .from('portfolio')
                .upload(`gallery/${filename}`, buffer, {
                    contentType: fileMime,
                    cacheControl: '3600',
                    upsert: false
                })

            if (error) throw error

            const { data: { publicUrl } } = supabase.storage
                .from('portfolio')
                .getPublicUrl(`gallery/${filename}`)

            return {
                success: true,
                url: publicUrl,
                pathname: `gallery/${filename}`
            }
        } else {
            const blob = await put(`cms/${filename}`, buffer, {
                access: 'public',
                token: process.env.BLOB_READ_WRITE_TOKEN
            })

            return {
                success: true,
                url: blob.url,
                pathname: blob.pathname
            }
        }
    } catch (error: any) {
        console.error('CMS upload error:', error)
        throw createError({
            statusCode: error.statusCode || 500,
            statusMessage: error.statusMessage || 'Failed to upload image'
        })
    }
})
