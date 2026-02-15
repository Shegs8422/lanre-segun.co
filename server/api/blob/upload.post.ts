import { put } from '@vercel/blob'

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event)
        const { url, filename } = body

        if (!url) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Image URL is required'
            })
        }

        // Get the Blob token from environment
        const blobToken = process.env.BLOB_READ_WRITE_TOKEN

        if (!blobToken) {
            throw createError({
                statusCode: 500,
                statusMessage: 'Blob token not configured. Please set BLOB_READ_WRITE_TOKEN in .env'
            })
        }

        // Fetch the image from the URL
        const imageResponse = await fetch(url)

        if (!imageResponse.ok) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Failed to fetch image from URL'
            })
        }

        const imageBlob = await imageResponse.blob()

        // Generate a filename if not provided
        const finalFilename = filename || `image-${Date.now()}.jpg`

        // Upload to Vercel Blob
        const blob = await put(finalFilename, imageBlob, {
            access: 'public',
            token: blobToken,
        })

        return {
            success: true,
            url: blob.url,
            downloadUrl: blob.downloadUrl,
            pathname: blob.pathname
        }
    } catch (error: any) {
        console.error('Blob upload error:', error)

        throw createError({
            statusCode: error.statusCode || 500,
            statusMessage: error.statusMessage || 'Failed to upload image to Vercel Blob'
        })
    }
})
