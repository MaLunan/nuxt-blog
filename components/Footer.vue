<template>
  <div>
  	<el-row type="flex" justify="center">
  		<el-col :span="24" class="footer">
			<div>Copyright © 2020 Malunan</div>
			<nuxt-link to='https://beian.miit.gov.cn/#/Integrated/index'>京ICP备19053813号-1</nuxt-link>
  		</el-col>
  	</el-row>
  </div>
</template>

<style lang="less">
	.footer {
		display:flex;
		justify-content:center;
		align-items:center;
		margin-top:8rem;
		height:60px;
		background:#23282D;
		color:#666;
		text-align:center;
		line-height:60px;
		font-size: 18px;
	}
</style>
