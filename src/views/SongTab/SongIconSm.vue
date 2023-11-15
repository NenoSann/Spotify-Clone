<template>
    <div class="song-icon-main group" @click="router.push(redirect_url ? redirect_url : '')">
        <div class="song-item">
            <img class="song-image" :src="props.image_url">
            <p class="song-text">{{ props.tab_name }}</p>
            <font-awesome-icon class="play-button" icon="fa-solid fa-circle-play fa-2xl" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useRouter } from 'vue-router'
const router = useRouter();
const props = defineProps({
    tab_name: String,
    image_url: String,
    redirect_url: String
})


</script>

<style scoped>
* {
    user-select: none;
}

.song-icon-main {
    @apply overflow-hidden bg-transparent rounded-md;
    @apply hover:bg-white hover:bg-opacity-50 hover:cursor-pointer;
    @apply transition-all duration-300;
}


.song-item {
    @apply flex bg-white bg-opacity-20 items-center;
}

.song-image {
    @apply w-16;
}

.play-button {
    margin-left: auto;
    margin-right: 20px;
    color: #1db954;
    font-size: 48px;
    background: transparent;
    @apply opacity-0;
    @apply group-hover:opacity-100;
    @apply hover:scale-110;
    @apply transition-all duration-300;
}

.song-text {
    white-space: nowrap;
    margin-left: 20px;
    color: white;
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
    background-color: transparent;
}
</style>