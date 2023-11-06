<template>
    <div class="user-main">
        <div class="user-info">
            <div class="daisy-avatar">
                <div class="w-64 rounded-full shadow-md">
                    <img :src="userProfile.images[1].url" decoding="async">
                </div>
            </div>
            <div class="flex flex-col ml-8">
                <p>个人资料</p>
                <h1 class=" text-8xl font-bold">{{ userProfile.display_name }}</h1>
                <div>
                    <span>{{ 9 }}个公开歌单</span><span> | </span><span>关注{{ 8 }}人</span>
                </div>
            </div>
        </div>
        <div class="hot-artist">
            <p class="font-semibold text-2xl">本月热门艺人</p>
            <p class="font-thin text-sm">仅自己可见</p>
            <TheGallery>
                <TheCard v-bind="card" v-for="card of artistCards">
                </TheCard>
            </TheGallery>
        </div>
        <div class="hot-track">

        </div>
        <div class="open-list">

        </div>
        <div class="following">

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Ref } from 'vue';
import { useUserStore } from '@/store';
import type { artist, track } from '@/lib/interface';
import { getUserTopItem } from '@/api/user/getUserTopItem';
import TheGallery from '@/views/component/TheGallery.vue';
import TheCard from '@/views/component/TheCard.vue';
const userStore = useUserStore();
const userProfile = computed(() => {
    return userStore.userProfile;
})
const topArtists: Ref<artist[] | undefined> = ref();
const topTracks: Ref<track[] | undefined> = ref();
const artistCards = computed(() => {
    return topArtists.value?.map((artist) => {
        console.log('artists image', artist.images[0].url)
        return {
            imageURL: artist.images[0].url,
            card_type: 'Artist',
            card_name: artist.name,
        }
    })
});
const trackCards = ref();
const cardProps = {
    imageURL: 'src/assets/image/jacket_s_090.png',
    card_type: 'track',
    card_name: 'Infinate Gray'
}
onMounted(async () => {
    topArtists.value = (await getUserTopItem('artists')).items as artist[];
    topTracks.value = (await getUserTopItem('tracks')).items as track[];
})
// const item = await getUserTopItem('artsts'); 
</script>

<style scoped>
.user-main {
    @apply flex flex-col;
    @apply p-6;
    @apply bg-gradient-to-b from-primary-focus to-accent;
    @apply text-amber-50;
}

.user-info {
    @apply h-80 w-full;
    @apply flex justify-start items-center;
}
</style>