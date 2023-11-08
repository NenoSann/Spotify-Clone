<template>
    <div id="embed-iframe">
        <p>Test</p>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
    (window as any).onSpotifyIframeApiReady = (IFrameAPI: any) => {
        console.log('Spotify API ready!')
    }
})
</script>

<style scoped>
#embed-iframe {
    @apply h-40;
    @apply m-2 rounded-md;
    @apply bg-teal-600;
}
</style>