<template>
  <div>
	<NavHeader :active="active"></NavHeader>
	<!-- 左侧文章内容 -->
	<div class="w1200 top24">
		<div class="navigation">
			<el-breadcrumb separator-class="el-icon-sugar">
			<el-breadcrumb-item :to="{ path: '/' }"><i class="iconfont icon-home"></i>首页</el-breadcrumb-item>
			<el-breadcrumb-item :to="{ path: '/laboratory' }">MaLunan实验室</el-breadcrumb-item>
			<el-breadcrumb-item>文字头像生成</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="w1200">
            <div class="cardcss">
                <Textimgcom :name='name'></Textimgcom>
               输入：<el-input style="margin-top:24px;width:150px" :maxlength='1' v-model="name" placeholder="输入一个字"></el-input>
			</div>
            <Exceptional/>
            <div class="tools">
                <Comment ID='textimg' title="文字头像生成"></Comment>	
            </div>
		</div>
	</div>
	 
</div>
</template>

<script>
export default {
	data() {
		return {
			active:'文字头像生成',
			actives:'',
            name:'马',
		}
	},
	methods: {
	
	},
	head() {
		return {
			title:'文字头像生成-马鲁南的IT技术博客',
			meta:[
				{hid:'description',name:'description',content:'文字头像生成-马鲁南的IT技术博客,免费软件下载,技术分享,安装教程'},
				{hid:'keywords',name:'keywords',content:'马鲁南,互联网,自媒体,马鲁南博客,新鲜科技,科技博客,独立博客,个人博客,原创博客,前端,前端开发,全栈,全栈开发,nuxt,nuxtjs,vue,vuejs,node.js'},
				{hid:'author',content:'malunan'}
			]
		}
  },
  mounted() {
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
    text-align: center;
}
</style>
<style lang="less" scoped>
@media screen and (max-width: 860px) {

}
@media screen and (max-width: 570px) {

}
</style>