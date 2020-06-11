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

                <!-- <div class="text-center">
                  <v-menu open-on-hover down offset-y>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn color="secondary"
                             v-bind="attrs"
                             v-on="on"
                             style="padding: 15px 15px; width: 100px">
                        랭킹 기간 설정
                      </v-btn>
                    </template>

                    <v-list>
                      <v-list-item
                        v-for="time in sortByTime"
                        :key="time"
                        @click="changeList(time)">
                        <v-list-item-title>{{ time }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </div> -->

              </v-tabs>
            </template>   
      </v-toolbar>
    </template>

    <!-- 아이템 리스트 -->
    <v-container>
      <v-row>
        <v-col
        v-for="(item, i) in list"
        :key="i"
        cols="12"
        >
          <router-link 
            class="routerLink" to="/itemdetail"
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
                        <img src="../assets/ComparewiseLOGO.jpg">
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
                    > {{ item.price }} 원</v-card-subtitle>
                    
                    
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
              <template v-slot:activator="{ on }">
                <router-link class="routerLink" to="/Compare">
                    <v-btn icon dark v-on="on" class="ma-2">
                      <v-icon x-large>mdi-scale-balance</v-icon>
                    </v-btn>
                  </router-link>
              </template>
              <span>Comprae Page</span>
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
    <!-- <v-footer class="pa-3">
      <v-spacer></v-spacer>
      <div>&copy; {{ new Date().getFullYear() }}</div>
    </v-footer> -->
  </div>


</template>


<script>
import { eventBus } from "../main"

export default {
  methods: {
    itemCategory () {
      return null
    },
    doSearch () {
      console.log(this.search)
      this.list = []
      for(var i=0; i<this.items.length; i++){
        if(this.items[i].name.includes(this.search))
          this.list.push(this.items[i])
      }
    },
    doSomething () {
      return null
    },
    logout () {
      this.deleteCookie("name")
      this.deleteCookie("pw")
      this.deleteCookie("nick")
      this.deleteCookie("email")
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
    }
  },
  data() {
    return {
      search:"",
      currentItem: 'tab-Web',
      tabs: ['생활용품', '패션', '뷰티', '식품', '가전제품'],
      sortByTime: ['Daily', 'Weekly', 'Monthly'],
      sellers:[],
      items: [],
      listNum: 8,
      categoryName: '',
      list: [],
      //to open dialog
      dialog: false,
      drawer: false,
      tab: null
    }
  },
  created() {
    eventBus.$on('loginTrue', isTrue => {
      this.$store.commit('loginTrue')
    })
    if(this.getCookie("email"))
    {
      eventBus.$emit("loginTrue", this.isTrue);
      alert('Successfully logged in');
      this.$router.replace(this.$route.query.redirect || '/main');
    }
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
                  var addr = 2328109
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
                        })
                }
                for(var i=0; i<this.items.length; i++) {
                  this.items.sort(function(a, b) {
                    return a.total_score < b.total_score ? 1 : a.total_score > b.total_score ? -1 : 0; 
                  });
                }
            })
    //default list        
    this.changeList(8)
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