<template>
    <div class="container">
        <p class="section-name">
            {{ text.sectionText }}
        </p>
        <div class="section">
            <SongIconVer v-for="(info, index) in songIconInfo" :key=index :image=info.image :title=info.title
                :artist=info.artist></SongIconVer>
        </div>
    </div>
</template>

<script setup lang="ts">
import SongIconVer from './SongIconVer.vue';
const text = defineProps(['sectionText'])

let songIconInfo = [{
    image: 'src/assets/image/jacket_s_061.png',
    title: 'Daily Mix 3',
    artist: ['DECO*27', 'Reol', 'Eve', 'YUC\'c', 'Connor Price']
},
{
    image: 'src/assets/image/jacket_s_061.png',
    title: 'Daily Mix 3',
    artist: ['DECO*27', 'Reol', 'Eve', 'YUC\'c', 'Connor Price']
},
{
    image: 'src/assets/image/jacket_s_061.png',
    title: 'Daily Mix 3',
    artist: ['DECO*27', 'Reol', 'Eve', 'YUC\'c', 'Connor Price']
},
{
    image: 'src/assets/image/jacket_s_061.png',
    title: 'Daily Mix 3',
    artist: ['DECO*27', 'Reol', 'Eve', 'YUC\'c', 'Connor Price']
},
{
    image: 'src/assets/image/jacket_s_061.png',
    title: 'Daily Mix 3',
    artist: ['DECO*27', 'Reol', 'Eve', 'YUC\'c', 'Connor Price']
},
{
    image: 'src/assets/image/jacket_s_061.png',
    title: 'Daily Mix 3',
    artist: ['DECO*27', 'Reol', 'Eve', 'YUC\'c', 'Connor Price']
},
]
</script>

<style lang='scss' scoped>
* {
    background-color: transparent;
}

.section {

    overflow-y: hidden;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    margin-left: 2rem;
    column-gap: 1rem;
    // overflow-y: hidden;
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