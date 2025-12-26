declare module '@vueuse/sound' {
    export interface UseSoundOptions {
        volume?: number
        soundEnabled?: boolean
        forceSoundEnabled?: boolean
        onend?: () => void
        onload?: () => void
        onstop?: () => void
        interrupt?: boolean
    }

    export interface UseSoundReturn {
        play: () => void
        stop: () => void
        pause: () => void
        sound: any
        duration: number
        isPlaying: boolean
    }

    export function useSound(
        src: string,
        options?: UseSoundOptions
    ): [play: () => void, { stop: () => void; pause: () => void; sound: any; duration: number; isPlaying: boolean }]
}
