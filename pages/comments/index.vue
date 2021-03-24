<template>
  <div style="height:100vh">
	<NavHeader :active="active"></NavHeader>
	<!-- 左侧文章内容 -->
	<div class="w1200 top24">
		<div class="navigation">
			<el-breadcrumb separator-class="el-icon-sugar">
			<el-breadcrumb-item :to="{ path: '/' }"><i class="iconfont icon-home"></i>首页</el-breadcrumb-item>
			<el-breadcrumb-item>留言区</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="w1200">
            <div class="comment_title cardcss">
				<div class="titletag">
					留
				</div>
               寄蜉蝣于天地，渺沧海之一粟，哀吾生之须臾，羡长江之无穷。
			</div>
            <Exceptional/>
            <div class="comments">
                <Comment ID='blog' title="留言板"></Comment>	
            </div>
		</div>
	</div>
	<Footer/>
</div>
</template>

<script>
if (process.browser) { // 在这里根据环境引入wow.js
	  var {WOW} = require('wowjs')     
	   var Prism = require('prismjs')   
	   require('prismjs/themes/prism-tomorrow.css')   
  }
export default {
	data() {
		return {
			active:'blog留言',
			actives:''
		}
	},
	async asyncData({app,error,params}) {
		//公共方法
		const awaitWrap = (promise) => {
		return promise
		.then(data => [null, data])
		.catch(err => [err, null])
		}
		let wpComments=await awaitWrap(app.$axios.post('/blog/wpPosts/getAllComments'))
		if(wpComments[0]){
			error({ statusCode: 500, message: wpComments[0] })
		}else{
			return {
				wpComments:wpComments[1].data.data.data,
			}
		}
		
	},
	methods: {
		//外部链接跳转
		open(url){
			window.open(url)
		},
		//分页
		pagination(val){
        this.page.current=val.page
        this.page.size=val.limit
		this.getWpPosts()
		},
	},
	head() {
		return {
			title:'留言板-马鲁南的IT技术博客',
			meta:[
				{hid:'description',name:'description',content:'马鲁南个人博客，是一个记录博主学习和成长的自媒体博客。关注于web前端技术和web全栈技术的学习研究。'},
				{hid:'keywords',name:'keywords',content:'马鲁南,互联网,自媒体,马鲁南博客,新鲜科技,科技博客,独立博客,个人博客,原创博客,前端,前端开发,全栈,全栈开发,nuxt,nuxtjs,vue,vuejs,node.js'},
				{hid:'author',content:'malunan'}
			]
		}
  },
  mounted() {
     if (process.browser) {  // 在页面mounted生命周期里面 根据环境实例化WOW
		Prism.highlightAll()
         new WOW({
             live: false, 
             offset: 0
		 }).init()
     } 
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
 .comment_title{
        line-height: 200px;
        text-align: center;
        font-size: 24px;
        background-image: -webkit-linear-gradient(right, rgba(243, 208, 134, 0.171), rgba(252, 114, 96, 0.185));
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
</style>
