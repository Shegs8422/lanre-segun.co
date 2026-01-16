import { gsap, ScrollTrigger, Draggable } from 'gsap/all'

export default defineNuxtPlugin(() => {
    // Register plugins
    gsap.registerPlugin(ScrollTrigger, Draggable)

    // Make gsap and Draggable available globally
    return {
        provide: {
            gsap,
            Draggable
        }
    }
})
