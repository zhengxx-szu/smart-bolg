<template>
  <div id="app">
    <header-nav v-if="show"></header-nav>
    <div class="main" ref="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import headerNav from '@/components/headerNav'
import Router from '@/router'
export default {
  name: 'App',
  components: {
    headerNav
  },
  computed: {
    show () {
      return this.$route.path !== '/register'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* background-image: url('./assets/image/login_bg.png');
  background-size: cover;
  background-attachment: fixed; */
}
.main { padding-top: 50px;}
</style>
