/**
 * Robust markdown parser for portfolio content.
 * Supports: Tables, Fenced Code Blocks, Headings, Lists (Nested), 
 * Bold, Italic, Links, Blockquotes, and HRs.
 */
export const parseMarkdown = (content: string | null | undefined): string => {
    if (!content) return ''

    // Inline processing function
    const processInline = (text: string | undefined): string => {
        if (!text) return ''

        // 1. First, Escape basic HTML entities to ensure no raw HTML tags are executed.
        // This is critical for inline code like `<h1>` to render correctly as text.
        let processed = text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')

        // 2. Extract Inline Code (`code`)
        // We use a temporary placeholder to avoid markdown processing inside code tags.
        const codeMatches: string[] = []
        processed = processed.replace(/`(.*?)`/g, (_match, codeContent) => {
            // Keep the escaped content inside code tags
            codeMatches.push(`<code class="inline-code bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded text-[0.9em] font-mono font-medium">${codeContent}</code>`)
            return `__INLINE_CODE_PLACEHOLDER_${codeMatches.length - 1}__`
        })

        // 3. Process Formatting (Bold, Italic, Links) on the remaining text
        processed = processed
            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-black">$1</strong>')
            .replace(/\*(.*?)\*/g, '<em class="italic opacity-90">$1</em>')
            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-500 hover:text-blue-400 hover:underline font-bold transition-colors" target="_blank">$1</a>')

        // 4. Restore Inline Code
        codeMatches.forEach((code, index) => {
            processed = processed.replace(`__INLINE_CODE_PLACEHOLDER_${index}__`, code)
        })

        return processed
    }

    const lines = content.split('\n')
    let html = ''

    let ulActive = false
    let olActive = false
    let blockquoteActive = false
    let codeBlockActive = false
    let tableActive = false
    let codeContent: string[] = []

    const closeContainers = () => {
        if (ulActive) { html += '</ul>\n'; ulActive = false; }
        if (olActive) { html += '</ol>\n'; olActive = false; }
        if (blockquoteActive) { html += '</div></blockquote>\n'; blockquoteActive = false; }
        if (tableActive) { html += '</tbody></table></div>\n'; tableActive = false; }
    }

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        if (line === undefined) continue

        const trimmed = line.trim()

        // 1. Fenced Code Blocks
        if (trimmed.startsWith('```')) {
            if (codeBlockActive) {
                // Close code block
                html += `<div class="code-block-container my-8 rounded-2xl border border-border bg-component overflow-hidden shadow-2xl">
                    <div class="flex items-center justify-between px-4 py-2 border-b border-border bg-white/5">
                        <span class="text-[10px] uppercase tracking-widest font-black text-muted-foreground">Source Code</span>
                        <div class="flex gap-1.5">
                            <div class="w-2 h-2 rounded-full bg-red-500/20"></div>
                            <div class="w-2 h-2 rounded-full bg-yellow-500/20"></div>
                            <div class="w-2 h-2 rounded-full bg-green-500/20"></div>
                        </div>
                    </div>
                    <pre class="p-6 overflow-x-auto font-mono text-sm text-foreground/90 leading-relaxed bg-black/20"><code>${codeContent.join('\n')}</code></pre>
                </div>\n`
                codeContent = []
                codeBlockActive = false
            } else {
                closeContainers()
                codeBlockActive = true
            }
            continue
        }

        if (codeBlockActive) {
            codeContent.push(line.replace(/</g, '&lt;').replace(/>/g, '&gt;'))
            continue
        }

        // 2. Tables
        if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
            const cells = trimmed.split('|').filter(c => c.trim() !== '').map(c => c.trim())

            if (!tableActive) {
                const nextLine = lines[i + 1]?.trim()
                if (nextLine && nextLine.startsWith('|') && nextLine.includes('---')) {
                    closeContainers()
                    tableActive = true
                    html += `<div class="my-10 overflow-x-auto rounded-2xl border border-border shadow-2xl bg-component/50 backdrop-blur-sm">
                        <table class="w-full text-left border-collapse">
                            <thead>
                                <tr class="bg-blue-500/5 border-b border-border">
                                    ${cells.map(c => `<th class="px-6 py-4 text-sm font-black text-foreground uppercase tracking-wider">${processInline(c)}</th>`).join('')}
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-border">`
                    i++ // Skip separator
                    continue
                }
            } else {
                html += `<tr class="hover:bg-white/5 transition-colors">
                    ${cells.map(c => `<td class="px-6 py-4 text-base text-foreground/80">${processInline(c)}</td>`).join('')}
                </tr>\n`
                continue
            }
        } else if (tableActive) {
            closeContainers()
        }

        // 3. Horizontal Rule
        if (trimmed === '---' || trimmed === '***') {
            closeContainers()
            html += '<hr class="my-12 border-border opacity-30" />\n'
            continue
        }

        // 4. Headings
        const hMatch = trimmed.match(/^(#{1,6})\s+(.*)$/)
        if (hMatch && hMatch[1] && hMatch[2]) {
            closeContainers()
            const level = hMatch[1].length
            const text = processInline(hMatch[2])
            const classes = [
                '',
                'text-4xl md:text-5xl font-black tracking-tight my-10 text-foreground leading-tight',
                'text-3xl md:text-4xl font-black tracking-tight my-8 text-foreground leading-tight',
                'text-2xl md:text-3xl font-black tracking-tight my-6 text-foreground leading-tight',
                'text-xl md:text-2xl font-black tracking-tight my-5 text-foreground leading-tight',
                'text-lg md:text-xl font-black tracking-tight my-4 text-foreground/90 uppercase tracking-widest',
                'text-base md:text-lg font-black tracking-tight my-4 text-muted-foreground uppercase tracking-widest'
            ]
            html += `<h${level} class="${classes[level]}">${text}</h${level}>\n`
            continue
        }

        // 5. Blockquotes
        if (trimmed.startsWith('> ')) {
            if (!blockquoteActive) {
                closeContainers()
                html += '<blockquote class="border-l-4 border-blue-500 pl-8 my-10 italic bg-blue-500/5 py-6 pr-6 rounded-r-2xl shadow-xl"><div class="flex flex-col gap-4 text-xl text-foreground font-medium opacity-90">'
                blockquoteActive = true
            }
            html += `<p>${processInline(trimmed.substring(2))}</p>`
            continue
        }

        // 6. Unordered Lists
        const ulMatch = line.match(/^(\s*)([-*])\s+(.*)$/)
        if (ulMatch && ulMatch[3]) {
            if (!ulActive) {
                closeContainers()
                html += '<ul class="list-disc ml-6 my-8 space-y-4">\n'
                ulActive = true
            }
            html += `<li class="text-lg text-foreground/80 leading-relaxed pl-2">${processInline(ulMatch[3])}</li>\n`
            continue
        }

        // 7. Ordered Lists
        const olMatch = line.match(/^(\s*)(\d+)\.\s+(.*)$/)
        if (olMatch && olMatch[3]) {
            if (!olActive) {
                closeContainers()
                html += '<ol class="list-decimal ml-6 my-8 space-y-4">\n'
                olActive = true
            }
            html += `<li class="text-lg text-foreground/80 leading-relaxed pl-2">${processInline(olMatch[3])}</li>\n`
            continue
        }

        // 8. Paragraphs
        if (trimmed === '') {
            closeContainers()
            continue
        } else {
            if (blockquoteActive) {
                html += `<p>${processInline(trimmed)}</p>`
            } else if (ulActive || olActive) {
                // Continuation line in a list: we wrap in a span to keep it inside the UL structure if it was a block, 
                // but for simplicity, we just render it as a paragraph that will likely break out if not handled.
                // To prevent breaking out, we'll try to keep it as simple text.
                html += `<p class="mt-2 text-foreground/70 text-base ml-2">${processInline(trimmed)}</p>`
            } else {
                html += `<p class="mb-6 text-lg md:text-xl leading-relaxed text-foreground/80 font-normal">${processInline(trimmed)}</p>\n`
            }
        }
    }

    closeContainers()
    return html
}
