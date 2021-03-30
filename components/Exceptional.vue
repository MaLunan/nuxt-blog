<template>
  <div class="exceptional">
        <el-button type='plain' @click="dialogVisible = true">打赏</el-button>   
        <el-dialog
        class="dialog"
            :visible.sync="dialogVisible"
            width="70%">
            <img src="../assets/img/wx.png" alt="微信">
            <img src="../assets/img/zfb.jpg" alt="支付宝">
        </el-dialog>
  </div>
</template>
<script>
export default {
    data(){
        return {
            dialogVisible:false,
        }
    },
    methods:{

    }
}
</script>
<style lang="less" scoped>
	.exceptional{
        margin: 20px auto;
        padding: 10px 0;
        text-align: center;
        width: 70%;
	}
    img{
        width: 49%;
        height: 100%;
    }
    /deep/ .el-dialog__header {
        padding: 0;
    }
    /deep/ .el-dialog__body{
        padding: 0;
    }
</style>
<style lang="less" scoped>

@media screen and (max-width: 860px) {
	.exceptional{
        padding:0;
        /deep/.el-dialog{
            width: 98% !important;
        }
    }
}
@media screen and (max-width: 570px) {

}
</style>