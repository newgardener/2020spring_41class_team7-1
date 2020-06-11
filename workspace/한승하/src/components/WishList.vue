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
    <v-app-bar dense>
      <div style="width: 100%;">
        <select name="category" style="width: 100%" @change="changecate($event)">
            <option value="overall" selected>전체</option>
            <option value="one">가전제품</option>
            <option value="two">뷰티</option>
            <option value="three">생활용품</option>
            <option value="four">식품</option>
            <option value="five">패션</option>
        </select>
      </div>
    </v-app-bar>

    <v-container>
      
      <div style="overflow:auto; height:500px;">
        <div class = "block" id = "cate1">
          가전제품<hr>
          <p>(d)상품들</p><!-- 토큰 uid로 wishlist DB 검색 -->
        </div>
        <div class = "block" id = "cate2">
          뷰티<hr>
          <p>(d)상품들</p><!-- 토큰 uid로 wishlist DB 검색 -->
        </div>
        <div class = "block" id = "cate3">
          생활용품<hr>
          <p>(d)상품들</p><!-- 토큰 uid로 wishlist DB 검색 -->
        </div>
        <div class = "block" id = "cate4">
          식품<hr>
          <p>(d)상품들</p><!-- 토큰 uid로 wishlist DB 검색 -->
        </div>
        <div class = "block" id = "cate5">
          패션<hr>
          <p>(d)상품들</p><!-- 토큰 uid로 wishlist DB 검색 -->
        </div>
      </div>

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
          email: "",
          wishnum: 0,
          wish: [],
      }
    },
    methods: {
      changecate(selected){
        if (event.target.value == "overall"){
          document.getElementById("cate1").style.display = "block"
          document.getElementById("cate2").style.display = "block"
          document.getElementById("cate3").style.display = "block"
          document.getElementById("cate4").style.display = "block"
          document.getElementById("cate5").style.display = "block"
        }
        else if (event.target.value == "one"){
          document.getElementById("cate1").style.display = "block"
          document.getElementById("cate2").style.display = "none"
          document.getElementById("cate3").style.display = "none"
          document.getElementById("cate4").style.display = "none"
          document.getElementById("cate5").style.display = "none"
        }
        else if (event.target.value == "two"){
          document.getElementById("cate1").style.display = "none"
          document.getElementById("cate2").style.display = "block"
          document.getElementById("cate3").style.display = "none"
          document.getElementById("cate4").style.display = "none"
          document.getElementById("cate5").style.display = "none"
        }
        else if (event.target.value == "three"){
          document.getElementById("cate1").style.display = "none"
          document.getElementById("cate2").style.display = "none"
          document.getElementById("cate3").style.display = "block"
          document.getElementById("cate4").style.display = "none"
          document.getElementById("cate5").style.display = "none"
        }
        else if (event.target.value == "four"){
          document.getElementById("cate1").style.display = "none"
          document.getElementById("cate2").style.display = "none"
          document.getElementById("cate3").style.display = "none"
          document.getElementById("cate4").style.display = "block"
          document.getElementById("cate5").style.display = "none"
        }
        else if (event.target.value == "five"){
          document.getElementById("cate1").style.display = "none"
          document.getElementById("cate2").style.display = "none"
          document.getElementById("cate3").style.display = "none"
          document.getElementById("cate4").style.display = "none"
          document.getElementById("cate5").style.display = "block"
        }
      }
    },
    created() {
    eventBus.$on('loginTrue', isTrue => {
      this.$store.commit('loginTrue')
    })
    var email = this.getCookie("email")
    console.log(email)
    this.email=email;
    this.$http.get('https://comparewise.firebaseio.com/WishList.json').then(function(data){
                return data.json();
            }).then(function(data){
                for (let key in data) {
                  if (data[key]==null)
                  {
                    continue;
                  }
                  if(data[key].user_id==this.email)
                  {
                    var tar = data[key]
                    var tmp =
                        {
                            item_id: tar.item_id,
                            date: tar.wish_list_date,
                        }
                    this.wish.push(tmp)
                    this.wishnum = this.wishnum + 1
                  }
                }
            });
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
</style>
