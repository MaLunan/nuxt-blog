<template>
  <div style="height:100vh">
	<NavHeader :active="active"></NavHeader>
	<!-- 左侧文章内容 -->
	<div class="w1200 top24">
        <div class="navigation">
            <el-breadcrumb separator-class="el-icon-sugar">
            <el-breadcrumb-item :to="{ path: '/' }"><i class="iconfont icon-home"></i>首页</el-breadcrumb-item>
            <el-breadcrumb-item>个人归档</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
		<div class="leftW">
			  <el-timeline>
                    <el-timeline-item :timestamp="item.post_date" placement="top" v-for="(item,index) in WpPostsData" :key="index">
                    <el-card>
                        <nuxt-link :to="'/article/'+item.ID">
                            <h4>{{item.post_title}}</h4>
                        </nuxt-link>
                    </el-card>
                    </el-timeline-item>
                </el-timeline>
			<pagination 
				v-if="WpPostsData.length"
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
				<TagsCloud :useArray="wpTaxonomy" :boxWidth="300" :speed="400" :randomColor="true" :key="wpTaxonomy.ID"></TagsCloud>
			</div>
			<!-- 最新留言 -->
			<div class="divPrevious">
				<h3 class="widget_title">最新留言</h3>
				<ul class="comment_ul">
					<li class="comment_li textone" v-for="(item,index) in wpComments" :key='index'>
						<nuxt-link :to="'/article/'+item.comment_post_ID"><span class="comment_name">{{item.comment_author}} : </span><span>{{item.comment_content}}</span></nuxt-link>
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
			active:'个人归档',
		}
	},
    watchQuery: true,
	async asyncData({app,error,query}) {
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
					sort:'timestamp',
                    size:20,
                    page:1,
				}
			}))
		let wpTaxonomy=await awaitWrap(app.$axios.get('/blog/wpPosts/getTaxonomy'))
		let wpUser=await awaitWrap(app.$axios.get('/blog/wpPosts/getUser'))
		let wpComments=await awaitWrap(app.$axios.post('/blog/wpPosts/getAllComments'))
		if(WpPosts[0]||wpTaxonomy[0]||wpUser[0]||wpComments[0]){
			error({ statusCode: 500, message: WpPosts[0]||wpTaxonomy[0]||wpUser[0]||wpComments[0] })
		}else{
			return {
				WpPosts:WpPosts[1].data.data.datas,
				wpTaxonomy:wpTaxonomy[1].data.data.datas,
				wpUser:wpUser[1].data.data.datas,
				WpPostsData:WpPostsData[1].data.data.datas,
				wpComments:wpComments[1].data.data.data,
				page:{
					total:WpPostsData[1].data.data.Count,
					current:WpPostsData[1].data.data.page,
					size:WpPostsData[1].data.data.size,
				},
                commentName:query.name,
				type:query.type
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
					sort:'post_date',
					type:this.type
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
img{border:0;vertical-align:middle; width: 100%;height: 100%; }
// 通用卡片样式
.cardcss{
	height: 214px;
	border-radius: 18px;
	margin-bottom: 20px;
	overflow: hidden;
	position: relative;
	background-color: @background;
}
// 右侧样式
.rightbox{
	position: relative;
    overflow: visible;
    box-sizing: border-box;
	min-height: 0px;
	padding-left: 20px;
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
</style>