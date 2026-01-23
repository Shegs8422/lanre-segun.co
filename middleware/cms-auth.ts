export default defineNuxtRouteMiddleware((to, from) => {
    // Check if user is authenticated via cookie
    const authCookie = useCookie('cms-auth')
    const isAuthenticated = authCookie.value === 'true'

    if (!isAuthenticated) {
        // Redirect to home if not authenticated
        return navigateTo('/')
    }
})
