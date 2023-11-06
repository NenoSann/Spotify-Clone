<template>
    <div class="track-section">
        <div>{{ order }}</div>
        <img :src="image_url">
        <div>
            <p>{{ track_name }}</p>
            <p>{{ artist_name }}</p>
        </div>
        <div>
            <p>{{ album_name }}</p>
        </div>
        <div class="icon">

        </div>
        <p class="track_duration">{{ track_duration }}</p>
        <div class="drop-down"></div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    image_url: string,
    track_name: string,
    artist_name: string,
    album_name: string,
    track_duration: string,
    order: number
}>();

</script>

<style scoped>
.track-section {
    @apply flex flex-row;
    @apply bg-transparent;
}
</style>