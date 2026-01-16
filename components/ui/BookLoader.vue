<template>
    <div class="book-loader">
        <div class="book">
            <div class="book__page"/>
            <div class="book__page"/>
            <div class="book__page"/>
        </div>
        <div v-if="$slots.default" class="book-loader__quote">
            <slot/>
        </div>
    </div>
</template>

<script setup lang="ts">
// Simple book loader with optional quote slot
</script>

<style scoped>
.book-loader {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    background-color: #2A6DB0;
}

.book {
    position: relative;
    border: 5px solid #ecf0f1;
    width: 100px;
    height: 60px;
}

.book__page {
    position: absolute;
    left: 50%;
    top: -5px;
    border-top: 5px solid #ecf0f1;
    border-bottom: 5px solid #ecf0f1;
    border-right: 5px solid #ecf0f1;
    background: #2A6DB0;
    width: 50px;
    height: 60px;
    transform-origin: 0% 50%;
    animation: flip 1.2s infinite linear;
    animation-fill-mode: forwards;
}

.book__page:nth-child(1) {
    z-index: -1;
    animation-delay: 1.4s;
}

.book__page:nth-child(2) {
    z-index: -2;
    animation-delay: 2.8s;
}

.book__page:nth-child(3) {
    z-index: -3;
    animation-delay: 4.2s;
}

@keyframes flip {
    0% {
        transform: perspective(600px) rotateY(-0deg);
    }

    20% {
        background: #2359a0;
    }

    29.9% {
        background: #2359a0;
    }

    30% {
        transform: perspective(200px) rotateY(-90deg);
        background: #2A6DB0;
    }

    54.999% {
        opacity: 1;
    }

    55% {
        opacity: 0;
    }

    60% {
        transform: perspective(200px) rotateY(-180deg);
        background: #2A6DB0;
    }

    100% {
        transform: perspective(200px) rotateY(-180deg);
        background: #2A6DB0;
    }
}

.book-loader__quote {
    max-width: 500px;
    text-align: center;
    color: #ecf0f1;
    font-size: 1.125rem;
    font-weight: 500;
    opacity: 0.9;
}
</style>
