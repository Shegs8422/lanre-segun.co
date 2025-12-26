import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Draggable } from 'gsap/Draggable'

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
