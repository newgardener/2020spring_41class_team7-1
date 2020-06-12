<template>
  <div>
    <v-container>
      <div class = "block" id = "first">
        <div style = "float: left; width: 20%; text-align: center;">
          <span class="iconify" data-icon="mdi:account-circle-outline" data-inline="false" style="color: rgb(85, 161, 219);" data-width="100px" data-height="100px"></span>
        </div>
        <div style = "font-size: 40px">{{nick}} </div>
        <div>{{name}} 님, 안녕하세요.</div>
      </div>

      <div class = "block" id = "second">
        <div style = "float: left; width: 33%;">
          <div><router-link class="routerLink" to="/review">{{review}}</router-link></div><!-- 리뷰 보기 페이지 만들기 -->
          <div>내 리뷰</div>
        </div>
        <div style = "width: 1px; background-color: black; height: 45px; float: left;"></div>
        <div style = "float: left; width: 33%;">
          <div><router-link class="routerLink" to="/wishlist">{{wish_list}}</router-link></div>
          <div>위시리스트</div>
        </div>
        <div style = "width: 1px; background-color: black; height: 45px; float: left;"></div>
        <div style = "float: left; width: 33%;">
          <div>0</div><!-- 이건 고민좀 -->
          <div>문의내역</div>
        </div>
      </div>

      <div class = "block" id = "third">
        <div>관심 분야</div>
        <div style = "float: left; width: 49%; text-align: center;">
          <v-btn class="ma-2" outlined color="indigo">분야 선택</v-btn>
        </div>
        <div style = "width: 1px; background-color: black; height: 45px; float: left;"></div>
        <div style = "float: left; width: 49%; display: flex; justify-content: center;">
          <v-switch v-model="switch1"
          :label="'푸시알림 받기'"></v-switch>
        </div>
      </div>

      <div class = "block" id = "third" style = "text-align: center;">
        <v-btn big color="primary">문의하기</v-btn>
      </div>
    </v-container>
  </div>  
</template>




<script>
import firebase from 'firebase';
// import 'expose-loader?$!expose-loader?jQuery!jquery'
import { eventBus } from "../main"
export default {
  data() {
    return {
            form: {
                nickname: '',
                password: '',
                email: ''
            },
          password:"",
          email: "",
          nick: "",
          name: "",
          wish_list: 0,
          review: 0,
        }
         
  },
  
  methods: {
  getCookie(name)
        {
          var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
          return value? value[2] : null;
        }
  },
  mounted() {
      let recaptchaScript = document.createElement('script')
      recaptchaScript.setAttribute('src', 'https://code.iconify.design/1/1.0.6/iconify.min.js')
      document.head.appendChild(recaptchaScript)
    },
  created() {
    eventBus.$on('loginTrue', isTrue => {
      this.$store.commit('loginTrue')
    })
    var email = this.getCookie("email")//함수 보완해서 수정 중
    var nick = this.getCookie("nick")//함수 보완해서 수정 중
    var name = this.getCookie("name")//함수 보완해서 수정 중
    var password = this.getCookie("pw")//함수 보완해서 수정 중
    console.log(email)
    this.name=name;
    this.email=email;
    this.password=password; 
    this.nick=nick; 
    console.log(name)
    this.$http.get('https://comparewise.firebaseio.com/WishList.json').then(function(data){
                return data.json();
            }).then(function(data){
                for (let key in data) {
                  if (data[key]==null)
                  {
                    continue;
                  }
                  if(data[key].user_id==this.email)
                  {
                    this.wish_list=this.wish_list+1;
                  }
                }
            });
            this.$http.get('https://comparewise.firebaseio.com/Review.json').then(function(data){
                return data.json();
            }).then(function(data){
                for (let key in data) {
                  if (data[key]==null)
                  {
                    continue;
                  }
                  if(data[key].user_id==this.email)
                  {
                    this.review=this.review+1;
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
  .block#second{
    text-align: center;
  }

</style>