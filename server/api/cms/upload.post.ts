import { put } from '@vercel/blob'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event)
        const type = query.type as string

        const formData = await readMultipartFormData(event)
        if (!formData || formData.length === 0) {
            throw createError({
                statusCode: 400,
                statusMessage: 'No file uploaded'
            })
        }

        const file = formData.find(item => item.name === 'file')
        if (!file || !file.data) {
            throw createError({
                statusCode: 400,
                statusMessage: 'File data is missing'
            })
        }

        // Get the filename from the form data or generate one
        const originalFilename = file.filename || `image-${Date.now()}.jpg`
        const filename = `${Date.now()}-${originalFilename}`

        if (type === 'gallery') {
            // Upload to Supabase Storage
            const supabase = await serverSupabaseServiceRole(event)
            const { data, error } = await supabase.storage
                .from('portfolio')
                .upload(`gallery/${filename}`, file.data, {
                    contentType: file.type,
                    cacheControl: '3600',
                    upsert: false
                })

            if (error) throw error

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from('portfolio')
                .getPublicUrl(`gallery/${filename}`)

            return {
                success: true,
                url: publicUrl,
                pathname: `gallery/${filename}`
            }
        } else {
            // Upload to Vercel Blob (Standard)
            const blob = await put(`cms/${filename}`, file.data, {
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
