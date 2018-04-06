<template>
  <div class="fincal" id="fincal">
    <div class="select-fincal">
      <ul>
         <router-link to="/">
        <li class="border-1px" @click="showmd(1)">
          <span>玖伴金融方案(优)</span><i class="fa fa-check" :class="{'md-show': isShowMethod==1}"></i>
        </li>
        </router-link>
        <router-link to="/">
        <li @click="showmd(2)"><span>玖伴金融方案(良)</span><i class="fa fa-check" :class="{'md-show': isShowMethod==2}"></i></li>
        </router-link>
      </ul>
    </div>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  created () {
    this.$store.dispatch('showmd')
  },
  computed: {
    ...mapGetters({
      fainacal: 'fainacal',
      isShowMethod: 'setisShowMethod'
    })
  },
  methods: {
    ...mapActions([
      'showmd'
    ])
  }
}
</script>
<style lang="stylus" type="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'
  .fincal
    width:100%
    height: 100%
    position: fixed
    background: rgba(0,0,0,.7)
    top:0
    left:0
    z-index: 2001
    overflow: hidden
    &.md-hidden
      display:none
    .select-fincal
      width:100%
      background:#fff
      position:absolute
      bottom:0
      ul
        margin:0px 0px 0px 20px
        padding-right:20px
        a
          color: #555
        li
          line-height:50px
          &:first-child
            border-1px(rgba(7, 17, 27, 0.1))
          .fa-check
            float:right
            margin-top: 20px
            color: #f04c1f
            font-size:16px
            display: none
            &.md-show
              display: block
          span
            font-size:16px
</style>
