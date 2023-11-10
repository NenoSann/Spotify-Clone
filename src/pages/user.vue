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
            <p class="font-light text-sm my-1">仅自己可见</p>
            <TheGallery orientation="horizontal">
                <TheCard v-bind="card" avatar_type="round" v-for="card of artistCards">
                </TheCard>
            </TheGallery>
        </div>
        <div class="hot-track">
            <p class="font-semibold text-2xl">本月热门单曲</p>
            <p class="font-thin text-sm my-1">仅自己可见</p>
            <TheGallery orientation="vertical" style="gap: 0;">
                <TheTrackSection v-bind="card" :order="n + 1" :tabindex="n" v-for="(card, n) of trackCards">
                </TheTrackSection>
            </TheGallery>
        </div>
        <div class="open-list">
            <p class="font-semibold text-2xl mb-4">公开歌单</p>
            <TheGallery orientation="horizontal">
                <TheCard v-bind="list" avatar_type="square" v-for="list of playlistCards">
                </TheCard>
            </TheGallery>
        </div>
        <div class="following">
            <p class="font-semibold text-2xl mb-4">关注中</p>
            <TheGallery orientation="horizontal">
                <TheCard v-bind="item" avatar_type="round" v-for="item of followedCards"></TheCard>
            </TheGallery>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '@/store';
import type { Ref } from 'vue';
import type { artist, track, playlist } from '@/lib/interface';
import { getUserTopItem } from '@/api/user/getUserTopItem';
import { getCurrentPlaylist } from '@/api/playlist/getCurrentPlaylist';
import { getFollowedArtists } from '@/api/user/getFollowedArtists';
import TheGallery from '@/views/component/TheGallery.vue';
import TheCard from '@/views/component/TheCard.vue';
import TheTrackSection from '@/views/component/TheTrackSection.vue';
const userStore = useUserStore();
const userProfile = computed(() => {
    return userStore.userProfile;
})
const topArtists: Ref<artist[] | undefined> = ref();
const topTracks: Ref<track[] | undefined> = ref();
const playlist: Ref<playlist["items"] | undefined> = ref();
const follow: Ref<artist[] | undefined> = ref();
const artistCards = computed(() => {
    return topArtists.value?.map((artist) => {
        return {
            image_url: artist.images[0].url,
            card_type: 'Artist',
            card_name: artist.name,
            route_url: `/artist/${artist.id}`
        }
    })
});
const trackCards = computed(() => {
    return topTracks.value?.map((track) => {
        return {
            track_name: track.name,
            album_name: track.album.name,
            track_duration: `${Math.floor(track.duration_ms / 1000 / 60)}:${Math.floor((track.duration_ms / 1000) % 60) > 9 ? Math.floor((track.duration_ms / 1000) % 60) : '0' + Math.floor((track.duration_ms / 1000) % 60)}`,
            image_url: track.album.images[0].url,
            artist_name: track.artists[0].name,
            card_type: 'Track',
            spotify_uri: track.uri
        }
    })
})
const playlistCards = computed(() => {
    return playlist.value?.map((list) => {
        return {
            image_url: list.images.length !== 0 ? list.images[0].url : null,
            card_type: 'List',
            card_name: list.name
        }
    })
})
const followedCards = computed(() => {
    return follow.value?.map((item) => {
        return {
            image_url: item.images[0].url,
            card_type: 'Profile',
            card_name: item.name
        }
    })
})
onMounted(async () => {
    topArtists.value = (await getUserTopItem('artists')).items as artist[];
    topTracks.value = (await getUserTopItem('tracks')).items as track[];
    playlist.value = (await getCurrentPlaylist(5)).items as playlist['items'];
    follow.value = (await getFollowedArtists()).artists.items as artist[];
})
</script>

<style scoped>
.user-main {
    @apply flex flex-col gap-8;
    @apply p-6;
    @apply bg-gradient-to-b from-primary-focus to-accent;
    @apply text-amber-50;
}

.user-info {
    @apply h-80 w-full;
    @apply flex justify-start items-center;
}
</style>