<template>
    <div class="list-main">
        <div class="list-header h-80 bg-black ">
            <div class="daisy-avatar w-52 h-52 shadow-2xl mr-6" :class="onLoading ? 'daisy-skeleton' : ''">
                <img async ref="list_image" :src="listItem?.images[0].url" loading="lazy" v-if="listItem?.images">
            </div>
            <div class="flex flex-col justify-end text-white gap-6">
                <p>播放列表</p>
                <p class=" font-extrabold text-5xl">{{ listItem?.name }}</p>
                <p>{{ listItem?.description }}</p>
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
        <TheGallery orientation="vertical" style="gap: 0;">
            <TheTrackSection :image_url="track.track.album.images[0].url" :track_name="track.track.name"
                :album_name="track.track.album.name" :artist_name="track.track.artists[0].name"
                v-for="track in listItem?.tracks.items">
            </TheTrackSection>
        </TheGallery>
    </div>
</template>

<script setup lang="ts">
import ColorThief from 'colorthief';
import { getPlayList } from '@/api/playlist/getPlaylist';
import type { PlayList } from '@/api/playlist/getPlaylist';
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import TheGallery from './component/TheGallery.vue';
import TheTrackSection from './component/TheTrackSection.vue';

const router = useRouter();
const route = useRoute();
const listItem = ref<PlayList>();
const onLoading = ref<boolean>(true);

const list_image = ref<HTMLImageElement>();
const list_primary_color = ref<string>('#000');
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

onMounted(() => {
    getPlayList(route.params.id as string).then((res) => {
        listItem.value = res;
        onLoading.value = false;
        getPrimaryColor();
    }).catch((error: Error) => {
        onLoading.value = false;
    })
})
</script>

<style scoped>
.list-main {
    @apply transition-all duration-500;
}

.list-header {
    @apply flex flex-row;
    @apply flex flex-row items-end;
    @apply px-6 pb-6;
}

span::before {
    content: '•';
    margin: 0 4px 0 4px;
}
</style>