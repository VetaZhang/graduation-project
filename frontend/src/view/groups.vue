<style media="screen">
  .groups {
    flex: 1;
    width: 200px;

    .create {
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
  }
</style>

<template>
  <div class="groups">
   <input type="text" v-model="groupName" placeholder="加入群组">
   <div class="">

   </div>
   <div class="create">
     +
   </div>
  </div>
</template>

<script>
  export default {
    vuex: {

    },
    data () {
      return {
        groupName: ''
      }
    }
  }
</script>
