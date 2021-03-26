<template>
  <div style="height:100vh">
	<NavHeader :active="active"></NavHeader>
	<!-- 左侧文章内容 -->
	<div class="w1200 top24">
		<div class="navigation">
			<el-breadcrumb separator-class="el-icon-sugar">
			<el-breadcrumb-item :to="{ path: '/' }"><i class="iconfont icon-home"></i>首页</el-breadcrumb-item>
			<el-breadcrumb-item>关于我</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="w1200">
            <div class="cardcss">
               <h1 class="my_title">关于博主</h1>
			   <h2 class="my_tag_title">个人简介</h2>
			   <p>姓名：马鲁南</p>
			   <p>性别：男</p>
			   <p>生日：1996/05/22</p>
			   <p>工作：前端</p>
			   <p>家乡：山东济宁</p>
			   <p>地点：北京</p>
			   <p>最喜欢玩的游戏：绝地求生,LOL有空一起开黑~</p>
			   <p>联系方式：zmln1021@163.com</p>
			   <p>Github：<span class="text_blod">https://github.com/MaLunan</span></p>
			   <p>技能：node.js,javascript,vue,react,nuxt.js,vue-press,mongodb,小程序,uniapp,Jquery,typeScript</p>
			   <h2 class="my_tag_title">博客简介</h2>
			   <p>三部分：后端接口,博客系统,后台管理系统</p>
			   <p>后端接口：使用node.js+mongodb,jsonwebtoken生成token,mongoose操作mongodb,express中间件,multer文件上传,nodemailer邮件发送,apidoc生成接口文档</p>
			   <p>博客系统：nuxt.js框架搭建,element-ui表单表格样式,prismjs代码块生成,animate+wowjs显示隐藏动态效果,swiper轮播图</p>
			   <p>后台管理系统：以vue-element-admin为基础搭建,Tinymce富文本插件</p>
			   <p>部署到阿里云服务器</p>
			   <p>七牛云cnd加速进行图片存储</p>
			</div>
            <Exceptional/>
            <div class="comments">
                <Comment ID='mydata' title="关于我"></Comment>	
            </div>
		</div>
	</div>
	<Footer/>
</div>
</template>

<script>
export default {
	data() {
		return {
			active:'关于我',
			actives:''
		}
	},
	methods: {
	},
	head() {
		return {
			title:'关于我-马鲁南的IT技术博客',
			meta:[
				{hid:'description',name:'description',content:'马鲁南个人博客，是一个记录博主学习和成长的自媒体博客。关注于web前端技术和web全栈技术的学习研究。'},
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
.comments{
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
.my_title{
	font-size: 24px;
	text-align: center;
}
.my_tag_title{
	font-size: 18px;
	background: rgb(157 218 195 / 74%);
	padding: 6px;
	margin-top: 24px;
	position: relative;
}
.my_tag_title::after{
	content: '';
    width: 5px;
    height: 34px;
    display: block;
    position: absolute;
    top: 50%;
    left: -14px;
    transform: translateY(-50%);
    background: rgba(157, 218, 195, 0.74);
}
p{
	margin: 18px 0;
	>a{
		height: 18px;
	}
}
.text_blod{
	color:@hovercolor
}
</style>
