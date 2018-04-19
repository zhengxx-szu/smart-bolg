 <template>
  <div class="model-wrapper">
    <div class="model-master"></div>
    <div class="model">
      <a class="close" @click="confirm">×</a>
      <div class="main">
        <div class="title">
          <div class="avatar"><img :src="avatar"></div>
          <span>{{title}}</span>
        </div>
        <div class="content">
          <div>{{content}}</div>
        </div>
        <div class="btn" @click="confirm">{{btnText}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    content: { type: String, default: '请先登陆账户！'},
    avatar: { type: String, default: 'http://www.qdaily.com/images/missing_face.png'},
    btnText: { type: String, default: '确定'}
  },
  data () {
    return {
      // content: '请先登陆账号'
    }
	},
	methods: {
		confirm () {
      this.$emit('hide')
    }
	}
}
</script>

<style lang="less" scoped>
.model-wrapper {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: transparent;
  z-index: 9999;
  .model-master {
    background-color: rgba(0, 0, 0, 0.7);
    position: absolute; left: 0; right: 0; top: 0; bottom: 0;
    transition: opacity 0.3s;
    opacity: 1;
  }
  .model {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 620px;
    background: #fff;
    text-align: center;
    border-radius: 6px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    transform: translate3d(-50%, -50%, 0);
    .close {
      position: absolute;
      right: 16px;
      top: 20px;
      font-size: 26px;
      color: #999;
      font-weight: 700;
      cursor: pointer;
    }
    .main {
      padding: 40px 60px;
      margin: 0;
      font-size: 16px;
      font-weight: 700;
      .title {
        display: flex;
        margin: 20px 0 40px;
        justify-content: center;
        align-items: center;
        .avatar img { width: 36px; height: 36px; margin-right: 10px; border-radius: 50%; }
      }
      .content {
        font-size: 14px;
        color: #666;
        font-weight: normal;
        margin-bottom: 40px;
      }
      .btn {
        display: inline-block;
        padding: 8px 25px;
        font-size: 16px;
        font-weight: 400;
        line-height: 1.5;
        color: #fff;
        background-color: #ea6f5a;
        border-radius: 20px;
        margin-bottom: 20px;
      }
    }
  }
}
</style>
