<template>
    <div id="main-board">
        <!-- Consider to wrap this two component into one block component? -->
        <TopIcon :userinfo="userinfo"></TopIcon>
        <Greeting></Greeting>
        <Recommendation></Recommendation>
        <Section section-text="Made For NenoSan"></Section>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { UserInfo } from '@/lib/interface';
import TopIcon from './TopIcon.vue';
import Greeting from './Greeting.vue';
import Recommendation from './SongTab/Recommendation.vue';
import Section from './SongTab/Section.vue';
// Store the user info into variable

const userinfo: UserInfo = {
    imageURL: ref('src/assets/image/userImage.png'),
    username: ref('NenoSan'),
}

const recommandation = {
    songName: "ZUTOMAYO",
    songImage: "src/assets/image/userImage.png",
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