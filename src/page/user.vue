<template>
  <div class="user-wrapper">
    <div class="left-wrapper">
      <div class="main-top">
        <div class="avatar"><img :src="info.avatar"></div>
        <div :class="isFollowed ? 'unfollow_btn' : 'follow_btn'" v-if="userPageId !== token" @click="follow">{{followText}}</div>        
        <div class="name">{{info.username}}</div>
        <div class="info">这家伙很懒，什么也没有留下...</div>
      </div>
      <ul class="menu">
        <li class="collect" :class="{'active' : select_menu === 'collect'}" @click="select_menu='collect'"><span>收藏的文章</span></li>
        <li class="transmit" :class="{'active' : select_menu === 'transmit'}" @click="select_menu='transmit'"><span>转发的文章</span></li>
        <li class="follow" :class="{'active' : select_menu === 'follow'}" @click="select_menu='follow'"><span>关注的人</span></li>
        <li class="fans" :class="{'active' : select_menu === 'fans'}" @click="select_menu='fans'"><span>粉丝</span></li>
      </ul>
      <div class="list-wrapper">
        <ul class="collect" v-show="select_menu === 'collect'" v-if="collectList">
          <li v-for="(item, index) in collectList" :key="index" @click="toDetail(item)">
            <div class="content">
              <div class="author">
                <div class="avatar"><img :src="item.useravatar"></div>
                <div class="info">
                  <span class="name">{{item.username}}</span>
                  <span class="time" v-text="formatTime(item.time)"></span>
                </div>
              </div>
              <div class="title">{{item.title}}</div>
              <div class="abstract">{{item.content}}</div>
              <div class="meta">
                <span><i class="icon iconfont icon-forwardfill"></i>{{item.transmit.length}}</span>
                <span><i class="icon iconfont icon-commentfill"></i>{{item.comment.length}}</span>
                <span><i class="icon iconfont icon-appreciatefill"></i>{{item.favor.length}}</span>
              </div>
            </div>
            <div class="wrap-img" v-if="item.imgList.length>0"><img :src="item.imgList[0].url"></div>            
          </li>
        </ul>
        <ul class="transmit" v-show="select_menu === 'transmit'" v-if="transmitList">
          <li v-for="(item, index) in transmitList" :key="index"  @click="toDetail(item.articleInfo)">
            <div class="transmit-text">{{item.transmitText}}</div>
            <div class="content">
              <div class="author">
                <div class="avatar"><img :src="item.articleInfo.useravatar"></div>
                <div class="info">
                  <span class="name">{{item.articleInfo.username}}</span>
                  <span class="time" v-text="formatTime(item.articleInfo.time)"></span>
                </div>
              </div>
              <div class="title">{{item.articleInfo.title}}</div>
              <div class="abstract">{{item.articleInfo.content}}</div>
              <div class="meta">
                <span><i class="icon iconfont icon-forwardfill"></i>{{item.articleInfo.transmit.length}}</span>
                <span><i class="icon iconfont icon-commentfill"></i>{{item.articleInfo.comment.length}}</span>
                <span><i class="icon iconfont icon-appreciatefill"></i>{{item.articleInfo.favor.length}}</span>
              </div>
            </div>
            <div class="wrap-img" v-if="item.articleInfo.imgList.length>0"><img :src="item.articleInfo.imgList[0].url"></div>            
          </li>
        </ul>
        <ul class="follow" v-show="select_menu === 'follow'" v-if="followList">
          <li v-for="(item, index) in followList" :key="index" @click="toUser(item)">
            <div class="avartar"><img :src="item.avatar"></div>
            <div class="info">
              <a class="title">{{item.username}}</a>
              <div class="meta">收藏了{{item.collect.length}}篇文章，关注了{{item.follow.length}}个用户，获得了{{item.fans.length}}个粉丝</div>
            </div>
            <div class="btn">已关注</div>
          </li>
        </ul>
        <ul class="fans" v-show="select_menu === 'fans'"  v-if="fansList">
          <li v-for="(item, index) in fansList" :key="index" @click="toUser(item)">
            <div class="avartar"><img :src="item.avatar"></div>
            <div class="info">
              <a class="title">{{item.username}}</a>
              <div class="meta">收藏了{{item.collect.length}}篇文章，关注了{{item.follow.length}}个用户，获得了{{item.fans.length}}个粉丝</div>
            </div>
            <div class="btn">已关注</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="right-wrapper">
      <div class="title">
        <div>个人信息</div>
      </div>
      <ul class="base-info" v-if="info">
        <li><i class="icon iconfont icon-favor"></i>我的收藏<span>{{info.collect.length}}</span></li>
        <li><i class="icon iconfont icon-forward"></i>我的转发<span>{{info.transmit.length}}</span></li>
        <li><i class="icon iconfont icon-like"></i>我的关注<span>{{info.follow.length}}</span></li>
        <li><i class="icon iconfont icon-friend"></i>我的粉丝<span>{{info.fans.length}}</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { getUserInfo, getCollectList, getTransmitList, getFollowList, getFansList, sendFollow } from '@/api/user'
