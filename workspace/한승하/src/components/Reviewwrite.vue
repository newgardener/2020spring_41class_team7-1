<template>
  <div>
    <v-app-bar
      color="amber"
      height="100px"
    >
      <router-link class="routerLink" to="/main">
        <v-btn icon width="auto" height="auto"  class="ma-1">
          <v-avatar size="90">
          <img src="../assets/logo.png">
          </v-avatar>
        </v-btn>  
      </router-link>
      <v-img src="../assets/comparewise.png" width="100px" height="auto"></v-img>

      <v-spacer></v-spacer>
      
            <!-- <router-link 
              class="routerLink" to="/wishlist"
              v-if="this.$store.state.isLogin"
            >
              <v-btn color="primary" dark v-on="on"  icon class="ma-2" >
                <v-icon x-large>mdi-star-outline</v-icon>
              </v-btn>
            </router-link> -->

      
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

      <router-link 
        class="routerLink" to="/signup"
        v-if="!this.$store.state.isLogin"
      >
        <v-btn class="ma-2" outlined>
          Signup
        </v-btn>
      </router-link>
    </v-app-bar>

    <v-container>
      <div class = "block" id = "first">
        <p>(d)선택된 리뷰상품 출력</p>
      </div>
      <form style="width:100%;">
        <div class = "block">
          <div class="star_grade">
            <v-row class="ml-2" style="display: flex; justify-content: center; margin: 30px 30px">
                <div v-for="n in 5"
                                :key="n" v-on:click="stars($event)">
                    <v-icon v-if="value - n >= 0" color="amber" class="ml-1" x-large>
                      mdi-star
                    </v-icon>
                    <v-icon v-if="value - n < 0 && value - n >= -0.5" color="amber" class="ml-1" x-large>
                      mdi-star-half-full
                    </v-icon>
                    <v-icon v-if="value - n <= -1" color="amber" class="ml-1" x-large>
                      mdi-star-outline
                    </v-icon>
                </div>
            </v-row>
          </div>
        </div>
        <div class = "block" style="text-align:center;">
          <textarea rows="10" cols="50" placeholder="솔직한 리뷰를 남겨주세요." style="resize: none;"></textarea>
        </div>
        
      <div class="my-2" style="text-align:center;">
        <v-btn color="primary" v-on:click="write">리뷰 등록</v-btn>
      </div>
      </form>

    </v-container>

    <v-footer class="pa-3">
      <v-spacer></v-spacer>
      <div>&copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
  </div>
</template>

<script>
import firebase from 'firebase';
import 'expose-loader?$!expose-loader?jQuery!jquery'
import { eventBus } from "../main"
export default {
    data(){
      return{
        stanx: 0,
        stany: 0,
        x: 0,
        y: 0,
        value: 0,
      }
    },
    methods: {
      stars: function(event){
        this.x = event.pageX;
        console.log(this.x)
        this.y = event.pageY;
      },
        write() { // DB에 보내기..
            console.log(1)
        },
    }
}

</script>

<style scoped>
  .block{
    width: 100%;
    background-color:#E8EAF6;
    margin-top:10px;
    margin-bottom:20px;
    padding:10px;
    height: auto;
    overflow: hidden;
  }
  .star{
    color:yellow;
  }
  textarea::placeholder{
    text-align: center;
    line-height: 230px;
  }
</style>