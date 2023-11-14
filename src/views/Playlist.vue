<template>
    <div>
        <div class="list-header h-80 bg-slate-50">
            <div class="daisy-avatar w-52 h-52 shadow-2xl mr-6">
                <img async ref="list_image" :src="list?.images[0].url" :alt="list?.name" :height="list?.images[0].height"
                    :width="list?.images[0].width" loading="lazy">
            </div>
            <div class="flex flex-col justify-end text-white gap-6">
                <p class=" font-extrabold text-5xl">{{ list?.name }}</p>
                <div class="flex items-center leading-normal">
                    <div class="daisy-avatar h-8 w-8 inline-flex">
                        <img class="rounded-full" :src="listArtistAvatar" :alt="list?.artists[0].name">
                    </div>
                    <div class="font-semibold cursor-pointer hover:underline ml-1"
                        @click="router.push(`/artist/${list?.artists[0].id}`)">
                        {{ list?.artists[0].name }}
                    </div>
                    <div class="font-semibold leading-none"><span>{{ list?.release_date.split('-')[0] }}</span>
                    </div>
                    <div class="font-semibold"> <span>{{ `${list?.total_tracks}首歌曲` }}</span></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getPlaylist } from '@/api/playlist/getPlaylist';
import type { PlaylistItem } from '@/api/playlist/getPlaylist';
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
const listItem = ref<PlaylistItem>();
const onLoading = ref<boolean>(true);
onMounted(() => {
    getPlaylist(route.params.id as string).then((res) => {
        listItem.value = res;
        onLoading.value = false;
    }).catch((error: Error) => { })
})
</script>

<style scoped></style>