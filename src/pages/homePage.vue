<template>
    <div class="main">
        <router-view v-slot="{ Component, route }">
            <Transition name="fade" mode="out-in">
                <KeepAlive :max="5">
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
    @apply min-w-0 max-h-screen rounded-2xl mt-2;
    @apply relative;
    @apply overflow-x-hidden;
}

.main::-webkit-scrollbar {
    background-color: transparent;
}

.main::-webkit-scrollbar-thumb {
    height: 50px;
    border: 4px solid transparent;
    border-radius: 8px;
    background-clip: content-box;
    background-color: #fff4;
}

.main::-webkit-scrollbar-corner {
    display: none;
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