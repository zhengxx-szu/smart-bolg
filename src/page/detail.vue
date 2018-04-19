<template>
  <div class="detail">
    <div class="left-wrapper">
      <div class="blog-detail">
        <h1 class="title">{{title}}</h1>
        <div class="source">
          <span>{{source}}</span>
          <span>{{time}}</span>
        </div>
        <div class="content" v-html="content"></div>
        <div class="info-wrapper">
          <div class="key-word" v-if="blogInfo && blogInfo.keyword.length > 0">
            <i class="icon iconfont icon-location"></i>
            <span v-for="(item, index) in blogInfo.keyword" :key="index">{{item}}</span>
          </div>
          <div class="handle"></div>
        </div>
      </div>
      <div class="comment-wrapper">
        <h3><span>{{blogInfo && blogInfo.comment.length || 0}}</span>条评论</h3>
        <div class="new-comment">
          <div class="avatar">
            <img :src="info && info.avatar || 'http://www.qdaily.com/images/missing_face.png'">
          </div>
          <textarea placeholder="写下你的评论..." ref="new_comment"></textarea>
          <div class="comment-btn" @click="sendComment">发送</div>
        </div>
        <div class="comments" v-if="comment.length > 0">
          <ul>
            <li v-for="(item, index) in comment" :key="index">
              <div class="author">
                <div class="avatar"><img :src="item.avatar"></div>
                <div class="info">
                  <div class="name">
                    <span @click="toUser(item.user_id)">{{item.name}}</span>
                    <i v-if="item.reply_user_id">回复<span @click="toUser(item.reply_user_id)">@{{item.reply_name}}</span></i>
                  </div>
                  <div class="time">{{index+1}}楼·{{item.time}}</div>
                </div>
              </div>
              <div class="content">{{item.content}}</div>
              <div class="tool">
                <div class="reply-btn" @click="reply(item, index)">
                  <i class="icon iconfont icon-commentfill"></i>
                  <span>回复</span>
                </div>
              </div>
              <div class="reply" ref="reply" style="display: none;">
                <textarea placeholder="写下你的评论..." ref="new_reply"></textarea>
                <div class="send-reply" @click="sendComment(item, index)">发送</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="right-wrapper">
		  <login></login>
      <hot-news></hot-news>
      <hot-topic></hot-topic>
    </div>
    <model v-if="showModel" :title="modelTitle" @hide="hideModel"></model>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { getBlogDetail, getBlogInfo, sendComment, getComment } from '@/api/channel'
import { reportComment } from '@/api/ubt'
import format from '@/assets/util'
import login from '@/components/channel/login'
import hotNews from '@/components/channel/hotNews'
import hotTopic from '@/components/channel/hotTopic'
import Router from '@/router'
import model from '@/components/model'
export default {
  components: {
    login,
    hotNews,
    hotTopic,
    model
	},
  data () {
    return {
      title: '',
      source: '',
      time: '',
      content: '',
      blogInfo: '',
      showModel: false,
      modelTitle: '',
      comment: []
    }
  },
  computed: {
    ...mapGetters(['blogId', 'token', 'info'])
  },
  created () {
    let params = {article_id: this.blogId, user_id: this.token || 0}
    getBlogDetail(this.blogId).then(res => {
      this.title = res.data.title
      this.source = res.data.source
      this.time = format(new Date(res.data.publish_time * 1000))
      this.content = res.data.content
    })
    getBlogInfo(params).then(res => this.blogInfo = res)
    getComment(params).then(res => this.comment = res)
  },
  methods: {
    ...mapActions(['set_userPageId']),
    checkToken (title) {
      if (this.token === '') {
        this.modelTitle = title
        this.showModel = true
        return false
      }
      return true
    },
    hideModel () {
      this.showModel = false
    },
    sendComment (reply, index) {
      if (this.checkToken('评论') === false) return false
      let params = {
        user_id: this.token,
        article_id: this.blogId,
        time: format(new Date()),
        content: this.$refs.new_comment.value
      }
      if (reply && index !== undefined) {
        params.reply_user_id = reply.user_id
        params.content = this.$refs.new_reply[index].value
      }
      sendComment(params).then(() => {
        if (reply && index) this.$refs.new_reply[index].value = ''
        this.$refs.new_comment.value = ''
        getComment(params).then(res => this.comment = res)
      })
      // 用户评论行为
      let ubtParams = {
        user_id: this.token,
        article_id: this.blogId
      }
      reportComment(ubtParams)
    },
    reply (comment, index) {
      this.$refs.reply[index].style.display === 'none'
        ? this.$refs.reply[index].style.display = 'block'
        : this.$refs.reply[index].style.display = 'none'
    },
    toUser (id) {
      this.set_userPageId(id)
      Router.push('/user')
    }
  }
}
</script>

