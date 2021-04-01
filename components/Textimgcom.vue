<template>
  <div class="head_img">
        <div class="head_img_background" :style="'background-color:'+backgroundGenerate(name)">
            {{firstName(name)}}
        </div>
    </div>
</template>

<script>
export default {
    props:{
        name:{
            type:String,
            default:''
        }
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
    }
}
</script>

<style lang="less" scoped>
//头像
.head_img{
    width: 100px;
    height: 100px;
    border-radius: 100px;
    overflow: hidden;
    margin:  0 auto;
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
    line-height: 96px;
    font-size: 46px;
    color:white;
}

</style>