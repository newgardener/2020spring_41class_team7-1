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
    <v-card outlined>
        <img v-bind:src = item.src style="margin-left: auto; margin-right: auto; display: block;"/>
        <v-card-title class="display-1">{{item.name}}<v-spacer></v-spacer>
        <v-btn icon class="ma-2" v-on:click=writereview()><v-icon x-large color="#BBDEFB">mdi-border-color</v-icon></v-btn>
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
              <v-row align="center" class="display-1 mx-2 font-weight-black"> 최저가: {{item.price}}원 </v-row>
            </v-card-subtitle>
          <v-card-text>
            <v-tabs-slider></v-tabs-slider>
            <v-tabs v-model="tab" background-color="deep-purple accent-4" class="elevation-2" dark grow >
            <v-tab>상품설명</v-tab>
            <!--Item 설명 연결 -->
            <v-tab-item><img v-bind:src = item.describer style="margin-left: auto; margin-right: auto; display: block;"/></v-tab-item>
            <v-tab>상품리뷰</v-tab>
            <!--Item review 정보 -->
            <v-tab-item><v-card v-for="review in reviews" :key=review outlined>
              <v-list><v-list-item-content>
                <div class="overline mb-4">작성일: {{review.review_date}}</div>
                <v-list-item-title class="headline mb-1">{{review.title}}</v-list-item-title>
                <v-list-item-subtitle>{{review.nickname}}</v-list-item-subtitle>
                <v-rating
                  v-model="review.score"
                  color="red"
                  dense
                  half-increments
                  readonly
                  size="10"
                ></v-rating><br><br>
                <v-card outlined>{{review.content}}</v-card>
              </v-list-item-content></v-list>
              </v-card></v-tab-item>
            <v-tab>구매처</v-tab>
            <!--구매처 정보-->
            <v-tab-item><v-card v-for="seller in sellers" :key="seller" outlined>{{seller.site_name}}<br>
            가격:{{seller.cost}}<br>{{seller.site_url}}</v-card></v-tab-item>
            </v-tabs>
          </v-card-text>
      </v-card>
  </div>
</template>




<script>

export default {
  created() {
    this.id = this.$route.params.id
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
    this.$http.get('https://comparewise.firebaseio.com/ItemSeller/'+this.id+'.json').then(function(data){
                return data.json();
            }).then(function(data){
                for (let key in data) {
                                var tar = data[key]
                                if(tar.item_id === this.id){
                                var cost = Number(tar.cost.replace(/[^0-9.-]+/g,""))
                                if(cost < this.item.price) this.item.price = cost
                                var tmp =
                                  {
                                    cost: cost,
                                    item_id: tar.item_id,
                                    site_name : tar.site_name,
                                    site_url: tar.site_url
                                  }
                                this.sellers.push(tmp)
                                }
                            }
                        })
      this.$http.get('https://comparewise.firebaseio.com/Review.json').then(function(data){
                return data.json();
            }).then(function(data){
                for (let key in data) {
                  var tar = data[key]
                  if (tar==null)
                  {
                    continue;
                  }
                  if(tar.item_id === this.id){
                     var tmp = {
                       content: tar.content,
                       title: tar.title,
                       score: tar.score,
                       nickname: tar.nickname,
                       review_date : tar.review_date
                     }
                     this.reviews.push(tmp)
                  }
                }
            });
  },
    data() {
    return {
      id:'',
      search:"",
      sellers:[],
      reviews:[],
      item:{
        describer:'',
        category_id:'',
        src:'',
        name:'',
        id:'',
        price:100000000,
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
  methods:{
      writereview(){
        this.$router.push({ name: 'Reviewwrite'})
      }
  }
}
</script>




<style>

</style>
