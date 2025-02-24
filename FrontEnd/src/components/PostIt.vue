<script setup lang="ts">
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
            <span class="plus">+</span>
            <span class="close">×</span>
        </div>

        <div class="content">
            <img src="../assets/chat.png" alt="Card image" />
            <div class="text">
                <p class="title">{{ title }}</p>
                <p class="description">{{ description }}</p>
                <progress max="100" :value="value"></progress>
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
    }

    .title {
        font-size: 16px;
        font-weight: bold;
        margin: 0;
    }

    .description {
        font-size: 14px;
        color: gray;
        margin: 5px 0;
    }

    progress {
        width: 100%;
        margin-top: 10px;
    }
</style>
