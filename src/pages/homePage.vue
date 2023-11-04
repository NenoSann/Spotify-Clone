<template>
    <div class="container">
        <SideBar></SideBar>
        <MainBoard class="mainboard"></MainBoard>
    </div>
</template>

<script setup lang="ts">
import SideBar from '@/views/SideBar.vue';
import MainBoard from '@/views/MainBoard.vue';
import { onMounted } from 'vue';
import { accessToken } from '../store/index'

const tokenStore = accessToken();
onMounted(() => {
    tokenStore.retriveCode();
    tokenStore.fetchAccessToken();
})
</script>

<style scoped>
.container {
    @apply flex flex-row flex-nowrap;
}
</style>