<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
</script>

<template>
  <div id="app">
    <loading v-if="false" />
    <home v-else />
    <!-- <router-view :list="imgList" v-else /> -->
    <!--<router-view :list="imgList"></router-view>-->
  </div>
</template>

<style>
body {
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
