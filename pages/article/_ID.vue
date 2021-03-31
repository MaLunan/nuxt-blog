<template>
  <div>
	<NavHeader :active="active"></NavHeader>
	<!-- 左侧文章内容 -->
	<div class="w1200 top24">
		<div class="navigation">
			<el-breadcrumb separator-class="el-icon-sugar">
			<el-breadcrumb-item :to="{ path: '/' }"><i class="iconfont icon-home"></i>首页</el-breadcrumb-item>
			<el-breadcrumb-item :to="{ path: '/articleComents/'+(Math.random()*99) ,query:{type:WpPostsData[0].type,name:types(WpPostsData[0].type)}}">{{types(WpPostsData[0].type)}}</el-breadcrumb-item>
			<el-breadcrumb-item>正文</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="leftW">
			<div v-if="!WpPostsData.length" class="noData cardcss">
				<div class="titletag">
					err
				</div>
				跳转页面有误,返回<nuxt-link to="/">首页</nuxt-link>
			</div>
			<div  class="textBox" >
				<!-- title -->
				<h1 class="txt_title">{{WpPostsData[0].post_title}}</h1>
				<!-- 信息栏 -->
				<div class="particulars">
						<span to='' class="iconfont icon-eye">
							{{ WpPostsData[0].browse }}
						</span>
						<span>
							阅读
						</span>
						<span to='' class="iconfont icon-Edit" style="margin-left:5px">
							{{ WpPostsData[0].commentCount }}
						</span>
						<span>评论</span> 
						<nuxt-link :to="{ path: '/articleComents/'+(Math.random()*99) ,query:{type:WpPostsData[0].type,name:types(WpPostsData[0].type)}}" class="iconfont icon-Tags" style="margin-left:5px">
							{{types(WpPostsData[0].type) }}
						</nuxt-link>
						<span to='' class="iconfont icon-clock-circle" style="margin-left:5px">
							{{ WpPostsData[0].post_date }}
						</span>	
				</div>
				<hr/>
				<!-- 内容区 -->
				<div v-if="WpPostsData[0].editor==='1'" v-html="WpPostsData[0].post_content"></div>
				<div v-else ref="content"></div>
				</div>
				<Exceptional/>
				<Comment :ID='WpPostsData[0].ID' :title="WpPostsData[0].post_title"></Comment>
			</div>		
		</div>
		<Introduce></Introduce>
	</div>
	 
</div>
</template>

<script>
if (process.browser) { // 在这里根据环境引入wow.js
	var {WOW} = require('wowjs')     
	var Prism = require('prismjs')   
	require('prismjs/themes/prism-tomorrow.css')  
	require('tui-editor/dist/tui-editor-contents.css') // editor content
	require('highlight.js/styles/github.css')
	var Viewer =require('tui-editor/dist/tui-editor-Viewer')
  }
export default {	
	data() {
		return {
			active:'知识笔记',
			actives:''
		}
	},
	async asyncData({app,error,params}) {
		// 服务器端渲染数据
		let WpPostsData =await app.$axios({
				method:'get',
				url:'/blog/wpPosts/getWpPosts',
				params:{
                    ID:params.ID,
					sort:'post_date',
				}
			})
		let wpTaxonomy=await app.$axios.get('/blog/wpPosts/getTaxonomy')
			return {
				wpTaxonomy:wpTaxonomy.data.data.datas,
				WpPostsData:WpPostsData.data.data.datas,
                commentName:params.name,
				type:params.type,
			}
	},
	methods: {
		 getHtml() {
		const instance = new Viewer({    
			el: this.$refs.content,
			height:' 500px ', 
			initialValue :this.WpPostsData[0].post_content,
		})
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
			title:this.WpPostsData[0].post_title+'- 马鲁南的个人博客',
			meta:[
				{hid:'description',name:'description',content:this.WpPostsData[0].description},
				{hid:'keywords',name:'keywords',content:this.WpPostsData[0].post_label+'个人博客,原创博客,malunanlee,malunan,前端,前端开发,全栈,全栈开发,nuxt,nuxtjs,vue,vuejs'},
				{hid:'author',content:'malunan'}
			]
		}
  },
  mounted() {
     if (process.browser) {  // 在页面mounted生命周期里面 根据环境实例化WOW
	 if(this.WpPostsData[0].editor==='2'){
		 this.getHtml()
	 }else{
		 Prism.highlightAll()
	 }	
         new WOW({
             live: false, 
             offset: 0
		 }).init()
     } 
  }
}
</script>

<style lang="less" scoped>
//富文本渲染区
.textBox{
	background-color: @background;
	border-radius: 24px;
	padding: 24px;
	font-size: 16px;
	//标题
	.txt_title{
		margin-bottom: 24px;
	}
	.particulars{
		margin-bottom: 8px;
		.iconfont{
			font-size: 14px !important;
		}
	}
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
//暂无数据
.noData{
	line-height: 214px;
	text-align: center;
	font-size: 18px;
}

</style>
<style lang="less" scoped>

@media screen and (max-width: 860px) {
	.textBox{
		font-size: 12px;
		h1{
			font-size: 18px;
		}
		.particulars{
			span{
				display: none;
			}
		}
	}
}
@media screen and (max-width: 570px) {

}
</style>