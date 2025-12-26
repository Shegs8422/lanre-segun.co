// composables/useTheme.ts

export const useTheme = () => {
    const isDark = useState<boolean>('theme', () => true)

    const toggleTheme = () => {
        isDark.value = !isDark.value
        updateDOM()
    }

    const setTheme = (val: boolean) => {
        isDark.value = val
        updateDOM()
    }

    const updateDOM = () => {
        if (process.client) {
            const html = document.documentElement
            if (isDark.value) {
                html.classList.add('dark')
                localStorage.setItem('theme', 'dark')
            } else {
                html.classList.remove('dark')
                localStorage.setItem('theme', 'light')
            }
        }
    }

    // Initialize
    onMounted(() => {
        if (process.client) {
            const stored = localStorage.getItem('theme')
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

            if (stored === 'dark' || (!stored && prefersDark)) {
                setTheme(true)
            } else {
                setTheme(false)
            }
        }
    })

    return {
        isDark,
        toggleTheme,
        setTheme
    }
}