import { reportDetail, reportFavor, reportCollect, reportTransmit, reportComment } from '@/api/ubt'
import format from '@/assets/util'
import Router from '@/router'
export default {
  data () {
    return {
      select_menu: 'collect',
      info: '',
      collectList: '',
      transmitList: '',
      followList: '',
      fansList: '',
      isFollowed: false,
      followText: '关注'
    }
  },
  computed: {
    ...mapGetters(['token', 'userPageId'])
  },
  created () {
    getUserInfo({ user_id: this.userPageId }).then(res => this.info = res)
    getCollectList({ user_id: this.userPageId }).then(res => this.collectList = res)
    getTransmitList({ user_id: this.userPageId }).then(res => this.transmitList = res)
    getFollowList({ user_id: this.userPageId }).then(res => this.followList = res)
    getFansList({ user_id: this.userPageId }).then(res => this.fansList = res)
    getFollowList({ user_id: this.token }).then(res => {
      res.forEach(item => {
        if (item._id === this.userPageId) {
          this.isFollowed = true
          this.followText = '已关注'
        }
      })
    })
  },
  methods: {
    ...mapActions(['set_blogId', 'set_userPageId']),
    formatTime (time) {
      return format(new Date(time * 1000))
    },
    toDetail (item) {
      var ubtParams = {
        user_id: this.token,
        article_id: item.id
      }
      this.set_blogId(item.id)
      reportDetail(ubtParams)
      Router.push('/detail')
    },
    toUser (item) {
      this.set_userPageId(item._id)
      Router.push('/channel')
      setTimeout(() => {
        Router.push('/user')
      }, 20)
    },
    follow () {
      let params = {
        user_id: this.token,
        follow_id: this.userPageId
      }
      sendFollow(params).then(res => {
        this.isFollowed = !this.isFollowed
        this.followText === '关注' ? this.followText = '已关注' : this.followText = '关注'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.user-wrapper {
  display: flex;
  width: 1170px;
  margin: 0 auto;
  padding-top: 50px;
  .left-wrapper {
    width: 660px;
    margin-left: 140px;
    margin-right: 30px;
    color: #333;
    .main-top {
      margin-bottom: 20px;
      .avatar {
        float: left;
        width: 80px;
        height: 80px;
        img { width: 80px; height: 80px; border-radius: 50%; }
      }
      .follow_btn, .unfollow_btn {
        float: right;
        padding: 8px 0;
        margin: 21px 0;
        width: 100px;
        font-size: 15px;
        background-color: #42c02e;
        text-align: center;
        border-radius: 18px;
        font-weight: 400;
        line-height: normal;
        border: 1px solid;
        cursor: pointer;
        &.follow_btn { background-color: #42c02e; color: #fff; }
        &.unfollow_btn { background-color:rgba(99,99,99,.05); color: #8c8c8c; border-color: hsla(0,0%,59%,.6); }
      }
      .name {
        padding-top: 20px;
        padding-left: 100px;
        height: 30px;
        line-height: 30px;
        font-size: 21px;
        font-weight: 700;
      }
      .info {
        padding-left: 100px;
        height: 30px;
        line-height: 30px;
        font-size: 13px;
        color: #969696;
      }
    }
    .menu {
      margin-bottom: 20px;
      border-bottom: 1px solid #f0f0f0;
      li {
        display: inline-block;
        padding: 8px 0;
        margin-bottom: -1px;
        cursor: pointer;
        span { padding: 13px 20px; font-size: 15px; font-weight: 700; color: #969696; line-height: 25px; }
        &:hover { border-bottom: 2px solid #646464; span { color: #646464; }}
        &.active { border-bottom: 2px solid #646464; span { color: #646464; }}
      }
    }
    .list-wrapper {
      .collect, .transmit {
        li {
          display: flex;
          margin: 0 0 17px;
          padding: 0 2px 17px 0;
          border-bottom: 1px solid #f0f0f0;
          .content {
            .author {
              margin-bottom: 14px;
              font-size: 13px;
              .avatar, .info { display: inline-block; vertical-align: middle; }
              .avatar { width: 32px; height: 32px; margin-right: 8px; }
              .avatar img { width: 32px; height: 32px; border-radius: 50%; }
              .info .time { color: #969696; }
            }
            .title {
              margin: -7px 0 4px;
              font-size: 18px;
              font-weight: 700;
              line-height: 1.5;
              color: #969696;
              cursor: pointer;
              &:hover { color: #ff7501; }
            }
            .abstract {
              margin: 0 0 8px;
              font-size: 13px;
              line-height: 24px;
            }
            .meta {
              font-size: 13px;
              font-weight: 400;
              line-height: 20px;
              cursor: pointer;
              span { margin-right: 10px; color: #b4b4b4; }
              .icon { font-size: 13px; margin-right: 5px; color: #b4b4b4; }
            }
          }
          .wrap-img {
            display: flex;
            width: 160px;
            align-items: center;
            img { width: 150px; height: 120px; border-radius: 4px; border: 1px solid #f0f0f0; }
          }
        }
      }
      .transmit {
        li {
          position: relative;
          padding-top: 30px;
          .transmit-text {
            position: absolute;
            top: 0;
            left: 0;
          }
          .content {
            padding: 20px;
            border: 1px solid #e1e1e1;
            border-radius: 4px;;
            background: #f0f0f0;
          }
        }
      }
      .follow, .fans {
        li {
          padding-bottom: 20px;
          margin-bottom: 20px;
          border-bottom: 1px solid #f0f0f0;
          div { display: inline-block; }
          .avartar {
            width: 52px;
            height: 52px;
            margin-right: 8px;
            vertical-align: middle;
            img { width: 52px; height: 52px; border: 1px solid #ddd; border-radius: 50%; }
          }
          .info {
            vertical-align: middle;
            .title { font-size: 15px; font-weight: 700; }
            .meta { display: block; margin-top: 8px; font-size: 12px; color: #969696; }
          }
          .btn {
            float: right;
            width: 100px;
            padding: 10px 0;
            margin: 6px 0;
            border: 1px solid #969696;
            border-radius: 20px;
            text-align: center;
            color: #8c8c8c;
          }          
        }
      }
    }
  }
  .right-wrapper {
    position: fixed;
    width: 250px;
    margin: 0 auto;
    padding: 0 20px 0 850px;
    z-index: -1;
    .title {
      margin-bottom: 16px;
      border-bottom: 1px solid #f0f0f0;
      font-size: 16px;
      font-weight: 700;
      div { height: 50px; line-height: 50px; color: #31445b;}
    }
    .base-info {
      li {
        display: flex;
        margin-bottom: 10px;
        height: 30px;
        line-height: 30px;
        color: #333;
        font-size: 14px;
        align-items: center;
        i { margin-right: 10px; font-size: 20px; vertical-align: middle; }
        span { margin-left: auto; }
      }
    }
  }
}
</style>
