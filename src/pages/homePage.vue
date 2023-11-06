<template>
    <div class="main">
        <router-view></router-view>
        <TheAlert></TheAlert>
    </div>
</template>

<script setup lang="ts">
import SideBar from '@/views/SideBar.vue';
import MainBoard from '@/views/MainBoard.vue';
import TheAlert from '@/views/component/TheAlert.vue'
import { onMounted } from 'vue';
import { accessToken, useUserStore } from '../store/index'
import { getUserProfile } from '../api/user/getUserProfile'
const tokenStore = accessToken();
const userStore = useUserStore();
onMounted(async () => {
    tokenStore.retriveCode();
    tokenStore.fetchAccessToken();
    userStore.fetchUserProfile();
})
</script>

<style scoped>
.main {
    @apply w-[100vw] h-[100vh];
}
</style>