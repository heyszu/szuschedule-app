<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="less">
* {
    padding: 0;
    margin: 0;
    border: 0;
    outline: 0;
    box-sizing: border-box;
}

body,
html {
    width: 100%;
    height: 100%;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    color: #222;
    font-size: 10px;
    line-height: 1.4;
    padding: 0;
    display: flex;
    background: #FFF;
    flex-direction: column;
    background: #F0F0F0;
}

#app {
    width: 100%;
    height: 100%;
}
</style>
