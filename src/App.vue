<script setup lang="ts">
import SideBar from './views/SideBar.vue';
import MainBoard from './views/MainBoard.vue';
import { ref, computed } from 'vue';


</script>

<template>
  <div id="main">
    <SideBar></SideBar>
    <MainBoard class="mainboard"></MainBoard>
  </div>
</template>

<style scoped>
#main {
  display: flex;
  flex-direction: row;
}
</style>
