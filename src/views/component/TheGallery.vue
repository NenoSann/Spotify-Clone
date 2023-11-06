<template>
    <div class="gallery-main">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.gallery-main {
    @apply flex flex-row gap-6;
    @apply max-w-full w-full;
    @apply overflow-auto;
}

.gallery-main::-webkit-scrollbar {
    background-color: transparent;
}

.gallery-main::-webkit-scrollbar-thumb {
    height: 50px;
    border: 4px solid transparent;
    border-radius: 8px;
    background-clip: content-box;
    background-color: #fff4;
}

.gallery-main::-webkit-scrollbar-corner {
    display: none;
}
</style>