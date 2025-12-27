declare module '@vueuse/sound' {
    import { Ref } from 'vue'
    
    export interface UseSoundOptions {
        volume?: number | Ref<number>
        soundEnabled?: boolean | Ref<boolean>
        forceSoundEnabled?: boolean
        onend?: () => void
        onload?: () => void
        onstop?: () => void
        interrupt?: boolean
        playbackRate?: number | Ref<number>
        autoplay?: boolean
    }

    export interface UseSoundReturn {
        play: (options?: { id?: number; forceSoundEnabled?: boolean; playbackRate?: number }) => void
        stop: (id?: number) => void
        pause: (id?: number) => void
        sound: Ref<any>
        duration: Ref<number | null>
        isPlaying: Ref<boolean>
    }

    export function useSound(
        src: string | Ref<string>,
        options?: UseSoundOptions
    ): UseSoundReturn
}
