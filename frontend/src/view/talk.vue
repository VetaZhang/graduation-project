<style media="screen">
  .talk-box {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    & > div {
      border: 1px solid #eee;
    }
    .talk-title {
      height: 40px;
      padding: 0 20px;
      line-height: 40px;
      font-size: 18px;
    }
    .talk-content {
      flex: 1;
      overflow-x: hidden;
      overflow-y: auto;

      .talk-item {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 10px 20px;
        border: none;

        &.me {
          align-items: flex-end;
        }
        .title {
          color: #444;
          font-size: 15px;

          span {
            margin-left: 5px;
            margin-right: 5px;
            color: #999;
            font-size: 12px;
          }
        }
        .content {
          display: inline-block;
          margin-top: 5px;
          padding: 6px 20px;
          color: #444;
          font-size: 14px;
          border-radius: 8px;
          background-color: rgb(208, 237, 244);
        }
      }
    }
    .input-box {
      position: relative;
      height: 120px;
      margin: 0 !important;

      textarea {
        width: 100%;
        height: 100px;
        padding: 6px 10px;
        font-size: 16px;
        border: none;
        resize: none;
        outline: none;
      }
      span {
        position: absolute;
        bottom: 2px;
        right: 8px;
        color: #999;
        font-size: 12px;
      }
    }
  }
</style>

<template>
  <div class="talk-box">
    <div class="talk-title">
      {{content.title}}
    </div>
    <div class="talk-content">
      <div class="talk-item" v-show="content.type === 'friend'"
        v-for="item in history['_' + content.id]"
        :class="{me: item.sender === user.id}">
        <span class="title" v-show="item.sender !== user.id">
          {{item.senderName || 'Unknow'}}
          <span>{{item.time}}</span>
        </span>
        <span class="title" v-show="item.sender === user.id">
          <span>{{item.time}}</span>
          {{item.senderName || 'Unknow'}}
        </span>
        <span class="content">
          {{item.content}}
        </span>
      </div>
      <div class="talk-item" v-show="content.type === 'group'"
        v-for="item in groups[content.groupIndex || 0].history"
        :class="{me: item.sender === user.id}">
        <span class="title" v-show="item.sender !== user.id">
          {{item.senderName || 'Unknow'}}
          <span>{{item.time}}</span>
        </span>
        <span class="title" v-show="item.sender === user.id">
          <span>{{item.time}}</span>
          {{item.senderName || 'Unknow'}}
        </span>
        <span class="content">
          {{item.content}}
        </span>
      </div>
    </div>
    <div class="input-box">
      <textarea v-model="msg" @keyup.enter="handleEnter"></textarea>
      <span>按回车键发送</span>
    </div>
  </div>
</template>

<script>
  'use strict'

  import {
    content,
    history,
    user,
    groups
  } from '../vuex/getters'
  import {
    send,
    addNewHistory,
    addGroupHistory
  } from '../vuex/actions'

  export default {
    vuex: {
      getters: {
        content,
        history,
        user,
        groups
      },
      actions: {
        send,
        addNewHistory,
        addGroupHistory
      }
    },
    data () {
      return {
        msg: ''
      }
    },
    methods: {
      handleEnter (e) {
        // e.target.blur()
        let t = new Date()
        let time = `${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}`
        switch (this.content.type) {
          case 'friend': {
            let msg = {
              sender: this.user.id,
              senderName: this.user.name,
              receiver: this.content.id,
              content: this.msg.replace('\n', ''),
              time
            }
            this.addNewHistory(this.content.id, msg)
            this.send('msgFromFriend', msg)
          }break;
          case 'group': {
            let msg = {
              sender: this.user.id,
              senderName: this.user.name,
              content: this.msg.replace('\n', ''),
              time
            }
            this.addGroupHistory(
              this.content.groupIndex,
              msg
            )
            this.send('msgFromGroup', {
              id: this.content.id,
              msg
            })
          }break;
          default: ;
        }
        this.msg = ''
      }
    }
  }
</script>
