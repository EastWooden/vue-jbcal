<template>
  <div id="app">
    <div class="container-wrapper" ref='containerwrapper' v-if="$route.path =='/'">
      <div class="header">
        <div class="titlel">
          <p class="title-text">玖伴车行贷款购车计算器</p>
        </div>
        <div class="search-wrapper">
          <search></search>
        </div>
      </div>
      <div class="select-wrapper border-1px-top" @click = 'hiddenTable'>
        <div class="brand border-1px">
          <router-link to="/brands">
            <i class="fa fa-car"></i><input class="barndtext" type="text" name="currentBrand" v-model="currentBrandname" disabled><i class="fa fa-angle-right"></i>
          </router-link>
        </div>
        <div class='price border-1px'>
          <i class="fa fa-jpy"></i><input class="pricetext" type="number" pattern="[0-9]*" v-model="jbprice1"><i class="fa fa-angle-right"></i>
        </div>

        <div class="fancial" @click ="setScroll">
          <router-link to="/financial">
            <i class="fa fa-cc-visa"></i><input class="fan-programme-text" type="text" v-model="fainacal" disabled="disabled"><i class="fa fa-angle-right"></i>
          </router-link>
        </div>
      </div>
      <div class="pricescroll-wrapper" id="aa">
        <div class="quotedPrice">
          <div class="quotedPrice-item">
            <p>贷款期限(年)</p>
            <span>3</span>
          </div>
          <div class="quotedPrice-item">
            <p>厂商指导价(元)</p>
            <span>{{csprice}}</span>
          </div>
        </div>
        <div class="calprice">
          <button class="calprice-btn" @click='getprice()'>
            <i class="fa fa-calculator"></i>计算价格
          </button>
        </div>
        <div class="price-vs clearfix">
          <div class="price-vs-item jbprice">
            <div class="jbprice-wrapper middle">
              <div>
                <p>玖伴贷款裸车价</p>
                <span class="carprice-text">{{jiubandetail.合计 | fiter_total_money("万")}}</span>
              </div>
            </div>
          </div>
          <div class="price-vs-item vs-text">
            <span>vs</span>
          </div>
          <div class="price-vs-item ssprice jbprice">
            <div class="jbprice-wrapper middle">
              <div>
                <p>4s店贷款裸车价</p>
                <span class="carprice-text">{{ssdetail.合计 | fiter_total_money("万")}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="loan-details">
          <a href="javascript:;" class="check-loan-details" @click='showTable'>{{checkdkmxtext}}<i class="fa fa-angle-double-right"></i></a>
          <dkdetail v-if="isShow" :jiubandetail="jiubandetail" :ssdetail="ssdetail" :qt="qt"></dkdetail>
        </div>
        <div class="expense">
          <div class="expense-item">
            <p>车辆购置税(元)</p>
            <span>{{qt.gzs}}</span>
          </div>
          <div class="expense-item">
            <p>保险费(元)</p>
            <span>{{qt.bxf}}</span>
          </div>
        </div>
      </div>
      <div class="notes-info border-1px-top">
        <p class="notes-info-text">*此结果仅供参考，实际费用以当地缴费为准</p>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Search from './components/search/search'
import dkdetail from './components/dkdetail/dkdetail'
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      pricetext: 555555,
      programmertext: '玖伴金融方案',
      discountdesc: '',
      isShow: false,
      checkdkmxtext: '查看贷款明细',
      jiubandetail: {
        合计: '0'
      },
      ssdetail: {
        合计: '0'
      },
      newdetail: {

      },
      qt: {
        gzs: '--',
        bxf: '--'
      }
    }
  },
  filters: {
    fiter_total_money: function (value, type) {
      return (value / 10000).toFixed(2) + type
    }
  },
  computed: {
    ...mapGetters({
      currentBrand: 'getCurrenBrand',
      currentseries: 'getcurSeries',
      currentSpec: 'currentSpec',
      chexingId: 'chexingId',
      csprice: 'csprice',
      jbprice: 'jbprice',
      fainacal: 'setfainacal',
      fainacalCode: 'setfainacalCode'
    }),
    jbprice1: {
      // 获取价格
      get: function () {
        return this.$store.state.spec.jbprice
      },
      // 设置输入的价格
      set: function (newValue) {
        this.$store.state.spec.jbprice = newValue
      }
    },
    currentBrandname: {
      get: function () {
        return this.$store.state.brands.currentBrand.name + this.$store.state.series.curSeries.name + this.$store.state.spec.currentspec.name
      },
      // 设置输入的价格
      set: function (newValue) {
      }
    }
  },
  components: {
    search: Search,
    dkdetail: dkdetail
  },
  methods: {
    ...mapActions([
      // 'getprice'
    ]),
    hiddenTable: function () {
      this.isShow = false
      this.checkdkmxtext = '查看贷款明细'
    },
    showTable: function () {
      this.isShow = !this.isShow
      if (this.checkdkmxtext === '查看贷款明细') {
        this.checkdkmxtext = '收起明细'
      } else if (this.checkdkmxtext === '收起明细') {
        this.checkdkmxtext = '查看贷款明细'
      }
    },
    getprice: function () {
      this.$http.jsonp('https://oa.ccsh177.cn/cal/ajax/getprice.html', {params:
        {
          specid: this.chexingId,
          price: this.jbprice1,
          financial: this.fainacalCode
        }}).then(response => {
        if (this.jbprice1 === 0 || this.jbprice1 < 10000 || this.jbprice1 === 'undefined') {
          alert('请输入正确的车价后重试')
        } else {
          var res = response.body
          this.jiubandetail = res.jiuban
          this.ssdetail = res.ss
          this.qt = res.qt
          alert('报价来源:' + this.qt.pricefrom)
        }
      })
    },
    setScroll: function () {
      document.body.scrollTop = 0
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import './common/stylus/mixin.styl'
.header
  padding-bottom:15px
  width:100%
  .titlel
    padding:12px 0px
    .title-text
      text-align: center
      font-size: 16px
  .search-wrapper
    margin: 0px 12px
    // position: fixed
.select-wrapper
  border-1px-top(rgba(7, 17, 27, 0.1))
  width:100%
  background:#fff
  div
    margin-left: 18px
    padding-top:4px
    padding-bottom: 4px
    .fa-angle-right
      float: right
      margin-right: 20px
      color: #c5c5c5
      margin-top:11px
    input
      padding-left:10px
      outline:none
      color: #555
      font-weight: bold
      box-sizing: border-box
      height: 38px
      vertical-align: middle
      font-size: 14px
      text-overflow: ellipsis
      width:80%
      &:disabled
        color: #555 !important
        background: transparent
        opacity: 1
    &.brand
      border-1px(rgba(7, 17, 27, 0.1))
      i
        font-size: 16px
        vertical-align: middle
        &.fa-car
          color: #417dcf
    &.price
      border-1px(rgba(7, 17, 27, 0.1))
      .pricetext
        padding-left: 15px
      i
        font-size: 16px
        &.fa-jpy
          color: #e9763b
          margin-left: 5px
          vertical-align: middle
    &.fancial
      .fan-programme-text
        padding-left: 10px
      i
        font-size: 16px
        vertical-align: middle
        &.fa-cc-visa
          color: #0e3276
.quotedPrice
  display: flex
  background: linear-gradient(to right, #2a73fe , #7daaff); /* 标准的语法 */
  .quotedPrice-item
    flex: 1
    color:#fff
    // border-right: solid 1px #999
    box-shadow:1px 0 #2a73fe
    padding-top:20px
    padding-bottom: 15px
    &:last-child
      border-right-width: 0
    p
      font-size: 12px
      padding-left:18px
    span
      padding-left: 18px
      font-size: 20px
      margin-top: 10px
      display: inline-block
.calprice
  padding: 14px 8px
  .calprice-btn
    background: #f6825b
    line-height: 40px
    border:none
    color: #fff
    width: 100%
    font-size: 14px
    box-sizing: border-box
    border-radius: 5px
    padding:0
    display: inline-block
    outline: none
.price-vs
  padding: 10px 37px
  position:relative
  p
    font-size: 12px
  .carprice-text
    font-size:18px
    display: inline-block
    margin-top:10px
    font-weight: 500
.jbprice
  display:inline-block
  width: 40%
  height: 0
  padding-top: 40%
  border-radius: 100%
  border: 1px solid #2a73fe
  position: relative
  box-sizing: border-box
  p,span
    color: #2a73fe
  .jbprice-wrapper
    position: absolute
    left: 0
    top: 0
    width: 100%
    height: 100%
    overflow: hidden
    text-align: center
    &.middle
      &:before
        display: inline-block
        vertical-align: middle
        content: ''
        height: 100%
        width: 0
        overflow: hidden
      div:first-child
        display: inline-block
        vertical-align: middle
  &.ssprice
    border: solid 1px #f19149
    float: right
    p,span
      color: #f19149
.vs-text
  vertical-align: top
  display: inline-block
  position: absolute
  top: 50%
  margin-top:-1.25rem
  left:50%
  margin-left:-1.25rem
  span
    font-size:2.5rem
    color: #2a73fe
.loan-details
  text-align: center
  .check-loan-details
    color:#2a73fe
    font-size: 12px
    i
      padding-left:5px
      font-size: 14px
.expense
  display: flex
  border-1px-top(rgba(7, 17, 27, 0.1))
  margin-top: 10px
  .expense-item
    flex:1
    border-right: solid 1px rgba(7, 17, 27, 0.1)
    padding-top:20px
    padding-left:18px
    padding-bottom: 20px
    &:last-child
      border-right-width: 0px
    p
      color: #9c9c9c
      font-size: 12px
    span
      display:inline-block
      margin-top:20px
      font-size: 16px
      font-weight: bold
      color: #555
.notes-info
  border-1px-top(rgba(7, 17, 27, 0.1))
  background: #fff
  padding: 12px 0px
  width:100%
  .notes-info-text
    text-align: center
    color: #b5b5b5
.fincal.fa-md-show
  display:block
.pricescroll-wrapper
  width:100%
  background:#fff
  bottom:38px
  z-index:2001
  &::-webkit-scrollbar
    display:none
</style>
