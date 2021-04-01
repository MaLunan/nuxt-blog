<template>
  <div>
	<NavHeader :active="active"></NavHeader>
	<!-- 左侧文章内容 -->
	<div class="w1200 top24">
		<div class="navigation">
			<el-breadcrumb separator-class="el-icon-sugar">
			<el-breadcrumb-item :to="{ path: '/' }"><i class="iconfont icon-home"></i>首页</el-breadcrumb-item>
			<el-breadcrumb-item :to="{ path: '/laboratory' }">MaLunan实验室</el-breadcrumb-item>
			<el-breadcrumb-item>二维码生成器</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="w1200">
            <div class="cardcss">
                <Qrcodecom></Qrcodecom>
			</div>
            <Exceptional/>
            <div class="tools">
                <Comment ID='qrcode' title="二维码生成器"></Comment>	
            </div>
		</div>
	</div>
	 
</div>
</template>

<script>
if (process.browser) { // 在这里根据环境引入wow.js
	  var {WOW} = require('wowjs')     
  }
export default {
	data() {
		return {
			active:'二维码生成器',
			actives:'',
           
		}
	},
	methods: {
	
	},
	head() {
		return {
			title:'二维码生成器-马鲁南的IT技术博客',
			meta:[
				{hid:'description',name:'description',content:'二维码生成器-马鲁南的IT技术博客,免费软件下载,技术分享,安装教程'},
				{hid:'keywords',name:'keywords',content:'马鲁南,互联网,自媒体,马鲁南博客,新鲜科技,科技博客,独立博客,个人博客,原创博客,前端,前端开发,全栈,全栈开发,nuxt,nuxtjs,vue,vuejs,node.js'},
				{hid:'author',content:'malunan'}
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

<style lang="less" scoped>
.tools{
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 24px;
    padding: 24px;
    font-size: 16px;
}

// 通用卡片样式
.cardcss{
	border-radius: 24px;
    padding: 24px;
    font-size: 16px;
	margin-bottom: 20px;
	overflow: hidden;
	position: relative;
	background-color: @background;
}
</style>
<style lang="less" scoped>
@media screen and (max-width: 860px) {

}
@media screen and (max-width: 570px) {

}
</style>