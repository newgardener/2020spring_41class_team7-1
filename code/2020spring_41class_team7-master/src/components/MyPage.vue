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
  created() {
    eventBus.$on('loginTrue', isTrue => {
      this.$store.commit('loginTrue')
    })
    this.$http.get('https://comparewise.firebaseio.com/user.json').then(function(data){
                return data.json();
            }).then(function(data){
                var cookie = this.$cookies.get('user_key')
                alert(cookie)
                /*for (let key in data) {
                  if(data[key]==cookie)
                    var tar = data[key]
                  
                    var tmp =
                      {
                        src: tar.src,
                        name: tar.item_name,
                        id: tar.item_id,
                        price: '5,000',
                        reviewNum: '265',
                        score: tar.avg_score
                      }
                      this.list.push(tmp)
                    }*/
            })
  
  },

}
</script>




<style>

</style>