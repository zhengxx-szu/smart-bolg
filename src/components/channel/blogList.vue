<template>
  <div class="blog-list">
    {{msg}}
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'this is login'
    }
  }
}
</script>

<style lang="less" scoped>
.blog-list {
  width: 660px;
  margin-right: 30px;
  min-height: 1200px;
  background: #ed7350;
}
</style>
