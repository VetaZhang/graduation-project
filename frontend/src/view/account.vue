<style>
.account-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #eee;

  & > div {
    position: relative;

    .foot-link {
      position: absolute;
      bottom: -20px;
      color: #777;
      font-size: 12px;
      cursor: pointer;

      &.left {
        left: 5px;
      }
      &.right {
        right: 5px;
      }
    }
  }
}
</style>

<template>
  <div class="account-box">
    <div>
      <component :is="view"></component>
      <span class="foot-link left"
        v-show="view === 'register'"
        @click="changeView('login')">
        Login
      </span>
      <span class="foot-link right"
        v-show="view === 'login'"
        @click="changeView('register')">
        Register
      </span>
    </div>
  </div>
</template>

<script>
  'use strict'

  module.exports = {
    data () {
      return {
        view: 'login'
      };
    },
    methods: {
      changeView (view) {
        this.view = view
      }
    },
    components: {
      home: require('./home.vue'),
      login: require('./login.vue'),
      register: require('./register.vue')
    }
  }
</script>
