<style>
.friends {
  width: 200px;
  height: 100%;
  border-right: 1px solid #eee;
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
    <div class="item" v-for="friend in friends">
      {{friend.name}}
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

  export default {
    vuex: {
      getters: {
        config,
        user,
        friends
      }
    },
    data () {
      return {
        newFriendName: ''
      }
    },
    created () {
      this.$http.get(`${this.config.domain}/friends/${this.user.id}`)
      .then(result => {
        if (result.data.error) {
          console.log(result.data.error)
        } else {
          store.dispatch('UPDATE_FRIENDS', result.data.friends)
        }
      }, error => {
        console.log(error)
      })
    },
    methods: {
      addFriend () {
        const url = `${this.config.domain}/friends/${this.user.id}/${this.user.name}/${this.newFriendName}`
        this.$http.post(url, {}).then(result => {
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
