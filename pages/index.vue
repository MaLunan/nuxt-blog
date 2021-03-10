<template>
  <div style="height:100vh">
	<NavHeader :active="active"></NavHeader>
	<!-- 左侧文章内容 -->
	<div class="w1200 top24">
		<div class="leftW">
			<!-- 首页轮播图 -->
			<el-carousel trigger="click" :interval='10000' class="swiper">
				<el-carousel-item v-for="(item,index) in img" :key="index">
					<img :src="item" alt="">
					<!-- swiper title -->
					<span class="swiper-title textone">
						今天是个好日子{{item}}
					</span>
				</el-carousel-item>
			</el-carousel>
			<!-- 首页热评文章 -->
			<div class="cardcss top-list">
				<div class="titletag">
					热门
				</div>
				<ul class="todo-list">
					<li v-for="item in 6" :key="item" class="clearfix">
						<span class="sequence">{{item}}</span>
						<span class="date">
							12-45
						</span>
						<nuxt-link to="/" class="textone">
							最新整理了一下zblog程序的思路，把过去遇到的zblogphp问题总结一下，zblog程序的思路，把过去遇到的zblogphp问题总结一下都是一些常见
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
			<div class="cardcss article-box clearfix wow fadeIn" data-wow-duration='2s' v-for="n in 8" :key="n">
				<!-- 右侧 -->
				<div :class="['article-right',n%2?'article-right-isno':'']">
					<img :src="img.img1" alt="" title="">
				</div>
				<!-- 左侧 -->
				<div :class="['article-left',n%2?'article-left-isno':'']">
					<!-- 标题 -->
					<h1 class="textone">
						<nuxt-link to=''>Hello, Z-Blog</nuxt-link>
					</h1>
					<!-- 内容简写 -->
					<p class="textthree">
						Z-Blog是由Z-Blog社区提供的博客程序，一直致
						力于给国内用户提供优秀的博客写作体验。从2005年起发布第一版，至今已有15年的
						历史
						，是目前国内为数不多的持续提供更新的开源CMS系统之一。 目标是使用...
					</p>
					<!-- 标签栏 -->
					<div class="particulars">
						<span class="iconfont icon-User">malunan</span>
						<span class="separator">/</span>
						<nuxt-link to='' class="iconfont icon-Tags">
							互联网
						</nuxt-link>
						<span class="separator">/</span>
						<span to='' class="iconfont icon-clock-circle">
							2020-1-21
						</span>
						<span class="separator">/</span>
						<nuxt-link to='' class="iconfont icon-eye">
							9
						</nuxt-link>
						<span class="separator">/</span>
						<nuxt-link to='' class="iconfont icon-Edit">
							9
						</nuxt-link>
					</div>
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
					<img class="imgbox rotate"  :src="img.img1" alt="" @mouseenter="rotateImg" @mouseleave="clearInterval">	
					<span class="user">malunan <img class="vbox" src="../assets/img/V.png" alt=""> </span>
					<p class="textTow synopsis">李洋博客提供个人/企业网站建设_业网站建设业网站建设业网站建设业网站建设制作zblog博客主题模板以及SEO排名优化的</p>
					<div class="site_state">
						<nuxt-link to="" class="site_state_item item_border">
							<p class="number">159</p>
							<p>文章</p>
						</nuxt-link>
						<nuxt-link to="" class="site_state_item item_border">
							<p class="number">159</p>
							<p>评论</p>
						</nuxt-link>
						<nuxt-link to="" class="site_state_item">
							<p class="number">159213</p>
							<p>浏览</p>
						</nuxt-link>
					</div>
					<div class="aBox">
						<nuxt-link to='' class="iconfont icon-Octicons-mark-github tabAherf">
							Github
						</nuxt-link>
						<nuxt-link to='' class="iconfont icon-weibo tabAherf">
							微博
						</nuxt-link>
						<nuxt-link to='' class="iconfont icon-toutiao tabAherf">
							头条
						</nuxt-link>
						<nuxt-link to='' class="iconfont icon-BILIBILI_LOGO tabAherf">
							B站
						</nuxt-link>
						<nuxt-link to='' class="iconfont icon-kuaishou1 tabAherf">
							快手
						</nuxt-link>
						<nuxt-link to='' class="iconfont icon-external_tiktok tabAherf">
							抖音
						</nuxt-link>
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
			img:{
				img1:require("../assets/img/img1.jpg"),
				img2:require("../assets/img/img2.jpg"),
				img3:require("../assets/img/img3.jpg"),
				img4:require("../assets/img/img4.jpg")
			},
			// 分页
			page:{
                total:20,
                current:1,
                size:10,
			},
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
	async asyncData({app}) {
		// 服务器端渲染数据

	},
	methods: {
		//分页
		pagination(val){
        this.page.current=val.page
        this.page.size=val.limit
		},
		//更新条数时调用
        updatelimit(val){
        },
        //更新页数时调用
        updatepage(val){
        },
		// 悬停鼠标 旋转 图片
		rotateImg(){
			var that=this;
			// that.InterVal = setInterval(function () {
				
			// 		// this.rotateVal = this.rotateVal-0
			// 		that.rotateVal+=1
			// 		console.log(that.rotateVal)
			// 	}, 100)
			// console.log(that.InterVal)
		},
		clearInterval(){
			// clearInterval(this.InterVal)
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
	  console.log('dddd')
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
}
// swiper切换按钮变圆
.el-carousel__button{
	width: 12px;
	height: 12px;
	border-radius: 50%;
}
// swiper切换按钮位置
.el-carousel__indicators{
	position: absolute;
	right: 20px;
	width: auto;
	
}
.el-carousel__indicators--horizontal{
	left:auto;
}
// swiper圆角
.el-carousel--horizontal{
	border-radius: 40px;
}
//swiper内容高度自适应
.el-carousel__container{
	height: 100%;
}
// 通用卡片样式
.cardcss{
	height: 250px;
	border-radius: 18px;
	margin-bottom: 20px;
	overflow: hidden;
	position: relative;
	background-color: @background;
}
//热评文章
.top-list{
	
}
// 文章列表
.article-box{
	height: 200px;
	padding: 18px 24px;
	>.article-left{
		height:100%;
		margin-right:224px;
		// background:white;
		// border-radius: 15px;
		box-sizing: border-box;
		position: relative;
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
		.particulars{
			position: absolute;
			bottom: 0;
			left: 0;
			height: 24px;
		}
	}
	>.article-left-isno{
		margin-left: 224px;
		margin-right: 0;
	}
	>.article-right{
		float:right;
		width:200px;
		height:100%;
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
