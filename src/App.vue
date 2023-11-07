<script setup lang="ts">
import homePage from './pages/homePage.vue';
import SideBar from '@/views/SideBar.vue';
</script>

<template>
  <div id="main">
    <side-bar></side-bar>
    <home-page></home-page>
  </div>
</template>

<style scoped>
#main {
  @apply flex;
  @apply w-[100vw] max-h-screen;
  @apply overflow-x-hidden overflow-y-hidden;
}
</style>
