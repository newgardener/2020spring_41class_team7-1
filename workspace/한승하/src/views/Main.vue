<template>
  <div>
    <v-app-bar
      color="amber"
      height="100px"
    >
      <router-link class="routerLink" to="/main">
        <v-btn icon width="auto" height="auto"  class="ma-1">
          <v-avatar size="90">
          <img src="../assets/ComparewiseLOGO.jpg">
          </v-avatar>
        </v-btn>  
      </router-link>

      <v-toolbar-title><h1>CompareWise</h1></v-toolbar-title>

      <v-spacer></v-spacer>
      
      <router-link 
        class="routerLink" to="/wishlist"
        v-if="this.$store.state.isLogin"
      >
        <v-btn icon class="ma-2">
          <v-icon x-large>mdi-star-outline</v-icon>
        </v-btn>
      </router-link>
      
      <router-link 
        class="routerLink" to="/mypage"
        v-if="this.$store.state.isLogin"
      >
        <v-btn icon class="ma-2">
          <v-icon x-large>mdi-account-outline</v-icon>
        </v-btn>
      </router-link>
      
      <v-btn @click="logout()" v-if="this.$store.state.isLogin" class="ma-2" outlined>
        Logout
      </v-btn>
          
      <router-link 
        class="routerLink" to="/login"
        v-if="!this.$store.state.isLogin"
      >
        <v-btn class="ma-2" outlined>
          Login
        </v-btn>
      </router-link>
    </v-app-bar>

    <!-- 검색창 -->
    <v-card
      color="amber lighten-3"
      width="100%"
      height="80px"
    >
      <v-form>
        <v-row class="mx-2">
          <v-text-field
            
            outlined
            clearable
            class="my-3"
            color="black"
            label="Search!"
            append-icon = mdi-magnify
            @click:append="doSomething"
          >
          </v-text-field>
        </v-row>
      </v-form>
    </v-card>

    <!-- 카테고리 및 랭킹 -->
    <v-container class="mt-5" width="100%">
      <v-row  width="100%" no-gutters>
          <v-btn @click="changeList(1)" color="#E8EAF6" tile width="25%">
            <span>category1</span>
          </v-btn>

          <v-btn @click="changeList(2)" color="#E8EAF6" tile width="25%">
            <span>Category2</span>
          </v-btn>

          <v-btn @click="changeList(3)" color="#E8EAF6" tile width="25%">
            <span>Category3</span>
          </v-btn>

          <v-btn id="defaultList" @click="changeList(4)" color="#E8EAF6" tile width="25%">
            <span>Category4</span>
          </v-btn>
      </v-row>
      <v-row  width="100%" no-gutters>
          <v-btn @click="changeList(5)" color="#E8EAF6" tile width="33.33%">
            <span>Daily</span>
          </v-btn>

          <v-btn @click="changeList(6)" color="#E8EAF6" tile width="33.33%">
            <span>Weekly</span>
          </v-btn>

          <v-btn @click="changeList(7)" color="#E8EAF6" tile width="33.34%">
            <span>Monthly</span>
          </v-btn>
      </v-row>
    </v-container>
    

    <!-- 아이템 리스트 -->
    <v-container>
      <v-row>
        <v-col
        v-for="(item, i) in list"
        :key="i"
        cols="12"
        >
          <router-link 
            class="routerLink" to="/itemdetail"
          >
            <v-card flat tile color="#E8EAF6">
              <v-row>
                <v-col 
                  v-for="n in 2" 
                  :key="n" 
                  :cols="n === 1 ? 3 : 9"
                >
                  <div v-if="n === 1">
                    <h2 class="ml-3">{{ i+1 }}</h2>
                    <center>
                      <v-avatar
                        class="mb-5 ml-7"
                        size="90%"
                        tile
                      >
                        <img src="../assets/ComparewiseLOGO.jpg">
                      </v-avatar>
                    </center>
                    
                  </div>
                  <div v-else>
                    <v-card-title
                      class="display-1 font-weight-bold"
                      v-text="item.name"
                    ></v-card-title>
                    <v-card-subtitle 
                      class="title ml-1 mt-0"
                    > {{ item.price }} 원</v-card-subtitle>
                    
                    
                    <v-row class="ml-2">
                      <div v-for="n in 5"
                            :key="n"
                            >
                        <v-icon v-if="item.score - n >= 0" color="amber" class="ml-1">
                          mdi-star
                        </v-icon>
                        <v-icon v-if="item.score - n < 0 && item.score - n >= -0.5" color="amber" class="ml-1">
                          mdi-star-half-full
                        </v-icon>
                      </div>
                      <p class="ml-2">
                        ({{ item.reviewNum }})
                      </p>
                      
                    </v-row>
                  </div>
                </v-col>
              </v-row>
            </v-card>
          </router-link>
            
          <v-card flat tile color="#E8EAF6" class="d-flex flex-row-reverse">
            <router-link 
        class="routerLink" to="/Compare"
      >
            <v-btn icon class="ma-2">
              <v-icon x-large>mdi-scale-balance</v-icon>
            </v-btn>
            </router-link>
            <v-btn icon color="amber" class="ma-2">
              <v-icon x-large>mdi-star-circle</v-icon>
            </v-btn>
          </v-card>
          
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { eventBus } from "../main"
  
