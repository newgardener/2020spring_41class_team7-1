<template>
    <div>
    <h1>MyPage</h1>
    <router-link class="routerLink" to="/main">
        <v-btn 
          icon 
          width="auto" 
          height="auto"  
          class="ma-1"
          @click="login"
        >
          <v-avatar size="90">
          <img src="../assets/ComparewiseLOGO.jpg">
          </v-avatar>
        </v-btn>  
    </router-link>  
  </div>  
</template>




<script>
export default {
  data() {
        return {
            form: {
                name: '',
                nickname: '',
                password: '',
                email: ''
            },

        }
    },
    method: {
      getCookie(name) {
        var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return value? value[2] : null;
         }
    },
  created() {
    /*eventBus.$on('loginTrue', isTrue => {
      this.$store.commit('loginTrue')
    })*/
    var value = document.cookie.match('(^|;) ?' + "email" + '=([^;]*)(;|$)');
    var email = value? value[2] : null;
    var value2 = document.cookie.match('(^|;) ?' + "nick" + '=([^;]*)(;|$)');
    var nick = value2? value2[2] : null;
    //var my_info = getCookie("email")//함수 보완해서 수정 중
    alert(email)
    alert(nick)
  
  }

}
</script>




<style>

</style>