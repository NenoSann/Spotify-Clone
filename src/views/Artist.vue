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
                    <TheTrackSection v-bind="track" :order="n + 1" v-for="(track, n) in tracksToRender">
                    </TheTrackSection>
                </TheGallery>
                <p @click="toggleFolded" class="mt-6 hover:text-white w-fit font-semibold text-sm">{{ folded ? '显示全部' : '收起'
                }}</p>
            </div>
        </div>
        <div class="wrap p-2">
            <p class="font-semibold text-2xl text-white mb-4">唱片目录</p>
            <TheGallery orientation="horizontal">
                <TheCard :image_url="item.images[0].url" :card_type="item.album_type" :card_name="item.name"
                    avatar_type="square" v-for="(item) in artist_album">
                </TheCard>
            </TheGallery>
        </div>
        <div class="wrap p-2">
            <p class="font-semibold text-2xl text-white mb-4">粉丝也喜欢</p>
            <TheGallery orientation="horizontal">
                <TheCard :image_url="artist.images[0].url" card_type="artist" :card_name="artist.name" avatar_type="round"
                    :route_url="`/artist/${artist.id}`" v-for="(artist) in relatedArtists">
                </TheCard>
            </TheGallery>
        </div>
        <div class="wrap p-2">
            <p class="font-semibold text-2xl text-white mb-4">参与的专辑</p>
            <TheGallery orientation="horizontal">
                <TheCard :image_url="album.images[0].url"
                    :card_type="album.release_date.split('-')[0] + ' . ' + album.album_type" :card_name="album.name"
                    avatar_type="square" v-for="album in artist_appear_album"></TheCard>
            </TheGallery>
        </div>
        <footervue></footervue>
    </div>
</template>

<script setup lang="ts">
import ColorThief from 'colorthief';
import TheGallery from './component/TheGallery.vue';
import TheTrackSection from './component/TheTrackSection.vue';
import TheCard from './component/TheCard.vue';
import footervue from './component/footervue.vue';
import type { artist, track } from '@/lib/interface';
import { getArtist, getArtistTopTracks, getArtistAlbum, getArtistRelatedArtist } from '@/api/artist/getArtist';
import type { ArtistAlbumsResponse, SimplifiedAlbumObject } from '@/api/artist/getArtist';
import { computed, onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const artist = ref<artist>();
const artist_toptracks = ref<[]>();
const artist_album = ref<artist[]>();
const artist_appear_album = ref<SimplifiedAlbumObject[]>();
const relatedArtists = ref();
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

// control tracks folded
const folded: Ref<boolean> = ref(true);
const toggleFolded = function () {
    folded.value = !folded.value;
}
// render tracks's length controled by folded
const tracksToRender = computed(() => {
    if (folded.value) {
        return artist_toptracks.value?.slice(0, artist_toptracks.value.length / 2);
    } else {
        return artist_toptracks.value;
    }
})

onMounted(async () => {
    try {
        const artistPromise = getArtist(route.params.id as string);
        const topTracksPromise = getArtistTopTracks(route.params.id as string, 'JP');
        const artistAlbumPromise = getArtistAlbum(route.params.id as string, 20, 'single,album', 'JP');
        const relatedArtistsPromise = getArtistRelatedArtist(route.params.id as string);
        const appearAlbumPromise = getArtistAlbum(route.params.id as string, 20, 'appears_on', 'JP');

        artist.value = await artistPromise;

        const top_tracks = await topTracksPromise;
        artist_toptracks.value = top_tracks.tracks.map((track) => {
            return {
                image_url: track.album.images[2].url,
                track_name: track.name,
                artist_name: null,
                album_name: track.album.name,
                track_duration: `${Math.floor(track.duration_ms / 1000 / 60)}:${Math.floor((track.duration_ms / 1000) % 60) > 9 ? Math.floor((track.duration_ms / 1000) % 60) : '0' + Math.floor((track.duration_ms / 1000) % 60)}`,
                spotify_uri: track.uri
            };
        });

        const artistAlbumResult = await artistAlbumPromise;
        artist_album.value = artistAlbumResult.items;
        artist_album.value?.sort((a, b) => {
            const dateA = new Date(a.release_date);
            const dateB = new Date(b.release_date);
            return dateB.getTime() - dateA.getTime();
        });

        relatedArtists.value = await relatedArtistsPromise;
        artist_appear_album.value = (await appearAlbumPromise).items;

        getPrimaryColor();
    } catch (error) {
        console.error("Error occurred while fetching data:", error);
    }
})

</script>

<style scoped>
:root {
    --primary-color: v-bind(artist_primary_color);
}

.artist-main {
    @apply flex flex-col;
    @apply min-h-full;
    @apply bg-black;
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
    @apply px-6;
}

.popular-wrap::before {
    @apply absolute bg-black bg-opacity-50 z-[-1] top-0 left-0 w-full h-full;
    content: '';
    pointer-events: none;
}

.wrap {
    @apply mb-8 px-6;
}
</style>