<template>
    <div>
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
              <v-row align="center" class="display-1 mx-2 font-weight-black"> 최저가: {{item.id}}원 </v-row>
            </v-card-subtitle>
          <v-card-text>
            <v-tabs-slider></v-tabs-slider>
            <v-tabs v-model="tab" background-color="deep-purple accent-4" class="elevation-2" dark grow >
            <v-tab>상품설명</v-tab>
            <!--Item 설명 연결 -->
            <v-tab-item><img v-bind:src = item.describer style="margin-left: auto; margin-right: auto; display: block;"/></v-tab-item>

            <v-tab>상품리뷰</v-tab>
            <!--Item review 정보 -->
            <v-tab-item>
              <v-card v-for="review in reviews" :key="review">
                {{review.title}}    {{ review.user_id }} <br>
                {{review.content}}<br>
                {{review.score}}    {{review.review_date}}
              </v-card>
            </v-tab-item>
            <v-tab>구매처</v-tab>
            <!--구매처 정보-->
            <v-tab-item><v-card v-for="seller in sellers" :key="seller">{{seller.site_name}}<br>
            가격:{{seller.cost}}<br>{{seller.site_url}}</v-card></v-tab-item>
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
      id: '',
      search: "",
      sellers: [],
      reviews: [],
      tab: "",
      item: {
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

  methods: {
  },

  created() {
    this.id = this.$route.params.id
    console.log(this.id)
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
            if(tar.item_id === this.id){
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

  }

}
</script>

