<style>
.home {
  display: flex;
  width: 100%;
  height: 100%;

  .list {
    width: 200px;
    height: 100%;
  }
  .content {
    flex: 1;
    height: 100%;
  }
}
</style>

<template>
  <div class="home">
    <div class="list">
      <Friends></Friends>
    </div>
    <div class="content">

    </div>
  </div>
</template>

<script>
  'use strict'

  import {
    user
  } from '../vuex/getters'
  import Friends from './friends.vue'

  module.exports = {
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
    methods: {
      click () {
        store.dispatch('INCREMENT')
      }
    },
    components: {
      Friends
    }
  }
</script>
