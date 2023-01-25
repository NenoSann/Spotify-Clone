<template>
    <li class="list" @mouseenter="animateIn" @mouseleave="animateOut" :style="{ color: `${text_color}` }">
        <font-awesome-icon class="icon" :icon="props.iconName" />
        <p class="text">{{ props.title ? props.title : '' }}</p>
    </li>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ref } from 'vue'
const props = defineProps(['title', 'iconName'])

let text_color = ref("#ced4da");

// Store the background code into a var
function animateIn() {
    text_color.value = "#f8f9fa"
}

function animateOut() {
    text_color.value = "#ced4da"
}
</script>

<style scoped>
.list {
    background-color: black;
    cursor: pointer;
    width: fit-content;
    display: flex;
    flex-direction: row;
    align-items: center;
    transition: 0.3s color ease-in-out;
}

.icon {
    color: white;
    margin: 1rem;
}

.text {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-family: 'Roboto', sans-serif;
    font-weight: 800;
    margin: 0.6rem;
}
</style>