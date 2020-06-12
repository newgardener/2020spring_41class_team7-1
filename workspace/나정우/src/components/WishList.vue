<template>
  <v-card
    max-width="600px"
    class="mx-auto"
    color=#768AFF
  >
    <v-app-bar
      dark
      color="yellow darken-3"
    >
      <v-btn icon width="auto" height="auto"  class="pa-1">
        <v-avatar size="60">
         <img src="../assets/ComparewiseLOGO.jpg">
        </v-avatar>
      </v-btn>
      <v-toolbar-title>CompareWise</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon large color="white">mdi-star-outline</v-icon>
      </v-btn>
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

    <v-bottom-navigation
      v-model="bottomNav">
      <router-link 
        class="routerLink" to="/mypage">
        <v-btn value="recent">
          <span>MY</span>
          <span class="iconify" data-icon="mdi:account" data-inline="false" style="margin-top: 5px;" data-width="30px" data-height="30px"></span>
       </v-btn>
      </router-link>

      <router-link 
        class="routerLink" to="/Wishlist">
        <v-btn value="favorites">
          <span>위시리스트</span>
          <span class="iconify" data-icon="mdi:cards-heart" data-inline="false" style="margin-top: 5px;" data-width="30px" data-height="30px"></span>
       </v-btn>
      </router-link>

      <router-link 
        class="routerLink" to="/Review">
        <v-btn value="nearby">
         <span>Review</span>
         <span class="iconify" data-icon="mdi:border-color" data-inline="false" style="margin-top: 5px;" data-width="30px" data-height="30px"></span>
        </v-btn>
      </router-link>
    </v-bottom-navigation>

  </v-card>
</template>

<script>
import firebase from 'firebase';
export default {
    data(){
      return{
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
    /*eventBus.$on('loginTrue', isTrue => {
      this.$store.commit('loginTrue')
    })*/
    var value = document.cookie.match('(^|;) ?' + "email" + '=([^;]*)(;|$)');
    var email = value? value[2] : null;
    var value2 = document.cookie.match('(^|;) ?' + "nick" + '=([^;]*)(;|$)');
    var nick = value2? value2[2] : null;
    //var my_info = getCookie("email")//함수 보완해서 수정 중
    console.log(email)
    alert(email)
    }
}
</script>

<style scoped>
  .block{
    width: 100%;
    background-color:beige;
    margin-bottom:20px;
    padding:10px;
  }
</style>
