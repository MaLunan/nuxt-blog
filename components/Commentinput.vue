<template>
  <div class="show_comment">
        <el-input 
        style="width:50%;margin-bottom:5px"
        placeholder='昵称'
        v-model="comment_author"
        :minlength='2'
        >

        </el-input>
        <el-input style="width:49%"
        placeholder='邮箱'
        :maxlength='50'
        v-model="comment_author_email"
        >
            
        </el-input>
        <el-input
        type="textarea"
        :autosize='{minRows: 3,}'
        maxlength="256"
        placeholder="想要说点什么"
        ref="input"
        autofocus
        show-word-limit
        v-model="comment_content">
        </el-input>
        <el-popover
        placement="bottom"
        width="300"
        trigger="click">
        <ul class="clearfix">
            <li class="emojibox" v-for="(item,index) in emojiList" :key="index" @click="pushEmoji(item)">{{item}}</li>
        </ul>
            <span slot="reference" class="icon-smile iconfont emoji"> 表情</span>
        </el-popover>
        <el-button class="commentBtn" type="primary" size='small' round :loading='false' :disabled='comment_content.length===0||comment_author.length===0||comment_author_email.length===0' @click="pushComment">评论</el-button>
</div>
</template>

<script>
export default {
    props:{
        active:{
            type:Number,
        },
       comment_post_ID:{
           type:String,
           required:true,
       },
       comment_post_title:{
           type:String,
           required:true,
       },
       comment_parentID:{
           type:String,
           default:''
       },
       comment_parent:{
           type:String,
           default:''
       },
       comment_parentName:{
           type:String,
           default:''
       }
       
    },
    data(){
        return{
            comment_content:'',
            emojiList:[
                '😀','😁','😂','😃','😄','😅','😆',
                '😉','😊','😋','😎','😍','😘','😗',
                '😙','😚','😇','😐','😑','😶','😏',
                '😣','😥','😮','😯','😪','😫','😴',
                '😌','😛','😜','😝','😒','😓','😔',
                '😕','😲','😷','😖','😞','😟','😤',
                '😢','😭','😦', '😧','😨','😬','😰',
                '😱','😳','😵','😡','😠'
            ],
            actives:this.active,
            comment_author:'',
            comment_author_email:'',
            user_id:'null',

        }
    },
    methods:{
        //添加表情
        pushEmoji(item){
            this.comment_content=this.comment_content+item
        },  
        //发送评论
        pushComment(){
			this.$axios({
				method:'post',
				url:'blog/wpPosts/addComments',
				data:{
					comment_post_ID:this.comment_post_ID,
                    comment_post_title:this.comment_post_title,
                    comment_parentID:this.comment_parentID,
                    comment_parent:this.comment_parent,
                    comment_parentName:this.comment_parentName,
                    comment_author:this.comment_author,
                    comment_author_email:this.comment_author_email,
                    comment_content:this.comment_content,
                    user_id:this.user_id
				}
			}).then(res=>{
               if(res.data.code==='1'){
                   this.$message.error(res.data.message)
               } else{
                    this.$message({
                        message: res.data.message,
                        type: 'success'
                    });
                    this.comment_content=''
                    this.$emit('getCommentList',true)
               }
               console.log(res)
            })
        }
    }
}
</script>

<style lang="less" scoped>
//二级评论
.show_comment{
    margin-top: 10px;
}
//emoji表情按钮
.emoji{
    color: @hovercolor;
    cursor: pointer;
    margin: 5px;
}  
//emoji容器
.emojibox{
    padding: 1px;
    float: left;
    cursor: pointer;
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
}
.emojibox:hover{
    font-size: 18px;
}
//发送评论
.commentBtn{
    float: right;
    margin-right: 10px;
    margin-top: 5px;
}
</style>