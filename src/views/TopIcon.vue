<template>
    <div class="top-bar">
        <div class="left-icon-div">
            <font-awesome-icon class="icon" icon="fa-solid fa-chevron-left" />
        </div>
        <div class="right-icon-div">
            <font-awesome-icon class="icon" icon="fa-solid fa-chevron-right" />
        </div>
        <UserIcon :userinfo="props.userinfo"></UserIcon>
    </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import UserIcon from './UserIcon.vue';
const props = defineProps(['userinfo'])

</script>

<style scoped lang="scss">
/* Why this component's parent is not MainBoard? */

@mixin icon-div {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    background-color: black;
    border-radius: 50%;
    transform: translateY(-50%);
    cursor: pointer;
}

.top-bar {
    position: relative;
    display: block;
    height: 5rem;
    width: 100%;
    background-color: transparent;
}

.left-icon-div {
    @include icon-div;
    top: 1.6rem;
    left: 2rem;
}

.right-icon-div {
    @include icon-div;
    top: 1.6rem;
    left: 6rem;
}

.icon {
    margin: 0.6rem 0.8rem 0.6rem 0.8rem;
    color: aliceblue;
}
</style>