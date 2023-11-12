<template>
    <div class="main">
        <router-view v-slot="{ Component, route }">
            <Transition name="fade" mode="out-in">
                <KeepAlive :max="3">
                    <component :is="Component" :key="route.path"></component>
                </KeepAlive>
            </Transition>
        </router-view>
        <TheAlert></TheAlert>
    </div>
</template>

<script setup lang="ts">
import TheAlert from '@/views/component/TheAlert.vue'
import { onMounted } from 'vue';
import { accessToken, useUserStore } from '../store/index'
import type { Router } from 'vue-router';
const tokenStore = accessToken();
const userStore = useUserStore();
const getKeepAliveInclude = function (route) {
    return route.meta.key;
}
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

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}
</style>