import { GoogleGenerativeAI } from '@google/generative-ai'

const ipCache = new Map<string, { count: number, reset: number }>()

export default defineEventHandler(async (event) => {
    // Rate Limiting
    const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown'
    const now = Date.now()
    const entry = ipCache.get(ip) || { count: 0, reset: now + 60000 }

    if (now > entry.reset) {
        entry.count = 0
        entry.reset = now + 60000
    }

    if (entry.count >= 5) {
        throw createError({
            statusCode: 429,
            statusMessage: 'Too many requests. Please try again in a minute.'
        })
    }

    entry.count++
    ipCache.set(ip, entry)

    const config = useRuntimeConfig()
    const body = await readBody(event)
    const { prompt, context, type = 'sections' } = body

    const apiKey = config.geminiApiKey as string

    if (!apiKey) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Gemini API Key missing. Please set NUXT_GEMINI_API_KEY in .env and RESTART the server.',
        })
    }

    const genAI = new GoogleGenerativeAI(apiKey)

    // Ordered list of models to try, with fallbacks including latest Gemma
    const fallbackModels = [
        'gemini-3.1-pro-preview',
        'gemini-3-flash-preview',
        'gemini-3.1-flash-lite-preview',
        'gemini-2.5-pro',
        'gemini-2.5-flash',
        'gemma-4-31b-it'
    ]

    const PROMPT_CONFIGS = {
        sections: {
            persona: `You are an expert Senior Principal Product Designer, Full Stack Engineer, and AI Systems Architect. 
                     You have deep expertise in Web Development, Software Engineering, and Artificial Intelligence.
                     You are versatile, analytical, and highly articulate. You write with precision and depth.`,
            instruction: `Generate high-quality, structured content sections. 
                         Structure the narrative across 3 to 5 logical blocks.
                         
                         STRICT RULES:
                         1. HTML is MANDATORY for all content. Do NOT use Markdown.
                            - Use <h2>, <h3> for headings.
                            - Use <strong> for emphasis and <em> for subtle highlighting.
                            - Use <ul>, <ol>, <li> for lists.
                            - Use <blockquote> for quotes.
                            - Use <a href="..."> for links.
                            - Use <p> for paragraphs.
                         2. Each section must have a title, a layout strategy ("text-only", "split-left", "split-right", "grid"), and content (HTML string).
                         3. Maintain a sophisticated, premium tonality.
                         4. Return ONLY a JSON object: { "sections": [{ "title": "string", "content": "html_string", "layout": "string", "type": "text|image|grid" }] }`
        },
        text: {
            persona: `You are an elite Lead Writer, Full Stack Developer, and AI Strategist. You specialize in creating high-impact, structured narratives for professional blogs and portfolios, covering Design, Engineering, and AI.`,
            instruction: `Generate expert content for the specified blog post or project description. 
                         
                         CONSTRAINTS:
                         1. Return semantic HTML directly. Do NOT use Markdown.
                            - Use <h3>, <h4> for hierarchy (avoid h1/h2 as they are page titles).
                            - Use <ul>, <ol>, <li> for lists.
                            - Use <strong>, <em> for styling.
                            - Use <blockquote> for callouts.
                            - Use <p> for paragraphs.
                         2. Stay relevant to the user's intent. Prioritize insight, professional clarity, and engaging storytelling suitable for a developer blog.
                         3. OUTPUT: Return the HTML string directly. Do NOT wrap in \`\`\`html code blocks.`
        }
    }

    const currentConfig = (type === 'sections' ? PROMPT_CONFIGS.sections : PROMPT_CONFIGS.text)

    const finalPrompt = `
        ${currentConfig.persona}
        
        CONTEXT:
        ${JSON.stringify(context, null, 2)}
        
        USER INTENT:
        ${prompt}
        
        TASK:
        ${currentConfig.instruction}
    `

    let generatedText = ''
    let lastError: any = null

    for (const modelName of fallbackModels) {
        try {
            console.log(`Attempting generation with model: ${modelName}`)
            const model = genAI.getGenerativeModel({ model: modelName })
            const result = await model.generateContent(finalPrompt)
            const response = await result.response
            generatedText = response.text()

            if (generatedText) {
                console.log(`Successfully generated content using ${modelName}`)
                break // Break loop on success
            }
        } catch (e: any) {
            console.warn(`Model ${modelName} failed:`, e.message)
            lastError = e
        }
    }

    if (!generatedText) {
        console.error('All fallback AI models failed.')
        throw createError({
            statusCode: 500,
            statusMessage: 'AI Generation failed: ' + (lastError?.message || 'All models exhausted'),
        })
    }

    if (type === 'sections') {
        const jsonStr = generatedText.replace(/```json/g, '').replace(/```/g, '').trim()
        return JSON.parse(jsonStr)
    } else {
        // Stronger cleanup to ensure raw text
        return { text: generatedText.trim().replace(/^"|"$/g, '').replace(/```[\s\S]*?```/g, '').trim() }
    }
})
