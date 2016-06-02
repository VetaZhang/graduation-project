<style>
.requests {
  flex: 1;
  width: 200px;
  overflow-x: hidden;
  overflow-y: auto;

  .list {
    position: relative;
    padding: 5px 5px 30px 5px;
    border-bottom: 1px solid #eee;
    .item {
      width: 100%;
      padding: 5px;
      color: #555;
      font-size: 13px;
    }
    button {
      position: absolute;
      right: 8px;
      bottom: 8px;
      float: right;
      width: 45px;
      height: 20px;
      border: none;
      color: #fff;
      background-color: #2d91ee;

      &.disabled {
        background-color: #d1d1d1;
      }
    }
  }
}
</style>

<template>
  <div class="requests">
    <div class="list" v-for="item in requests">
      <div class="item">
        {{item.msg}}
      </div>
      <button v-show="!item.result" @click="agree($index)">同意</button>
      <button class="disabled" v-show="item.result" disabled="true">已同意</button>
    </div>
  </div>
</template>

<script>
  'use strict'

  import {
    config,
    requests
  } from '../vuex/getters'
  import {
    agreeRequest
  } from '../vuex/actions'

  export default {
    vuex: {
      getters: {
        config,
        requests
      },
      actions: {
        agreeRequest
      }
    },
    methods: {
      agree (index) {
        this.agreeRequest(this.requests[index])
      }
    }
  }
</script>
