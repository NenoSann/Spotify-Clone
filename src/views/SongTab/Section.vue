<template>
    <div class="container">
        <p class="section-name">
            {{ text.sectionText }}
        </p>
        <div class="section">
            <SongIconVer :image=songIconInfo.image :title=songIconInfo.title :artist=songIconInfo.artist></SongIconVer>
        </div>
    </div>
</template>

<script setup lang="ts">
import SongIconVer from './SongIconVer.vue';
const text = defineProps(['sectionText'])

let songIconInfo = {
    image: 'src/assets/image/jacket_s_061.png',
    title: 'Daily Mix 3',
    artist: ['DECO*27', 'Reol', 'Eve', 'YUC\'c', 'Connor Price']
}
</script>

<style lang='scss' scoped>
* {
    background-color: transparent;
}

.section {
    margin-left: 2rem;
}

.section-name {
    margin-top: 2rem;
    margin-bottom: 1.2rem;
    color: white;
    white-space: nowrap;
    background-color: transparent;
    margin-left: 2rem;
    font-size: 1.6rem;
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
    margin-bottom: 1.2rem;
}
</style>