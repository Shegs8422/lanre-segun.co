import { put } from '@vercel/blob'

export default defineEventHandler(async (event) => {
    try {
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
        const filename = `cms/${Date.now()}-${originalFilename}`

        // Upload to Vercel Blob
        const blob = await put(filename, file.data, {
            access: 'public',
            token: process.env.BLOB_READ_WRITE_TOKEN
        })

        return {
            success: true,
            url: blob.url,
            pathname: blob.pathname
        }
    } catch (error: any) {
        console.error('CMS Blob upload error:', error)
        throw createError({
            statusCode: error.statusCode || 500,
            statusMessage: error.statusMessage || 'Failed to upload image to Vercel Blob'
        })
    }
})
