<template>
  <div>
    <canvas id="background"></canvas>
    <div v-if="$nuxt.isOffline">没有网络链接</div>
    <Nuxt />
  </div>
</template>
<script>
export default{
  mounted () {
    if (process.browser) { // bacnground.js
        var bg = require('../utils/background')      
        var ck = require('../utils/clickRandom')      
        var copy = require('../utils/copy')      
    }
  }
}

</script>
<style>
#background{
  background-color: black;
  height: 100vh;
  width: 100vw;
}
</style>
