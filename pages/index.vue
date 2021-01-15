<template>
<div style="height:1300px">
	<NavHeader :active="active"></NavHeader>
	<!-- 左侧文章内容 -->
	<el-row type="flex" justify="center" class="content-blog" style="height:100%">
    <div class="wow bounceInDown">hello</div>
  </el-row>
  <div>
    <div class="wow backInLeft">hello</div>
    <div class="wow slideInUp">hello</div>
    <div class="wow fadeInDownBig">hello</div>
    <div class="wow slideInUp">hello</div>
    <div class="wow slideInUp">hello</div>
    <div class="wow slideInUp">hello</div>
    <div class="wow slideInUp">hello</div>
    <div class="wow slideInUp">hello</div>
    <div class="wow slideInUp">hello</div>

    <div class="wow bounceInDown">hello</div>
    <div class="wow slideInUp">hello</div>
  </div>
	<Footer/>
</div>
</template>

<script>
if (process.browser) { // 在这里根据环境引入wow.js
      var {WOW} = require('wowjs')
  }
export default {
	data() {
		return {
			active:'index'
		}
	},
	async asyncData({app}) {
		// 服务器端渲染数据

	},
	methods: {
		pagination(page) {

		}
	},
	head() {
		return {
			title:'Brian的个人博客-一个基于Nuxt构建的博客网站',
			meta:[
				{hid:'description',name:'description',content:'李闯个人博客，是一个记录博主学习和成长的自媒体博客。关注于web前端技术和web全栈技术的学习研究。'},
				{hid:'keywords',name:'keywords',content:'李闯,互联网,自媒体,李闯博客,新鲜科技,科技博客,Brian,独立博客,个人博客,原创博客,brianlee,brian,前端,前端开发,全栈,全栈开发,nuxt,nuxtjs,vue,vuejs'},
				{hid:'author',content:'brian'}
			]
		}
  },
  mounted() {
     if (process.browser) {  // 在页面mounted生命周期里面 根据环境实例化WOW
         new WOW({
             live: false, 
             offset: 0
         }).init()
     } 
  }
}
</script>

<style lang="less">

</style>
