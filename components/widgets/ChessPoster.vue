<template>
    <div class="select-none w-[360px] h-[360px] relative rounded-lg" data-no-drag="true">
        <div
            class="relative w-full h-full rounded-lg bg-black flex flex-col gap-4 items-center justify-center overflow-hidden shadow-xl">

            <!-- Background SVG Pattern -->
            <img draggable="false" alt="Chess Pattern"
                class="rounded-lg absolute bottom-0 left-0 w-full h-full object-cover opacity-40"
                src="/images/background.svg">

            <!-- Scrolling Text Top -->
            <div class="scrolling-text-top absolute top-4 w-[400%] flex pointer-events-none">
                <span class="text-[90px] text-white font-bold whitespace-nowrap animate-scroll-left">
                    PLAY PLAY PLAY PLAY PLAY PLAY PLAY PLAY
                </span>
            </div>

            <!-- Scrolling Text Bottom -->
            <div class="scrolling-text-bottom absolute bottom-4 w-[400%] flex pointer-events-none">
                <span class="text-[90px] text-white font-bold whitespace-nowrap rotate-180 animate-scroll-right">
                    PLAY PLAY PLAY PLAY PLAY PLAY PLAY PLAY
                </span>
            </div>

            <!-- Chess Piece SVGs -->
            <img draggable="false" alt="Chess Knight" width="177" height="172"
                class="rounded-lg absolute top-0 left-0 pointer-events-none" src="/images/chess-poster.svg">
            <img draggable="false" alt="Chess King" width="224" height="233"
                class="rounded-lg absolute bottom-0 right-0 pointer-events-none" src="/images/king-chess-poster.svg">

            <!-- Content Button Overlay -->
            <a href="https://chess.com" target="_blank" class="absolute inset-0 z-20"></a>
        </div>
    </div>
</template>

<script setup lang="ts">
// Chess Poster Component
</script>

<style scoped>
@keyframes scroll-left {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(-50%);
    }
}

@keyframes scroll-right {
    0% {
        transform: translateX(-50%);
    }

    100% {
        transform: translateX(0);
    }
}

.animate-scroll-left {
    animation: scroll-left 20s linear infinite;
}

.animate-scroll-right {
    animation: scroll-right 20s linear infinite;
}
</style>
