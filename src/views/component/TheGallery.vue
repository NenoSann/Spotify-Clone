<template>
    <div class="gallery-main">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<({
    orientation: 'horizontal' | 'vertical' | undefined
})>();
const orientation = computed(() => {
    if (props.orientation === 'horizontal') {
        return 'row';
    } else if (props.orientation === 'vertical') {
        return 'column';
    }
})
</script>

<style scoped>
.gallery-main {
    @apply flex gap-6;
    @apply max-w-full w-full;
    @apply overflow-auto;
    flex-direction: v-bind(orientation);
}

.gallery-main::-webkit-scrollbar {
    background-color: transparent;
}

.gallery-main::-webkit-scrollbar-thumb {
    height: 50px;
    border: 4px solid transparent;
    border-radius: 8px;
    background-clip: content-box;
    background-color: #fff4;
}

.gallery-main::-webkit-scrollbar-corner {
    display: none;
}
</style>