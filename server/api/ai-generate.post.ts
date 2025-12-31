import { GoogleGenerativeAI } from '@google/generative-ai'

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const body = await readBody(event)
    const { prompt, context, type = 'sections' } = body

    const apiKey = (process.env.GEMINI_API_KEY || (config.geminiApiKey as string))
    if (!apiKey) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Gemini API Key missing. Please set GEMINI_API_KEY in .env',
        })
    }

    const genAI = new GoogleGenerativeAI(apiKey)
    // Using the latest gemini-2.5-flash for 2025 performance and availability
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

    let systemPrompt = ''

    if (type === 'sections') {
        systemPrompt = `
            You are an expert UX Case Study writer. Generate structured "Process" sections for a design portfolio.
            
            PROJECT CONTEXT:
            ${JSON.stringify(context, null, 2)}
            
            USER FOCUS/PROMPT:
            ${prompt}
            
            INSTRUCTIONS:
            1. Generate 3 to 5 distinct process sections.
            2. Return ONLY a JSON object with this schema:
               { "sections": [{ "title": "string", "content": "string", "layout": "text-only|image-full|split-left|split-right|grid", "type": "text|image|grid" }] }
        `
    } else {
        systemPrompt = `
            You are a professional UX writer and technical blogger. Generate high-quality content for the following field.
            
            CONTEXT:
            ${JSON.stringify(context, null, 2)}
            
            USER INSTRUCTION:
            ${prompt}
            
            INSTRUCTIONS:
            1. Return only the raw text content for the field.
            2. Do not include titles, labels, or markdown code blocks unless it's body content.
            3. Keep the tone professional, elevated, and concise.
        `
    }

    try {
        const result = await model.generateContent(systemPrompt)
        const response = await result.response
        const text = response.text()

        if (type === 'sections') {
            const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim()
            return JSON.parse(jsonStr)
        } else {
            return { text: text.trim().replace(/^"|"$/g, '') }
        }
    } catch (e: any) {
        console.error('Gemini Error:', e)
        throw createError({
            statusCode: 500,
            statusMessage: 'AI Generation failed: ' + e.message,
        })
    }
})
