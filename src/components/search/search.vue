<template>
  <div class="search">
    <input class="searchtext" type="text" name="searchtext" v-model="brandmsg" @focus="clearText()" :class="{'fontColor':isTrue}"><router-link @click = "checknull()" :to="{name:'searchlist', params: {query: brandmsg}}" class="searchBtn" ><i class="fa fa-search" ></i></router-link>
  </div>
</template>
<script>
export default {
  data () {
    return {
      brandmsg: '输入关键词...',
      isTrue: false
    }
  },
  methods: {
    clearText: function () {
      this.brandmsg = ''
      this.isTrue = true
    },
    checknull: function (e) {
      if (this.brandmsg === '' || this.brandmsg === 'undefined') {
        alert('请输入正确的关键词')
        e.stopDefault()
        return false
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'
.search
  position: relative
  width:100%
  height: 30px
  border: solid 1px rgba(7, 17, 27, 0.1)
  box-sizing: border-box
  border-radius: 30px
  .searchtext
    display: block
    width: 70%
    padding-left:10px
    outline: 0px
    color: #ccc
    box-sizing: border-box
    background:transparent
    height: 28px
    &.fontColor
      color: #333
  .searchBtn
    border: 0
    outline:0
    position: absolute
    top: 0
    right: 0
    display: block
    line-height: 28px
    background:transparent
    cursor: pointer
    margin-right:10px
    .fa-search
      font-size: 14px
      color: #2a73fe
</style>
