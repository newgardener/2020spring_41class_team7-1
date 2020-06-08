<template>
  <div>
    <v-app-bar
      color="amber"
      height="100px"
    >
    <router-link class="routerLink" to="/main">
        <v-btn 
          icon 
          width="auto" 
          height="auto"  hanl
          class="ma-1"
          @click="login"
        >
          <v-avatar size="90">
          <img src="../assets/ComparewiseLOGO.jpg">
          </v-avatar>
        </v-btn>  
    </router-link>  

      <v-toolbar-title><h1>Item Detail</h1></v-toolbar-title>

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
    <v-card>
        <v-img :src="src" aspect-ratio="1.7"></v-img>
        <v-card-title class="display-1">{{name}}<v-spacer></v-spacer>
        <div><v-btn icon class="ma-2" @click="snackbar = true"><v-icon x-large color="#F48FB1">mdi-heart</v-icon></v-btn>
        <v-snackbar v-model="snackbar">
            찜한 상품은 찜 목록에서 확인할 수 있습니다!
            <v-btn color="pink" text @click="snackbar = false" > Close </v-btn>
        </v-snackbar></div>
        </v-card-title>
          <v-card-subtitle>
              <v-row align="center"> 
                <v-rating
                  v-model="score"
                  color="pink"
                  dense
                  half-increments
                  readonly
                  size="40"
                  class="mx-3"
                ></v-rating>
                <div>({{reviewNum}})</div>
              </v-row>
              <br>
              <v-row align="center" class="display-1 mx-2 font-weight-black"> 최저가: {{price}}원 </v-row>
            </v-card-subtitle>
          <v-card-text>
            <v-tabs-slider></v-tabs-slider>
            <v-tabs v-model="tab" background-color="deep-purple accent-4" class="elevation-2" dark grow >
            <v-tab>상품설명</v-tab>
            <!--Item 설명 연결 -->
            <v-tab-item>트와이스의 아주 개쩌는 앨범 입니다.<br>배송비: 250000원<br>판매자: JYP</v-tab-item>
            <v-tab>상품리뷰</v-tab>
            <!--Item review 정보 -->
            <v-tab-item>매일 자기전 듣고 있습니다.<br>아주 깔끔한 앨범 감사합니다<br>작성자: 박진영</v-tab-item>
            <v-tab>구매처</v-tab>
            <!--구매처 정보-->
            <v-tab-item>www.skku.edu (65000원) <br>icampus.skku.edu (72000원)</v-tab-item>
            </v-tabs>
          </v-card-text>
      </v-card>
  </div>
</template>


<script>
  export default {
    data() {
    return {
      src: 'https://t1.daumcdn.net/cfile/tistory/9950C8365A75CCA31F',
      name: 'Twice Summer Album',
      id: '1',
      price: '65,000',
      reviewNum: '365',
      score: 4.3,
      multiLine: true,
      snackbar: false,
    }
  },
}
</script>