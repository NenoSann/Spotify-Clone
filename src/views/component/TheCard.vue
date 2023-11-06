<template>
    <div class="card-main">
        <div class="daisy-avatar">
            <img :src="image_url" class="rounded-full">
        </div>
        <p class=" font-semibold">{{ card_name }}</p>
        <p class=" font-light">{{ card_type }}</p>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    image_url: string,
    card_type: string,
    card_name: string
}>();
</script>

<style scoped>
* {
    user-select: none;
}

.card-main {
    @apply w-52 h-72 p-4;
    @apply rounded-lg;
    @apply flex-shrink-0;
    background-color: rgba(0, 0, 0, 0.4);
}
</style>