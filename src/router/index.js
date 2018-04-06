import Vue from 'vue'
import Router from 'vue-router'
import PageTransition from '@/components/PageTransition'
import Brands from '@/components/brands/brands'
import Series from '@/components/series/series'
import Spec from '@/components/spec/spec'
import Financial from '@/components/financial/financial'
import searchlist from '@/components/searchlist/searchlist'

Vue.use(Router)

Router.prototype.goBack = function () {
  this.isBack = true
  window.history.go(-1)
}

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'PageTransition',
      component: PageTransition,
      children: [
        {
          path: '/brands',
          component: Brands,
          name: 'Brands'
        },
        {
          path: '/series/:brandid',
          component: Series,
          name: 'Series'
        },
        {
          path: '/spec/:specid',
          component: Spec,
          name: 'Spec'
        },
        {
          path: '/financial',
          component: Financial,
          name: 'Financial'
        },
        {
          path: '/searchlist/:query',
          component: searchlist,
          name: 'searchlist'
        }
      ]
    }
  ]
})

export default router
