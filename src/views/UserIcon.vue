<template>
    <div class="user-icon">
        <img class="user-image" :src="userImage" decoding="async">
        <span class="user-name">{{ userName }}</span>
        <font-awesome-icon class="icon" icon="fa-solid fa-sort-down" />
    </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ref } from "vue"
const props = defineProps({
    userName: String,
    userImage: String,
});

const background_color = ref("#000");
</script>

<style scoped lang="scss">
$base-background-color: #000;
$hover-background-color: #000;

.user-icon {
    overflow: hidden;
    border: 2px solid $base-background-color;
    border-radius: 50px;

    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $base-background-color;
    position: absolute;
    top: 1.6rem;
    right: 2rem;
    transform: translateY(-50%);
}

.user-image {
    border-radius: 50%;
    width: 2rem;
}

.icon {
    padding-right: 0.6rem;
    color: white;
    margin-top: -6px;
    // There seem's to be a problem where icon is not suit the box model, and don't konw why
}

.user-name {
    margin-left: 1rem;
    margin-right: 1rem;
    color: white;
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
}
</style>