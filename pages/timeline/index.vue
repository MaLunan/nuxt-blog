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
			active:'个人归档',
		}
	},
    watchQuery: true,
	async asyncData({app,error,query}) {
		// 服务器端渲染数据
		let WpPostsData =await app.$axios({
				method:'get',
				url:'/blog/wpPosts/getWpPosts',
				params:{
					sort:'timestamp',
                    size:20,
                    page:1,
				}
			})
		let wpTaxonomy=await app.$axios.get('/blog/wpPosts/getTaxonomy')
			return {
				wpTaxonomy:wpTaxonomy.data.data.datas,
				WpPostsData:WpPostsData.data.data.datas,
				page:{
					total:WpPostsData.data.data.Count,
					current:WpPostsData.data.data.page,
					size:WpPostsData.data.data.size,
				},
                commentName:query.name,
				type:query.type
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

</style>