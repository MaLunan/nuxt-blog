<template>
  <div class="qrcode">
      <img :src="imgage" alt="">
      <el-input class="marginTop" v-model="url" placeholder="生成文字或链接"></el-input>
      <el-button class="marginTop" :disabled="url===''" @click="showUrl">生成</el-button>
  </div>
</template>

<script>
import QRCode from  'qrcode'
export default {
    data(){
        return {
            url:'https://www.zmln1021.cn',
            canvas:'',
            imgage:'',
        }
    },
    mounted(){
        this.showUrl()
    },
    methods:{
        // canvas
        //     showCanvas(){
        //         // toDataURL()//生成base64字符串
        //         // toString()//生成svg二进制字符
        //         QRCode.toCanvas(this.url, {
        //         errorCorrectionLevel: "L",//容错率L（低）H(高)
        //         margin: 1,//二维码内边距，默认为4。单位px
        //         height: 200,//二维码高度
        //         width: 200,//二维码宽度
        //         scal: 177,
        //         color: {
        //             dark: '#000', // 二维码背景颜色
        //             // light: '#000' // 二维码前景颜色
        //         },
        //         rendererOpts: {
        //             quality: 0.9
        //         }
        //     }).then(canvas => {
        //         console.log(canvas)
        //          this.$refs.mycanvas.append(canvas)
        //     }).catch((err) => {
        //         console.log(err)
        //     })
        // },
        showUrl(){
            QRCode.toDataURL(this.url, {
                errorCorrectionLevel: "L",
                margin: 1,
                height: 200,
                width: 200,
                type: "10",
                scal: 177,
                type: "10",
                color: {
                    dark: '#000', // 二维码背景颜色
                    // light: '#000' // 二维码前景颜色
                },
                rendererOpts: {
                    quality: 0.9
                }
            }).then(base64 => {
                console.log(base64)
               this.imgage=base64
            }).catch((err) => {
                console.log(err)
            })
        },
        // svg
        // showString(){
        //     QRCode.toString(this.url, {
        //         errorCorrectionLevel: "L",
        //         margin: 1,
        //         height: 200,
        //         width: 200,
        //         type: "10",
        //         scal: 177,
        //         type: "10",
        //         color: {
        //             dark: '#000', // 二维码背景颜色
        //             // light: '#000' // 二维码前景颜色
        //         },
        //         rendererOpts: {
        //             quality: 0.9
        //         }
        //     }).then(canvas => {
        //         console.log(canvas)
        //        this.$refs.mycanvas.append(canvas)
        //     }).catch((err) => {
        //         console.log(err)
        //     })
        // }

    }
}
</script>

<style lang='less' scoped>
.qrcode{
    width: 300px;
    height: 300px;
    margin: 0 auto;
    text-align: center;
    .marginTop{
        margin-top:12px;
    }
}
 
</style>