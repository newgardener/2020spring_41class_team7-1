<template>
    <div>
    <v-card max-width="80%" style="margin-left: auto; margin-right: auto;">
        <img v-bind:src = item.src style="margin-left: auto; margin-right: auto; display: block;"/>
        <v-card-title class="display-1">{{item.name}}<v-spacer></v-spacer>
        <v-btn icon class="ma-2" v-on:click=writereview()><v-icon x-large color="#BBDEFB">mdi-border-color</v-icon></v-btn>
        <div><v-btn icon class="ma-2" v-on:click="pushwishlist()"><v-icon x-large color="#F48FB1">mdi-heart</v-icon></v-btn>
        <v-snackbar v-model="snackbar">
            {{snackbar_content}}
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
              <v-tab-item><v-card v-for="review in reviews" :key=review outlined style="padding: 10px 10px">
                <v-list><v-list-item-content>
                  <div class="overline mb-4">작성일: {{review.review_date}} ({{review.user_id}})</div>
                  <v-list-item-title class="headline mb-1">{{review.title}}</v-list-item-title>
                    <v-rating
                    v-model="review.score"
                    color="red"
                    dense
                    half-increments
                    readonly
                    size="20"
                  >
                  </v-rating> <br>
                  {{review.content}}
                </v-list-item-content></v-list>
              </v-card></v-tab-item>
            <v-tab>구매처</v-tab>
            <!--구매처 정보-->
              <v-tab-item>
                <v-card v-for="seller in sellers" :key="seller">
                  <template style="display: block">
                    <div v-if="seller.site_name === 'G마켓'"><img src="../assets/gmarket.png" alt="Gmarket" style="width: 15%; height: 15%;"></div>
                    <div v-if="seller.site_name === '옥션'"><img src="../assets/auction.png" alt="Auction"  style="width: 15%; height: 15%;"></div>
                    <div v-if="seller.site_name === '11번가'"><img src="../assets/11street.png" alt="11번가" style="width: 15%; height: 15%;"></div>
                    <div v-if="seller.site_name === '인터파크'"><img src="../assets/interpark.png" alt="Interpark" style="width: 15%; height: 15%;"></div>
                    <div v-if="seller.site_name === '쿠팡'"><img src="../assets/coupang.png" alt="Coupang" style="width: 15%; height: 15%;"></div>
                  </template>
                  <v-icon x-large>mdi-cash</v-icon>{{seller.cost}}원<br>
                  <v-icon x-large>mdi-cart</v-icon><a :href="seller.site_url">{{seller.site_url}}</a>
                </v-card>
              </v-tab-item>
            </v-tabs>
          </v-card-text>
      </v-card>
  </div>
</template>




<script>
import firebase from 'firebase'

export default {
  data() {
    return {
      snackbar_content:"찜한 목록은 Wishlist에서 확인하실 수 있습니다.",
      id: '',
      search: "",
      sellers: [],
      reviews: [],
      tab: "",
      item: {
        describer: '',
        category_id: '',
        src: '',
        name: '',
        id: '',
        price:100000000,
        reviewNum: '',
        score: '',
        total_score: '',
      },
      wishlist:{
        user_id:'',
        item_id:'',
        wish_list_date:"0617"
      },
      //to open dialog
      dialog: false,
      multiLine: true,
      snackbar: false,

    }
  },

  created() {
    this.id = this.$route.params.id
    this.wishlist.item_id = this.id
    if(this.$store.state.isLogin){
      var value = document.cookie.match('(^|;) ?' + "email" + '=([^;]*)(;|$)');
      value = value? value[2] : null;
      this.wishlist.user_id = value;
    }
    this.$http.get('https://comparewise.firebaseio.com/item.json').then(function(data){
          return data.json();
            }).then(function(data){
                for (let key in data) {
                    var tar = data[key]
                    if(tar.item_id === this.id){
                      this.item.category_id =  tar.category_id
                      this.item.src = tar.img_src
                      this.item.name = tar.item_name
                      this.item.id = tar.item_id
                      this.item.reviewNum = tar.review_volume
                      this.item.score = tar.avg_score
                      this.item.total_score = tar.total_score
                      this.item.describer = tar.describer
                    }
                }
            })
    
    this.$http.get('https://comparewise.firebaseio.com/Review.json').then(function(data){
      return data.json();
    }).then(function(data){
      for (let key in data){
            var tar = data[key]
            if (tar == null) continue
            if (tar.item_id === this.id){
            var tmp =
            {
              title: tar.title,
              review_date: tar.review_date,
              content: tar.content,
              score: tar.score,
              user_id: tar.user_id,
              item_id: tar.item_id
            }
            this.reviews.push(tmp)
          }
      }
      console.log(this.reviews)
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

  },
    methods:{
      writereview(){
        this.$router.push({ name: 'Reviewwrite',params : {id:this.id}})
      },
      pushwishlist:function(){
        if(this.$store.state.isLogin){
          console.log("push")
          this.$http.post('https://comparewise.firebaseio.com/WishList.json', this.wishlist)
          this.snackbar_content = "찜한 상품은 Wishlist에서 확인하실 수 있습니다."
        }
        else this.snackbar_content = "로그인 이후 이용하실 수 있습니다."
        this.snackbar = true
    }
  }

}
</script>

