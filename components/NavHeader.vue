<template>
<div class="navbox">
    <div class="nav w1200">
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
     configNav: [
        {
          name: "首页",
          path:'/',
          icon:'icon-Home'
        },
        {
          name: "知识笔记",
          path:'',
          icon:'icon-bulb',
           subItems:[
                        { path:{path:'/articleComents/1',query:{name:'基础知识',type:'86109da0-884c-11eb-a72d-fdca0855ff02'}},name: '基础知识'},
                        { path:{path:'/articleComents/2',query:{name:'进阶知识',type:'b4c69fa0-884c-11eb-a72d-fdca0855ff02'}},name: '进阶知识' },
                        { path:{path:'/articleComents/3',query:{name:'BUG',type:'e6f65f10-884c-11eb-a72d-fdca0855ff02'}},name: 'BUG' },
                        { path:{path:'/articleComents/4',query:{name:'面试经',type:'fe8b34c0-884c-11eb-a72d-fdca0855ff02'}},name: '面试经' }
                    ]
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
  methods: {

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
</style>