<template>
  <div style="height:100vh">
	<NavHeader :active="active"></NavHeader>
	<!-- 左侧文章内容 -->
	<div class="w1200 top24">
		<div class="leftW">
			<!-- 首页轮播图 -->
			<el-carousel trigger="click" :interval='10000' class="swiper">
				<el-carousel-item v-for="(item,index) in wpSwiper" :key="index" v-if="item.state">
					<img :src="item.img" :alt="item.title">
					<!-- swiper title -->
					<span @click="open(item.href)" class="swiper-title textone">
						{{item.title}}
					</span>
				</el-carousel-item>
			</el-carousel>
			<!-- 首页热评文章 -->
			<div class="cardcss top-list">
				<div class="titletag">
					热门
				</div>
				<ul class="todo-list">
					<li v-for="(item,index) in WpPosts" :key="index" class="clearfix" v-if="index<6">
						<span class="sequence">{{index+1}}</span>
						<span class="date">
							{{item.post_date}}
						</span>
						<nuxt-link :to="`/article/${item.ID}`" class="textone">
							{{item.post_title}}
						</nuxt-link>
					</li>
				</ul>
			</div>
			<!-- 广告位 -->
			<div class="cardcss advertising todo-list">
				<ul class="center clearfix">
					<li v-for="i in 10" :key="i">
						<img :src="img.img1" alt="">
						<h1>1天气真好</h1>
					</li>
				</ul>
			</div>	
			<!-- 文章列表 -->
			<div class="cardcss article-box clearfix wow fadeIn" data-wow-duration='2s' v-for="(item,index) in WpPostsData" :key="index">
				<!-- 右侧 -->
				<div :class="['article-right',index%2?'article-right-isno':'']">
					<img :src="item.post_img" :alt="item.post_title" :title="item.post_title">
				</div>
				<!-- 左侧 -->
				<div :class="['article-left',index%2?'article-left-isno':'']">
					<!-- 标题 -->
					<h1 class="textone">
						<nuxt-link :to="`/article/${item.ID}`">{{item.post_title}}</nuxt-link>
					</h1>
					<!-- 内容简写 -->
					<p class="textthree">
						{{textData(item.post_content)}}
					</p>
				</div>
				<!-- 标签栏 -->
					<div class="particulars">
						<span class="iconfont icon-User">{{item.post_author}}</span>
						<span class="separator">/</span>
						<nuxt-link to='' class="iconfont icon-Tags">
							{{types(item.type)}}
						</nuxt-link>
						<span class="separator">/</span>
						<span to='' class="iconfont icon-clock-circle">
							{{item.post_date}}
						</span>
						<span class="separator">/</span>
						<nuxt-link to='' class="iconfont icon-eye">
							{{item.browse}}
						</nuxt-link>
						<span class="separator">/</span>
						<nuxt-link to='' class="iconfont icon-Edit">
							{{item.commentCount}}
						</nuxt-link>
					</div>
			</div>	
			<pagination 
				:total='page.total' 
				:page='page.current' 
				:limit='page.size'
				@update:limit='updatelimit' 
				@update:page='updatepage'
				@pagination='pagination'>
			</pagination>
		</div>
		<div class="rightW rightbox">
			<!-- 个人资料卡 -->
			<div class="dataCard">
				<div class="widet_user">	
					<img class="imgbox rotate"  :src="wpUser.avatar" alt="头像">	
					<span class="user">{{wpUser.name}} <img class="vbox" src="../assets/img/V.png" alt="head"> </span>
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
						<span @click="open()" class="iconfont icon-Octicons-mark-github tabAherf">
							Github
						</span >
						<span @click="open()" class="iconfont icon-weibo tabAherf">
							微博
						</span >
						<span @click="open()" class="iconfont icon-toutiao tabAherf">
							头条
						</span >
						<span @click="open()" class="iconfont icon-BILIBILI_LOGO tabAherf">
							B站
						</span >
						<span @click="open()" class="iconfont icon-kuaishou1 tabAherf">
							快手
						</span >
						<span @click="open()" class="iconfont icon-external_tiktok tabAherf">
							抖音
						</span >
					</div>
				</div>	
			</div>
			<!-- 标签云 -->
			<div class="personalData">
				<TagsCloud :useArray="wpTaxonomy" :boxWidth="300" :speed="400" :randomColor="true"></TagsCloud>
			</div>
			<!-- 最新留言 -->
			<div class="divPrevious">
				<h3 class="widget_title">最新留言</h3>
				<ul class="comment_ul">
					<li class="comment_li textone" v-for="(item,index) in wpComments" :key='index'>
						<nuxt-link :to='item.comment_ID'><span class="comment_name">malunan : </span><span>{{item.comment_content}}</span></nuxt-link>
					</li>
				</ul>
			</div>
			<!-- 友情链接 -->
			<div class="divPrevious">
				<h3 class="widget_title">友情链接</h3>
				<h3>虚伪以待</h3>
				<!-- <ul>
					<li>
						
					</li>
				</ul> -->
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
			img:{
				img1:require("../assets/img/img1.jpg"),
			},
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
		let wpComments=await awaitWrap(app.$axios.post('/blog/wpPosts/getAllComments'))
		if(WpPosts[0]||wpSwiper[0]||wpTaxonomy[0]||wpUser[0]||wpComments[0]){
			error({ statusCode: 500, message: WpPosts[0]||wpSwiper[0]||wpTaxonomy[0]||wpUser[0]||wpComments[0] })
		}else{
			return {
				WpPosts:WpPosts[1].data.data.datas,
				wpSwiper:wpSwiper[1].data.data.datas,
				wpTaxonomy:wpTaxonomy[1].data.data.datas,
				wpUser:wpUser[1].data.data.datas,
				WpPostsData:WpPostsData[1].data.data.datas,
				wpComments:wpComments[1].data.data.data,
				page:{
					total:WpPostsData[1].data.data.Count,
					current:WpPostsData[1].data.data.page,
					size:WpPostsData[1].data.data.size,
				}
			}
		}
		
	},
	methods: {
		//外部链接跳转
		open(url){
			console.log(url)
			window.open(url)
		},
		//请求数据
		async getWpPosts(){
			let WpPostsData =await this.$axios({
				method:'get',
				url:'/blog/wpPosts/getWpPosts',
				params:{
					page:this.page.current,
					size:this.page.size,
					sort:'post_date'
				}
			})
			return {WpPostsData:WpPostsData.data.data.datas,
					page:{
							total:WpPostsData.data.data.Count,
							current:WpPostsData.data.data.page,
							size:WpPostsData.data.data.size,
						}
				}
		},
		// 富文本数据处理
		textData(content){
            var msg = content.replace(/<(p|div)[^>]*>(<br\/?>|&nbsp;)<\/\1>/gi, '\n').replace(/<br\/?>/gi, '\n').replace(/<[^>/]+>/g, '').replace(/(\n)?<\/([^>]+)>/g, '').replace(/\u00a0/g, ' ').replace(/&nbsp;/g, ' ').replace(/<\/?(img)[^>]*>/gi, '').replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&#39;/g,"\'").replace(/&quot;/g,"\"").replace(/<\/?.+?>/g,"")
            var x =msg.slice(0,280)
			return x
        },
		//分页
		pagination(val){
        this.page.current=val.page
        this.page.size=val.limit
		this.getWpPosts()
		},
		//更新条数时调用
        updatelimit(val){
        },
        //更新页数时调用
        updatepage(val){
        },
		//分类转换
		types(t){
			let typeList=[]
			this.wpTaxonomy.forEach(item=>{
				t.forEach(ite=>{
					if(item.ID===ite){
					typeList.push(item.taxonomy_name)
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

<style lang="less" scoped>
//swiper 高度自适应
.swiper{
	max-height: 400px;
	height: 33vw;
	margin-bottom: 20px;
}
// swiper 自定义swipertitle
.swiper-title{
	background: rgba(0,0,0,0.3);
	position: absolute;
	box-sizing: border-box;
	width: 100%;
	bottom: 0;
	color: @textcolor;
	font-size: 18px;
	left: 0;
	height: 40px;
	text-align: left;
	padding-left: 50px;
	padding-right: 150px;
	line-height: 40px;
	max-height: none;
	cursor: pointer;
}
.swiper-title:hover{
	color: @hovercolor;
}
// swiper切换按钮变圆
/deep/ .el-carousel__button{
	width: 12px;
	height: 12px;
	border-radius: 50%;
}
// swiper切换按钮位置
/deep/ .el-carousel__indicators{
	position: absolute;
	right: 20px;
	width: auto;
	
}
/deep/ .el-carousel__indicators--horizontal{
	left:auto;
}
// swiper圆角
/deep/ .el-carousel--horizontal{
	border-radius: 40px;
}
//swiper内容高度自适应
/deep/ .el-carousel__container{
	height: 100%;
}
// 通用卡片样式
.cardcss{
	height: 214px;
	border-radius: 18px;
	margin-bottom: 20px;
	overflow: hidden;
	position: relative;
	background-color: @background;
}
//热评文章
.top-list{
	height: 250px;
}
// 文章列表
.article-box{
	height: 214px;
	padding: 18px 24px;
	position: relative;
	>.article-left{
		height: calc(100% - 24px);
		margin-right:224px;
		// background:white;
		// border-radius: 15px;
		box-sizing: border-box;
		>p{
			font-size: 18px;
			margin: 24px 0 29px;
		}
		h1>a{
			color:@Stextcolor;
		}
		h1>a:hover{
			color: @hovercolor;
			cursor: pointer;
			transition: all 1s initial;
		}
	}
	.particulars{
			position: absolute;
			bottom: 0;
			left: 24px;
			height: 24px;
			.iconfont{
				font-size: 12px!important;
			}
		}
	>.article-left-isno{
		margin-left: 224px;
		margin-right: 0;
	}
	>.article-right{
		float:right;
		width:200px;
		height:200px;
		background:#afa;
		overflow: hidden;
		border-radius: 15px;
	}
	>.article-right-isno{
		float: left;
	}
	&:hover img{
		width: 120%;
		height: 120%;
		margin-left: -10%;
		margin-top: -10%;
		transition: all 1s ease;
	}
}
// 右侧样式
.rightbox{
	position: relative;
    overflow: visible;
    box-sizing: border-box;
	min-height: 0px;
	padding-left: 20px;
}
// 列表样式
.todo-list{
	padding:18px 24px;
	overflow: hidden;
	height: 250px;
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
//右侧卡片通用样式
.divPrevious{
	background-color: @background;
	margin-top: 12px;
	border-radius: 15px;
	padding: 10px 20px;
	.widget_title{
		font-size: 16px;
		color: #333;
		text-transform: uppercase;
		padding-bottom: 15px;
		margin-top: 2px;
		position: relative;
		border-bottom: 1px solid #ddd;
		&::after{
			content: "";
			background-color: #666666;
			left: 0;
			width: 66px;
			height: 2px;
			bottom: -1px;
			position: absolute;
			-webkit-transition: 0.5s;
			-moz-transition: 0.5s;
			-ms-transition: 0.5s;
			-o-transition: 0.5s;
			transition: 0.5s;
		}
		&:hover::after{
			width: 88px !important;
		}
	}
	.comment_ul{
		overflow: hidden;
		.comment_li{
			padding: 8px 0;
			border-bottom: 1px dashed #dadada;
			.comment_name{
				font-size: 16px;
				font-weight: bold;
			}
		}
		.comment_li:nth-last-child(1){
			border-bottom:none;
		}
	}
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
				cursor: pointer;
			}
			.tabAherf:hover{
				color:@hovercolor;
			}
			.iconfont{
				font-size: 18px;
			}
		}	
	}
}
//广告位
.advertising{
	height: 78px;
	>ul{
		>li{
			float: left;
			margin-right: 8px;
			margin-left: 8px;
			width:97px;
			height:97px;
			>img{
				width: 100%;
				height: 66px;
			}
			>h1{
				font-size: 14px;
				text-align: center;
				margin-top: 4px;
				font-weight: normal;
			}
		}
	}
}
.advertising::before{
	content: '广告宣传 X';
    display: block;
	position: absolute;
	width: 80px;
	height: 20px;
	text-align: center;
	line-height: 20px;
	left:5px;
	top: 3px;
	color: rgba(0, 0, 0, 0.678);
	background-color: rgba(255, 255, 255,0.5);
	cursor: pointer;
}
</style>
