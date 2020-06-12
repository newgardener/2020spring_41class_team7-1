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

    <!-- 검색창 -->
    <v-card
      tile
      color="amber lighten-3"
      width="100%"
      height="80px"
    >
    <v-row class="mx-3">
      <v-text-field
        full-width
        outlined
        clearable
        v-model="search"
        label="Search!"
        class="my-3"
        color="black"
        append-icon = mdi-magnify
        @click:append="doSearch"
      >
      </v-text-field>
    </v-row>
    </v-card>

    <!-- 카테고리 및 랭킹 -->
    <v-container class="mt-5" width="100%">
      <v-row  width="100%" no-gutters>
          <v-btn @click="changeList(1)" color="#E8EAF6" tile width="20%">
            <span>생활용품</span>
          </v-btn>

          <v-btn @click="changeList(2)" color="#E8EAF6" tile width="20%">
            <span>패션</span>
          </v-btn>

          <v-btn @click="changeList(3)" color="#E8EAF6" tile width="20%">
            <span>뷰티</span>
          </v-btn>

          <v-btn @click="changeList(4)" color="#E8EAF6" tile width="20%">
            <span>식품</span>
          </v-btn>

          <v-btn @click="changeList(5)" color="#E8EAF6" tile width="20%">
            <span>가전제품</span>
          </v-btn>
      </v-row>
      <v-row  width="100%" no-gutters>
          <v-btn @click="changeList(6)" color="#E8EAF6" tile>
            <span>종합랭킹</span>
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
            class="routerLink" v-bind:to="'/itemDetail/'+item.id" 
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
                        <img :src=item.src>
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
                    > 최저가 {{ item.price }} 원</v-card-subtitle>
                    
                    
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
            <v-tooltip bottom>
              <template v-slot:activator="{}">
                    <v-btn icon v-on:click=Iscompare(item)  class="ma-2">
                      <v-icon x-large>mdi-scale-balance</v-icon>
                    </v-btn>
              </template>
              <span>Compare</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <router-link class="routerLink" to="/wishlist">
                <v-btn icon color="amber" dark v-on="on" class="ma-2">
                  <v-icon x-large>mdi-star-circle</v-icon>
                </v-btn>
            </router-link>
            </template>
            <span>Wish List</span>
          </v-tooltip>

          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-footer class="pa-3">
      <v-spacer></v-spacer>
      <div>&copy; {{ new Date().getFullYear() }}</div>
    </v-footer>


  </div>


</template>





<script>
import { eventBus } from "../main"
export default {
  methods: {
    Iscompare(item){
      if(this.compareID1 == 'defult'){
          this.compareID1 = item.id
          this.compare_price1 = item.price
      }
      else{
        this.compareID2 = item.id
        this.compare_price2 = item.price
        this.$router.push({ name: 'Compare', params: {id1 : this.compareID1, id2 : this.compareID2, price1 : this.compare_price1, price2: this.compare_price2}})
      }
    },
    itemCategory () {
      return null
    },
    doSearch () {
      console.log(this.search)
      this.list = []
      for(var i=0; i<this.items.length; i++){
        if(this.items[i].name.includes(this.search))
          this.list.push(this.items[i])
        else if(this.items[i].keyword.includes(this.search))
          this.list.push(this.items[i])
      }
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
    getPrice() {
      for(var i=0; i<this.items.length; i++){
        var min_cost = 100000000
        for(var j=0; j<this.sellers.length; j++){  
          if(this.sellers[j].item_id==this.items[i].id){
            if(this.sellers[j].cost < min_cost)
              min_cost = this.sellers[j].cost
          } 
        }
        this.items[i].price = min_cost
      }
    },
    changeList (num) {
      this.list = []
      this.listNum = num
      if(this.listNum==1){
        for(var i=0; i<this.items.length; i++) {
          if(this.items[i].category_id==1)
            this.list.push(this.items[i])
        }  
      }
      else if(this.listNum==2){
        for(var i=0; i<this.items.length; i++) {
          if(this.items[i].category_id==2)
            this.list.push(this.items[i])
        }  
      }
      else if(this.listNum==3){
        for(var i=0; i<this.items.length; i++) {
          if(this.items[i].category_id==3)
            this.list.push(this.items[i])
        }  
      }
      else if(this.listNum==4){
        for(var i=0; i<this.items.length; i++) {
          if(this.items[i].category_id==4)
            this.list.push(this.items[i])
        }  
      }
      else if(this.listNum==5){
        for(var i=0; i<this.items.length; i++) {
          if(this.items[i].category_id==5)
            this.list.push(this.items[i])
        }  
      }
      else if(this.listNum==6){
        for(var i=0; i<this.items.length; i++) {
          this.list.push(this.items[i]);
        }   
      }
    }
  },
  data() {
    return {
      temp:'',
      compareID1:'defult',
      compareID2:'defult',
      compare_price1:'defult',
      compare_price2:'defult',
      search:"",
      sellers:[],
      items: [],
      listNum: 8,
      list: [],
      //to open dialog
      dialog: false,
    }
  },
  created() {
    eventBus.$on('loginTrue', isTrue => {
      this.$store.commit('loginTrue')
    })
    this.$http.get('https://comparewise.firebaseio.com/item.json').then(function(data){
                return data.json();
            }).then(function(data){
                for (let key in data) {
                    var tar = data[key]
                    var tmp =
                      {
                        category_id: tar.category_id,
                        src: tar.img_src,
                        name: tar.item_name,
                        keyword: tar.keyword,
                        id: tar.item_id,
                        price: 0,
                        reviewNum: tar.review_volume,
                        score: tar.avg_score,
                        total_score: tar.total_score
                      }
                      this.items.push(tmp)
                }
                //sort by total_score
                for(var i=0; i<this.items.length; i++) {
                  //addr에 i 들어가야 함!
                  var addr = this.items[i].id
                  this.$http.get('https://comparewise.firebaseio.com/ItemSeller/'+addr.toString()+'.json').then(function(data){
                      return data.json();
                  }).then(function(data){
                            for (let key in data) {
                                var tar = data[key]
                                var cost = Number(tar.cost.replace(/[^0-9.-]+/g,""))
                                var tmp =
                                  {
                                    cost: cost,
                                    item_id: tar.item_id,
                                  }
                                this.sellers.push(tmp)
                            }
                            this.getPrice()
                        })
                }
                for(var i=0; i<this.items.length; i++) {
                  this.items.sort(function(a, b) {
                    return a.total_score < b.total_score ? 1 : a.total_score > b.total_score ? -1 : 0; 
                  });
                }
                
                for(var i=0; i<this.items.length; i++) {
                  this.list.push(this.items[i])
                }
            })
    //default list        
    
  },
  beforeUpdate(){
    this.getPrice()
  }
}
/*문제
1: default list 표현
2: db 변경 필요
3: daily weekly monthly
4: total score 수치 변경 필요
5: compare page 넘어가는 방법
*/
</script>




<style>
  .routerLink {
    text-decoration: none;
  }
</style>