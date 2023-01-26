<template>
    <div id="main">
        <TopIcon></TopIcon>
        <UserIcon user-name="NenoSan" user-image="src/assets/image/userImage.png"></UserIcon>
    </div>
</template>

<script setup lang="ts">
import SideBar from './SideBar.vue';
import TopIcon from './TopIcon.vue';
import UserIcon from './UserIcon.vue';
</script>

<style scoped>
#main {
    position: relative;
    background-color: aquamarine;
    width: 100%;
}
</style>