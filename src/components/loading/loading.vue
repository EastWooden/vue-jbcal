<template>
  <div class="loading">
      <i class="fa fa-spinner fa-spin"></i><span>数据加载中...</span>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="stylus">
.loading
    text-align: center
    background: #fff
    padding-top:50%
    padding-bottom:150%
    position: relative
    top:46px;
    z-index: 300001
    span
      margin-left:10px
      margin-top:50%
</style>
