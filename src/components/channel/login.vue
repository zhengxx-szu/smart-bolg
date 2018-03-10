<template>
  <div class="login">
    <div class="unlogin-wrapper">
      <div class="unlogin-title">账号登陆</div>
      <div class="unlogin-body">
        <input class="account" type="text" placeholder="请输入用户名">
        <input class="password" type="text" placeholder="请输入密码">
        <label for="save_state" class="auto-login" >
          <input type="checkbox" id="save_state" checked="check">
          <span class="save-label">记住用户</span>
        </label>
      </div>
      <a class="login-btn" href="javascript:void(0)">
        <span class="login-btn-text">登录</span>
      </a>
      <div class="register">
        <span>还没有账号？</span>
        <a id="to_register" href="">立即注册</a>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'this is login'
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  width: 300px;
  padding: 20px;
  margin-bottom: 20px;
  background: #f2f2f5;
  font-size: 14px;
  .unlogin-wrapper {
    padding: 0 15px;
    background: #fff;
    overflow: auto;
    .unlogin-title {
      height: 30px;
      line-height: 30px;
      padding-top: 11px;
      text-align: center;
      border-bottom: 3px solid #fa7d3c;
      margin-bottom: 16px;
    }
    .unlogin-body {
      .account, .password {
        display: block;
        width: 253px;
        height: 30px;
        margin-top: 12px;
        padding-left: 15px; 
        border: 1px solid #ddd;
        outline: none;
      }
      .auto-login {
        display: block;
        margin-top: 12px;
        height: 15px;
        font-size: 12px;
      }
    }
    .login-btn {
      display: block;
      width: 270px;
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
}
</style>
