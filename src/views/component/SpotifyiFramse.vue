<template>
    <div ref="player_wrap" class="embed-iframe">
        <div class=" overflow-hidden rounded-[16px] w-3/5">
            <div ref="player" id="embed-iframe">
            </div>
        </div>
        <div class="play-list rounded-2xl overflow-hidden p-2 w-[30%] bg-teal-700">
            <div
                class="daisy-menu daisy-menu-vertical flex-nowrap overflow-auto min-h-full w-full h-full rounded-2xl max-h-full">
                <li id="list-item" tabindex=0>spotify:track:0HYAsQwJIO6FLqpyTeD3l6</li>
                <li id="list-item" tabindex=0>spotify:track:3OdkC5pG8vc26S26qHyBo8</li>
                <li id="list-item" tabindex=0>spotify:track:2S1wK8ocFeOUx4aBw6z2q8</li>
                <li id="list-item" tabindex=0>spotify:track:3OdkC5pG8vc26S26qHyBo8</li>
                <li id="list-item" tabindex=0>spotify:track:5WsENYuqLbWUc6ArmXhzi0</li>
            </div>
        </div>
        <div class="control-button rounded-2xl w-[10%] bg-orange-600">
            control-button
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
const player = ref<HTMLElement | null>(null);
const player_wrap = ref<HTMLElement | null>(null);
const player_height = computed(() => {
    return player_wrap.value?.offsetHeight;
})
const player_width = computed(() => {
    return player_wrap.value?.offsetWidth;
})
const playerCallback = function (EmbedController: any) {
    document.querySelectorAll('#list-item').forEach((item) => {
        item.addEventListener('click', () => {
            console.log(item.innerHTML);
            EmbedController.loadUri(item.innerHTML);
        })
    })
}
onMounted(() => {
    (window as any).onSpotifyIframeApiReady = (IFrameAPI: any) => {
        console.log('spotify ready!');
        console.log('height: ', player_height.value)
        console.log('width: ', player_width.value)
        const element = player.value;
        const options = {
            uri: "spotify:track:60nwK1iMgnFCznF6FiNfts",
            height: 152,
            width: player_width.value as number * 3 / 5 - 8,
            frameBorder: 0
        };
        const callback = playerCallback;
        IFrameAPI.createController(element, options, callback)
    }
})
// eslint-disable-next-line no-undef
defineExpose({ playerCallback });
</script>

<style scoped>
.embed-iframe {
    @apply flex gap-2;
    @apply h-[152px];
    /* unfortunately we cannot set css for iFrame itslef*/
    @apply m-2 rounded-md;
    @apply bg-transparent;
    @apply overflow-hidden;
    @apply select-none;
}

.play-list li {
    @apply p-1;
    @apply hover:bg-white;
    @apply rounded-xl;
    @apply text-center;
}
</style>