<template>
  <div class="header-wrapper">
		<div class="header">
			<div class="logo"></div>
			<div class="search-box"><input type="text" placeholder="请输入关键字"></div>
			<div class="channel" @click="toChannel()">首页</div>
			<div class="hot">热门</div>
			<div class="setting" @click="toSetting()">设置</div>
			<div class="register" @click="toRegister()">注册</div>
		</div>
  </div>
</template>

<script>
import Router from '@/router'
export default {
  data () {
    return {
      msg: 'this is login'
    }
	},
	methods: {
		toChannel () {
			Router.push('/channel')
		},
		toRegister () {
			Router.push('/register')
		},
		toSetting () {
			Router.push('/setting')
		}
	}
}
</script>

<style lang="less" scoped>
.header-wrapper {
	position: fixed;
	width: 100%;
	height: 48px;
	box-shadow: 0 0 6px 2px rgba(0,0,0,0.15);
	background: rgba(255, 255, 255, 0.95);
	overflow: hidden;
	.header {
		width: 1170px;
		margin: 11px auto;
		div {
			display: inline-block;
			width: 50px;
			margin-right: 18px;
			cursor: pointer;
			&.channel, &:hover{
				color: #ff790f;
			}
		}
		.logo { width: 110px; margin-right: 30px; }
		.search-box {
			width: 660px;
			margin-right: 30px;
			input {
				width: 440px;
				height: 20px;
				padding: 4px 33px 4px 10px;
				outline: none;
			}
		}
	}
}
</style>
