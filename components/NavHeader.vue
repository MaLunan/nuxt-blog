<template>
<div class="navbox">
    <div class="nav w1200 pc">
        <ul class="nav_ul clearfix">
          <li :class="['nav_li',active===item.name?'active':'']" v-for="(item,index) in configNav" :key="index">
              <nuxt-link :to='item.path'>
                <span :class="[item.icon,'iconfont']"></span>{{item.name}}
              </nuxt-link>
              <ul class="cascade_ul animate__animated animate__flipInY" v-if="item.subItems">
                  <li :class="['cascade_li',val.name===actives?'actives':''] " v-for="(val,ind) in item.subItems" :key="ind">
                    <nuxt-link :to='val.path'>
                      {{val.name}}
                    </nuxt-link>
                  </li>
              </ul>
          </li>
        </ul>
    </div>
    <!-- 小窗口 -->
    <div class="nav w1200 mz">
        <i class="icon-Menu iconfont menu" @click="drawer=true">  
        </i>
        <el-drawer
          title="菜单"
          custom-class='menu-drawer'
          :visible.sync="drawer"
          direction='ltr'
          size='240px'
          :append-to-body='true'
          :with-header="false">
          <div class="title_my clearfix">
              <div class="left">
                <img class="imgbox rotate"  :src="wpUser.avatar" alt="头像">
              </div>
              	
              <div class="left text_my">
                <h1 class="user">{{wpUser.name}} </h1>
                <p class="textTow synopsis">{{wpUser.introduction}}</p>
              </div>
          </div>
          <ul class="mz_nav_ul">
          <li :class="['mz_nav_li',active===item.name?'active':'']" v-for="(item,index) in configNav" :key="index">
              <nuxt-link :to='item.path'>
                <span :class="[item.icon,'iconfont']"></span>{{item.name}}
              </nuxt-link>
          </li>
        </ul>
        </el-drawer>
    </div>
</div>
</template>


<script>
export default {
  name: "Header",
  props:{
    //当前页面
    active:{
      type:String,
      default:'首页'
    },
  //当前二级页面
    actives:{
      type:String,
      default:''
    }
  },
  data() {
    return {
      drawer:false,//mz菜单
      wpUser:{},
     configNav: [
        {
          name: "首页",
          path:'/',
          icon:'icon-Home'
        },
        {
          name: "知识笔记",
          path:'/articleComents/1',
          icon:'icon-bulb',
        },
        {
          name: "软件教程分享",
          path:'/tools',
          icon:'icon-customer-service',
        },
        {
          name: "MaLunan实验室",
          path:'/laboratory',
          icon:'icon-praise_1',
        },
        {
          name: "个人归档",
          path:'/timeline',
          icon:'icon-book',
        },
        {
          name: "blog留言",
          path:'/comments',
          icon:'icon-Profile',
        },
        {
          name: "关于我",
          path:'/mydata',
          icon:'icon-sketch-circle',
        }
      ]
    }
  },
  created(){
        this.getposts()
    },
  methods: {
    getposts(){
            this.$axios.get('/blog/wpPosts/getUser').then(res=>{
                this.wpUser=res.data.data.datas
            })
        },
  }
}
</script>

<style lang='less' scoped>
.navbox{
  background-color:rgba(104, 94, 72, 0.4) ;
}
.iconfont{
  margin-right: 4px;
}
.mz{
  display: none;
}
.nav {
  color:@textcolor;
  min-width: 860px;
  height: 65px;
  margin: 0px auto;
  /* position: absolute; */
  border-bottom: none;
  line-height: 65px;
  z-index: 100;
  overflow:visible;
  // background-color:rgba(104, 94, 72, 0.4) ;
}
.nav_ul{
  height: 65px;
  >li{
    list-style: none;
    float: left;
    margin-right:40px;
    line-height: 65px;
    position: relative;
  }
  .nav_li::before {
    width: 0;
    height: 2px;
    position: absolute;
    bottom: 1px;
    left: 50%;
    background-color: #0188FB;
    content: '';
    transition: all .6s;
    z-index: -1;
  }
  .nav_li:hover.nav_li::before{
      width: 100% !important;
      left: 0 !important;
      
  }
  .nav_li:hover .cascade_ul{
      display: block;
      
  }
  .active.nav_li::before{
      width: 100% !important;
      left: 0 !important;
  }
  .active>a{
    color: @hovercolor!important;
  }
}
 a{
    color: white;
    display: block;
    height: 100%;
    width: 100%;
  }
  a:hover{
    color: @hovercolor;
  }
.cascade_ul{
  display: none;
  position: absolute;
  top: 65px;
  width: 150px;
  background:#46333361;
  z-index: 99;
  .cascade_li{
    background:#46333361;
    height: 40px;
    color: white;
    line-height: 40px;
    padding-left: 40px;
    position: relative;
  }
  .cascade_li::after {
    width: 10px;
    height: 2px;
    position: absolute;
    left: 14px;
    top: 50%;
    background-color: @hovercolor;
    content: '';
    transition: all .6s;
    z-index: -1;
    opacity: 0;
  }
  .cascade_li:hover.cascade_li::after {
    opacity: 1;
  }
  .actives a{
    color: @hovercolor !important;
  }
}
.title_my{
  padding: 5px;
  color: white;
  .imgbox{
			border-radius: 50%;
			height: 50px;
			width: 50px;
			margin-top: 10px;
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
			font-size: 16px;
			font-weight: bold;
		}
    .synopsis{
			font-size: 12px;
      margin-top: 5px;
		}
    .text_my{
      margin-top: 10px;
      margin-left: 10px;
    }
}
.mz_nav_ul{
  >li{
    list-style: none;
    line-height: 40px;
    position: relative;
    height: 40px;
  }
  a{
    padding:0 16px;
    width: auto;
    height: auto;
  }
  .active>a{
    color: @hovercolor!important;
    }
}
/deep/ .menu-drawer{
   background-image: linear-gradient(to top, #a8edea 0%, #fed6e3 100%);
  }
</style>
<style lang="less" scoped>

@media screen and (max-width: 860px) {
.pc{
  display: none;
}
.mz{
  display: block;
  overflow: hidden;
  .menu{
    font-size: 38px;
    cursor: pointer;
    margin-left:18px;
  }
  }
}
@media screen and (max-width: 570px) {

}
</style>