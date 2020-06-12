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

      <v-toolbar-title><h1>Compare</h1></v-toolbar-title>

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

    
    <v-container fluid>
        <v-row dense>
            <v-col v-for="item in items" :key="item.name" :cols=6>
            <router-link 
                class="routerLink" to="/itemdetail"
                >
                <v-card>
                    <v-img :src="item.src" class="white--text align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
                        <v-card-title v-text="item.name"></v-card-title>
                    </v-img>
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
                            <!--review 갯수 -->
                        </v-row>
                    </v-card-subtitle>
                    <v-list>
                        <v-list-item>
                            상품명 : {{item.name}}
                            <!--상품명 정보 -->
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item>
                            최저가 : {{item.price}}원
                            <!--최저가 정보 -->
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item>
                            리뷰 평점 : {{item.score}}
                            <!--리뷰 정보 -->
                        </v-list-item>
                    </v-list>
                </v-card>
            </router-link>
            </v-col>
        </v-row>
    </v-container>
  </div>
</template>




<script>
export default {
    data() {
    return {
      items : [ 
      { src: 'https://t1.daumcdn.net/cfile/tistory/9950C8365A75CCA31F',
      name: 'Twice Summer Album',
      id: '1',
      price: '65,000',
      reviewNum: '365',
      score: 4.3 },
      { src: 'https://www.somagnews.com/wp-content/uploads/2020/05/37-3-e1588625932272.jpg',
      name: 'BlackPink Winter Album',
      id: '1',
      price: '67,000',
      reviewNum: '412',
      score: 4.1 }
      ],
      multiLine: true,
      snackbar: false,
    }
  }
}
</script>




<style>
</style>