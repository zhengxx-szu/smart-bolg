<template>
  <div class="nav">
    <ul class="list-wrapper">
      <li class="list-item" v-for="item in navList" :key="item">{{item}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      navList: [
        '推荐',
        '热点',
        '科技',
        '娱乐',
        '游戏',
        '体育',
        '搞笑',
        '更多'
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.nav {
  width: 110px;
  margin-right: 30px;
  .list-wrapper {
    .list-item {
      height: 40px;
      line-height: 40px;
      text-align: center;
      &:hover {
        border-radius: 4px;
        background: #ed4040;
        color: #fff;
      }
    }
  }
}
</style>
