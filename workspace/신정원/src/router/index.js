import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from '../components/Main.vue'
import ItemDetail from '../components/ItemDetail.vue'
import Login from '../components/Login.vue'
import Signup from '../components/Signup.vue'
import MyPage from '../components/MyPage.vue'
import WishList from '../components/WishList.vue'
import Compare from '../components/Compare.vue'

Vue.use(VueRouter)

const requireAuth = (to, from, next) => {
  if (Auth.loggedIn()) return next()
  next({
    path: '/login',
    query: { redirect: to.fullPath }
  })
}

  const routes = [
    {
      path: '/main',
      name: 'Main',
      component: Main
    },
    {
      path: '/itemdetail',
      name: 'ItemDetail',
      component: ItemDetail
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/mypage',
      name: 'MyPage',
      component: MyPage
    },
    {
      path: '/wishlist',
      name: 'WishList',
      component: WishList
    },
    {
      path: '/compare',
      name: 'Compare',
      component: Compare
    },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
