<template>
  <div class="nav">
    <ul class="list-wrapper">
      <li class="list-item" v-for="item in navList" :key="item">{{item}}</li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { getBlogList } from '@/api/channel'
export default {
  data () {
    return {
      navList: [
        '推荐',
        '热点',
        '社会',
        '娱乐',
        '科技',
        '体育',
        '国际'
      ]
    }
  },
  created () {
    this._getBlogList('__all__')
  },
  methods: {
    ...mapActions(['set_blogList']),
    _getBlogList(type) {
      getBlogList(type).then(res => this.set_blogList(res.data))
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
        background: #fa7d3c;
        color: #fff;
      }
    }
  }
}
</style>
