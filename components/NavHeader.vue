<template>
<div class="navbox">
    <div class="nav w1200">
      <!-- 适应小窗口，竖向导航 -->
      <i :class="['nav-b','iconfont',!isfold?'icon-Menu':'icon-MenuFold']" @click="fold">
        <ul class="nav-b-ul" v-show="isfold">
            <li class="nav-b-li" :class="classA == index ? 'active' : '' "  @click="selected(index,item)"  v-for="(item,index) in configNav" :key="index">
                <nuxt-link :to='item.path' class="nav-b-text" @click="showToggle(index)">{{item.name}}</nuxt-link>
                    <ul class="menub_ul animate__animated animate__fadeIn" :class="{'active' :index===isShow}">
						<li class="menub_li" v-for="(nav,ind) in item.subItems" :class=" classB == nav ? 'active' : '' "  @click="menuselected(nav,index)" :key="ind">
						<nuxt-link class="menub_ul_text" :to="nav.link" :class="{'active':nav.link == linkClick}"  @click="treeNavSwitch(nav)">{{nav.text}}</nuxt-link>
						</li>
                    </ul>
            </li>
        </ul>
      </i>
      <h1 class="logo">{{logo}}</h1>
      <!-- 横向导航 -->
      <div class="nav-a ">
        <ul class="nav-a-ul">
            <li class="nav-a-li" :class="classA == index ? 'active' : '' "  @click="selected(index,item)"  v-for="(item,index) in configNav" :key="index">
                <nuxt-link :to='item.path' class="nav-a-text" @click="showToggle(index)">{{item.name}}</nuxt-link>
                    <ul class="menu_ul animate__animated animate__fadeIn" :class="{'active' :index===isShow}">
						<li class="menu_li" v-for="(nav,ind) in item.subItems" :class=" classB == nav ? 'active' : '' "  @click="menuselected(nav,index)" :key="ind">
						<nuxt-link class="menu_ul_text" :to="nav.link" :class="{'active':nav.link == linkClick}"  @click="treeNavSwitch(nav)">{{nav.text}}</nuxt-link>
						</li>
                    </ul>
            </li>
        </ul>
      </div>
    </div>
</div>
</template>


<script>
export default {
  name: "Header",
  props:{
    active:{
      type:String,
      default:'/'
    }
  },
  data() {
    return {
      show: false,
      isfold:false,
      classA: 0,
      classB: 0,
      isShow: 0,
      linkClick: "",
      logo:'zhutishizhe',
     configNav: [
        {
          name: "首页",
          path:'/',
        },
        {
          name: "知识笔记",
          path:'',
           subItems:[
                        { link:'/article',text: '基础知识'},
                        { link:'/',text: '进阶知识' },
                        { link:'',text: 'BUG' },
                        { link:'',text: '面试经' }
                    ]
        },
        {
          name: "软件教程分享",
          path:'/',
        },
        {
          name: "个人归档",
          path:'/',
        },
        {
          name: "blog留言",
          path:'/',
        },
        {
          name: "关于我",
          path:'/',
        }
      ]
    }
  },
  methods: {
    selected: function(index,item) {
		if(item.subItems){
			return false
		}
	  this.classA = index;
	  
    },
     menuselected: function(nav,index) {
	  this.classB = nav;
		this.selected(index,{})
    },
    showToggle: function(index) {
      this.isShow = index;
    },
    treeNavSwitch: function(nav) {
	  this.linkClick = nav.link;
    },
    fold(){
      this.isfold=!this.isfold;
    }
  }
};
</script>

<style lang='less' scoped>
.navbox{
  background-color:rgba(104, 94, 72, 0.4) ;
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
.nav-a {
  cursor: pointer;
  float: right;
  margin-left: 50px;
  letter-spacing: 4px;
  position: relative;
}
.logo{
  cursor: pointer;
  float: left;
  // margin-left: 50px;
  letter-spacing: 4px;
  position: relative;
}
.nav-a-ul {
  list-style: none;
}
.nav-a-li {
  display: inline-block;
  margin-left: 30px;
  height: 60px;
}
.nav-a-text {
  font-size: 14px;
  color: @textcolor;
  line-height: 58px;
  text-decoration: none;
}
.menu_ul {
  width: 130px;
  list-style: none;
  background: @TKbackground;
  border-radius: 3px;
  z-index: 999;
  position: absolute;
  top: 58px;
  left: 67px;
  display: none;
}
.menu_li {
  height: 30px;
  line-height: 30px;
  padding-left: 12px;
}
.menu_ul_text {
  font-size: 14px;
  color: @Stextcolor;
  letter-spacing: 0;
  line-height: 30px;
  text-decoration: none;
  padding-left: 6px;
}
.nav-a-li:hover {
  border-bottom: 2px solid @bordercolor;
}
.nav-a-li:hover >a{
  color:@hovercolor;
}
.nav-a-li.active {
  border-bottom: 2px solid @bordercolor;
}
.nav-a-li:hover .menu_ul {
  display: block;
}
.menu_ul_text:hover {
  color: @hovercolor;
}
.menu_li.active .menu_ul_text{
    color: @hovercolor;
}
.nav-b{
  display: none;
  font-size: 24px;
  margin-left: 15px;
  float: left;
  cursor:pointer;
  position: relative;
}
// 竖着导航
    .nav-b-ul {
        position: absolute;
        top: 60px;
        z-index: 100;
        width: 140px;
        height: auto;
        list-style: none;
        background-color:@TKbackground;
      }
      .nav-b-li {
        display: inline-block;
        height: 60px;
        width: 100%;
        text-align: center;
         border-bottom: 1px solid grey;
      }
      .nav-b-text {
        font-size: 14px;
        color:@Stextcolor;
        line-height: 58px;
        text-decoration: none;
      }
      .menub_ul {
        width: 140px;
        height: auto;
        list-style: none;
        background-color:@TKbackground;
        z-index: 999;
        position: absolute;
        top: 90px;
        left: 140px;
        display: none;
      }
      .menub_li {
       display: inline-block;
        height: 60px;
        width: 110px;
        text-align: center;
        border-bottom: 1px solid grey;
      }
      .menub_ul_text {
        padding-left: 6px;
        font-size: 14px;
        color: @Stextcolor;
        line-height: 58px;
        text-decoration: none;
      }
      .nav-b-li>a{
        height: 80%;
        display:inline-block;
      }
      .nav-b-li:hover >a{
        border-bottom: 2px solid @bordercolor;
        color:@hovercolor;
      }
      .nav-b-li.active a{
        border-bottom: 2px solid @bordercolor;
      }
      /* .nav-a-li:active {
        border-bottom: 2px solid @bordercolor;
      } */
      .nav-b-li:hover .menub_ul {
        display: block;
      }
      .menub_ul_text:hover {
        color: @hovercolor;
      }
      .menub_li.active .menub_ul_text{
          color: @hovercolor;
      }
</style>