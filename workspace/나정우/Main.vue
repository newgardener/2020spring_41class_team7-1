<template>
    <div>
    <!-- search bar -->
    <template>
      <v-toolbar
        color="#FAFAFA" height="75px">
          <v-text-field
            append-icon = mdi-magnify
            class="mx-4"
            color="blue"
            width="50%"
            hide-details
            v-model="search"
            label="Search"
            solo-inverted
            @click:append="doSearch"
            ></v-text-field>

            <template v-slot:extension>
              <v-tabs v-model="currentItem"
                      fixed-tabs
                      slide-color="blue">
                <v-tab v-for="tab in tabs"
                       :key="tab"
                       @click="changeList(tab)">
                       {{ tab }}
                </v-tab>
              </v-tabs>
            </template>   
      </v-toolbar>
    </template>

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
                    <v-divider class="mx-4"></v-divider>
                    <v-card-subtitle 
                      class="title ml-2 mt-1"
                    > 최저가 {{ item.price }} 원</v-card-subtitle>
                    
                    
                    <v-row class="ml-2" style="padding: 10px;">
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
            
          <v-card flat tile color="#E8EAF6" class="d-flex flex-row-reverse" style="margin: 0 0;">
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

<!-- Footer -->
    <v-footer class="pa-3" fixed>
      <v-spacer></v-spacer>
      <div>&copy; {{ new Date().getFullYear() }} team7</div>
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
        if(this.items[i].name.includes(this.search)){
          this.list.push(this.items[i])
          this.currentItem = this.items[i].category_id
        }
        else if(this.items[i].keyword.includes(this.search)){
          this.list.push(this.items[i])
          this.currentItem = this.items[i].category_id
        }

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
    changeList (name) {
      this.list = []
      this.categoryName = name
      if(this.categoryName=='생활용품'){
        for(var i=0; i<this.items.length; i++) {
          if(this.items[i].category_id==1)
            this.list.push(this.items[i])
        }  
      }
      else if(this.categoryName=='패션'){
        for(var i=0; i<this.items.length; i++) {
          if(this.items[i].category_id==2)
            this.list.push(this.items[i])
        }  
      }
      else if(this.categoryName=='뷰티'){
        for(var i=0; i<this.items.length; i++) {
          if(this.items[i].category_id==3)
            this.list.push(this.items[i])
        }  
      }
      else if(this.categoryName=='식품'){
        for(var i=0; i<this.items.length; i++) {
          if(this.items[i].category_id==4)
            this.list.push(this.items[i])
        }  
      }
      else if(this.categoryName=='가전제품'){
        for(var i=0; i<this.items.length; i++) {
          if(this.items[i].category_id==5)
            this.list.push(this.items[i])
        }  
      }
      else if(this.categoryName=='종합랭킹'){
        for(var i=0; i<this.items.length; i++) {
            this.list.push(this.items[i])
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
      currentItem: 0,
      tabs: ['종합랭킹', '생활용품', '패션', '뷰티', '식품', '가전제품'],
      sellers:[],
      items: [],
      listNum: 8,
      list: [],
      //to open dialog
      dialog: false,
      drawer: false,
      tab: null,
      drawer: false
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

</script>



<style scoped>
  .routerLink {
    text-decoration: none;
  }
  .v-input__control{
    width: 70%;
  }
</style>