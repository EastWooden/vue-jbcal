<template>
  <div id="spec">
    <div class="topbar border-1px">
      <!-- <i class="fa fa-angle-left" @click="goback"></i> --><p>选择车型</p>
    </div>
    <loading v-if="isLoading"></loading>
    <div class="series-list" id="spec-list">
      <div class="spec-all">全部车型</div>
      <div class="series-list-item" v-for="item in speclistNumFilter" :key="item.name">
        <div class="series-list-item__brand">
          {{item.name}}
        </div>
        <ul class="series-list-item__brand--series">
          <li class="border-1px" v-for="specitem in item.speclist" :key="specitem.name" @click="getcurrentspec(specitem)">
            <router-link to="/">{{ specitem.name }}</router-link>
          </li>
        </ul>
      </div>
      <div class="border-1px more" v-if='isLength'><a href="javascript:;" @click="loadMore()">查看全部<i class="fa fa-angle-down"></i></a></div>
    </div>

  </div>
</template>
<script>
import loading from '../../components/loading/loading'
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      speclist: [],
      isLength: false,
      speclistNum: 20,
      isLoading: true
    }
  },
  components: {
    loading: loading
  },
  updated () {
    this.isLoading = false
    this.getHeight()
    document.body.scrollTop = 0 // 使网页滚动高度为//0 因为在手机端 在父组件滚动之后 子组件加载出来之后会有滚动距离
  },
  computed: {
    ...mapGetters({
      currentspec: 'currentspec',
      chexingId: 'chexingId'
    }),
    // 车型过滤
    speclistNumFilter: function () {
      // if (this.speclist.length > this.speclistNum) {
      //   this.isLength = true
      // }
      return this.speclist.slice(0, this.speclistNum)
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.getspec()
    })
  },
  methods: {
    ...mapActions([
      'getcurrentspec'
    ]),
    goback () {
      this.$router.goBack()
    },
    getspec () {
      this.$http.jsonp('http://oa.ccsh177.cn/cal/ajax/getseries.html', {params: {chexiId: this.$route.params.specid}}).then((response) => {
        var res = response.body
        this.speclist = res
      }).catch(error => {
        console.log(error)
        alert('获取服务器数据失败')
      })
    },
    loadMore: function () {
      this.speclistNum = this.speclist.length
      this.isLength = false
    },
    getHeight: function () {
      let curHeight = document.getElementById('spec-list').offsetHeight
      let wHeight = screen.availHeight
      let newHeight
      curHeight < wHeight ? newHeight = wHeight : newHeight = curHeight
      document.getElementById('spec-list').style.height = newHeight + 'px'
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">

@import '../../common/stylus/mixin.styl'
#spec
  position: absolute
  top:0
  left:0
  background: #f0eff5
  width: 100%
  overflow-x:hidden
  overflow:hidden
  z-index:2001
  .topbar
    width: 100%
    padding-bottom:15px
    padding-top:15px
    border-1px(rgba(7, 17, 27, 0.1))
    position:fixed
    top:0
    left:0
    background: #fff
    z-index:2002
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
    .spec-all
        font-size: 16px
        background: #fff
        line-height:3rem
        padding-left: 15px
        border-1px(rgba(7, 17, 27, 0.1))
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
