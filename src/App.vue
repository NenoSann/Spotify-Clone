<script setup lang="ts">
import homePage from './pages/homePage.vue';
import loginPage from './pages/loginPage.vue';
import { ref, computed, onBeforeMount } from 'vue';
import { accessToken } from './store';
</script>

<template>
  <div id="main">
    <router-view>
    </router-view>
  </div>
</template>

<style scoped>
#main {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
</style>