export default {
  methods: {
    itemCategory () {
      return null
    },
    search () {
      return null
    },
    doSomething () {
      return null
    },
    logout () {
      this.$store.commit('loginFalse')
    },
    dialogTrue () {
      this.dialog = true
      console.log(this.dialog)
    },
    dialogFalse () {
      this.dialog = false
      console.log(this.dialog)
    },
    changeList (num) {
      this.list = []
      this.listNum = num
      if(this.listNum==1){
        this.list.push(this.items[0])
      }
      else if(this.listNum==2){
        this.list.push(this.items[1])
        this.list.push(this.items[1])
      }
      else if(this.listNum==3){
        this.list.push(this.items[1])
        this.list.push(this.items[1])
        this.list.push(this.items[1])
      }
      else if(this.listNum==4){
        this.list.push(this.items[1])
        this.list.push(this.items[1])
        this.list.push(this.items[1])
        this.list.push(this.items[1])
      }
      else if(this.listNum==5){
        this.list.push(this.items[1])
        this.list.push(this.items[1])
        this.list.push(this.items[1])
        this.list.push(this.items[1])
        this.list.push(this.items[1])
      }
      else if(this.listNum==6){
        this.list.push(this.items[1])
        this.list.push(this.items[1])
        this.list.push(this.items[1])
        this.list.push(this.items[1])
        this.list.push(this.items[1])
        this.list.push(this.items[1])
      }
      else if(this.listNum==7){
        this.list.push(this.items[1])
        this.list.push(this.items[1])
        this.list.push(this.items[1])
        this.list.push(this.items[1])
        this.list.push(this.items[1])
        this.list.push(this.items[1])
        this.list.push(this.items[1])
      }
    }
  },
  data() {
    return {
      items: [
        {
          src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          name: 'Category1',
          id: '1',
          price: '65,000',
          reviewNum: '365',
          score: 4.3
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
          name: 'Halcyon Days',
          id: '1',
          price: '5,000',
          reviewNum: '265',
          score: 4.7
        },
      ],
      listNum: 5,
      list: [],
      //to open dialog
      dialog: false,
    }
  },
  created() {
    eventBus.$on('loginTrue', isTrue => {
      this.$store.commit('loginTrue')
    })

    //make default item list
    this.list.push(this.items[1])
    this.list.push(this.items[1])
    this.list.push(this.items[1])
    this.list.push(this.items[1])
    this.list.push(this.items[1])
  },
  
}

import Vue from 'vue'
import { longClickDirective } from 'vue-long-click'
const longClickInstance = longClickDirective({delay: 600, interval: 500000})
Vue.directive('longclick', longClickInstance)

const PRESS_TIMEOUT = 1000

Vue.directive('longpress', {
  bind: function (el, { value }, vNode) {
    if (typeof value !== 'function') {
      console.warn(`Expect a function, got ${value}`)
      return
    }

    let pressTimer = null

    const start = e => {
      if (e.type === 'click' && e.button !== 0) {
        return;
      }

      if (pressTimer === null) {
        pressTimer = setTimeout(() => value(e), PRESS_TIMEOUT)
      }
    }

    const cancel = () => {
      if (pressTimer !== null) {
        clearTimeout(pressTimer)
        pressTimer = null
      }
    }

    ;['mousedown', 'touchstart'].forEach(e => el.addEventListener(e, start))
    ;['click', 'mouseout', 'touchend', 'touchcancel'].forEach(e => el.addEventListener(e, cancel))
  }
})

</script>

<style>
  .routerLink {
    text-decoration: none;
  }
</style>