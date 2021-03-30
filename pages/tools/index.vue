<template>
  <div style="height:100vh">
	<NavHeader :active="active"></NavHeader>
	<!-- 左侧文章内容 -->
	<div class="w1200 top24">
		<div class="navigation">
			<el-breadcrumb separator-class="el-icon-sugar">
			<el-breadcrumb-item :to="{ path: '/' }"><i class="iconfont icon-home"></i>首页</el-breadcrumb-item>
			<el-breadcrumb-item>软件教程分享</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="w1200">
            <div class="cardcss">
				<div class="tools_box" v-for="(item,index) in ToolsTaxonomy"  :key="index">
					<h1 class="tools_title">{{item.title}}</h1>
					<ul class="tools_ul clearfix wow fadeIn" data-wow-duration='2s'>
						<li class="tools_li"  v-for="(tem,ind) in item.toolsTitle" :key='ind'>
							<nuxt-link :to="'/tools/'+tem._id+'?name='+tem.name">
								<h3 class="textone">{{tem.name}}</h3>
								<div class="textTow text_style">
									{{tem.description}}
								</div>
							</nuxt-link>
						</li>
					</ul>
				</div>
			</div>
            <Exceptional/>
            <div class="tools">
                <Comment ID='tools' title="软件教程分享"></Comment>	
            </div>
		</div>
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
			active:'软件教程分享',
			actives:'',
		}
	},
	async asyncData({app,error,params}) {
		//公共方法
		const awaitWrap = (promise) => {
		return promise
		.then(data => [null, data])
		.catch(err => [err, null])
		}
		let ToolsTaxonomys=await awaitWrap(app.$axios.get('/blog/wpPosts/getAllToolsTaxonomy'))
		if(ToolsTaxonomys[0]){
			error({ statusCode: 500, message: ToolsTaxonomys[0] })
		}else{
			return {
				ToolsTaxonomy:ToolsTaxonomys[1].data.data.datas,
			}
		}
		
	},
	methods: {
	
	},
	head() {
		return {
			title:'软件教程分享-马鲁南的IT技术博客',
			meta:[
				{hid:'description',name:'description',content:'软件教程分享-马鲁南的IT技术博客,免费软件下载,技术分享,安装教程'},
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
.tools_box{
	
}
.tools_title{
	position: relative;
}
.tools_title::after{
	content: "";
	background-color: #666666;
	left: -12px;
	top: 50%;
	width: 6px;
	height: 42px;
	position: absolute;
	transform: translateY(-50%);
}
.tools_ul{
	// padding: 24px;
}
.tools_li{
	height: 52px;
	background: rgba(240, 241, 241, 0.952);
	width: 152px;
	float: left;
	cursor: pointer;
	margin:24px 36px;
	text-align: center;
	padding: 24px;
	border-radius: 24px;
	box-shadow: 6px 6px 1px #92c5c3;
	transition : all 0.5s ease;
}
.tools_li:hover{
	font-size: 18px;
	box-shadow: 8px 8px 5px #92c5c3;
}
.text_style{
	font-size: 14px;
	line-height: 20px;
	margin-top:5px ;	
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
	.tools_title{
		font-size: 18px;
	}
	.tools_title::after{
		height: 18px;
	}
	.tools_li{
		padding:12px 12px 24px;
		margin: 12px;
		width:100px;
		h3{
			font-size: 14px;
		}
		.textTow{
			font-size: 12px;
		}
	}
}
@media screen and (max-width: 570px) {

}
</style>