export default defineNuxtRouteMiddleware((to, _from) => {
    // Only protect /cms route
    if (to.path.startsWith('/cms')) {
        const authCookie = useCookie('auth_token')

        if (!authCookie.value) {
            return navigateTo('/')
        }
    }
})
