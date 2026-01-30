export default defineNuxtRouteMiddleware((to, _from) => {
    // Temporarily disabled - direct CMS access allowed
    // TODO: Re-enable after debugging cookie/auth flow
    
    // if (to.path.startsWith('/cms')) {
    //     const authCookie = useCookie('cms-auth')
    //     if (authCookie.value !== 'true') {
    //         return navigateTo('/')
    //     }
    // }
})
