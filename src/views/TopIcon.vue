<template>
    <div class="left-icon-div">
        <font-awesome-icon class="icon" icon="fa-solid fa-chevron-left" />
    </div>
    <div class="right-icon-div">
        <font-awesome-icon class="icon" icon="fa-solid fa-chevron-right" />
    </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

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

}

.left-icon-div {
    @include icon-div;
    top: 0.6rem;
    left: 2rem;
}

.right-icon-div {
    @include icon-div;
    top: 0.6rem;
    left: 6rem;
}

.icon {
    margin: 0.6rem 0.8rem 0.6rem 0.8rem;
    color: aliceblue;
}
</style>