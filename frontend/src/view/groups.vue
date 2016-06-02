<style media="screen">
  .groups {
    flex: 1;
    width: 200px;
    overflow-x: hidden;
    overflow-y: auto;

    input {
      width: 100%;
      height: 25px;
      padding: 0 10px;
      line-height: 22px;
      border: none;
      border-right: 1px solid #eee;
      border-bottom: 1px solid #eee;
      outline: none;
    }
    .group-item {
      width: 100%;
      height: 35px;
      padding: 0 15px;
      border-bottom: 1px solid #eee;

      span {
        display: inline-block;
        height: 35px;
        line-height: 32px;
        vertical-align: top;
      }
      .name {
        width: 100px;
        color: #333;
        font-size: 14px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .member {
        margin-left: 5px;
        color: #999;
        font-size: 12px;
      }
    }
    .create-btn {
      width: 100%;
      height: 25px;
      line-height: 22px;
      color: #999;
      font-size: 24px;
      text-align: center;
      cursor: pointer;

      &:hover {
        background-color: #eee;
      }
    }
    .create-bg {
      z-index: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.6);

      .create-box {
        width: 200px;
        height: 120px;
        padding: 20px;
        background-color: #fff;

        span {
          color: #333;
          font-size: 14px;
        }
        input {
          margin-top: 10px;
          border: 1px solid #d1d1d1;
          border-radius: 5px;
        }
      }
    }
  }
</style>

<template>
  <div class="groups">
    <input type="text"
      v-model="groupName"
      placeholder="加入群组"
      @keyup.enter="addToGroup">
    <div class="group-item" v-for="item in groups" @click="groupClick($index, item._id, item.name)">
      <span class="name">{{item.name}}</span>
      <span class="member">人数：{{item.member.length}}</span>
    </div>
    <div class="create-btn" @click="openCreate">
      +
    </div>
    <div class="create-bg" v-show="show"  @click="closeCreate">
      <div class="create-box" @click.stop>
        <span>请输入新群组的名称（12个字符以内）</span>
        <input type="text" v-model="newGroupName" @keyup.enter="handleEnter">
      </div>
    </div>
  </div>
</template>

<script>
  'use strict'

  import {
    user,
    groups
  } from '../vuex/getters'
  import {
    createGroup,
    applyEnterGroup,
    changeContent
  } from '../vuex/actions'

  export default {
    vuex: {
      getters: {
        user,
        groups
      },
      actions: {
        createGroup,
        applyEnterGroup,
        changeContent
      }
    },
    data () {
      return {
        groupName: '',
        newGroupName: '',
        show: false
      }
    },
    methods: {
      addToGroup () {
        this.applyEnterGroup({
          id: this.user.id,
          name: this.user.name,
          groupName: this.groupName
        })
        this.groupName = ''
      },
      groupClick (index, id, name) {
        this.changeContent({
          title: `${name} 群组聊天中`,
          component: 'talk',
          type: 'group',
          id: id,
          groupIndex: index
        })
      },
      openCreate () {
        this.show = true
      },
      closeCreate () {
        this.show = false
      },
      handleEnter () {
        if (this.newGroupName) {
          if (this.newGroupName.length > 12) {
            alert('群组名过长')
            return
          }
          this.show = false
          this.createGroup({
            name: this.newGroupName,
            creator: this.user.id,
            member: [this.user.id],
            history: []
          })
        }
      }
    }
  }
</script>
