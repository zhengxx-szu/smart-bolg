<template>
  <div class="nav">
    <ul class="list-wrapper">
      <li
        class="list-item"
        :class="item.type === activeBlogType ? 'active' : ''"
        v-for="(item, index) in navList"
        :key="index"
        @click="getBlogType(item.type)"
      >
        {{item.text}}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { getBlogList } from '@/api/channel'
export default {
  data () {
    return {
      navList: [
        { text: '推荐', type: '__all__' },
        { text: '热点', type: 'news_hot' },
        { text: '社会', type: 'news_society' },
        { text: '娱乐', type: 'news_entertainment' },
        { text: '科技', type: 'news_tech' },
        { text: '体育', type: 'news_sports' },
        { text: '国际', type: 'news_world' }
      ],
      activeBlogType: '__all__'
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  created () {
    this.getBlogType('__all__')
  },
  methods: {
    ...mapActions([
      'set_blogList',
      'set_activeType'
    ]),
    _getBlogList(type) {
      getBlogList(type, 0, this.token).then(res => this.set_blogList(res))
    },
    getBlogType(type) {
      this.activeBlogType = type
      this.set_activeType(type)
      this._getBlogList(type)
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
      margin-top: 3px;
      &.active, &:hover {
        border-radius: 4px;
        background: #fa7d3c;
        color: #fff;
      }
    }
  }
}
</style>
