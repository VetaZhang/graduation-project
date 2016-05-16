<style>
btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 35px;
  color: #fff;
  font-size: 14px;
  letter-spacing: 0.8px;
  border-radius: 3px;
  opacity: 1;
  transition: opacity 0.25s;
  user-select: none;
  outline: none;
  cursor: pointer;
  overflow: hidden;

  &:hover {
    opacity: .7;
  }
  &.disabled {
    opacity: .7;
    pointer-events: none;
  }
  &.block {
    display: flex;
    width: 100%;
    height: 35px;
    font-size: 16px;
  }
  &.blue {
    background-color: #138ef4;
  }
  &.red {
    background-color: #db4545;
  }
  &.grey {
    background-color: #b3abab;
  }
}
</style>

<template>
  <btn :class="{'disabled': disabled}">
    <slot></slot>
  </btn>
</template>

<script type="text/javascript">
  module.exports = {
    props: {
      disabled: {
        type: Boolean,
        default: false
      }
    }
  }
</script>
