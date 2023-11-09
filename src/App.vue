<script setup lang="ts">
import homePage from './pages/homePage.vue';
import SideBar from '@/views/SideBar.vue';
import SpotifyiFramse from './views/component/SpotifyiFramse.vue';
</script>

<template>
  <div id="main">
    <div class="content">
      <side-bar></side-bar>
      <home-page></home-page>
    </div>
    <keep-alive>
      <spotifyi-framse></spotifyi-framse>
    </keep-alive>
  </div>
</template>

<style scoped>
#main {
  @apply flex flex-col;
  @apply w-[100vw] max-h-screen h-screen;
  @apply overflow-x-hidden overflow-y-hidden;
}

/* the spotify iFrame is 152px, with 1rem margin */
.content {
  @apply h-[calc(100vh-152px-1rem)];
  @apply flex flex-row;
}
</style>
