<template>
  <div style="height:100vh">
	<NavHeader :active="active" :actives='actives'></NavHeader>
	<!-- 左侧文章内容 -->
	<div class="w1200 top24">
        <div class="navigation">
            <el-breadcrumb separator-class="el-icon-sugar">
            <el-breadcrumb-item :to="{ path: '/' }"><i class="iconfont icon-home"></i>首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{commentName}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
		<div class="leftW">
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
						{{item.description}}
					</p>
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
			</div>	
			<div v-if="!WpPostsData.length" class="noData cardcss">
				<div class="titletag">
					空
				</div>
				这个板块还没有数据呢~~~<i class="iconfont icon-Inbox"></i>
			</div>
			<pagination 
				v-if="WpPostsData.length&&WpPostsData.length>=9"
				:total='page.total' 
				:page='page.current' 
				:limit='page.size'
				@update:limit='updatelimit' 
				@update:page='updatepage'
				@pagination='pagination'>
			</pagination>
		</div>
		<Introduce></Introduce>
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
			active:'知识笔记',
		}
	},
    watchQuery: true,
	async asyncData({app,error,query}) {
		// 服务器端渲染数据
		let WpPostsData =await app.$axios({
				method:'get',
				url:'/blog/wpPosts/getWpPosts',
				params:{
                    type:query.type,
					sort:'post_date',
				}
			})
		let wpTaxonomy =await app.$axios.get('/blog/wpPosts/getTaxonomy')
			return {
				WpPostsData:WpPostsData.data.data.datas,
				wpTaxonomy:wpTaxonomy.data.data.datas,
				page:{
					total:WpPostsData.data.data.Count,
					current:WpPostsData.data.data.page,
					size:WpPostsData.data.data.size,
				},
                commentName:query.name,
				type:query.type,
				actives:query.name
			}	
	},
	methods: {
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
			title:this.commentName+'马鲁南的It技术博客',
			meta:[
				{hid:'description',name:'description',content:'马鲁南个人博客，是一个记录博主学习和成长的自媒体博客。关注于web前端技术和web全栈技术的学习研究。'},
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
//暂无数据
.noData{
	line-height: 214px;
	text-align: center;
	font-size: 18px;
}
.top-list{
	height: 250px;
}
// 文章列表
.article-box{
	height: 214px;
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
			.iconfont{
				font-size: 12px!important;
			}
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
</style>
