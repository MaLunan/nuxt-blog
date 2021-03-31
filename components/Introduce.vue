<template>
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
        <TagsCloud  :boxWidth="300" :speed="400" :randomColor="true"></TagsCloud>
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
        <ul class="comment_ul">
            <li class="friend" v-for="(item,index) in wpFriend" :key="index">
                <a :href='item.friend_link'> {{item.friend_name}}</a>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
export default {

    data(){
        return {
            wpUser:{},
            wpComments:[],
			wpFriend:[],
        }
    },
    created(){
        this.getposts()
        this.getComments()
		this.getFriends()
    },
    methods:{
        //外部链接跳转
        open(url){
            console.log(url)
            window.open(url)
        },
        getposts(){
            this.$axios.get('/blog/wpPosts/getUser').then(res=>{
                this.wpUser=res.data.data.datas
            })
        },
        getComments(){
             this.$axios.post('/blog/wpPosts/getAllComments').then(res=>{
                 console.log(res.data.data)
                this.wpComments=res.data.data.data
            })
        },
        getFriends(){
             this.$axios.get('/blog/wpPosts/getFriend').then(res=>{
                 console.log(res.data.data)
                this.wpFriend=res.data.data.datas
            })
        }
    }
}
</script>

<style lang="less" scoped>
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
.friend{
	padding: 12px;
	font-size: 16px;
	float:left;
}
</style>