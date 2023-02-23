<template>
    <div class="recommendation-main">
        <SongIconSm v-for="(songInfo, index) in songInfos" :key="index" :component-name="songInfo.songName"
            :component-image="songInfo.songImage"></SongIconSm>
    </div>
</template>

<script setup lang="ts">
import SongIconSm from './SongIconSm.vue';

let songInfos = [
    { songName: "Potato", songImage: "src/assets/image/jacket_s_052.png" },
    { songName: "Potato", songImage: "src/assets/image/jacket_s_022.png" },
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
}
</style>