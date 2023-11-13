<template>
    <div class="album">
        <div class="album-header h-80 bg-slate-50">
            <div class="daisy-avatar w-52 h-52 shadow-2xl mr-6">
                <img ref="album_image" :src="album?.images[0].url" :alt="album?.name" :height="album?.images[0].height"
                    :width="album?.images[0].width" async loading="lazy" @click="getPrimaryColor">
            </div>
            <div class="flex flex-col justify-end text-white gap-6">
                <p>{{ albumTypeMap[album?.album_type] }}</p>
                <p class=" font-extrabold text-5xl">{{ album?.name }}</p>
                <div class="daisy-avatar h-8 w-8 inline-flex">
                    <img class="rounded-full" :src="albumArtistAvatar" :alt="album?.artists[0].name">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ColorThief from 'colorthief'
import { getAlbum } from '@/api/album/getAlbum';
import { getArtist } from '@/api/artist/getArtist';
import type { album as Album } from '@/lib/interface';
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router';
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
})
</script>

<style scoped>
.album {
    --album-primary-color: v-bind(album_primary_color);
    @apply transition-all duration-500;
}

.album-header {
    background-color: var(--album-primary-color);
    @apply flex flex-row items-end;
    @apply px-6 pb-6;
}
</style>