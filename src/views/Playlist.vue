<template>
    <div class="list-main">
        <div class="list-header h-80 bg-black ">
            <div class="daisy-avatar w-52 h-52 shadow-2xl mr-6" :class="onLoading ? 'daisy-skeleton' : ''">
                <img async ref="list_image" class="w-full h-full" :src="listItem?.images[0].url" loading="lazy"
                    v-if="listItem?.images">
            </div>
            <div class="flex flex-col justify-end text-white gap-6">
                <p>播放列表</p>
                <p class=" font-extrabold text-5xl">{{ listItem?.name }}</p>
                <p v-html="listItem?.description"></p>
                <div class="flex items-center leading-normal">
                    <div class="daisy-avatar h-8 w-8 inline-flex">
                        <img class="rounded-full">
                    </div>
                    <div class="font-semibold cursor-pointer hover:underline ml-1"
                        @click="router.push(`/artist/${listItem?.owner.id}`)">
                        {{ listItem?.owner.display_name }}
                    </div>
                    <div class="font-semibold"> <span>{{ `${listItem?.tracks.total}首歌曲` }}</span></div>
                </div>
            </div>
        </div>
        <div class="list-body">
            <TheGallery orientation="vertical" style="gap: 0;">
                <TheTrackSection :image_url="track.track.album.images[0].url" :track_name="track.track.name"
                    :album_name="track.track.album.name" :artist_name="track.track.artists[0].name"
                    :spotify_uri="track.track.uri" :order="n + 1" v-for="(track, n) in listItem?.tracks.items"
                    :track_duration="`${Math.floor(track.track.duration_ms / 1000 / 60)}:${Math.floor((track.track.duration_ms / 1000) % 60) > 9 ? Math.floor((track.track.duration_ms / 1000) % 60) : '0' + Math.floor((track.track.duration_ms / 1000) % 60)}`">
                </TheTrackSection>
            </TheGallery>
            <footervue></footervue>
        </div>
    </div>
</template>

<script setup lang="ts">
import ColorThief from 'colorthief';
import { getPlayList } from '@/api/playlist/getPlaylist';
import type { PlayList } from '@/api/playlist/getPlaylist';
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import TheGallery from './component/TheGallery.vue';
import TheTrackSection from './component/TheTrackSection.vue';
import footervue from './component/footervue.vue';

const router = useRouter();
const route = useRoute();
const listItem = ref<PlayList>();
const onLoading = ref<boolean>(true);

const list_image = ref<HTMLImageElement>();
const list_primary_color = ref<string>('#000000');
const getPrimaryColor = function () {
    const colorThief = new ColorThief();
    const image = list_image.value;
    // cannot use image?.crossOrigin or it'll crush
    image.crossOrigin = 'Anonymous';
    if (image?.complete) {
        list_primary_color.value = '#' + colorThief.getColor(image).map((x: number) => {
            const hex = x.toString(16)
            return hex.length === 1 ? '0' + hex : hex;
        }).join('')
    } else {
        image?.addEventListener('load', function () {
            list_primary_color.value = '#' + colorThief.getColor(image).map((x: number) => {
                const hex = x.toString(16)
                return hex.length === 1 ? '0' + hex : hex;
            }).join('')
        })
    }
}

const computedBgCss = computed(() => {
    return `background-color: ${list_primary_color.value};`
})

watch(list_primary_color, () => {
    const listmain = document.querySelector('.list-main') as HTMLElement;
})

onMounted(async () => {
    await getPlayList(route.params.id as string).then((res) => {
        listItem.value = res;
        onLoading.value = false;
    }).catch((error: Error) => {
        onLoading.value = false;
    });
    getPrimaryColor();
    nextTick(() => {
        const listMainElement = document.querySelector('.list-header');
        listMainElement?.classList.add('transition-bg-color');
    })
})
</script>

<style scoped>
.list-main {
    --list-primary-color: v-bind(list_primary_color);
    @apply transition-all duration-500;
}

.list-header.transition-bg-color {
    background-color: v-bind(list_primary_color)
}

.list-header {
    @apply flex flex-row;
    @apply flex flex-row items-end;
    @apply px-6 pb-6;
    @apply transition-all duration-500;
    background-color: black;
}

.list-body {
    @apply bg-gradient-to-b from-[var(--list-primary-color)] via-transparent to-transparent;
    @apply backdrop-blur-2xl;
}

.list-body::before {
    @apply absolute bg-black bg-opacity-30 z-[-1] top-0 left-0 w-full h-full;
    content: '';
    pointer-events: none;
}

span::before {
    content: '•';
    margin: 0 4px 0 4px;
}
</style>