<template>
    <div class="song-icon-main">
        <div class="song-item">
            <img class="song-image" :src="props.componentImage">
            <p class="song-text">{{ props.componentName }}</p>
            <font-awesome-icon class="play-button" icon="fa-solid fa-circle-play fa-2xl" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
const props = defineProps({
    componentName: String,
    componentImage: String,
})


</script>

<style scoped lang="scss">
* {
    user-select: none;
}

.song-icon-main {
    overflow: hidden;
    background-color: transparent;
    border-radius: 6px;

    &:hover {
        background-color: rgba($color: #ffffff, $alpha: 0.5);
        transition: background-color .5s ease-in-out;
        cursor: pointer;
    }

    &:not(:hover) {
        background-color: transparent;
        transition: background-color .5s ease-in-out;
    }
}


.song-item {

    display: flex;
    background-color: rgba($color: #ffffff, $alpha: 0.2);
    align-items: center;
}

.song-image {
    width: 70px;
}

.play-button {
    // Can not use duotone icon without fa-pro, sad.
    margin-left: auto;
    margin-right: 20px;
    color: #1db954;
    font-size: 48px;
    background: transparent;
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