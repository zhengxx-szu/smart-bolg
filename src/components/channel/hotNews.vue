<template>
  <div class="hot-news">
      <div class="hot-news-title">热门话题</div>
      <ul class="hot-news-list">
          <li class="news-item" v-for="(item, index) in newsList" :key="index">
            <img :src="item.pic">
            <div class="item-right">
              <span class="title">{{item.title_sub}}</span>
              <span class="desc_1">{{item.desc1}}</span>
              <span class="desc_2">{{item.desc2}}</span>
            </div>
          </li>
      </ul>
  </div>
</template>

<script>
import { getHotNews } from '@/api/channel'
export default {
  data () {
    return {
      newsList: []
    }
  },
  methods: {
    classColor (index) {
      return `color-${index}`
    }
  },
  created () {
    getHotNews().then((res) => {
      res.data.cards.forEach((item) => {
        item.card_group && item.card_group.length > 0 ? this.newsList = item.card_group.slice(0, 5) : undefined
      })
    })
  }
}
</script>

<style lang="less" scoped>
.hot-news {
  width: 300px;
  padding: 20px;
  margin-bottom: 20px;
  background: #f7f7f7;
  .hot-news-title {
    font-size: 18px;
    margin-bottom: 16px;
    font-weight: 700;
  }
  .hot-news-list {
    .news-item {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      img { width: 70px; height: 70px;}
      .item-right {
        width: 230px;
        height: 70px;
        margin-left: 10px;
        span {
          display: block;
          margin-top: 8px;
          text-overflow: ellipsis;
          white-space: nowrap;
          cursor: pointer;
          overflow: hidden;
          &:hover { color: #fa7d3c; text-decoration: underline; }
        }
        .title { font-size: 16px; color: #222; }
        .desc_1 { font-size: 14px; color: #666; }
        .desc_2 { font-size: 12px; color: #aaa;}
      }
      
    }
  }
}
</style>
