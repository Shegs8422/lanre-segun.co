import { put } from '@vercel/blob'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event)
        const type = query.type as string

        let buffer: Buffer
        let filename: string
        let contentType: string

        // Try Web API FormData first, fall back to h3 multipart
        try {
            const formData = await readFormData(event)
            const fileField = formData.get('file')
            if (fileField && typeof fileField !== 'string') {
                buffer = Buffer.from(await fileField.arrayBuffer())
                filename = `${Date.now()}-${fileField.name}`
                contentType = fileField.type || 'application/octet-stream'
            } else {
                throw new Error('fallback')
            }
        } catch {
            const parts = await readMultipartFormData(event)
            if (!parts || parts.length === 0) {
                throw createError({
                    statusCode: 400,
                    statusMessage: 'No file uploaded'
                })
            }
            const file = parts.find(item => item.name === 'file')
            if (!file || !file.data) {
                throw createError({
                    statusCode: 400,
                    statusMessage: 'File data is missing'
                })
            }
            buffer = file.data
            filename = `${Date.now()}-${file.filename || 'image.jpg'}`
            contentType = file.type || 'application/octet-stream'
        }

        if (type === 'gallery') {
            const supabase = await serverSupabaseServiceRole(event)
            const { error } = await supabase.storage
                .from('portfolio')
                .upload(`gallery/${filename}`, buffer, {
                    contentType,
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
