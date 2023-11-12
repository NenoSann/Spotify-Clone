<template>
    <div class="card-main group" @click="redirectToPage">
        <div class="daisy-avatar aspect-square">
            <img :src="image_url" :class="props.avatar_type === 'round' ? 'rounded-full' : 'rounded-md'" width="176"
                height="176">
        </div>
        <font-awesome-icon class="play-button group-hover:opacity-100" icon="fa-solid fa-circle-play fa-2xl" />
        <p class=" line-clamp-1 font-semibold">{{ card_name }}</p>
        <p class=" font-light">{{ card_type }}</p>
    </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
const props = defineProps<{
    image_url: string,
    card_type: string,
    card_name: string,
    avatar_type: 'round' | 'square',
    route_url?: string
}>();
const redirectToPage = () => {
    if (props.route_url) {
        router.push(props.route_url);
    }
}
</script>

<style scoped>
* {
    user-select: none;
}

.card-main {
    @apply relative w-52 h-72 p-4;
    @apply rounded-lg;
    @apply flex-shrink-0;
    @apply bg-black bg-opacity-30 hover:bg-opacity-40;
    @apply transition-all duration-300;
}

.play-button {
    opacity: 0;
    font-size: 52px;
    position: absolute;
    top: 50%;
    right: 10%;
    color: #1db954;
    background: transparent;
    @apply transition-all duration-300;
    @apply group-hover:-translate-y-2;
}
</style>