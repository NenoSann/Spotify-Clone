<template>
    <div class="main">
        <router-view></router-view>
        <TheAlert></TheAlert>
    </div>
</template>

<script setup lang="ts">
import TheAlert from '@/views/component/TheAlert.vue'
import { onMounted } from 'vue';
import { accessToken, useUserStore } from '../store/index'
const tokenStore = accessToken();
const userStore = useUserStore();
onMounted(async () => {
    await tokenStore.retriveCode();
    await tokenStore.fetchAccessToken();
    await userStore.fetchUserProfile();
})
</script>

<style scoped>
.main {
    @apply flex-grow flex-shrink basis-auto;
    @apply min-w-0 max-h-screen rounded-2xl mt-2 mr-2;
    @apply relative;
    @apply overflow-x-hidden;
}
</style>