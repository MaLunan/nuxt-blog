<template>
  <div>
	<NavHeader :active="active"></NavHeader>
	<!-- 左侧文章内容 -->
	<div class="w1200 top24">
		<div class="navigation">
			<el-breadcrumb separator-class="el-icon-sugar">
			<el-breadcrumb-item :to="{ path: '/' }"><i class="iconfont icon-home"></i>首页</el-breadcrumb-item>
			<el-breadcrumb-item :to="{ path: '/tools' }">软件教程分享</el-breadcrumb-item>
			<el-breadcrumb-item>{{gationName}}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="w1200">
            <div v-if="!ToolsList.length" class="noData">
				<div class="titletag">
					空
				</div>
				当前板块暂无数据,等待更新吧~<i class="iconfont icon-Inbox"></i>
			</div>
            <div class="cardcss" v-else>
                <ul class="list_box">
                    <li class="list_li wow fadeIn" data-wow-duration='2s' v-for="(item,index) in ToolsList" :key="index">
                        <h2>{{item.name}}</h2>
                        <span>简介：{{item.description}}</span>
                        <hr/>
                        <p>百度云盘路径：<span class="textStyle">{{item.Bpath}}</span></p>
                        <p>百度云盘解压：<span class="textStyle">{{item.Bcode}}</span></p>
                    </li>
                </ul>
			</div>
            <Exceptional/>
            <div class="tools">
                <Comment :ID="'tools'+toolsID" :title="gationName"></Comment>	
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
			active:'软件教程分享',
			actives:'',
		}
	},
	async asyncData({app,error,params,query}) {
		//公共方法
		const awaitWrap = (promise) => {
		return promise
		.then(data => [null, data])
		.catch(err => [err, null])
		}
		let Tools=await awaitWrap(app.$axios({
				method:'get',
				url:'/blog/wpPosts/getIdwptool',
				params:{
                    _id:params.id,
				}
			}))
            console.log(Tools)
		if(Tools[0]){
			error({ statusCode: 500, message: Tools[0] })
		}else{
			return {
				ToolsList:Tools[1].data.data.datas,
                gationName:query.name,
                toolsID:params.id
			}
		}
		
	},
	methods: {
	},
	head() {
		return {
			title:this.gationName+'-软件教程分享-马鲁南的IT技术博客',
			meta:[
				{hid:'description',name:'description',content:this.gationName+'软件教程分享-马鲁南的IT技术博客,免费软件下载,技术分享,安装教程'},
				{hid:'keywords',name:'keywords',content:this.gationName+'马鲁南,互联网,自媒体,马鲁南博客,新鲜科技,科技博客,独立博客,个人博客,原创博客,前端,前端开发,全栈,全栈开发,nuxt,nuxtjs,vue,vuejs,node.js'},
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
//暂无数据
.noData{
	line-height: 214px;
	text-align: center;
	font-size: 18px;
    height: 214px;
	border-radius: 18px;
	margin-bottom: 20px;
	overflow: hidden;
	position: relative;
	background-color: @background;
}
.list_li{
    padding: 24px;
    box-shadow: 6px 6px 3px -3px #5f5f5f6b
}
.textStyle{
    color: @hovercolor;
}
//数据展现
</style>
<style lang="less" scoped>
@media screen and (max-width: 860px) {
	.list_li{
		h2{
			font-size: 18px;
		}
		span{
			font-size: 14px;
		}
		p{
			font-size: 14px;
		}
	}
}
@media screen and (max-width: 570px) {

}
</style>