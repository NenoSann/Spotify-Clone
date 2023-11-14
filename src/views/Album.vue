<template>
    <div class="album">
        <div class="album-header h-80 bg-slate-50">
            <div class="daisy-avatar w-52 h-52 shadow-2xl mr-6">
                <img async ref="album_image" :src="album?.images[0].url" :alt="album?.name" :height="208" :width="208"
                    loading="lazy" @click="getPrimaryColor">
            </div>
            <div class="flex flex-col justify-end text-white gap-6">
                <p>{{ albumTypeMap[album?.album_type] }}</p>
                <p class=" font-extrabold text-5xl">{{ album?.name }}</p>
                <div class="flex items-center leading-normal">
                    <div class="daisy-avatar h-8 w-8 inline-flex">
                        <img class="rounded-full" :src="albumArtistAvatar" :alt="album?.artists[0].name">
                    </div>
                    <div class="font-semibold cursor-pointer hover:underline ml-1"
                        @click="router.push(`/artist/${album?.artists[0].id}`)">
                        {{ album?.artists[0].name }}
                    </div>
                    <div class="font-semibold leading-none"><span>{{ album?.release_date.split('-')[0] }}</span>
                    </div>
                    <div class="font-semibold"> <span>{{ `${album?.total_tracks}首歌曲` }}</span></div>
                </div>
            </div>
        </div>
        <div class="album-main py-8">
            <TheGallery orientation="vertical" style="gap: 0;">
                <TheTrackSection :image_url="null" :track_name="track.name" :artist_name="track.artists[0].name"
                    :order="n + 1" :album_name="(album?.name as string)" :spotify_uri="track.uri"
                    :track_duration="`${Math.floor(track.duration_ms / 1000 / 60)}:${Math.floor((track.duration_ms / 1000) % 60) > 9 ? Math.floor((track.duration_ms / 1000) % 60) : '0' + Math.floor((track.duration_ms / 1000) % 60)}`"
                    v-for="(track, n) in albumTracks"></TheTrackSection>
            </TheGallery>
        </div>
        <div class="licence flex flex-col text-sm px-6">
            <p v-for="n in album?.copyrights">{{ (n.type === 'C' ? '©' : '℗') + n.text }}</p>
        </div>
        <footervue></footervue>
    </div>
</template>

<script setup lang="ts">
import ColorThief from 'colorthief'
import { getAlbum, getAlbumTracks } from '@/api/album/getAlbum';
import { getArtist } from '@/api/artist/getArtist';
import type { album as Album } from '@/lib/interface';
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import TheGallery from './component/TheGallery.vue';
import TheTrackSection from './component/TheTrackSection.vue';
import footervue from './component/footervue.vue';
const albumTypeMap = {
    'single': '单曲',
    'album': '专辑',
    'compilation': '联合创作'
}
const album_primary_color = ref<string>('#000000');
const route = useRoute();
const router = useRouter();
const album = ref<Album>();
const albumArtistAvatar = ref<string>();
const albumTracks = ref();
const album_image = ref<HTMLImageElement>();
const getPrimaryColor = function () {
    const colorThief = new ColorThief();
    const image = album_image.value;
    // cannot use image?.crossOrigin or it'll crush
    image.crossOrigin = 'Anonymous';
    if (image?.complete) {
        album_primary_color.value = '#' + colorThief.getColor(image).map((x: number) => {
            const hex = x.toString(16)
            return hex.length === 1 ? '0' + hex : hex;
        }).join('')
    } else {
        image?.addEventListener('load', function () {
            album_primary_color.value = '#' + colorThief.getColor(image).map((x: number) => {
                const hex = x.toString(16)
                return hex.length === 1 ? '0' + hex : hex;
            }).join('')
        })
    }
}
onMounted(async () => {
    await getAlbum(route.params.id as string, 'JP').then((res) => {
        album.value = res;
    });
    getPrimaryColor();
    albumArtistAvatar.value = (await getArtist(album.value?.artists[0].id as string)).images[2].url;
    albumTracks.value = (await getAlbumTracks(album.value?.id as string)).items
})
</script>

<style scoped>
.album {
    --album-primary-color: v-bind(album_primary_color);
    @apply transition-all duration-500;
    @apply bg-black;
}

.album-header {
    background-color: var(--album-primary-color);
    @apply flex flex-row items-end;
    @apply px-6 pb-6;
}

.album-main {
    @apply bg-gradient-to-b from-[var(--album-primary-color)] to-transparent;
    @apply backdrop-blur-2xl;
}

.album-main::before {
    @apply absolute bg-black bg-opacity-30 z-[-1] top-0 left-0 w-full h-full;
    content: '';
    pointer-events: none;
}

span {
    vertical-align: bottom;
}

span::before {
    content: '•';
    margin: 0 4px 0 4px;
}
</style>