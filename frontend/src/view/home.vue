<style>
.home {
  display: flex;
  width: 100%;
  height: 100%;

  .list {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 200px;
    height: 100%;
    border-right: 1px solid #eee;

    .btns {
      display: flex;
      align-items: stretch;
      border-bottom: 1px solid #eee;

      div {
        width: 33.3%;
        height: 30px;
        line-height: 28px;
        text-align: center;
        color: #333;
        font-size: 14px;
        border-left: 1px solid #eee;

        &.actived {
          color: #fff;
          background-color: #2d91ee;
        }
      }
    }
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
      <div class="btns">
        <div :class="{actived: view === 'friends'}"
          @click="changeView('friends')">
          好友
        </div>
        <div :class="{actived: view === 'groups'}"
          @click="changeView('groups')">
          群组
        </div>
        <div :class="{actived: view === 'requests'}"
          @click="changeView('requests')">
          请求
        </div>
      </div>
      <Friends v-show="view === 'friends'"></Friends>
      <Groups v-show="view === 'groups'"></Groups>
      <Requests v-show="view === 'requests'"></Requests>
    </div>
    <div class="content">
      <component :is="content.component"></component>
    </div>
  </div>
</template>

<script>
  'use strict'

  import {
    user,
    config,
    content
  } from '../vuex/getters'
  import {
    initSocket,
    getFriendsList,
    getRequestsList
  } from '../vuex/actions'
  import Friends from './friends.vue'
  import Groups from './groups.vue'
  import Requests from './requests.vue'
  import Talk from './talk.vue'

  module.exports = {
    vuex: {
      getters: {
        user,
        config,
        content
      },
      actions: {
        initSocket,
        getFriendsList,
        getRequestsList
      }
    },
    data () {
      return {
        view: 'friends'
      };
    },
    ready () {
      this.initSocket(this)
      this.getFriendsList()
      this.getRequestsList(this, `${this.config.domain}/requests/${this.user.id}`)
    },
    methods: {
      changeView (view) {
        this.view = view
      }
    },
    components: {
      Friends,
      Groups,
      Requests,
      Talk
    }
  }
</script>
