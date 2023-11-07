<template>
    <div class="absolute w-full  h-full top-0 left-0 bg-[rgba(0,0,0,0.4)] flex justify-center items-center" v-if="display">
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
import { computed } from 'vue';
import { useRouter } from 'vue-router';
const componentStateStore = componentState();
const router = useRouter();
const redirectToLogin = function () {
    console.log('click')
    router.replace('/login')
}
const display = computed(() => {
    return componentStateStore.redirect;
})
const disableOverlay = function () {
    componentStateStore.redirect = false;
}
</script>

<style scoped>
.alert {
    @apply w-max;
}
</style>