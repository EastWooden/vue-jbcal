<template>
  <div class="searchlist">
    <loading v-if="isLoading"></loading>
    <ul>
      <li v-for="item in searchSerList" class="border-1px" :key="item.id">
        <router-link :to="{name: 'Spec', params: {specid: item.id}}">{{ item.name }}</router-link>
      </li>
    </ul>
    <div class="searchnull" v-if="isnull">
      <i class="fa fa-car"></i>
      <p>没有找到与 " {{ this.$route.params.query }} " 相关的车系</p>
    </div>
  </div>
</template>
<script>
import loading from '../../components/loading/loading'
export default {
  data () {
    return {
      searchSerList: [],
      isLoading: true,
      isnull: true
    }
  },
  updated () {
    this.isLoading = false
  },
  created () {
    this.$nextTick(function () {
      this.getsearchSerList()
    })
  },
  components: {
    loading: loading
  },
  methods: {
    getsearchSerList: function () {
      this.$http.jsonp('http://oa.ccsh177.cn/cal/ajax/getkeywords.html', {params: {query: this.$route.params.query}})
        .then(response => {
          this.searchSerList = response.body.wordlist
          if (response.body.rowcount !== 0 && this.$route.params.query !== '') {
            this.isnull = false
          }
        })
        .catch(err => {
          console.log(err)
          alert('数据请求失败，请稍后再试')
        })
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'
  .searchlist
    position:absolute
    background: #fff
    top:0
    left:0
    width:100%
    height:100%
    overflow: hidden
    z-index:2000
    li
      font-size: 14px
      background:#fff
      line-height: 3rem
      padding-left: 15px
      border-1px(rgba(7, 17, 27, 0.1))
      a
        color:#000
        display: block
  .searchnull
    .fa-car
      position: relative
      font-size:50px
      color:#c0c0c0
      left:50%
      margin-top: 50%
      margin-left:-30px
    p
      text-align: center
      margin-top: 20px
      color: #c0c0c0
</style>
