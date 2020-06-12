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

    <v-container>
      <div class = "block" id = "first">
        <v-row class="ml-2">
        <div style = "width: 15%;"></div>
        <div style = "width: 30%; text-align: center;">
            <v-avatar
                        class="mb-5 ml-7"
                        size="90%"
                        tile
                      ><img :src=item_img></v-avatar>
        </div>
        <div style = "margin: auto;">{{item_name}}</div>
        </v-row>
      </div>
      <form style="width:100%;">
        <div class = "block">
          <div class="star_grade">
            <v-row class="ml-2" style="display: flex; justify-content: center; margin: 30px 30px">
                <div class="starRev">
  <span class="starR1 on" id="star1">별1_왼쪽</span>
  <span class="starR2" id="star2">별1_오른쪽</span>
  <span class="starR1" id="star3">별2_왼쪽</span>
  <span class="starR2" id="star4">별2_오른쪽</span>
  <span class="starR1" id="star5">별3_왼쪽</span>
  <span class="starR2" id="star6">별3_오른쪽</span>
  <span class="starR1" id="star7">별4_왼쪽</span>
  <span class="starR2" id="star8">별4_오른쪽</span>
  <span class="starR1" id="star9">별5_왼쪽</span>
  <span class="starR2" id="star10">별5_오른쪽</span>
</div>

  <div value="0" id="grade"></div>
            </v-row>
          </div>
          
        </div>
        <div class = "block" style="text-align:center;">
          제목:<input type="text" v-model="form.title" style="border-bottom: 1px solid blue;"><br><br>
          <textarea rows="10" cols="60" v-model="form.content" placeholder="솔직한 리뷰를 남겨주세요." style="resize: none;"></textarea>
        </div>
        
      <div class="my-2" style="text-align:center;">
        <v-btn color="primary" @click="change" v-on:click.prevent="post">리뷰 등록</v-btn>
      </div>
      </form>

    </v-container>

    <v-footer class="pa-3">
      <v-spacer></v-spacer>
      <div>&copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
  </div>
</template>

<script>
import firebase from 'firebase';
import 'expose-loader?$!expose-loader?jQuery!jquery'
import { eventBus } from "../main"
export default {
    data(){
      return{
        form: {
          content: '',
          item_id: '',
          nickname: '',
          review_date: '',
          score: 0,
          title: '',
          user_id: '',
        },
        item_name: '',
        item_img: '',
        stanx: 0,
        stany: 0,
        x: 0,
        y: 0,
        value: 0,
      }
    },
    methods: {
      post: function() {
            if (!this.form.score || !this.form.title || !this.form.content) {
                alert('Error: You have some missing input. Please check again.');
                console.log(this.form.score)
            }
            else {
                this.$http.post('https://comparewise.firebaseio.com/Review.json', this.form).then(function(data){
                alert('성공적으로 등록되었습니다.');
                this.$router.replace(this.$route.query.redirect || '/main');
            })
            }
        }, 
        getCookie(name)
        {
          var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
          return value? value[2] : null;
        },
        logout () {
          this.deleteCookie("name")
          this.deleteCookie("pw")
          this.deleteCookie("nick")
          this.deleteCookie("email")
          this.$store.commit('loginFalse')
        },
        change (){
          this.form.score = document.getElementById("grade").value;
        }
    },
    mounted() {
      $('.starRev span').click(function(){
        console.log()
        if ($(this)[0].id == "star1"){
          $('#grade').val(0.5);
        }
        else if ($(this)[0].id == "star2"){
          $('#grade').val(1);
        }
        else if ($(this)[0].id == "star3"){
          $('#grade').val(1.5);
        }
        else if ($(this)[0].id == "star4"){
          $('#grade').val(2);
        }
        else if ($(this)[0].id == "star5"){
          $('#grade').val(2.5);
        }
        else if ($(this)[0].id == "star6"){
          $('#grade').val(3);
        }
        else if ($(this)[0].id == "star7"){
          $('#grade').val(3.5);
        }
        else if ($(this)[0].id == "star8"){
          $('#grade').val(4);
        }
        else if ($(this)[0].id == "star9"){
          $('#grade').val(4.5);
        }
        else {
          $('#grade').val(5);
        }
      $(this).parent().children('span').removeClass('on');
      $(this).addClass('on').prevAll('span').addClass('on');
        return false;
      });
    },
    created() {
    eventBus.$on('loginTrue', isTrue => {
      this.$store.commit('loginTrue')
    })
    var email = this.getCookie("email")//함수 보완해서 수정 중
    var nick = this.getCookie("nick")//함수 보완해서 수정 중
    console.log(email)
    this.form.nickname=nick;
    this.form.user_id=email;
    this.form.item_id=this.$route.params.id;
    let today = new Date();
    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1;  // 월
    let date = today.getDate();  // 날짜
    let day = today.getDay();  // 요일
    this.form.review_date = year + '/' + month + '/' + date
    
     this.$http.get('https://comparewise.firebaseio.com/item.json').then(function(data){
                return data.json();
            }).then(function(data){
                for (let key in data) {
                  if (data[key]==null)
                  {
                    continue;
                  }
                  if(data[key].item_id==this.form.item_id)
                  {
                    var tar = data[key]
                    this.item_name = tar.item_name
                    this.item_img = tar.img_src
                  }
                }
            });
    }
}

</script>

<style scoped>
  .block{
    width: 100%;
    background-color:#E8EAF6;
    margin-top:10px;
    margin-bottom:20px;
    padding:10px;
    height: auto;
    overflow: hidden;
  }
  .star{
    color:yellow;
  }
  textarea::placeholder{
    text-align: center;
    line-height: 230px;
  }
  .starR1{
    background: url('../assets/star.png') no-repeat -52px 0;
    background-size: auto 100%;
    color: "amber";
    width: 15px;
    height: 30px;
    float:left;
    text-indent: -9999px;
    cursor: pointer;
}
.starR2{
    background: url('../assets/star.png') no-repeat right 0;
    background-size: auto 100%;
    width: 15px;
    height: 30px;
    float:left;
    text-indent: -9999px;
    cursor: pointer;
}
.starR1.on{background-position:0 0;}
.starR2.on{background-position:-15px 0;}
</style>