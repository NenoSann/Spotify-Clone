<template>
    <div class="main">
        <div class="icondiv">
            <font-awesome-icon class="icon" icon="fa-solid fa-arrow-left" />
        </div>
        <div class="icondiv">
            <font-awesome-icon class="icon" icon="fa-solid fa-arrow-right" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

</script>

<style scoped>
/* Why this component's parent is not MainBoard? */
.main {
    overflow: hidden;
    background-color: transparent;
    display: flex;
    position: absolute;
    top: 1.25rem;
    left: 2rem;
}

.icondiv {
    border-radius: 50%;
}

.icon {
    margin: 0.8rem;
    color: aliceblue;
}
</style>