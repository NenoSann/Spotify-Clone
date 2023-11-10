<template>
    <div ref="player_wrap" class="embed-iframe">
        <div class=" overflow-hidden rounded-[16px] w-3/5">
            <div ref="player" id="embed-iframe">
            </div>
        </div>
        <div class="play-list rounded-2xl overflow-hidden p-2 w-[30%] bg-teal-700">
            <div
                class="daisy-menu daisy-menu-vertical flex-nowrap overflow-x-hidden min-h-full w-full h-full rounded-2xl max-h-full">
                <transition-group name="list">
                    <li class=" text-left" :data-uri="item.uri" id="list-item" v-for="item in playlistItems"
                        :key="item.uri">{{
                            item.track_name
                        }}</li>
                </transition-group>
            </div>
        </div>
        <div class="control-button rounded-2xl w-[10%] bg-orange-600">
            control-button
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { playerState } from '@/store';
const playerStore = playerState();
const player = ref<HTMLElement | null>(null);
const player_wrap = ref<HTMLElement | null>(null);
const player_height = computed(() => {
    return player_wrap.value?.offsetHeight;
})
const player_width = computed(() => {
    return player_wrap.value?.offsetWidth;
})
const playerCallback = function (EmbedController: any) {
    // put eventListener on parent div rather than li to increase performance
    // and logic. 
    const playlistNode = document.querySelector('.play-list') as HTMLElement;
    playlistNode.addEventListener('click', (event) => {
        const clickedElement: HTMLElement = event.target as HTMLElement;
        if (clickedElement.id === 'list-item') {
            EmbedController.loadUri(clickedElement.dataset['uri']);
            EmbedController.play();
        }
    })
}
const playlistItems = computed(() => {
    return playerStore.playlist;
})
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
            frameBorder: 0,
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

.list-move,
/* 对移动中的元素应用的过渡 */
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.list-leave-active {
    position: absolute;
}
</style>