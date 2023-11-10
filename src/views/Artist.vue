<template>
    <div class="artist-main">
        <div class="artist-header line-clamp-3 leading-none  text-left">
            <div>
                <p class="text-white font-bold break-words text-8xl mt-[12vh]">{{ artist?.name }}</p>
                <p class="text-white mt-[8vh]">{{ artist?.followers.total }} followers</p>
            </div>
            <div class="daisy-avatar w-[40vh] h-[40vh] absolute left-1/2 -translate-x-1/2">
                <img ref="avatarRef" class="  shadow-lg" :src="artist?.images[0].url" :alt="artist?.name + '\'s avatar'"
                    async lazy>
            </div>
        </div>
        <div class="popular p-2">
            <div class="button-set"></div>
            <TheGallery orientation="vertical" style="gap:0">
                <TheTrackSection v-bind="track" :order="n + 1" v-for="(track, n) in artist_toptracks">
                </TheTrackSection>
            </TheGallery>
        </div>
    </div>
</template>

<script setup lang="ts">
import ColorThief from 'colorthief';
import TheGallery from './component/TheGallery.vue';
import TheTrackSection from './component/TheTrackSection.vue';
import type { artist, track } from '@/lib/interface';
import { getArtist, getArtistTopTracks } from '@/api/artist/getArtist';
import { computed, onMounted, ref } from 'vue';
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
.artist-main {
    @apply flex flex-col;
    @apply min-h-full;
}

.artist-header {
    @apply flex justify-start;
    @apply p-6;
    @apply h-[46vh];
    /* background-image: url(https://i.scdn.co/image/ab6761860000101631877a5cf284748fff546384); */
    @apply bg-current;
    @apply transition-all duration-500 ease-in-out;
    background-color: v-bind(artist_primary_color);
}
</style>