<template>
  <div class="setting-wrapper">
    <div class="bg-shadow"></div>
    <div class="outter-box">
      <div class="main-box">
        <h1>个人资料</h1>
        <ul class="setting-list">
          <li class="item">
            <span class="title">头像</span>
            <div class="avatar-upload">
              <input type="file" ref="avatar" style="display: none;" @change="upload">
              <div class="avatar"><img :src="avatarUrl"></div>
              <div class="action-box">
                <div class="hint">支持 jpg、png 格式大小 5M 以内的图片</div>
                <button class="upload-btn" @click="uploadClick">点击上传</button>
              </div>
            </div>
          </li>
          <li class="item">
            <span class="title">昵称</span>
            <div class="input-box">
              <input class="input" placeholder="请输入您的昵称" ref="username" @focus="changeInfo(0)" @blur="onBlur(0)">
              <div class="action-box">
                <button class="edit-btn" v-show="editBtn[0]" @click="changeInfo(0)">
                  <i class="icon iconfont icon-edit"></i>
                  <span>修改</span>
                </button>
                <button class="confirm-btn" v-show="confirmBtn[0]" @click="updateInfo(0)">
                  <i class="icon iconfont icon-roundcheck"></i>
                  <span>保存</span>
                </button>
              </div>
            </div>
          </li>
          <li class="item">
            <span class="title">邮箱</span>
            <div class="input-box">
              <input class="input" placeholder="请输入您的邮箱" ref="email" @focus="changeInfo(1)" @blur="onBlur(1)">
              <div class="action-box">
                <button class="edit-btn" v-show="editBtn[1]" @click="changeInfo(1)">
                  <i class="icon iconfont icon-edit"></i>
                  <span>修改</span>
                </button>
                <button class="confirm-btn" v-show="confirmBtn[1]" @click="updateInfo(1)">
                  <i class="icon iconfont icon-roundcheck"></i>
                  <span>保存</span>
                </button>
              </div>
            </div>
          </li>
          <li class="item">
            <span class="title">新密码</span>
            <div class="input-box">
              <input type="password" class="input" placeholder="请输入您的新密码" ref="password" @focus="changeInfo(2)"  @blur="onBlur(2)">
              <div class="action-box">
                <button class="edit-btn" v-show="editBtn[2]" @click="changeInfo(2)">
                  <i class="icon iconfont icon-edit"></i>
                  <span>修改</span>
                </button>
                <button class="confirm-btn" v-show="confirmBtn[2]" @click="updateInfo(2)">
                  <i class="icon iconfont icon-roundcheck"></i>
                  <span>保存</span>
                </button>
              </div>
            </div>
          </li>
          <li class="item">
            <span class="title">个人介绍</span>
            <div class="input-box">
              <input class="input" placeholder="请输入您的个人介绍" ref="signature" @focus="changeInfo(3)"  @blur="onBlur(3)">
              <div class="action-box">
                <button class="edit-btn" v-show="editBtn[3]" @click="changeInfo(3)">
                  <i class="icon iconfont icon-edit"></i>
                  <span>修改</span>
                </button>
                <button class="confirm-btn" v-show="confirmBtn[3]" @click="updateInfo(3)">
                  <i class="icon iconfont icon-roundcheck"></i>
                  <span>保存</span>
                </button>
              </div>
            </div>
          </li>
          <li class="item">
            <span class="title">个人主页</span>
            <div class="input-box">
              <input class="input" placeholder="请输入您的个人主页" ref="homepage" @focus="changeInfo(4)"  @blur="onBlur(4)">
              <div class="action-box">
                <button class="edit-btn" v-show="editBtn[4]" @click="changeInfo(4)">
                  <i class="icon iconfont icon-edit"></i>
                  <span>修改</span>
                </button>
                <button class="confirm-btn" v-show="confirmBtn[4]" @click="updateInfo(4)">
                  <i class="icon iconfont icon-roundcheck"></i>
                  <span>保存</span>
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { sendAvatar, getUserInfo, updateInfo } from '@/api/user'
import { mapGetters, mapActions } from 'vuex'
import md5 from 'md5'
export default {
  data () {
    return {
      editBtn: {
        0: true,
        1: true,
        2: true,
        3: true,
        4: true
      },
      confirmBtn: {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false
      },
      userInfo: '',
      avatarUrl: 'http://www.qdaily.com/images/missing_face.png'
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  created () {
    this._getUserInfo()
  },
  methods: {
    _getUserInfo () {
      getUserInfo({ user_id: this.token }).then(res => {
        this.userInfo = res
        this.$refs.username.value = this.userInfo.username
        this.$refs.email.value = this.userInfo.email
        this.$refs.password.value = this.userInfo.password
        this.$refs.signature.value = this.userInfo.signature
        this.$refs.homepage.value = this.userInfo.homepage
        this.avatarUrl = this.userInfo.avatar
      })
    },
    changeInfo (index) {
      switch (index) {
        case 0: this.$refs.username.focus(); break;
        case 1: this.$refs.email.focus(); break;
        case 2: this.$refs.password.focus(); break;
        case 3: this.$refs.signature.focus(); break;
        case 4: this.$refs.homepage.focus(); break;
      }
      this.editBtn[index] = false
      this.confirmBtn[index] = true
    },
    updateInfo (index) {
      let params = { user_id: this.token }
      switch (index) {
        case 0:
          params.type = 'username';
          params.value = this.$refs.username.value
          break;
        case 1:
          params.type = 'email';
          params.value = this.$refs.email.value
          break;
        case 2:
          params.type = 'password';
          params.value = md5(this.$refs.password.value)
          break;
        case 3:
          params.type = 'signature';
          params.value = this.$refs.signature.value
          break;
        case 4:
          params.type = 'homepage';
          params.value = this.$refs.homepage.value
          break;
      }
      console.log(params)
      updateInfo(params).then(res => this._getUserInfo())
    },
    onBlur (index) {
      if (index === 0 && this.$refs.username.value === this.userInfo.username) {
        this.editBtn[index] = true
        this.confirmBtn[index] = false
      }
      if (index === 1 && this.$refs.email.value === this.userInfo.email) {
        this.editBtn[index] = true
        this.confirmBtn[index] = false
      }
      if (index === 2 && this.$refs.password.value === this.userInfo.password) {
        this.editBtn[index] = true
        this.confirmBtn[index] = false
      }
      if (index === 3 && this.$refs.signature.value === this.userInfo.signature) {
        this.editBtn[index] = true
        this.confirmBtn[index] = false
      }
      if (index === 4 && this.$refs.homepage.value === this.userInfo.homepage) {
        this.editBtn[index] = true
        this.confirmBtn[index] = false
      }
    },
    uploadClick () {
      this.$refs.avatar.click()
    },
    upload () {
      if (this.$refs.avatar.files.length !== 0) {
        let image = new FormData()
        image.append('avatar', this.$refs.avatar.files[0])
        image.append('user_id', this.token)
        sendAvatar(image).then(res => {
          this.avatarUrl= 'http://127.0.0.1:3000/' + res.url
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.setting-wrapper {
  width: 700px;
  margin: 40px auto;
  .bg-shadow {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #f5f5f5;
  }
  .outter-box {
    position: relative;
    padding: 50px;
    background: #fff;
    .main-box {
      h1 { margin: 20px 0; font-size: 24px; font-weight: 700; }
      ul {
        li {
          display: flex;
          align-items: center;
          padding: 24px 0;
          border-top: 1px solid #f1f1f1;
          span { width: 120px; font-size: 15px; line-height: 1.5; }
          .input-box {
            display: flex;
            flex: 1;
            .input {
              flex: 1;
              font-size: 16px;
              border: none;
              outline: none;
              color: #909090;
            }
            .action-box {
              margin-left: 12px;
              .edit-btn, .confirm-btn {
                background: #fff;
                font-size: 18px;
                border: none;
                cursor: pointer;
                outline: none;
                color: #ff790f;
              }
              .edit-btn { color: #333; }
            }
          }
          &:first-child { padding: 12px 0; }
          .avatar-upload {
            display: flex;
            .avatar { flex: 0 0 auto; width: 72px; height: 72px; margin-right: 12px; background: #ccc; }
            .avatar img { width: 72px; height: 72px; }
            .action-box {
              margin-left: 12px;
              .hint { font-size: 12px; color: #909090; margin: 5px 0 10px; line-height: 22px; }
              .upload-btn {
                padding: 6px 16px;
                border: none;
                border-radius: 2px;
                background-color: #ff790f;
                color: #fff;
                outline: none;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
}
</style>
