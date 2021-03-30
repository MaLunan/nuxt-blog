<template>
    <div class="comment">
        <div>
            <span class="comment_num">{{WpPostsData.allCount}}</span>条评论
        </div>
        <hr/>
        <div class="write clearfix" @click="active=''">
            <div class="head_img">
                <!-- <img src="../assets/img/img2.jpg" alt=""> -->
                <div class="head_img_background" :style="'background-color:'+backgroundGenerate('访客')">
                    {{firstName('访客')}}
                </div>
            </div>
            <div class="write_input clearfix">
                <Commentinput @getCommentList='getCommentList' :comment_post_ID='ID' :comment_post_title='title'></Commentinput>
            </div>   
        </div>
        <!-- 为空显示 -->
        <div class="comment_null" v-if="WpPostsData.allCount===0">来做第一个留言的人吧~</div>
        <!-- 显示区 -->
        <div class="write_show clearfix" v-for="(item,index) in WpPostsData.allparents" :key='index'>
            <div class="head_img">
                <!-- <img src="../assets/img/img2.jpg" :alt="item.comment_author"> -->
                <div class="head_img_background" :style="'background-color:'+backgroundGenerate(item.comment_author)">
                    {{firstName(item.comment_author)}}
                </div>
            </div>
            <div class="write_input clearfix">
                <div class="clearfix write_title">
                    <span>{{item.comment_author}}</span>
                    <span class="text_date iconfont icon-ClockCircle">{{item.comment_date}}</span>
                    <el-button class="reply_btn"  type="text" size='mini' @click="showComment(index,'')">回复</el-button>
                </div>
                <p>
                    {{item.comment_content}}
                </p>
                <Commentinput @getCommentList='getCommentList' v-if="show&&active===index&&activeind===''" :comment_post_ID='ID' :comment_post_title='title' :comment_parentID='item.comment_ID'></Commentinput>
                <!-- 二级 -->
                <div class="write_er_show clearfix" v-for="(val,ind) in item.childList" :key='ind'>
                    <div class="head_img">
                        <!-- <img src="../assets/img/img2.jpg" :alt="item.comment_author"> -->
                        <div class="head_img_background" :style="'background-color:'+backgroundGenerate(val.comment_author)">
                            {{firstName(val.comment_author)}}
                        </div>
                    </div>
                    <div class="write_input clearfix">
                        <div class="clearfix write_title">
                            <span>{{val.comment_author}}</span>
                            <span class="text_date iconfont icon-ClockCircle">{{val.comment_date}}</span>
                            <el-button class="reply_btn"  type="text" size='mini' @click="showComment(index,ind)">回复</el-button>
                        </div>
                        <p>
                            <span class="aiteName" v-if="val.comment_parentName">@{{val.comment_parentName}}：</span>{{val.comment_content}}
                        </p>
                        <Commentinput @getCommentList='getCommentList' v-if="show&&active===index&&activeind===ind" :comment_post_ID='ID' :comment_post_title='title' :comment_parentID='item.comment_ID' :comment_parent='val.comment_ID' :comment_parentName='val.comment_author'></Commentinput>
                    </div>   
                </div>   
            </div>
        </div>
    </div>
</template>

<script>
import Commentinput from './Commentinput.vue'
export default {
  components: { Commentinput },
    name:'Comment',
    props:{
        ID:{
            type:String,
        },
        title:{
            type:String
        }
    },
    data(){
        return{
            show:false,
             active:'',
             activeind:'',
             WpPostsData:{}
        }
    },
    created () {
        this.getCommentList(false)
    },
    methods:{
        //生成background
        backgroundGenerate(name){
            let firstName = name.substring(1, 0);
            
            const bgColor = this.tranColor(name)
            return bgColor
            
        },
        //截取第一个字
        firstName(name){
            return  name.substring(1, 0);
        },
        //根据名称颜色转16进制色码
        tranColor(name){
            var str ='';
            for(var i=0; i<name.length; i++) {
            str += parseInt(name[i].charCodeAt(0), 10).toString(16);
            }
            return '#' + str.slice(1, 4);
        },
        //展开收起
        showComment(val,ind){
            if(this.active===val&&this.activeind===ind){
                this.show=!this.show
            }else{
                 this.show=true
            }
            this.active=val
            this.activeind=ind
        },
        async getCommentList(show){
            if(show){
                this.show=false
            }
            const awaitWrap = (promise) => {
                return promise
                .then(data => [null, data])
                .catch(err => [err, null])
                }
                // 服务器端渲染数据
                let WpPostsData =await awaitWrap(this.$axios({
                        method:'get',
                        url:'/blog/wpPosts/getComments',
                        params:{
                            comment_post_ID:this.ID,
                        }
                    }))
                    console.log(WpPostsData)
                if(WpPostsData[0]){
                    console.log('null')
                }else{
                        this.WpPostsData=WpPostsData[1].data.data

            }
        }
    }

}
</script>
<style lang="less" scoped>
.comment{
    //评论区
    .write{
        background: rgba(226,230,235,);
        padding: 0 24px 12px;
        border-radius: 24px;
        overflow: hidden;
    }
    //数字
    .comment_num{
        color: red;
        padding:  0 5px;
    }

    //头像
    .head_img{
        width: 50px;
        height: 50px;
        border-radius: 50px;
        overflow: hidden;
        margin: 10px;
        float: left;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .head_img_background{
        width: 100%;
        height: 100%;
        border-radius: 100%;
        text-align: center;
        line-height: 48px;
        font-size: 24px;
        color:white;
    }
    //输入框区域
    .write_input{
        margin-top:10px;
        float: left;
        width: calc(100% - 80px);
        
    }
    .write_input .write_title:hover .reply_btn{
        display: block;
    }
    //评论区头
    .write_title{
        height: 30px;
        line-height: 30px;
    }
    //@样式
    .aiteName{
        color:@hovercolor
    }

    //回复按钮
    .reply_btn{
        transition: all 0.3 initial;
        display: none;
        float: right;
        margin-right: 10px;
        font-size: 14px;
    }
    .write_show{
        padding: 24px 24px 12px 74px;
        overflow: hidden;
    }
    .write_er_show{
        padding: 0;
         overflow: hidden;
         margin-top: 16px;
    }
    //留言为空
    .comment_null{
        padding: 0 24px 12px;
        height: 200px;
        text-align: center;
        font-size: 18px;
        line-height: 200px;
    }
    //时间样式
    .text_date{
        color: #3637388c;
        font-size: 12px;
        margin-left: 12px;
    }
}

</style>
<style lang="less" scoped>

@media screen and (max-width: 860px) {
	.write{
        padding:0 4px 8px !important;
    }
    .comment_null{
        padding: 0 12px 6px!important;
        height: 100px!important;
        text-align: center!important;
        font-size: 14px!important;
        line-height: 100px!important;
    }
    .write_show {
        padding:4px 4px 4px 0!important;
    }
    .reply_btn{
        display: block !important;
    }
    .text_date{
        display: none !important;
    }
    .write_input {
        margin-top: 0px;
        p{
            font-size: 12px;
        }
    }
    .head_img{
        width: 36px!important;
        height: 36px!important;
    }
    .head_img_background{
        font-size: 14px!important;
        line-height:36px !important;
    }
    /deep/ .el-input__inner{
        height: 30px!important;
    }
}
@media screen and (max-width: 570px) {

}
</style>