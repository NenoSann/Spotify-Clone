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
    @apply max-w-full overflow-auto;
}
</style>