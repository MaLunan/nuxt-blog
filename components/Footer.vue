<template>
  <div class="overflow foo footer">
			<div>Copyright © 2020 Malunan</div>
			<nuxt-link class="textcolor" to='https://beian.miit.gov.cn/#/Integrated/index'>京ICP备19053813号-1</nuxt-link>
  </div>
</template>

<style lang="less">
	.footer {
		display:flex;
		justify-content:center;
		align-items:center;
		margin-top:20px;
		height:60px;
		background:#23282D;
		color:#666;
		text-align:center;
		line-height:60px;
		font-size: 18px;
		.textcolor{
			color:@hovercolor;
			margin-left: 5px;
		}
		.textcolor:hover{
			font-weight: bold;
		}
	}
	.foo{
		width: 100%;
		position: absolute;
		bottom: 0;
	}
</style>
<style lang="less" scoped>

@media screen and (max-width: 860px) {
	.footer {
			height:40px;
			background:#23282D;
			color:#666;
			text-align:center;
			line-height:40px;
			font-size: 12px;
	}
}
@media screen and (max-width: 570px) {

}
</style>