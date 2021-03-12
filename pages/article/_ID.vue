<template>
  <div style="height:100vh">
	<NavHeader :active="active"></NavHeader>
	<!-- 左侧文章内容 -->
	<div class="w1200 top24">
		<div class="leftW">

		</div>
		<div class="rightW rightbox">
			<!-- 个人资料卡 -->
			<div class="dataCard">
				<div class="widet_user">	
					<img class="imgbox rotate"  :src="wpUser.avatar" alt="头像">	
					<span class="user">{{wpUser.name}} <img class="vbox" src="../../assets/img/V.png" alt="head"> </span>
					<p class="textTow synopsis">{{wpUser.introduction}}</p>
					<div class="site_state">
						<nuxt-link to="" class="site_state_item item_border">
							<p class="number">{{wpUser.post}}</p>
							<p>文章</p>
						</nuxt-link>
						<nuxt-link to="" class="site_state_item item_border">
							<p class="number">{{wpUser.comments}}</p>
							<p>评论</p>
						</nuxt-link>
						<nuxt-link to="" class="site_state_item">
							<p class="number">{{wpUser.pv}}</p>
							<p>浏览</p>
						</nuxt-link>
					</div>
					<div class="aBox">
						<a  href='' target="_blank" class="iconfont icon-Octicons-mark-github tabAherf">
							Github
						</a >
						<a  href='' target="_blank" class="iconfont icon-weibo tabAherf">
							微博
						</a >
						<a  href='' target="_blank" class="iconfont icon-toutiao tabAherf">
							头条
						</a >
						<a  href='' target="_blank" class="iconfont icon-BILIBILI_LOGO tabAherf">
							B站
						</a >
						<a  href='' target="_blank" class="iconfont icon-kuaishou1 tabAherf">
							快手
						</a >
						<a  href='' target="_blank" class="iconfont icon-external_tiktok tabAherf">
							抖音
						</a >
					</div>
				</div>	
			</div>
			<!-- 标签云 -->
			<div class="personalData">
				<TagsCloud :useArray="useArray" :boxWidth="300" :speed="400" :randomColor="true"></TagsCloud>
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
			active:'index',
			// 标签云
			useArray: [  
				{  
					"name":"javascript",
					"url":"Enoch_Eastwood8658@twipet.com"
				},
				{  
					"name":"node.js",
					"url":"Doris_Wade7948@bulaffy.com"
				},
				{  
					"name":"前端基础知识",
					"url":"Ilona_Vallory9282@corti.com"
				},
				{  
					"name":"高级进阶",
					"url":"Jenna_Kennedy5321@bretoux.com"
				},
			],
			isRotate:false,
			rotateVal:1,
			InterVal:null,
		}
	},
	async asyncData({app,error}) {
		//公共方法
		const awaitWrap = (promise) => {
		return promise
		.then(data => [null, data])
		.catch(err => [err, null])
		}
		// 服务器端渲染数据
		let WpPosts =await awaitWrap(app.$axios.get('/blog/wpPosts/getWpPosts'))
		let WpPostsData =await awaitWrap(app.$axios({
				method:'get',
				url:'/blog/wpPosts/getWpPosts',
				params:{
					sort:'post_date'
				}
			}))
		let wpSwiper= await awaitWrap(app.$axios.get('/blog/wpPosts/getWpSwiper'))
		let wpTaxonomy=await awaitWrap(app.$axios.get('/blog/wpPosts/getTaxonomy'))
		let wpUser=await awaitWrap(app.$axios.get('/blog/wpPosts/getUser'))
		if(WpPosts[0]||wpSwiper[0]||wpTaxonomy[0]||wpUser[0]){
			error({ statusCode: 500, message: 'Post not found' })
		}else{
			return {
				WpPosts:WpPosts[1].data.data.datas,
				wpSwiper:wpSwiper[1].data.data.datas,
				wpTaxonomy:wpTaxonomy[1].data.data.datas,
				wpUser:wpUser[1].data.data.datas,
				WpPostsData:WpPostsData[1].data.data.datas,
				page:{
					total:WpPostsData[1].data.data.Count,
					current:WpPostsData[1].data.data.page,
					size:WpPostsData[1].data.data.size,
				}
			}
		}
		
	},
	methods: {
        //
		//分类转换
		types(t){
			let typeList=[]
			this.wpTaxonomy.forEach(item=>{
				t.forEach(ite=>{
					if(item.ID===ite){
					typeList.push(item.taxonomy_nanme)
					}
				})
			})
			return typeList.join('/')
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
// 右侧样式
.rightbox{
	position: relative;
    overflow: visible;
    box-sizing: border-box;
	min-height: 0px;
	padding-left: 20px;
	padding-right: 15px;
}
// 列表样式
.todo-list{
	padding:18px 24px;
	overflow: hidden;
	>li{
		margin-bottom: 12px;
		overflow: hidden;
		color: @Stextcolor;
		>a{
			color: black;
			font-size: 18px;
			margin-left: 30px;
			margin-right: 60px;
		}
		>a:hover{
			color: @hovercolor;
		}
	}
	>li:nth-of-type(1) > span:first-of-type{
		background:rgb(240, 17, 32) !important;
	}
	>li:nth-of-type(2) > span:first-of-type{
		background:#ff7a21 !important;
	}
	>li:nth-of-type(3) > span:first-of-type{
		background:#1681E7 !important;
	}
	>li:nth-of-type(4) > span:first-of-type{
		background:#37b760 !important;
	}
	>li:nth-of-type(5) > span:first-of-type{
		background:rgb(29, 235, 235) !important;
	}
	>li:nth-of-type(6) > span:first-of-type{
		background:rgb(138, 255, 5) !important;
	}
}
// 时间样式
.date{
	float: right;
    color: #999;
    position: relative;
    top: 2px;
	margin-left: 8px;
	font-size: 16px;
}
// 标签云样式
.personalData{
	height: 300px;
	overflow: hidden;
	background-color: @background;
	margin-top: 12px;
	border-radius: 15px;
}
//资料卡样式
.dataCard{
	height: 480px;
	overflow: hidden;
	background-color: @background;
	border-radius: 15px;
	.widet_user{
		height: 480px;
		display: flex;
		// justify-content: center;
		align-items: center;
		flex-direction: column;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		.imgbox{
			border-radius: 50%;
			height: 100px;
			width: 100px;
			margin-top: 50px;
		}
		.rotate{
			transition: all 0.1s linear;
		}
		.rotate:hover{
			 transform: rotate(666turn);
				transition-delay: 1s;
				transition-property: all;
				transition-duration: 59s;
				transition-timing-function: cubic-bezier(.34,0,.84,1);
		}
		.user{
			font-size: 18px;
			font-weight: bold;
		}
		.vbox{
			width: 60px;
		}
		.synopsis{
			font-size: 14px;
			padding: 8px 15px 0;
			min-height: 46px;
		}
		.site_state{
			.site_state_item{
				float: left;
				font-size: 18px;
				padding: 15px;
				text-align: center;
				.number{
					font-weight: bold;
				}
			}
			.item_border{
				border-right: 1px solid rgba(0, 0, 0, 0.1);
			}
		}
		.aBox{
			width: 100%;
			.tabAherf{
				width: 49%;
				display: inline-block;
				text-align: center;
				margin: 10px 0;
			}
			.iconfont{
				font-size: 18px;
			}
		}	
	}
}
</style>
