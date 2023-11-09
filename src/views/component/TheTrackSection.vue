<template>
    <div class="track-section group" @click="addToPlaylist">
        <div class="flex left-item basis-3/6">
            <div class="w-10 h-10 flex justify-center items-center">
                <p>{{ order }}</p>
            </div>
            <div class="daisy-avatar w-10 h-10 mr-4">
                <img :src="image_url">
            </div>
            <div>
                <p class="track-name">{{ track_name }}</p>
                <p class="line-clamp-1 font-light text-sm">{{ artist_name }}</p>
            </div>
        </div>
        <div class="flex justify-start items-center text-left basis-2/6">
            <p class="line-clamp-1  text-sm">{{ album_name }}</p>
        </div>
        <div class="flex basis-1/6">
            <div class="track-duration flex justify-center items-center ">
                <p>{{ track_duration }}</p>
            </div>
            <div class="drop-down">
                <svg class="w-10 h-10 stroke-gray-300 opacity-0 group-hover:opacity-100" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke-width="0"></g>
                    <g id="SVGRepo_iconCarrier">
                        <rect width="24" height="24" stroke-width="0"></rect>
                        <circle cx="7" cy="12" r="0.5" stroke-linecap="round" stroke-linejoin="round">
                        </circle>
                        <circle cx="12" cy="12" r="0.5" stroke-linecap="round" stroke-linejoin="round">
                        </circle>
                        <circle cx="17" cy="12" r="0.5" stroke-linecap="round" stroke-linejoin="round">
                        </circle>
                    </g>
                </svg>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { playerState } from '@/store';
const playerStore = playerState();
const props = defineProps<{
    image_url: string,
    track_name: string,
    artist_name: string,
    album_name: string,
    track_duration: string,
    order: number,
    spotify_uri: string
}>();
const addToPlaylist = () => {
    playerStore.playlist.unshift({
        uri: props.spotify_uri,
        track_name: props.track_name,
        artist_name: props.artist_name
    })
    console.log(playerStore.playlist);
}
</script>

<style scoped>
.track-section {
    @apply w-full h-14 p-2;
    @apply flex flex-row;
    @apply bg-transparent;
    @apply rounded-md overflow-hidden;
    @apply hover:bg-gray-700 bg-opacity-20;
    @apply text-gray-300 focus:text-white focus-within:text-white hover:text-white;
    @apply transition-all;
}

.track-duration {
    @apply ml-auto;
}

.track-name {
    @apply text-white;
}
</style>