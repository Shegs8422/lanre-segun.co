import Lenis from 'lenis'

export default defineNuxtPlugin((nuxtApp) => {
    const lenis = new Lenis()

    function raf(time: number) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return {
        provide: {
            lenis
        }
    }
})
