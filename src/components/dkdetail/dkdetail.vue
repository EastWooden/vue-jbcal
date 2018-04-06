<template>
    <div class="table-wrapper">
        <div class="table-item">
          <table>
            <thead>
              <tr>
                <td>明细</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in jiubandetail" :key="item.id">
                <td>{{index}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="table-item">
          <table>
            <thead>
              <tr>
                <td>玖伴车行</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in jiubandetail" :key="item.id">
                <td>{{item}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="table-item">
          <table>
            <thead>
              <tr>
                <td>4s店</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in ssdetail" :key="item.id">
                <td>{{item}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
</template>
<script>
export default {
  props: [
    'jiubandetail',
    'ssdetail',
    'qt'
  ],
  mounted: function () {
    this.$nextTick(function () {
      this.sixpay()
      // console.log(this.jiubandetail)
    })
  },
  methods: {
    sixpay: function () {
      for (let k in this.jiubandetail) {
        if (k === '第6个月') {
          this.jiubandetail.第6个月 = this.qt.sixpay
        }
      }
      // console.log(this.jiubandetail.第6个月)
    }
  }

}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.table-wrapper
    display:flex
    .table-item
      flex:1
  table
    color: #fff
    width: 100%
    margin-top: 10px
    // display:inline-block
    &.md-show
      display:none
    thead
      background-color: #2a73fe
      line-height: 2rem
      font-size:14px
    tbody
      tr:nth-of-type(2n+1)
        background-color: #eeeeee
      td
        line-height: 2rem
        color: #777777
</style>