<style lang="less" scoped>
.detail {
  display: flex;
  width: 1170px;
  margin: 0 auto;
  padding: 16px 0 0 0;
  .left-wrapper {
    width: 660px;
    margin-left: 140px;
    margin-right: 30px;
    .blog-detail {
      .title {
        font-size: 34px;
        font-weight: 700;
        line-height: 44px;
        color: #222;
      }
      .source {
        margin-top: 12px;
        margin-bottom: 20px;
        font-size: 13px;
        color: #777;
        span {margin-right: 20px;}
      }
      .content {
        font-size: 16px;
        line-height: 28px;
        color: #222;
        word-wrap: break-word;
      }
      .info-wrapper {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        .key-word {
          color: rgb(202, 202, 202);
          span { padding-left: 10px; font-size: 14px; color: #406599; }
          span::after { content: '/'; padding-left: 10px; color: rgb(202, 202, 202); }
          span:last-child::after { content: ''; }
        }
      }
    }
    .comment-wrapper {
      margin: 50px 0;
      h3 { font-size: 16px; font-weight: 700; color: #657180; }
      h3 span { color: #f85959; }
      .new-comment {
        position: relative;
        margin: 20px 0 20px 50px;
        .avatar {
          position: absolute;
          left: -50px;
          img { width: 40px; height: 40px; border-radius: 50%; }
        }
        .comment-btn {
          position: absolute;
          top: 0;
          right: 0;
          width: 60px;
          height: 102px;
          line-height: 100px;
          text-align: center;
          background: #ff8140;
          color: #fff;
          border-radius: 0 4px 4px 0;
        }
        textarea {
          padding: 10px 75px 10px 15px;
          width: 518px;
          height: 80px;
          border: 1px solid #dcdcdc;
          border-radius: 4px;
          background-color: hsla(0, 0%, 71%, 0.1);
          resize: none;
          outline: none;
        }
      }
      .comments {
        ul li {
          position: relative;
          padding: 20px 0 30px;
          border-top: 1px solid #f0f0f0;
          .author {
            display: flex;
            margin-bottom: 15px;
            .avatar img { width: 40px; height: 40px; border-radius: 50%; margin-right: 10px; }
            .info { height: 40px; line-height: 20px; }
            .time { font-size: 12px; color: #969696; }
            .name {
              font-size: 15px;
              span { color: #406599; margin-left: 5px; cursor: pointer; }
              span:hover { color: #ff8140; }
            }
          }
          .tool {
            position: absolute;
            right: 0;
            top: 20px;
            color:#666;
            .reply-btn {
              display: flex;
              align-items: center;
              cursor: pointer;
              font-size: 13px;
              i { margin-right: 5px; }
              span { height: 16px; line-height: 16px; }
              &:hover { color: #f85959; }
            }
          }
          .reply {
            position: relative;
            margin-top: 20px;
            padding-left: 48px;
            border-left: 2px solid #d9d9d9;
            .send-reply {
              position: absolute;
              top: 0;
              right: 0;
              width: 60px;
              height: 82px;
              line-height: 82px;
              text-align: center;
              background: #ff8140;
              color: #fff;
              border-radius: 0 4px 4px 0;
            }
            textarea {
              padding: 10px 75px 10px 15px;
              width: 518px;
              height: 60px;
              border: 1px solid #dcdcdc;
              border-radius: 4px;
              background-color: hsla(0, 0%, 71%, 0.1);
              resize: none;
              outline: none;
            }
          }
        }
      }
    }
  }
  .right-wrapper {
    width: 340px;
  }
}
</style>
