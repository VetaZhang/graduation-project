<style>
* {
  box-sizing: border-box;
  font-family: 'Source Sans Pro', 'Segoe UI', 'Droid Sans', Tahoma, Arial, sans-serif;
}
body {
  margin: 0;
  padding: 0;
}
#app {
  width: 100vw;
  height: 100vh;
  background-color: #fff;
}
</style>

<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
  'use strict'

  import store from './vuex/store'
  import {
    user
  } from './vuex/getters'

  module.exports = {
    // el: '#app',
    vuex: {
      getters: {
        user
      }
    },
    data () {
      return {
        //
      };
    },
    store,
    created () {
      if (this.user.id) {
        window.router.go('/home')
      } else {
        window.router.go('/')
      }
    },
    methods: {
      //
    },
    components: {
      account: require('./view/account.vue'),
      home: require('./view/home.vue')
    }
  }
</script>
