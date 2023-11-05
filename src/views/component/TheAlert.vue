<template>
    <div class="absolute w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.4)] \" v-if="componentStateStore.redirect">
        <div class="daisy-alert alert">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info shrink-0 w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>Spotify 凭证过期，是否重新登陆？</span>
            <div>
                <button class="daisy-btn daisy-btn-sm daisy-btn-secondary" @click="disableOverlay">取消</button>
                <button class="daisy-btn daisy-btn-sm daisy-btn-primary ml-4" @click="redirectToLogin">重新登陆</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { componentState } from '@/store/index';
import { useRouter } from 'vue-router';
const componentStateStore = componentState();
const router = useRouter();
const redirectToLogin = function () {
    console.log('click')
    router.replace('/login')
}
const disableOverlay = function () {
    componentStateStore.redirect = false;
}
</script>

<style scoped>
.alert {
    @apply absolute top-1/3 left-1/2 -translate-x-1/2;
    @apply w-1/3;
}
</style>