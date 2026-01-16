import { c as defineEventHandler, u as useRuntimeConfig, r as readBody, e as createError } from '../../_/nitro.mjs';
import { GoogleGenerativeAI } from '@google/generative-ai';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'vue';
import 'consola';
import 'node:fs';
import 'node:url';
import 'ipx';
import 'node:path';
import 'node:crypto';

const aiGenerate_post = defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);
  const { prompt, context, type = "sections" } = body;
  const apiKey = config.geminiApiKey;
  if (!apiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: "Gemini API Key missing. Please set NUXT_GEMINI_API_KEY in .env and RESTART the server."
    });
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
  const PROMPT_CONFIGS = {
    sections: {
      persona: `You are a Senior Principal Product Designer & Design Systems Architect at a top-tier global agency. 
                     You are versatile, analytical, and highly articulate. You write with precision and depth.`,
      instruction: `Generate high-quality, structured content sections. 
                         Structure the narrative across 3 to 5 logical blocks.
                         
                         STRICT RULES:
                         1. Markdown is MANDATORY for all content. Use it to create a rich document structure.
                            - Use multiple heading levels (H2, H3, H4) where appropriate.
                            - Use bold for emphasis and italics for subtle highlighting.
                            - Use bulleted and numbered lists extensively.
                            - USE TABLES (using | pipes |) to compare data or list features for maximum visual impact.
                            - Include [descriptive links](https://example.com) to external resources if relevant.
                         2. Each section must have a title, a layout strategy ("text-only", "split-left", "split-right", "grid"), and content.
                         3. Maintain a sophisticated, premium tonality.
                         4. Return ONLY a JSON object: { "sections": [{ "title": "string", "content": "string", "layout": "string", "type": "text|image|grid" }] }`
    },
    text: {
      persona: `You are an elite Lead Writer and Content Strategist. You specialize in creating high-impact, structured narratives.`,
      instruction: `Generate expert content for the specified field. 
                         
                         CONSTRAINTS:
                         1. Utilize full Markdown formatting to structure your response.
                            - Use headings (##, ###) for organization.
                            - Use tables (| table | headers |) for structured data or comparisons.
                            - Use bold/italics for emphasis.
                            - Use nested lists for complex hierarchies.
                         2. Stay relevant to the user's intent. Prioritize insight and professional clarity.
                         3. OUTPUT: Return the content directly as a raw string. Do NOT wrap in \`\`\`markdown code blocks.`
    }
  };
  const currentConfig = type === "sections" ? PROMPT_CONFIGS.sections : PROMPT_CONFIGS.text;
  const finalPrompt = `
        ${currentConfig.persona}
        
        CONTEXT:
        ${JSON.stringify(context, null, 2)}
        
        USER INTENT:
        ${prompt}
        
        TASK:
        ${currentConfig.instruction}
    `;
  try {
    const result = await model.generateContent(finalPrompt);
    const response = await result.response;
    const text = response.text();
    if (type === "sections") {
      const jsonStr = text.replace(/```json/g, "").replace(/```/g, "").trim();
      return JSON.parse(jsonStr);
    } else {
      return { text: text.trim().replace(/^"|"$/g, "").replace(/```[\s\S]*?```/g, "").trim() };
    }
  } catch (e) {
    console.error("Gemini Error:", e);
    throw createError({
      statusCode: 500,
      statusMessage: "AI Generation failed: " + e.message
    });
  }
});

export { aiGenerate_post as default };
//# sourceMappingURL=ai-generate.post.mjs.map
