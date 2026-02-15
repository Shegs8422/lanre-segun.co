/**
 * Migration Script: Upload Local Images to Vercel Blob
 * 
 * This script uploads all images from /public to Vercel Blob
 * and generates a mapping file for reference updates.
 */

import fs from 'fs'
import path from 'path'
import { put } from '@vercel/blob'

const PUBLIC_DIR = path.join(process.cwd(), 'public')
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg']
const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN

interface ImageMapping {
    originalPath: string
    blobUrl: string
    uploadedAt: string
}

// Recursively find all image files
function findImageFiles(dir: string, baseDir: string = dir): string[] {
    const files: string[] = []
    const entries = fs.readdirSync(dir, { withFileTypes: true })

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name)

        if (entry.isDirectory()) {
            files.push(...findImageFiles(fullPath, baseDir))
        } else if (entry.isFile()) {
            const ext = path.extname(entry.name).toLowerCase()
            if (IMAGE_EXTENSIONS.includes(ext)) {
                // Store relative path from public directory
                const relativePath = path.relative(baseDir, fullPath)
                files.push(relativePath)
            }
        }
    }

    return files
}

async function uploadImageToBlob(relativePath: string): Promise<ImageMapping | null> {
    try {
        const fullPath = path.join(PUBLIC_DIR, relativePath)
        const fileBuffer = fs.readFileSync(fullPath)

        // Create a clean filename for Blob storage
        const cleanPath = relativePath.replace(/\\/g, '/') // Convert Windows paths
        const blobFilename = `public/${cleanPath}`

        console.log(`📤 Uploading: ${relativePath}`)

        const blob = await put(blobFilename, fileBuffer, {
            access: 'public',
            token: BLOB_TOKEN
        })

        console.log(`✅ Uploaded: ${blob.url}`)

        return {
            originalPath: `/${relativePath.replace(/\\/g, '/')}`,
            blobUrl: blob.url,
            uploadedAt: new Date().toISOString()
        }
    } catch (error) {
        console.error(`❌ Failed to upload ${relativePath}:`, error)
        return null
    }
}

async function main() {
    console.log('🚀 Starting image migration to Vercel Blob...\n')

    if (!BLOB_TOKEN) {
        console.error('❌ BLOB_READ_WRITE_TOKEN not found in environment variables')
        process.exit(1)
    }

    // Find all images
    const imageFiles = findImageFiles(PUBLIC_DIR)
    console.log(`📊 Found ${imageFiles.length} images to migrate\n`)

    if (imageFiles.length === 0) {
        console.log('✨ No images found to migrate')
        return
    }

    // Upload images with rate limiting (5 concurrent uploads)
    const mappings: ImageMapping[] = []
    const BATCH_SIZE = 5

    for (let i = 0; i < imageFiles.length; i += BATCH_SIZE) {
        const batch = imageFiles.slice(i, i + BATCH_SIZE)
        const batchPromises = batch.map(file => uploadImageToBlob(file))
        const results = await Promise.all(batchPromises)

        // Filter out failed uploads and add to mappings
        const successfulMappings = results.filter((r): r is ImageMapping => r !== null)
        mappings.push(...successfulMappings)

        console.log(`\n📈 Progress: ${Math.min(i + BATCH_SIZE, imageFiles.length)}/${imageFiles.length}\n`)

        // Small delay to avoid rate limits
        if (i + BATCH_SIZE < imageFiles.length) {
            await new Promise(resolve => setTimeout(resolve, 500))
        }
    }

    // Save mapping file
    const mappingFile = path.join(process.cwd(), 'scripts', 'image-migration-mapping.json')
    fs.writeFileSync(mappingFile, JSON.stringify(mappings, null, 2))

    console.log('\n✨ Migration complete!')
    console.log(`📝 Mapping file saved to: ${mappingFile}`)
    console.log(`✅ Successfully migrated: ${mappings.length}/${imageFiles.length} images`)

    if (mappings.length < imageFiles.length) {
        console.log(`⚠️  Failed uploads: ${imageFiles.length - mappings.length}`)
    }
}

main().catch(console.error)
