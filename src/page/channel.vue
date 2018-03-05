<template>
  <div class="channel">
		<login></login>
    {{msg}}
  </div>
</template>

<script>
import login from '@/components/channel/login'
export default {
	components: {
		login
	},
  data () {
    return {
      msg: 'this is channel'
    }
  }
}
</script>

<style lang="less" scoped>
</style>
