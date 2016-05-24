<style>
.friends {
  flex: 1;
  width: 200px;

  .add-box {
    width: 100%;
    height: 25px;
    input {
      width: 100%;
      height: 100%;
      padding: 0 10px;
      font-size: 14px;
      border: none;
      border-right: 1px solid #eee;
      border-bottom: 1px solid #eee;
      outline: none;
    }
  }
  .item {
    width: 100%;
    height: 35px;
    padding: 0 10px;
    line-height: 32px;
    color: #333;
    font-size: 15px;
    border-bottom: 1px solid #eee;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    span {
      margin-left: 10px;
      color: #999;
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>

<template>
  <div class="friends">
    <div class="add-box">
      <input type="text"
        placeholder="添加好友"
        v-model="newFriendName"
        @keyup.enter="addFriend">
    </div>
    <div class="item" v-for="friend in friends" @click="handleClick(friend.id, friend.name)">
      {{friend.name}}
      <span>{{friend.email}}</span>
    </div>
  </div>
</template>

<script>
  'use strict'

  import store from '../vuex/store'
  import {
    config,
    user,
    friends
  } from '../vuex/getters'
  import {
    changeContent
  } from '../vuex/actions'

  export default {
    vuex: {
      getters: {
        config,
        user,
        friends
      },
      actions: {
        changeContent
      }
    },
    data () {
      return {
        newFriendName: ''
      }
    },
    created () {
      //
    },
    methods: {
      handleClick (id, name) {
        this.changeContent({
          title: `与 ${name} 聊天中`,
          component: 'talk',
          type: 'friend',
          id: id
        })
      },
      addFriend () {
        this.$http.post(`${this.config.domain}/friends`, {
          user: this.user.id,
          name: this.user.name,
          target: this.newFriendName
        }).then(result => {
            if (result.data.error) {
              console.log(result.data.error)
            } else {
              console.log('请求已发送')
            }
          }, error => {
            console.log(error)
          })
      }
    }
  }
</script>
