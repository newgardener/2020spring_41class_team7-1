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
    <v-card >
        <img v-bind:src = item.src style="margin-left: auto; margin-right: auto; display: block;"/>
        <v-card-title class="display-1">{{item.name}}<v-spacer></v-spacer>
        <div><v-btn icon class="ma-2" @click="snackbar = true"><v-icon x-large color="#F48FB1">mdi-heart</v-icon></v-btn>
        <v-snackbar v-model="snackbar">
            찜한 상품은 WishList에서 확인할 수 있습니다!
            <v-btn color="pink" text @click="snackbar = false" > Close </v-btn>
        </v-snackbar></div>
        </v-card-title>
          <v-card-subtitle>
              <v-row align="center"> 
                <v-rating
                  v-model="item.score"
                  color="pink"
                  dense
                  half-increments
                  readonly
                  size="40"
                  class="mx-3"
                ></v-rating>
                <div>({{item.reviewNum}})</div>
              </v-row>
              <br>
              <v-row align="center" class="display-1 mx-2 font-weight-black"> 최저가: {{item.item_id}}원 </v-row>
            </v-card-subtitle>
          <v-card-text>
            <v-tabs-slider></v-tabs-slider>
            <v-tabs v-model="tab" background-color="deep-purple accent-4" class="elevation-2" dark grow >
            <v-tab>상품설명</v-tab>
            <!--Item 설명 연결 -->
            <v-tab-item><img v-bind:src = item.describer style="margin-left: auto; margin-right: auto; display: block;"/></v-tab-item>
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
  created() {
    this.id = parseInt(this.$route.params.id,10)
    this.$http.get('https://comparewise.firebaseio.com/item.json').then(function(data){
                return data.json();
            }).then(function(data){
                for (let key in data) {
                    var tar = data[key]
                    if(tar.item_id === this.id){
                      this.item.category_id =  tar.category_id,
                      this.item.src = tar.img_src,
                      this.item.name = tar.item_name,
                      this.item.id = tar.item_id,
                      this.item.reviewNum = tar.review_volume,
                      this.item.score = tar.avg_score,
                      this.item.total_score = tar.total_score,
                      this.item.describer = tar.describer
                    }
                }
            })     
  },
    data() {
    return {
      id:'',
      search:"",
      sellers:[],
      item:{
        describer:'',
        category_id:'',
        src:'',
        name:'',
        id:'',
        price:'',
        reviewNum:'',
        score:'',
        total_score:'',
      },
      //to open dialog
      dialog: false,
      multiLine: true,
      snackbar: false,
    }
  },
}
</script>




<style>

</style>
