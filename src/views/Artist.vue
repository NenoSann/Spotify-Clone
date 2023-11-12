<template>
    <div class="artist-main">
        <div class="artist-header line-clamp-3 leading-none  text-left">
            <div>
                <p class="text-white font-bold break-words text-8xl mt-[12vh]">{{ artist?.name }}</p>
                <p class="text-white mt-[8vh]">{{ artist?.followers.total }} followers</p>
            </div>
            <div class="daisy-avatar w-[40vh] h-[40vh] absolute left-1/2 -translate-x-1/2">
                <img ref="avatarRef" class="rounded-full  shadow-lg" :src="artist?.images[0].url"
                    :alt="artist?.name + '\'s avatar'" async lazy>
            </div>
        </div>
        <div class="popular-wrap p-2">
            <div class="popular z-10">
                <div class="button-set"></div>
                <p class="font-semibold text-2xl text-white mb-4">热门</p>
                <TheGallery orientation="vertical" style="gap:0">
                    <TheTrackSection v-bind="track" :order="n + 1" v-for="(track, n) in artist_toptracks">
                    </TheTrackSection>
                </TheGallery>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ColorThief from 'colorthief';
import TheGallery from './component/TheGallery.vue';
import TheTrackSection from './component/TheTrackSection.vue';
import type { artist, track } from '@/lib/interface';
import { getArtist, getArtistTopTracks } from '@/api/artist/getArtist';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const artist = ref<artist>();
const artist_toptracks = ref<[]>();
const avatarRef = ref<HTMLImageElement>();
const artist_primary_color = ref('#000000');
const getPrimaryColor = function () {
    const colorThief = new ColorThief();
    const image = avatarRef.value;
    // cannot use image?.crossOrigin or it'll crush
    image.crossOrigin = 'Anonymous';
    if (image?.complete) {
        artist_primary_color.value = '#' + colorThief.getColor(image).map((x: number) => {
            const hex = x.toString(16)
            return hex.length === 1 ? '0' + hex : hex;
        }).join('')
    } else {
        image?.addEventListener('load', function () {
            artist_primary_color.value = '#' + colorThief.getColor(image).map((x: number) => {
                const hex = x.toString(16)
                return hex.length === 1 ? '0' + hex : hex;
            }).join('')
        })
    }
}
onMounted(async () => {
    // fetching artist tracks and profile
    artist.value = await getArtist(route.params.id as string);
    const top_tracks = await getArtistTopTracks(route.params.id as string, 'JP');
    artist_toptracks.value = top_tracks.tracks.map((track: track) => {
        return {
            image_url: track.album.images[2].url,
            track_name: track.name,
            artist_name: null,
            album_name: track.album.name,
            track_duration: `${Math.floor(track.duration_ms / 1000 / 60)}:${Math.floor((track.duration_ms / 1000) % 60) > 9 ? Math.floor((track.duration_ms / 1000) % 60) : '0' + Math.floor((track.duration_ms / 1000) % 60)}`,
            spotify_uri: track.uri
        }
    })
    // get the primary color for background
    getPrimaryColor();
})

</script>

<style scoped>
:root {
    --primary-color: v-bind(artist_primary_color);
}

.artist-main {
    @apply flex flex-col;
    @apply min-h-full;
}

.artist-header {
    @apply flex justify-start;
    @apply p-6;
    @apply h-[46vh];
    /* background-image: url(https://i.scdn.co/image/ab6761860000101631877a5cf284748fff546384); */
    @apply transition-all duration-500 ease-in-out;
    background-color: v-bind(artist_primary_color);
}

.popular-wrap {
    /* background-color: v-bind(artist_primary_color); */
    --primary-color: v-bind(artist_primary_color);
    @apply relative;
    @apply bg-gradient-to-b from-[var(--primary-color)] to-transparent;
    @apply backdrop-blur-2xl;
}

.popular-wrap::before {
    @apply absolute bg-black bg-opacity-50 z-[-1] top-0 left-0 w-full h-full;
    content: '';
    pointer-events: none;
}
</style>