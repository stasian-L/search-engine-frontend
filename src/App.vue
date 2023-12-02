<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class App extends Vue {}
</script>

<style>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html, body, body > #app {
    height: 100%;
}

#app {
    min-height: 100%;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;

    background: #eafaee;
}
</style>
