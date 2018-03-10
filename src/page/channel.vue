<template>
  <div class="channel">
    <nav-left></nav-left>
    <blog-list></blog-list>
    <div class="right-wrapper">
		  <login></login>
      <hot-news></hot-news>
      <hot-topic></hot-topic>
    </div>
  </div>
</template>

<script>
import navLeft from '@/components/channel/nav'
import blogList from '@/components/channel/blogList'
import login from '@/components/channel/login'
import hotNews from '@/components/channel/hotNews'
import hotTopic from '@/components/channel/hotTopic'
export default {
	components: {
    navLeft,
    blogList,
    login,
    hotNews,
    hotTopic
	},
  data () {
    return {
      msg: 'this is channel'
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.channel {
  display: flex;
  width: 1170px;
  margin: 0 auto;
  padding: 16px 0 0 0;
  .right-wrapper {
    width: 340px;
  }
}
</style>
