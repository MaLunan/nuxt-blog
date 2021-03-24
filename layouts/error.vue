<template>
  <div>
      <div class="error">
        <div v-if="error.statusCode == 404">
            <img src="http://cdn.zmln1021.cn/404.png" alt="">
            <nuxt-link :to="{name:'index'}" class="backIndex">哎呀出错了~返回首页</nuxt-link>
        </div>
        <div v-else>
            <img src="http://cdn.zmln1021.cn/500.png" alt="">
            <p><nuxt-link :to="{name:'index'}" class="backIndex">哎呀出错了~返回首页</nuxt-link></p>
        </div>
      </div>
  </div>
</template>

<script>
export default {
    props:['error'],
    head() {
        return {
            title:`哎呀出错了~`
        }
    }
}
</script>

<style lang="less" scoped>
.error{height:100vh;overflow-y:hidden;margin:0 auto;
text-align: center;
position: relative;
}
.backIndex{
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%,-50%);
  font-size: 48px;
}
</style>
