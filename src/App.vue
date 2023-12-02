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
}
html, body, #app {
    height: 100%;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;

    background: linear-gradient(90deg, rgba(216,223,212,1) 0%, rgba(255,253,255,0.9920343137254902) 50%, rgba(216,223,212,1) 100%);
}
</style>
