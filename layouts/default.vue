<template>
  <div class="default">
    <canvas id="background"></canvas>
    <div v-if="$nuxt.isOffline">没有网络链接</div>
    <Nuxt />
    <Footer/>
    <Backtotop :custom-style="myBackToTopStyle" :visibility-height="300" :back-position="50" transition-name="fade" />
  </div>
</template>
<script>
export default{
  data(){
    return{
      myBackToTopStyle: {
        right: '50px',
        bottom: '50px',
        width: '40px',
        height: '40px',
        'border-radius': '4px',
        'line-height': '45px', // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
        background: '#e7eaf1'// 按钮的背景颜色 The background color of the button
      }
    }
  },
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
.default{
  position: relative;
  overflow: hidden;
  padding-bottom: 80px;
  min-height: calc(100vh - 80px);
}
</style>
<style lang="less" scoped>
@media screen and (max-width: 860px) {
	.default {
			padding-bottom: 60px;
       min-height: calc(100vh - 60px);
	}
}
@media screen and (max-width: 570px) {

}
</style>