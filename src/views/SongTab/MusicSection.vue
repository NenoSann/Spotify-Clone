<template>
    <div class="section-container">
        <p class="section-name">
            {{ text.sectionText }}
        </p>
        <TheGallery orientation="horizontal">
            <TheCard :image_url="list.images[0].url" :card_type="list?.description" :card_name="list.name"
                avatar_type="square" v-for="list in dailyMixed"></TheCard>
        </TheGallery>
    </div>
</template>

<script setup lang="ts">
import TheCard from '@/views/component/TheCard.vue';
import TheGallery from '../component/TheGallery.vue';
import { getCurrentPlaylist } from '@/api/playlist/getCurrentPlaylist';
import type { playlist } from '@/lib/interface';
import { ref, onMounted, computed } from 'vue';
const text = defineProps(['sectionText']);
const playlists = ref<playlist>();
const dailyMixed = computed(() => {
    return playlists.value?.items.map((list) => {
        if ((list.owner as any).id === 'spotify' && list.name.includes('每日推荐')) {
            return list;
        }
    }).filter((list) => list !== undefined)
})
onMounted(async () => {
    playlists.value = await getCurrentPlaylist(50);
})




</script>

<style lang='scss' scoped>
* {
    background-color: transparent;
}

.section-container {
    @apply mx-8;
}

.section-name {
    margin-top: 2rem;
    margin-bottom: 1.2rem;
    color: white;
    white-space: nowrap;
    background-color: transparent;
    font-size: 1.6rem;
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
    margin-bottom: 1.2rem;
}
</style>