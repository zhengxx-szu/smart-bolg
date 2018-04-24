<template>
  <div class="blog-list">
    <ul class="blog-list-wrapper">
      <li class="blog-item" v-for="(item, index) in blogList" :key="index">
        <div class="item-left">
          <img :src="item.useravatar" :onerror="defaultImg">
        </div>
        <div class="item-right" @click="toDetail(item.id)">
          <div class="blog-info">
            <span class="media-name">{{item.username}}</span>
            <span class="media-time" v-text="formatTime(item.time)"></span>
          </div>
          <div class="blog-detail">
            <span class="title" :title="item.title">{{item.title}}</span>
            <span class="content">{{item.content}}...</span>
            <span class="image" v-if="item.imgList.length>0">
              <div v-for="(imageItem, index) in item.imgList" :key="index">
                <img :src="imageItem.url" :onerror="defaultImg">
              </div>
            </span>
          </div>
        </div>
        <div class="item-handle">
          <div :class="info && info.collect.indexOf(item.id) !== -1 ? 'collect active' : 'collect'" @click="collect(item, index)" ref="collect">
            <i class="icon iconfont icon-like"></i>收藏
          </div>
          <div class="transmit" @click="transmit(item, index)">
            <i class="icon iconfont icon-forward"></i>
            <span>转发({{item.transmit.length}})</span>
          </div>
          <div class="comment" @click="comment(item)">
            <i class="icon iconfont icon-comment"></i>
            <span>评论({{item.comment.length}})</span>
          </div>
          <div :class="item.favor.indexOf(token) === -1 ? 'favor' : 'favor active'" @click="favor(item, index)" ref="favor">
            <i class="icon iconfont icon-appreciate_light"></i>
            <span class="favorText">赞({{item.favor.length}})</span>
          </div>
        </div>
      </li>
    </ul>
    <div class="load-more" @click="loadMore">{{load_msg}}</div>
    <model v-if="showModel" :title="modelTitle" :avatar="currentBlog.useravatar" @hide="hideModel"></model>
    <transmit
      v-if="showTransmit"
      :title="transmitTitle"
      :avatar="currentBlog.useravatar"
      btnText="转发"
      @send="sendTransmit"
      @hideTransmit="hideTransmit">
    </transmit>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { getBlogList, addFavor, addCollect, sendTransmit } from '@/api/channel'
import { reportDetail, reportFavor, reportCollect, reportTransmit } from '@/api/ubt'
import Router from '@/router'
import format from '@/assets/util'
import model from '@/components/model'
import transmit from '@/components/transmit'
export default {
  components: {
    model,
    transmit
  },
  data () {
    return {
      load_msg: '点击加载更多',
      showModel: false,
      showTransmit: false,
      modelTitle: '',
      transmitTitle: '',
      favorCount: 0,
      currentBlog: '',
      defaultImg: 'this.src="' + require('../../assets/image/imgError.png') + '"'
    }
  },
  computed: {
    ...mapGetters(['blogList', 'activeType', 'page', 'token', 'info'])
  },
  methods: {
    ...mapActions(['loadMoreBlog', 'set_blogId', 'set_page']),
    formatTime (time) {
      return format(new Date(time * 1000))
    },
    loadMore () {
      let page = this.page + 1
      this.set_page(page)
      this.load_msg = '加载中···'
      getBlogList(this.activeType, this.page, this.token).then(res => {
        this.loadMoreBlog(res)
        this.load_msg = '点击加载更多'
      })
    },
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
    hideTransmit () {
      this.showTransmit = false
    },
    toDetail (id) {
      let ubtParams = {
        user_id: this.token,
        article_id: id
      }
      this.set_blogId(id)
      reportDetail(ubtParams)
      Router.push('/detail')
    },
    favor (item, index) {
      this.currentBlog = item
      if (this.checkToken(`给${item.username}点赞`) === false) return false
      let params = {
        article_id: item.id,
        user_id: this.token
      }
      addFavor(params).then(res => {
        if (this.$refs.favor[index].className === 'favor') {
          this.$refs.favor[index].className += ' active'
          this.$refs.favor[index].lastChild.innerHTML = `赞(${item.favor.length + 1})`
        } else {
          this.$refs.favor[index].className = 'favor'
          this.$refs.favor[index].lastChild.innerHTML = `赞(${item.favor.length})`
        }
      })
      let ubtParams = {
        user_id: this.token,
        article_id: item.id
      }
      reportFavor(ubtParams)
    },
    transmit (item, index) {
      this.currentBlog = item
      if (this.checkToken(`转发${item.username}`) === false) return false
      this.transmitTitle = item.title
      this.showTransmit = true
    },
    sendTransmit (content) {
      let params = {
        user_id: this.token,
        article_id: this.currentBlog.id,
        content
      }
      sendTransmit(params).then(() => {})
      let ubtParams = {
        user_id: this.token,
        article_id: this.currentBlog.id,
      }
      reportTransmit(ubtParams)
    },
    collect (item, index) {
      this.currentBlog = item
      if (this.checkToken(`收藏${item.username}`) === false) return false
      let params = {
        article_id: item.id,
        user_id: this.token
      }
      addCollect(params).then(res => {
        if (this.$refs.collect[index].className === 'collect') {
          this.$refs.collect[index].className += ' active'
        } else {
          this.$refs.collect[index].className = 'collect'
        }
      })
      let ubtParams = {
        user_id: this.token,        
        article_id: item.id
      }
      reportCollect(ubtParams)
    },
    comment (item) {
      this.set_blogId(item.id)
      Router.push('/detail')
    }
  }
}
</script>

<style lang="less" scoped>
.blog-list {
  width: 660px;
  margin-right: 30px;
  min-height: 1200px;
  .blog-list-wrapper {
    .blog-item {
      position: relative;
      background: #f7f7f7;
      padding-top: 20px;
      margin-bottom: 10px;
      .item-left {
        position: absolute;
        top: 20px;
        left: 30px;
        img { width: 50px; height: 50px; border-radius: 50%; }
      }
      .item-right {
        margin: 0 30px 10px 90px;
        .blog-info {
          span { display: block; }
          .media-name { height: 30px; line-height: 30px; font-size: 16px; color: #333; }
          .media-time { height: 20px; font-size: 13px; color: #666; }
        }
        .blog-detail {
          padding-top: 10px;
          span { display: block; }
          .content { line-height: 18px; font-size: 14px; color: #555; }
          .image { display: flex; margin: 15px 0; }
          img { width: 150px; margin-right: 10px; }
          .title {
            width: 540px;
            height: 30px;
            font-size: 18px;
            color: #333;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            }
        }
      }
      .item-handle {
        display: flex;
        width: 660px;
        height: 40px;
        border-top: 1px solid #eee;
        div {
          display: flex;
          width: 165px;
          height: 20px;
          line-height: 20px;
          margin-top: 10px;
          border-right: 1px solid #ddd;
          font-size: 13px;
          color: #444;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          i { margin-right: 10px; }
          &:last-child { border-right: none; }
          &.active { color: #ff8140; }
        }
      }
    }
    
  }
  .load-more {
      width: 100%;
      height: 32px;
      line-height: 32px;
      background: rgba(41,144,215,0.08);
      border: 1px solid rgba(41,144,215,0.5);
      border-radius: 4px;
      color: #2a90d7;
      font-size: 14px;
      text-align: center;
    }
}
</style>
