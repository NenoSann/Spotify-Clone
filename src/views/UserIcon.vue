<template>
    <div class="user-icon">
        <img class="user-image" :src="props.userinfo.imageURL.value" decoding="async">
        <span class="user-name">{{ props.userinfo.username.value }}</span>
        <font-awesome-icon class="icon-image" icon="fa-solid fa-sort-down" />
    </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
const props = defineProps(['userinfo']);

</script>

<style scoped lang="scss">
$base-background-color: #000;
$hover-background-color: rgb(47, 44, 44);

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

    // hover animation
    transition-property: background-color border;
    transition-duration: 200ms;
    transition-timing-function: ease;
}

.user-icon:hover {
    cursor: pointer;
    background-color: $hover-background-color;
    border-color: $hover-background-color;
}

.user-image {
    border-radius: 50%;
    width: 2rem;
}

.icon-image {
    background-color: inherit;
    padding-right: 0.6rem;
    color: white;
    margin-top: -6px;
    // There seem's to be a problem where icon is not suit the box model, and don't konw why
}

.user-name {
    background-color: inherit;
    margin-left: 1rem;
    margin-right: 1rem;
    color: white;
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
}
</style>