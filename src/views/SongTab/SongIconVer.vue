<template>
    <div class="container" @mousedown="() => false" @select="() => false">
        <img :src=props.image>
        <p class="title">{{ props.title }}</p>
        <p class="artistString">{{ artistString }}</p>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<IProps>();

interface IProps {
    image: string,
    title: string,
    artist: string[] | string
}

const artistString = computed(() => {
    // Need some clever way to do it
    if (typeof (props.artist) === 'string') {
        return props.artist;
    } else if (typeof (props.artist) === 'object') {
        return (props.artist[0] + ', ' + props.artist[1] + ', ' + props.artist[2] + ' And More');
    }
})
</script>


<style scoped lang="scss">
* {
    user-select: none;
}

.container {
    flex: 1 1 10rem;
    background-color: rgba($color: white, $alpha: 0.1);
    width: 10rem;
    display: flex;
    flex-direction: column;
    padding: 10px 10px 10px 10px;
    border-radius: 10px;
}

img {
    border-radius: inherit;
}

@mixin p {
    padding-top: 0.6rem;
    color: white;
    background-color: transparent;
    font-family: 'Roboto', sans-serif;
}

.title {
    @include p;
    font-weight: 700
}

.artistString {
    @include p;
    color: #dee2e6;
    font-size: 0.8rem;
}
</style>