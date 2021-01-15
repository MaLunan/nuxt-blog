<template>
<div>
	<div class="nav">
a
	</div>

</div>
</template>

<script>
export default {
	data() {
		return {
			activeIndex:'index'
		}
	},
	methods:{
		handleSelect(key){
			this.$router.push({name:key});
		}
	},
	props:['active']
}
</script>
<style lang="less">
.NavHeader {
	z-index:10;
	background:transparent;
	position:absolute;
	top:0;
	left:0;
  width:100%;
}

</style>
