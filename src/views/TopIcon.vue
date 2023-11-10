<template>
    <div class="top-bar">
        <router-link to="/">
            <div class="left-icon-div">
                <font-awesome-icon class="icon" icon="fa-solid fa-chevron-left" />
            </div>
        </router-link>
        <div class="right-icon-div">
            <font-awesome-icon class="icon" icon="fa-solid fa-chevron-right" />
        </div>
        <UserIcon @click="router.push(`/user/${userinfo.id}`)" :userinfo="props.userinfo"></UserIcon>
    </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useRouter } from 'vue-router';
import UserIcon from './UserIcon.vue';
const router = useRouter();
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