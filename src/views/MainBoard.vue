<template>
    <div id="main-board">
        <!-- Consider to wrap this two component into one block component? -->
        <TopIcon :userinfo="userinfo"></TopIcon>
        <Greeting></Greeting>
        <Recommendation></Recommendation>
        <MusicSection section-text="Made For NenoSan" ref="section"></MusicSection>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import type { UserInfo } from '@/lib/interface';
import TopIcon from './TopIcon.vue';
import Greeting from './Greeting.vue';
import Recommendation from './SongTab/Recommendation.vue';
import MusicSection from './SongTab/MusicSection.vue';
// Store the user info into variable

const userinfo: UserInfo = {
    imageURL: ref('src/assets/image/userImage.png'),
    username: ref('NenoSan'),
}

</script>

<style scoped>
#main-board {
    display: flex;
    flex-direction: column;
    width: 100%;
    background: rgb(0, 115, 255);
    background: linear-gradient(180deg, rgba(0, 115, 255, 1) 0%, rgba(2, 0, 36, 1) 100%);
}
</style>