<template>
  <div class="header-wrapper">
		<div class="header">
			<div class="logo">
        <span class="icon"></span>
      </div>
			<div class="channel" @click="toChannel()">
        <i class="icon iconfont icon-home"></i>
        首页
      </div>
			<div class="notice" @click="toRegister()">
        <i class="icon iconfont icon-mail"></i>
        通知
      </div>      
			<div class="setting" @click="toSetting()">
        <i class="icon iconfont icon-cascades"></i>
        设置
      </div>
			<div class="register" @click="toRegister()">
        <i class="icon iconfont icon-edit"></i>
        注册
      </div>
			<div class="search-box">
        <input type="text" placeholder="请输入关键字">
        <i class="icon iconfont icon-search"></i>        
      </div>
		</div>
  </div>
</template>

<script>
import Router from '@/router'
export default {
  data () {
    return {
      iconUrl: ''
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
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 20px;
	z-index: 9999;
	.header {
    width: 1170px;
    margin: 0 auto;
		div {
      display: inline-block;
      margin-right: 10px;
      height: 26px;
      line-height: 26px;
      padding: 15px;
      font-size: 17px;
      vertical-align: top;
      cursor: pointer;
      i { font-size: 20px; }
      &.channel { color: #ff790f; }
      &:hover { color: #ff790f; background: #f5f5f5; }
    }
    .logo {
      float: left;
      width: 110px;
      height: 56px;
      padding: 0;
      margin-right: 30px;      
      .icon {
        display: inline-block;
        width: 110px;
        height: 56px;
        background: url('../assets/image/icon.png')
      }
    }
		.search-box {
      position: relative;
      padding-left: 15px;
			input {
				width: 200px;
        height: 36px;
        margin-top: -10px;
        padding: 0 20px;
        line-height: 36px;
        border: none;
        border-radius: 20px;
        font-size: 14px;
        background: #eee;
				outline: none;
      }
      i { position: absolute; top: 15px; right: 25px; font-size: 18px; }
      &:hover { background: #fff; }
		}
	}
}
</style>
