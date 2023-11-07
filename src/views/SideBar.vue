<template>
    <div class="sidebar">
        <!-- Cannot chage FontAwesome icon size and dont know why, leave it now -->
        <SideBarItem title="Home" iconName="fa-solid fa-door-open"></SideBarItem>
        <SideBarItem title="Search" iconName="fa-solid fa-magnifying-glass"></SideBarItem>
        <SideBarItem title="Your Library" iconName="fa-solid fa-record-vinyl"></SideBarItem>
        <SideBarItem></SideBarItem>
    </div>
</template>

<script setup lang="ts">
import SideBarItem from './SideBarItem.vue';
</script>
    
<style scoped>
.sidebar {
    background-color: black;
    @apply flex-grow-0 flex-shrink-0 basis-72;
    @apply mx-2 mt-2 rounded-md overflow-hidden;
}
</style>