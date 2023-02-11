<template>
    <p class="greeting">{{ greeting }}</p>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
defineProps(['user-name'])

let greeting: string = getGreeting();

// Get the greeting depend on the time
function getGreeting(): string {
    let hours = new Date().getHours();
    let greet: string = '';
    if (hours < 12)
        greet = 'Good morning';
    else if (hours >= 12 && hours <= 17)
        greet = 'Good afternoon';
    else if (hours >= 17 && hours <= 24)
        greet = 'Good evening';
    return (greet);
}

</script>

<style scoped lang="scss">
.greeting {
    white-space: nowrap;
    background-color: transparent;
    color: white;
    margin-left: 2rem;
    font-size: 2.6rem;
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
}
</style>