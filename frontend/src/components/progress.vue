<style>
progress {
  position: relative;
  overflow: hidden;
  current {
    width: 100%;
    height: 100%
  }
  .block {

  }
  .strap {

  }
  .line {

  }
}
</style>

<template>
  <progress>
    <current>

    </current>
  </progress>
</template>

<script>
  module.exports = {
    props: {
      total: {
        type: Number,
        default: 100
      },
      current: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        //
      };
    }
  }
</script>
