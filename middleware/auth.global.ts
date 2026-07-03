export default defineNuxtRouteMiddleware((_to, _from) => {
    // CMS auth is handled client-side in cms.vue
    // Server-side API routes are protected by server/middleware/cms-verify.ts
})
