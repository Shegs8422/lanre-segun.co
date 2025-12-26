import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
    compatibilityDate: '2025-12-26',
    devtools: { enabled: true },
    components: true,
    modules: [
        '@tresjs/nuxt'
    ],
    css: ['~/assets/css/main.css'],
    app: {
        head: {
            htmlAttrs: {
                lang: 'en'
            },
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { name: 'description', content: 'Design engineer creating joyful, delightful interactions. Portfolio showcasing innovative UI/UX work and interactive experiences.' },
                { name: 'author', content: 'Olanrewaju Segun' },
                // Open Graph
                { property: 'og:type', content: 'website' },
                { property: 'og:title', content: 'Olanrewaju Segun - Design Engineer Portfolio' },
                { property: 'og:description', content: 'Interactive portfolio showcasing design engineering work and philosophy. Explore my draggable canvas workspace.' },
                { property: 'og:image', content: '/og-image.png' },
                { property: 'og:url', content: 'https://yoursite.com' }, // TODO: Update with actual domain
                // Twitter Card
                { name: 'twitter:card', content: 'summary_large_image' },
                { name: 'twitter:title', content: 'Olanrewaju Segun - Design Engineer' },
                { name: 'twitter:description', content: 'Design engineer creating joyful, delightful interactions. Explore my interactive portfolio.' },
                { name: 'twitter:image', content: '/og-image.png' },
                // { name: 'twitter:creator', content: '@yourhandle' }, // TODO: Add your Twitter handle
            ],
            link: [
                { rel: 'canonical', href: 'https://yoursite.com' }, // TODO: Update with actual domain
                {
                    rel: 'preconnect',
                    href: 'https://fonts.googleapis.com'
                },
                {
                    rel: 'preconnect',
                    href: 'https://fonts.gstatic.com',
                    crossorigin: ''
                },
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&family=DM+Mono:wght@400;500&display=swap'
                }
            ]
        }
    },
    vite: {
        plugins: [
            tailwindcss(),
        ],
    },
    build: {
        transpile: ['gsap', 'three']
    }
})
