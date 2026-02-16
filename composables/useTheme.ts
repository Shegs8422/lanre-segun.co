// composables/useTheme.ts

export const useTheme = () => {
    // Default to dark theme if no cookie is set
    const isDark = useCookie<boolean>('theme', {
        default: () => true,
        watch: true,
        maxAge: 60 * 60 * 24 * 365 // 1 year
    })

    const toggleTheme = () => {
        isDark.value = !isDark.value
        updateDOM()
    }

    const setTheme = (val: boolean) => {
        isDark.value = val
        updateDOM()
    }

    const updateDOM = () => {
        if (import.meta.client) {
            const html = document.documentElement
            if (isDark.value) {
                html.classList.add('dark')
                html.classList.remove('light')
            } else {
                html.classList.add('light')
                html.classList.remove('dark')
            }
        }
    }

    // This ensures the class is applied on the client after hydration 
    // to match what the server might have guessed if the cookie was missing
    onMounted(() => {
        updateDOM()
    })

    return {
        isDark,
        toggleTheme,
        setTheme
    }
}
