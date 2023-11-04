<template>
    <div class="w-[100vw] h-[100vh]">
        <h1> LoginPage</h1>
    </div>
</template>

<script setup lang="ts">
import { accessToken } from "@/store";
import { onMounted } from "vue";
onMounted(() => {
    const tokenStore = accessToken();
    tokenStore.redirectToSpotify();
})
</script>

<style></style>