<template>
  <div class="login">
    <div class="unlogin-wrapper"  v-show="!info">
      <div class="unlogin-title">壹观·登陆</div>
      <div class="unlogin-body">
        <input class="account" type="text" placeholder="请输入用户名" ref="account" @focus="hideError">
        <input class="password" type="password" placeholder="请输入密码" ref="password" @focus="hideError">
        <label for="save_state" class="auto-login" >
          <input type="checkbox" id="save_state" checked="check">
          <span class="save-label">记住用户</span>
        </label>
      </div>
      <div class="error-msg" v-if="show_error">
        <i class="icon iconfont icon-roundclosefill"></i>
        {{error_msg}}
      </div>
      <a class="login-btn" href="javascript:void(0)" @click="login">
        <span class="login-btn-text">登录</span>
      </a>
      <div class="register">
        <span>还没有账号？</span>
        <a id="to_register" href="javascript:void(0)" @click="toRegister">立即注册</a>
        </div>
    </div>
    <div class="login-wrapper" v-if="info">
      <div class="top-wrapper">
        <div class="logout" @click="logout"><span>退出登录</span></div>
        <div class="base-info" @click="toUser">
          <div class="avatar"><img :src="info.avatar"></div>
          <div class="name">{{info.username}}</div>
        </div>
      </div>
      <div class="bottom-wrapper" @click="toUser">
        <div class="follow">
          <span class="count">{{info.follow.length}}</span>
          <span>关注</span>
        </div>
        <div class="line"></div>
        <div class="fans">
          <span class="count">{{info.fans.length}}</span>
          <span>粉丝</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toLogin } from '@/api/register'
import { mapGetters, mapActions } from 'vuex'
import Router from '@/router'
import md5 from 'md5'
export default {
  data () {
    return {
      show_error: false,
      error_msg: ''
    }
  },
  computed: {
    ...mapGetters(['token', 'info'])
  },
  methods: {
    ...mapActions(['set_token', 'set_info', 'set_userPageId']),
    hideError () {
      this.show_error = false
    },
    login () {
      if (!this.$refs.account.value || !this.$refs.password.value) {
        this.show_error = true
        this.error_msg = '账号密码不能为空'
        return false
      }
      let params = {
        account: this.$refs.account.value,
        password: md5(this.$refs.password.value)
      }
      toLogin(params).then(res => {
        if (res.state !== 'ok') {
          this.show_error = true
          this.error_msg = res.content
        } else {
          this.set_token(res.token)
          this.set_info(res.info)
        }
      })
    },
    toRegister () {
      Router.push('/register')
    },
    logout () {
      this.set_info('')
      this.set_token('')
    },
    toUser () {
      this.set_userPageId(this.token)
      Router.push('/user')
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  width: 300px;
  padding: 20px;
  margin-bottom: 20px;
  background: #f7f7f7;
  font-size: 14px;
  .unlogin-wrapper {
    position: relative;
    padding: 0 30px;
    background: #fff;
    border: 1px solid #ddd;
    overflow: auto;
    .unlogin-title {
      height: 30px;
      line-height: 30px;
      padding-top: 21px;
      font-size: 20px;
      font-weight: 500;
      color: #fa7d3c;
      text-align: center;
      margin-bottom: 16px;
    }
    .unlogin-body {
      .account, .password {
        display: block;
        width: 206px;
        height: 35px;
        margin-top: 12px;
        padding: 0 15px;
        background: #f2f2f2;
        border: 1px solid #ddd;
        border-radius: 5px;
        font-size: 14px;
        outline: none;
      }
      .auto-login {
        display: block;
        margin-top: 12px;
        height: 15px;
        font-size: 12px;
      }
    }
    .error-msg {
      position: absolute;
      top: 10px;
      font-size: 12px;
      line-height: 12px;
      width: 216px;
      height: 12px;
      color: #444;
      padding: 10px;
      font-size: 14px;
      border: 1px solid #ff8140;
      border-radius: 5px;
      background-color: #fff5f5;
      z-index: 10;
      .icon { color: #ff8140; margin-right: 5px; font-size: 16px; }
    }
    .login-btn {
      display: block;
      width: 240px;
      height: 32px;
      line-height: 32px;
      background: #ff8140;
      color: #fff;
      border-radius: 2px;
      margin-top: 15px;
      text-decoration: none;
      text-align: center;
      font-size: 16px;
    }
    .register {
      margin: 12px 0;
      height: 15px;
      font-size: 12px;
      #to_register {
        color: #fa7d3c;
        text-decoration: none;
      }
    }
  }
  .login-wrapper {
    position: relative;
    background: #fff;
    border: 1px solid #e8e8e8;
    padding: 8px 8px 10px;
    text-align: center;
    .top-wrapper {
      .logout { float: right; font-size: 12px; color: #999; cursor: pointer; }
      .base-info {
        padding-top: 15px;
        .avatar img { width: 56px; height: 56px; border-radius: 50%; }
        .name { margin-top: 7px; font-size: 16px; line-height: 22px; color: #333; }
      }
    }
    .bottom-wrapper {
      position: relative;
      padding-top: 10px;
      div { display: inline-block; }
      .line { position: absolute; top: 0; width: 1px; height: 64px; transform: scale(.5); background: #e8e8e8; }
      .follow, .fans {
        width: 138px;
        height: 50px;
        span { display: block; font-size: 14px; line-height: 20px; color: #777; }
        .count { margin-bottom: 2px; line-height: 28px; font-size: 20px; font-weight: 600; color: #222; }
      }
    }
  }
}
</style>
