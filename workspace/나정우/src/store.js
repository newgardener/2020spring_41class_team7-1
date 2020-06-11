  
/* store.js */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  //state는 변수를 의미함  
  state: {
    count: 0,
    isLogin: false
  },
  //mutation 변수를 조작하는 함수
  mutations: {
    loginTrue (state) {
      state.isLogin = true
    },
    loginFalse (state) {
      state.isLogin = false
    },
    increment (state) {
      state.count++
    },
    decrement (state) {
      state.count--
    }
  }
})

//사용법 참고
//https://kamang-it.tistory.com/entry/Vue14vuex-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0