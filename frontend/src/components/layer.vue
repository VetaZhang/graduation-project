<style>
layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: background-color 0.25s;
}
</style>

<template>
  <layer :style="{backgroundColor: 'rgba(0,0,0,'+opacity+')'}">
    <slot></slot>
  </layer>
</template>

<script>
  export default {
    props: {
      opacity: {
        type: Number,
        default: 0.6
      }
    }
  }
</script>
