import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from '../views/Main.vue'
import ItemDetail from '../views/ItemDetail.vue'
import Login from '../views/Login.vue'
import MyPage from '../views/MyPage.vue'
import WishList from '../views/WishList.vue'
import Compare from '../views/Compare.vue'

Vue.use(VueRouter)

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
    component: () => import( '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
})



export default router
