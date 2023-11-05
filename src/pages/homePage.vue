<template>
    <div class="main">
        <SideBar></SideBar>
        <MainBoard class="mainboard"></MainBoard>
        <TheAlert></TheAlert>
    </div>
</template>

<script setup lang="ts">
import SideBar from '@/views/SideBar.vue';
import MainBoard from '@/views/MainBoard.vue';
import TheAlert from '@/views/component/TheAlert.vue'
import { onMounted } from 'vue';
import { accessToken } from '../store/index'
import { getUserProfile } from '../api/user/getUserProfile'
const tokenStore = accessToken();
onMounted(async () => {
    tokenStore.retriveCode();
    tokenStore.fetchAccessToken();
    const userProfile = await getUserProfile();
    console.log(userProfile)
})
</script>

<style scoped>
.main {
    @apply w-[100vw] h-[100vh];
    @apply flex flex-row flex-nowrap;
}
</style>