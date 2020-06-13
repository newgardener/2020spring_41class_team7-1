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
          <router-link class="routerLink" to="/main">
            <v-list-item>
              <v-list-item-icon>
                    <v-icon>mdi-home</v-icon>            
                </v-list-item-icon>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item>
          </router-link>

          <router-link v-if="this.$store.state.isLogin" class="routerLink" to="/mypage">
            <v-list-item>
                <v-list-item-icon>
                    <v-btn icon><v-icon>mdi-account</v-icon></v-btn>
                </v-list-item-icon>
              <v-list-item-title>My Page</v-list-item-title>
            </v-list-item>
          </router-link>

          <router-link v-if="this.$store.state.isLogin" class="routerLink" to="/wishlist">
            <v-list-item>
              <v-list-item-icon>
                  <v-btn icon><v-icon>mdi-heart</v-icon></v-btn>        
              </v-list-item-icon>
              <v-list-item-title>Wish List</v-list-item-title>
            </v-list-item>
          </router-link>

          <router-link v-if="this.$store.state.isLogin" class="routerLink" to="/compare">
            <v-list-item>          
                <v-list-item-icon>
                    <v-btn icon><v-icon>mdi-scale-balance</v-icon></v-btn>
                </v-list-item-icon>
              <v-list-item-title>Compare Page</v-list-item-title>
            </v-list-item>
          </router-link>

          
          <router-link  v-if="this.$store.state.isLogin" class="routerLink" to="/review">
            <v-list-item>
                <v-list-item-icon>
                    <v-btn icon><v-icon>mdi-pencil</v-icon></v-btn>
                </v-list-item-icon>
            <v-list-item-title>Review</v-list-item-title>
            </v-list-item>
          </router-link>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  methods: {
    logout () {
      this.$store.commit('loginFalse')
       this.$router.replace(this.$route.query.redirect || '/main');
    },
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
    }
  },
  data: () => ({
    drawer: false
  }),
};
</script>

<style>
</style>