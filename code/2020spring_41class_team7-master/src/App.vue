<template>
  <v-app>
    <v-content v-bind:style="{ background: '#BFE2FD'}">
        <v-app-bar
          color="white"
          height="100px"
        >

        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

        <router-link class="routerLink" to="/main">
            <img src="./assets/comparewise.png" height="150" width="300px">
        </router-link>

    <v-spacer></v-spacer>
      
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

    <router-view :key="$route.fullPath"></router-view>

<!-- navigation bar  -->
    <v-navigation-drawer
      style="height: 25% padding: 10px 10px"
      v-model="drawer"
      absolute
      temporary>
      <v-list
        nav
        dense>
        <v-list-item-group
        mandatory color="indigo">
          <v-list-item>
            <router-link class="routerLink" to="/main">
              <v-list-item-icon>
                  <v-icon>mdi-home</v-icon>            
              </v-list-item-icon>
            </router-link>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <router-link class="routerLink" to="/mypage">
              <v-list-item-icon>
                  <v-btn icon><v-icon>mdi-account</v-icon></v-btn>
              </v-list-item-icon>
            </router-link>
            <v-list-item-title>My Page</v-list-item-title>
          </v-list-item>

          <v-list-item>
            
            <!-- <router-link class="routerLink" v-bind:to='"/wishlist/" + user_id'> -->
            <router-link class="routerLink" to="/wishlist">
              <v-list-item-icon>
                  <v-btn icon><v-icon>mdi-heart</v-icon></v-btn>        
              </v-list-item-icon>
            </router-link>
            <v-list-item-title>Wish List</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <router-link class="routerLink" to="/review">
              <v-list-item-icon>
                  <v-btn icon><v-icon>mdi-pencil</v-icon></v-btn>
              </v-list-item-icon>
            </router-link>
            <v-list-item-title>Review</v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    </v-content>
  </v-app>
</template>

<script>
import { eventBus } from "./main"

export default {
  name: 'App',
  data: () => ({
    drawer: false,
    user_id: ''
  }),
  created() {
      if(this.$store.state.isLogin){
          var value = document.cookie.match('(^|;) ?' + "email" + '=([^;]*)(;|$)');
          value = value? value[2] : null;
          this.user_id = value;
          console.log(this.user_id)
    } 
  },
  methods: {
    setCookie(name, value, day) {
    var date = new Date();
    date.setTime(date.getTime() + day * 60 * 60 * 24 * 1000);
    document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
    },
    getCookie(name) {
    var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value? value[2] : null;
    },
    deleteCookie(name) {
    var date = new Date();
    document.cookie = name + "= " + "; expires=" + date.toUTCString() + "; path=/";
    },
    logout () {
      this.$store.commit('loginFalse')
      this.deleteCookie("email");
      this.deleteCookie("name");
      this.deleteCookie("pw");
      this.deleteCookie("nick");
      this.$router.replace(this.$route.query.redirect || '/main');
    },
  }

};
</script>

<style>

</style>
