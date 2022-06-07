<template>
  <div class="container">
    <div class="loading-wrap">
      <div class="bar" v-for="(item,idx) in 8" :key="idx" :style="{'animation-delay':`0.${idx}s`}"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "loading",
  data() {
    return {};
  }
};
</script>

<style scoped>
.container {
  height: 100vh;
  width: 100%;
  background-color: #000000;
  position: relative;
}

.container .loading-wrap {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 20%;
  height: 20%;
  display: flex;
  justify-content: space-between;
}

.bar {
  height: 140px;
  width: 8%;
  background: #fff;
  transform-origin: bottom center;
  animation: loading 1.5s ease-in-out infinite;
}

@keyframes loading {
  0% {
    transform: scaleY(0.1);
    background: #fff;
  }
  50% {
    transform: scaleY(1);
    background: #caabbf;
  }
  100% {
    transform: scaleY(0.1);
    background: transparent;
  }
}
</style>
