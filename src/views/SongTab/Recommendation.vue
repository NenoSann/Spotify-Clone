<template>
    <div class="recommendation-main">
        <SongIconSm v-for="(songInfo, index) in songInfos" :key="index" :tab_name="songInfo.songName"
            :image_url="songInfo.songImage" :redirect_url="songInfo.redirect_url"></SongIconSm>
    </div>
</template>

<script setup lang="ts">
import SongIconSm from './SongIconSm.vue';
import { useRoute, useRouter } from 'vue-router';
const router = useRouter();

let songInfos = [
    { songName: "Potato", songImage: "src/assets/image/jacket_s_052.png", redirect_url: 'playlist/37i9dQZF1E35gNLXYvAaDO' },
    { songName: "Potato", songImage: "https://misc.scdn.co/liked-songs/liked-songs-640.png" },
    { songName: "Potato", songImage: "src/assets/image/jacket_s_052.png" },
    { songName: "Potato", songImage: "src/assets/image/jacket_s_061.png" },
    { songName: "幽灵东京", songImage: "src/assets/image/jacket_s_102.png" },
    { songName: "Cinema", songImage: "src/assets/image/jacket_s_126.png" },]

</script>

<style scoped>
.recommendation-main {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr;
    row-gap: 10px;
    column-gap: 20px;
    background-color: transparent;
    margin-left: 2rem;
    margin-right: 2rem;
}
</style>