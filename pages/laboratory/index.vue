<template>
  <div>
	<NavHeader :active="active"></NavHeader>
	<!-- 左侧文章内容 -->
	<div class="w1200 top24">
		<div class="navigation">
			<el-breadcrumb separator-class="el-icon-sugar">
			<el-breadcrumb-item :to="{ path: '/' }"><i class="iconfont icon-home"></i>首页</el-breadcrumb-item>
			<el-breadcrumb-item>MaLunan实验室</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="w1200">
            <div class="cardcss">
				<div class="tools_box" v-for="(item,index) in dataList"  :key="index">
					<h1 class="tools_title">{{item.title}}</h1>
					<ul class="tools_ul clearfix wow fadeIn" data-wow-duration='2s'>
						<li class="tools_li"  v-for="(tem,ind) in item.moduleList" :key='ind'>
							<nuxt-link :to="tem.link" v-if="tem.type==='nuxt'">
								<h3 class="textone">{{tem.name}}</h3>
								<div class="textTow text_style">
									{{tem.description}}
								</div>
							</nuxt-link>
							<a :href="tem.link" target="_blank"  v-else>
								<h3 class="textone">{{tem.name}}</h3>
								<div class="textTow text_style">
									{{tem.description}}
								</div>
							</a>
						</li>
					</ul>
				</div>
			</div>
            <Exceptional/>
            <div class="tools">
                <Comment ID='malunan' title="MaLunan实验室"></Comment>	
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
			active:'MaLunan实验室',
			actives:'',
            dataList:[
                {
                    title:'组件模块',
                    moduleList:[
                        {
                            name:'留言板',
                            description:'邮箱留言,留言审核,可变字体头像,emoji表情',
                            link:'/comments',
							type:'nuxt'
                        },
                        {
                            name:'二维码',
                            description:'根据链接生成对应二维码',
                            link:'/laboratory/qrcode',
							type:'nuxt'
                        },
                        {
                            name:'文字头像生成',
                            description:'根据不同的文字，生成带有背景色的文字头像',
                            link:'/laboratory/textimg',
							type:'nuxt'
                        },
                    ]
                },
				{
                    title:'开源项目',
                    moduleList:[
                        {
                            name:'vuepress博客',
                            description:'配置简单，只需要专注于md文档的编写即可',
                            link:'http://vuepress.zmln1021.cn/',
							type:'a'
                        },
                        {
                            name:'自动生成侧边栏',
                            description:'vuepress自动生成侧边栏,无需再配置,畅想写作',
                            link:'https://www.npmjs.com/package/vuepress-sidebar-atuo',
							type:'a'
                        },
                    ]
                },
				{
                    title:'收藏的网站',
                    moduleList:[
                        {
                            name:'炫酷特效',
                            description:'电影级别爆炸效果',
                            link:'https://paveldogreat.github.io/WebGL-Fluid-Simulation/',
							type:'a'
                        },
                        {
                            name:'一键抠图',
                            description:'一键换背景,一键抠图,省时省力',
                            link:'https://aipix.net/?lang=zh#cutout',
							type:'a'
                        },
                        {
                            name:'小霸王小游戏',
                            description:'回忆童年',
                            link:'http://lab.mkblog.cn/FCGames/#/',
							type:'a'
                        },
                        {
                            name:'人类反应测试',
                            description:'测试一下你的反应能力',
                            link:'https://humanbenchmark.com/',
							type:'a'
                        },
                        {
                            name:'帮你百度一下',
                            description:'告诉伸手党请自己百度',
                            link:'https://lmbtfy.tk/',
							type:'a'
                        },
                        {
                            name:'钢笔工具练习',
                            description:'ps不会钢笔工具?点击这里',
                            link:'https://bezier.method.ac/',
							type:'a'
                        },
						{
                            name:'渐变色',
                            description:'还在为颜色色值发愁么?',
                            link:'http://color.oulu.me/',
							type:'a'
                        },
                    ]
                },
            ]
		}
	},
	methods: {
	
	},
	head() {
		return {
			title:'MaLunan实验室-马鲁南的IT技术博客',
			meta:[
				{hid:'description',name:'description',content:'MaLunan实验室-马鲁南的IT技术博客,免费软件下载,技术分享,安装教程'},
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
	box-shadow: 6px 6px 1px #a7544bad;
	transition : all 0.5s ease;
}
.tools_li:hover{
	font-size: 18px;
	box-shadow: 8px 8px 5px #a7544bad;
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