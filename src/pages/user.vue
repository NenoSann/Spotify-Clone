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
import { computed } from 'vue'
import { useUserStore } from '@/store';
const userStore = useUserStore();
const userProfile = computed(() => {
    return userStore.userProfile;
})
</script>

<style scoped>
.user-main {
    @apply flex flex-col;
    @apply p-6;
    @apply bg-secondary-focus;
    @apply text-amber-50;
}

.user-info {
    @apply h-80 w-full;
    @apply flex justify-start items-center;
}
</style>