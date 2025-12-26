import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
    devtools: { enabled: true },
    components: true,
    modules: [
        '@tresjs/nuxt'
    ],
    css: ['~/assets/css/main.css'],
    app: {
        head: {
            link: [
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
