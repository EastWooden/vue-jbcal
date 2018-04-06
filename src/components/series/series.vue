<template>
  <div id="series">
    <div class="topbar border-1px">
      <p>选择车系</p>
    </div>
    <loading v-if="isLoading"></loading>
    <div class="series-list" id="series-list" ref = "serieslistbox">
      <div class="series-list-item"  v-for="item in fctlistNum" :key="item.name">
        <div class="series-list-item__brand">
          {{ item.name }}
        </div>
        <ul class="series-list-item__brand--series">
          <li class="border-1px" v-for="sitem in item.serieslist" :key="sitem.name" @click='getCurrentSeries(sitem)'>
            <router-link :to="{name: 'Spec', params: {specid: sitem.id}}">{{ sitem.name }}</router-link>
          </li>
        </ul>
      </div>
      <div class="border-1px more" v-if="isLength"><a href="javascript:;" @click="loadMore()">查看全部<i class="fa fa-angle-down"></i></a></div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import loading from '../../components/loading/loading'
export default {
  data () {
    return {
      fctlist: [],
      isLength: false,
      listNum: 20,
      isLoading: true
    }
  },
  components: {
    loading
  },
  updated () {
    this.getHeight()
    this.isLoading = false
    document.body.scrollTop = 0 // 使网页滚动高度为//0 因为在手机端 在父组件滚动之后 子组件加载出来之后会有滚动距离
  },
  beforeDestory () {

  },
  mounted: function () {
    this.$nextTick(function () {
      this.getSeries()
    })
  },
  computed: {
    ...mapGetters({
      currentseries: 'getcurSeries'
    }),
    fctlistNum: function () {
      // if (this.fctlist.length > this.listNum) {
      //   this.isLength = true
      // }
      return this.fctlist.slice(0, this.listNum)
    }
  },
  methods: {
    ...mapActions([
      'getCurrentSeries'
    ]),
    getSeries: function () {
      this.$http.jsonp('http://oa.ccsh177.cn/cal/ajax/getbrands.html', {params: {pinpaiId: this.$route.params.brandid}}).then(response => {
        var res = response.body
        this.fctlist = res.result.fctlist
      }).catch(error => {
        console.log(error)
        alert('获取服务器数据失败')
      })
    },
    goback () {
      this.$router.goBack()
    },
    loadMore: function () {
      this.listNum = this.fctlist.length
      this.isLength = false
    },
    getHeight: function () {
      let curHeight = document.getElementById('series-list').offsetHeight
      console.log(curHeight)
      let wHeight = screen.availHeight
      let newHeight
      if (curHeight < wHeight) {
        newHeight = wHeight
      } else {
        newHeight = curHeight
      }
      document.getElementById('series-list').style.height = newHeight + 'px'
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">

@import '../../common/stylus/mixin.styl'
#series
  position: absolute
  top:0
  left:0
  background: #f0eff5
  overflow-x:hidden
  overflow:hidden
  z-index: 20001
  .topbar
    width: 100%
    z-index:2002
    padding-bottom:15px
    padding-top:15px
    border-1px(rgba(7, 17, 27, 0.1))
    position:fixed
    top:0
    left:0
    background: #fff
    p
      text-align: center
      font-size: 16px
    // .fa-angle-left
    //   font-size: 18px
    //   position:absolute
    //   left: 10px
    //   color: #555
  .series-list
    margin-top:46px
    .series-list-item
      .series-list-item__brand
        font-size: 14px
        padding-left: 15px
        line-height: 2.5rem
    .series-list-item__brand--series
      li
        font-size: 14px
        background:#fff
        border-1px(rgba(7, 17, 27, 0.1))
        line-height: 3rem
        padding-left: 15px
        a
          color:#000
          display: block
  .more
    text-align: center
    background: #fff
    a
      display: block
      line-height: 42px
      i
        font-size: 16px
        color: #c0c0c0
        margin-left: 5px

</style>
