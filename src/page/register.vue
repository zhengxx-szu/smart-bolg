<template>
  <div class="register">
    <div class="logo">壹观</div>
    <div class="register-wrapper">
      <div class="register-box">
        <div class="error-msg" v-if="show_error">
          <i class="icon iconfont icon-roundclosefill"></i>
          {{error_msg}}
        </div>
        <div class="input-box">
          <input id="account" type="text" placeholder="请输入账号" ref="account">
          <i class="icon iconfont icon-people"></i>
        </div>
        <div class="input-box">
          <input id="email" type="text" placeholder="请输入邮箱" ref="email">
          <i class="icon iconfont icon-mail"></i>          
        </div>
        <div class="input-box">
          <input id="password" type="password" placeholder="请输入密码" ref="password">
          <i class="icon iconfont icon-lock"></i>
        </div>
        <div class="info">
          <i class="icon iconfont icon-infofill"></i>
          密码由数字和字母组成，且长度要在8-16位之间
        </div>
        <div class="submit-btn" @click="toSubmit">注册</div>
      </div>
    </div>
  </div>
</template>

<script>
import { toRegister } from '@/api/register'
import Router from '@/router'
import md5 from 'md5'
export default {
  data () {
    return {
      error_msg: '',
      show_error: false
    }
  },
  methods: {
    toSubmit () {
      this.show_error = false
      let pwd_RegExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
      let email_RegExp = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (!this.$refs.password.value.match(pwd_RegExp)) {
        this.show_error = true
        this.error_msg = '密码格式错误'
      } else if (!this.$refs.email.value.match(email_RegExp)) {
        this.show_error = true
        this.error_msg = '邮箱格式错误'
      } else {
        let params = {
          account: this.$refs.account.value,
          password: md5(this.$refs.password.value),
          email: this.$refs.email.value
        }
        toRegister(params).then((res) => {
          if (res.state !== 'ok' ) {
            this.show_error = true
            this.error_msg = res.content
          } else {
            Router.push('/channel')
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.register {
  position: fixed;
  top: -50px;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: url('.././assets/image/login_bg.png');
  background-size: cover;
  background-attachment: fixed;
  .logo {
    width: 103px;
    margin: 130px auto;
    color: #f0821b;
    font-size: 50px;
    font-family: 'Hanzipen SC';
    font-weight: bold;
  }
  .register-wrapper {
    position: absolute;
    top: 230px;
    left: 50%;
    margin-left: -200px;
    width: 300px;
    padding: 28px 50px 0;
    background-color: rgba(255,255,255,.9);
    .error-msg {
      position: absolute;
      top: -58px;
      font-size: 14px;
      line-height: 14px;
      height: 14px;
      color: #444;
      width: 274px;
      padding: 12px;
      border: 1px solid #ff8140;
      border-radius: 5px;
      background-color: #fff5f5;
      z-index: 10;
      .icon { color: #ff8140; margin-right: 5px; }
    }
    .register-box {
      position: relative;
      .input-box {
        position: relative;
        font-size: 14px;
        margin-bottom: 12px;
        color: #666;
        input {
          width: 268px;
          font-size: 14px;
          line-height: 28px;
          height: 28px;
          padding: 4px 15px;
          border: 1px solid #ccc;
          background: #f5f5f5;
          border-radius: 5px;
          z-index: 1;
          outline: none;
        }
        .icon {
          position: absolute;
          top: 9px;
          right: 15px;
          font-size: 18px;
        }
      }
      .info {
        color: #666;
        font-size: 12px;
        margin-top: 20px;
        .icon {font-size: 12px;}
      }
      .submit-btn {
        color: #fff;
        font-size: 18px;
        line-height: 36px;
        width: 300px;
        text-align: center;
        background-color: #ff8140;
        border-radius: 5px;
        margin: 20px 0 30px;
        cursor: pointer;
      }
    }
  }
}
</style>
