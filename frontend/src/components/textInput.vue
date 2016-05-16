<style media="screen">
  .input-box {
    position: relative;
    width: 100%;
    margin-bottom: 20px;

    input {
      width: 100%;
      height: 35px;
      padding: 10px;
      font-size: 16px;
      color: #333;
      border: 1px solid #d1d1d1;
      border-radius: 3px;
      outline: none;
      transition: border-color 0.25s;

      &.error {
        border: 1px solid #ef2b2b;
      }
      &:focus {
        border: 1px solid #2d91ee;
      }
    }

    span {
      position: absolute;
      bottom: -18px;
      right: 1px;
      color: #ef2b2b;
      font-size: 12px;
      pointer-events: none;
    }
  }
</style>

<template>
  <div class="input-box">
    <input type="{{data.isPwd?'password':'text'}}"
      :placeholder="data.placeholder"
      v-model="data.value">
    <span v-show="data.errorMsg">{{data.errorMsg}}</span>
  </div>
</template>

<script type="text/javascript">
  module.exports = {
    props: ['data'],
    data () {
      return {};
    }
  };
</script>
