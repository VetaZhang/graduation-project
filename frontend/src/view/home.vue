<style>
@keyframes active {
  from {background-position: 50px 0;}
  to {background-position: 0 0;}
}
.home {
  display: flex;
  width: 100%;
  height: 100%;
  padding-top: 40px;

  .home-title {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 40px;
    border-bottom: 1px solid #eee;

    .name {
      color: #555;
      font-size: 14px;
      line-height: 38px;
      margin-left: 30px;
      margin-right: 20px;
    }
    .email {
      color: #999;
      font-size: 12px;
      line-height: 38px;
    }
    .logout {
      float: right;
      margin-right: 30px;
      line-height: 38px;
      font-size: 14px;
      color: #9d5532;
      cursor: pointer;
    }
  }
  .list {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    position: relative;
    width: 200px;
    height: 100%;
    border-right: 1px solid #eee;

    .btns {
      display: flex;
      align-items: stretch;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;

      div {
        width: 33.3%;
        height: 30px;
        line-height: 30px;
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
  .msg {
    position: fixed;
    left: 0;
    width: 100%;
    height: 30px;
    line-height: 28px;
    color: #fff;
    font-size: 14px;
    text-align: center;
    background-image: linear-gradient(45deg,
      rgba(255,255,255,.15) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255,255,255,.15) 50%,
      rgba(255,255,255,.15) 75%,
      transparent 75%,
      transparent);
    background-size: 40px 40px;
    animation: active 1.5s linear 0s infinite;
    transition: bottom 0.3s;

    &.error {
      background-color: #ad3132;
    }
    &.success {
      background-color: #2d91ee;
    }
  }
}
</style>

<template>
  <div class="home">
    <div class="home-title">
      <span class="name">{{user.name}}</span>
      <span class="email">{{user.email}}</span>
      <div class="logout" @click="handleLogout">
        Logout
      </div>
    </div>
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
    <div class="msg {{msg.type}}" :style="{bottom: msg.data?'0':'-30px'}">
      {{msg.data}}
    </div>
  </div>
</template>

<script>
  'use strict'

  import {
    user,
    config,
    content,
    msg
  } from '../vuex/getters'
  import {
    initSocket,
    getFriendsList,
    getRequestsList,
    getGroups,
    logout
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
        content,
        msg
      },
      actions: {
        initSocket,
        getFriendsList,
        getRequestsList,
        getGroups,
        logout
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
      this.getGroups()
      this.getRequestsList(this, `${this.config.domain}/requests/${this.user.id}`)
    },
    methods: {
      changeView (view) {
        this.view = view
      },
      handleLogout () {
        this.logout()
        window.router.go('/')
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
