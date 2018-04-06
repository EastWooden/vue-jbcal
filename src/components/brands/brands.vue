<template>
  <div id="brands">
    <div class="topbar border-1px">
      <p>品牌</p>
    </div>
    <loading v-if="isLoading"></loading>
    <div class="fixed-list-letter-wrapper">
      <ul class="fixed-list-letter" v-scroll-spy-active>
        <li v-for="item in letterlist" class="menu-item" :key="item.id">{{ item }}</li>
      </ul>
    </div>
    <div class="brands-list" ref="bList" v-scroll-spy="{data: 'section'}">
      <div class="brands-list-item" v-for="item in brandsList" :key='item.id' ref="bl_item">
        <div class="brands-list-item-letter" ref="brandletter" :class = "{'isfixed': isfixed}">
          {{item.letter}}
        </div>
        <ul class="brands-list-item__lists">
          <li v-for="zitem in item.list" @click="getCurrentBrand(zitem)" :key="zitem.name">
            <router-link :to="{name: 'Series', params: {brandid: zitem.id}}">
              <img :src="zitem.imgurl" width="40" height="40">
              <div class="brands-title border-1px">{{zitem.name}}</div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <!-- <div class="fixedref" v-if="isref">
      <ul v-scroll-spy-link>
        <li v-for="item in letterlist" :key="item.id"><a href="#item"> {{ item }} </a></li>
      </ul>
    </div> -->
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import loading from '../../components/loading/loading'
// var ERR_OK = 'ok'
export default {
  data () {
    return {
      section: 0,
      isLoading: true,
      letterlist: ['A', 'B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N',
        'O', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z'],
      isfixed: false,
      isref: false
    }
  },
  components: {
    loading: loading
  },
  updated () {
    this.isLoading = false
    this.isref = true
    // window.scrollY = 0
  },
  created () {
    this.$store.dispatch('getALLbrands')
  },
  computed: {
    ...mapGetters({
      brandsList: 'getbrandsList',
      currentBrand: 'getCurrenBrand'
    })
  },
  mounted: function () {
    this.$nextTick(function () {
      // window.addEventListener('scroll', this.handleScroll)
    })
  },
  methods: {
    ...mapActions([
      'getCurrentBrand'
    ])
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">

@import '../../common/stylus/mixin.styl'
  #brands
    position:absolute
    background: #fff
    top: 0
    left: 0
    z-index: 2002
    overflow-x:hidden
  .topbar
    padding-bottom:15px
    padding-top:15px
    border-1px(rgba(7, 17, 27, 0.1))
    position:fixed
    top:0
    left:0
    z-index:2002
    width:100%
    background: #fff
    p
      text-align: center
      font-size: 16px
    .fa-close
      font-size: 18px
      position:absolute
      left: 10px
      color: #555
  .fixedref
    position: fixed
    top: 80px
    right: 10px
    z-index:2003
    ul
      li
        text-align:center
        line-height:1.25rem
        padding:2px 5px 2px 0px
        a
          font-size:14px
          font-weight:bold
          color: #555
  .brands-list
    margin-top: 46px
    .brands-list-item
      .brands-list-item-letter
        background: #f0eff5
        padding: 10px 0px 10px 15px
        font-size: 16px
        &.isfixed
          position:fixed
          top:46px
          z-index:2002
          width:100%
      .brands-list-item__lists
        li
          position:relative
          .brands-title
            border-1px(rgba(7, 17, 27, 0.1))
            line-height: 50px
            display: inline-block
            width:100%;
            margin-left: 70px
            font-size: 16px
            color: #000
          img
            position:absolute
            margin:5px 0px 5px 10px
          img,span
            vertical-align: middle
  .fixed-list-letter
    position:fixed
    top:46px
    width:100%
    overflow: hidden
    z-index:3000
    li
      padding: 10px 0px 10px 15px
      font-size: 16px
      width:100%
      display:none
      transition: all 0.5s
      &.active
        display:block
        background: #f0eff5
</style>
