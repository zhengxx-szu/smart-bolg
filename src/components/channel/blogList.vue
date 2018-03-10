<template>
  <div class="blog-list">
    {{msg}}
    {{blogList}}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      msg: 'this is login'
    }
  },
  computed: {
    ...mapGetters(['blogList'])
  }
}
</script>

<style lang="less" scoped>
.blog-list {
  width: 660px;
  margin-right: 30px;
  min-height: 1200px;
}
</style>
