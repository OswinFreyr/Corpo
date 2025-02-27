<script setup lang="ts">
import { ref, onMounted, onUnmounted,computed } from 'vue';
import ProgressBar from "./ProgressBar.vue";
    const props = defineProps<{
        title: string;
        description: string;
        image: string;
        value: number;
    }>();


</script>

<template>
    <div class="postit">

        <div class="header">
            <span class="plus"></span>
            <span class="close">×</span>
        </div>

        <div class="content">
            <img :src="image" alt="Card image" />

            <div class="text">

                <p class="title">{{ title }}</p>
                <p class="description">{{ description }}</p>
                <ProgressBar
                    :value="value"
                ></ProgressBar>
            </div>
        </div>

    </div>
</template>

<style scoped>
    .postit {
        background-color: #f9f2b8; 
        /* background-size: 20px 20px; */
        display: flex;
        flex-direction: column;
        position: relative;
        padding: 10px;
        box-shadow: 1px 2.5px 1px #c7c292;
    }

    .header {
        position: absolute;
        top: 10px;
        left: 10px;
        right: 10px;
        width: calc(100% - 20px);
        display: flex;
        justify-content: space-between;
    }

    .plus, .close {
        font-size: 20px;
        color: black;
    }

    .content {
        display: flex;
    }

    .content img {
        width: 100px;
        height: 100px;
        object-fit: cover;
        margin-right: 10px;
    }

    .text {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .title {
        font-size: 16px;
        font-weight: bold;
        margin: 0;
    }

    .description {
        font-size: 14px;
        color: rgb(22, 22, 22);
        margin: 5px 0;
    }

</style>
