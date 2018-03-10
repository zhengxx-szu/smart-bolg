<template>
  <div class="hot-topic">
      <div class="hot-topic-title">热门话题</div>
      <ul class="hot-topic-list">
          <li class="topic-item" v-for="(item, index) in topicList" :key="index">
            <span :class="classColor(index)">{{index}}</span>{{item.title}}
          </li>
      </ul>
  </div>
</template>

<script>
import { getHotTopic } from '@/api/channel'
export default {
  data () {
    return {
      topicList: []
    }
  },
  methods: {
    classColor (index) {
      return `color-${index}`
    }
  },
  created () {
    getHotTopic().then((res) => this.topicList = res.data)
  }
}
</script>

<style lang="less" scoped>
.hot-topic {
  width: 300px;
  padding: 20px;
  margin-bottom: 20px;
  background: #f2f2f5;
  .hot-topic-title {
    font-size: 18px;
    margin-bottom: 16px;
    font-weight: 700;
  }
  .hot-topic-list {
    .topic-item {
      display: flex;
      align-items: center;
      height: 30px;
      font-size: 16px;
      color: #555;
      margin-top: 12px;
      border-bottom: 1px solid #ccc;
      span {
        display: inline-block;
        width: 16px;
        height: 16px;
        line-height: 16px;
        margin-right: 8px;
        text-align: center;
        font-size: 12px;
        color: #fff;
        background: #8eb9f5;
      }
      .color-0 { background: #f54545; }
      .color-1 { background: #ff8547; }
      .color-2 { background: #ffac38; }
      &:last-child { border-bottom: none; }
      &:hover { color: #fa7d3c; cursor: pointer; }
    }
  }
}
</style>
