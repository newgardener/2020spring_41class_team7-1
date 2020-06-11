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
      <router-link class="routerLink" to="/main">
        <v-btn 
          icon 
          width="auto" 
          height="auto"  
          class="ma-1"
        >
          <v-avatar size="90">
          <img src="../assets/ComparewiseLOGO.jpg">
          </v-avatar>
        </v-btn>  
    </router-link>  
      <v-toolbar-title>CompareWise</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon large color="white">mdi-star-outline</v-icon>
      </v-btn>
    </v-app-bar>

    <v-container>
      <div class = "block" id = "first">
        <span class="iconify" data-icon="mdi:account-circle-outline" data-inline="false" style="color: rgb(85, 161, 219);" data-width="50px" data-height="50px"></span>
      <div>   이름: {{name}}</div>
      <div>   별명: {{nick}} </div>
      </div>

      <div class = "block" id = "second">
        <div class = "b_in_b1">0</div><!-- 토큰 uid로 user DB 검색 -->
        <div class = "b_in_b1">0</div><!-- 토큰 uid로 wishlist DB 검색 -->
        <div class = "b_in_b1">0</div><!-- 토큰 uid로 review DB 검색 -->
        <div class = "b_in_b1">내 리뷰</div>
        <div class = "b_in_b1">관심상품</div>
        <div class = "b_in_b1">문의내역</div>
      </div>

      <div class = "block" id = "third">
        <div class = "b_in_b2">관심 분야</div>
        <div class = "b_in_b2">
          <div class="my-2">
            <v-btn class="ma-2" outlined color="indigo">분야 선택</v-btn>
          </div>
        </div>
        <div class = "b_in_b2">
          <v-switch v-model="switch1"
          :label="'푸시알림 받기'"></v-switch>
        </div>
      </div>

      <div class = "block" id = "third">
        <v-btn small color="primary">문의하기</v-btn>
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
import 'expose-loader?$!expose-loader?jQuery!jquery'
export default {
  
  data() {
    return {
            form: {
                nickname: '',
                password: '',
                email: ''
            },

          email: "",
          nick: "",
          name: ""
        }
         
  },
  
  methods: {
    getCookie(name)
        {
          var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
          return value? value[2] : null;
        }
  },
  mounted() {
      let recaptchaScript = document.createElement('script')
      recaptchaScript.setAttribute('src', 'https://code.iconify.design/1/1.0.6/iconify.min.js')
      document.head.appendChild(recaptchaScript)
    },
  created() {
    /*eventBus.$on('loginTrue', isTrue => {
      this.$store.commit('loginTrue')
    })*/
    var email = this.getCookie("email")//함수 보완해서 수정 중
    var nick = this.getCookie("nick")//함수 보완해서 수정 중
    var name = this.getCookie("name")//함수 보완해서 수정 중
    var password = this.getCookie("pw")//함수 보완해서 수정 중
    console.log(email)
   
    this.name=name;
    this.nick=nick; 
    console.log(name)
  }
 /*admin.auth().verifyIdToken(idToken)
  .then(function(decodedToken) {
    let uid = decodedToken.uid;
    // ...
  }).catch(function(error) {
    // Handle error
  });*/
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
