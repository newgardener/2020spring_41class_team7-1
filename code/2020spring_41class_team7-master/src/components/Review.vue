<template>
<div>
      <v-container>
      <div class = "block" id = "first">
        
        <v-row class="ml-2">
        <div style = "float: left; width: 20%; text-align: center;">
            
        </div>
        <div style = "float: left; width: 20%; text-align: center;">
            상품명
        </div>
        <div style = "float: left; width: 10%; text-align: center;">
            별점
        </div>
        <div style = "float: left; width: 15%; text-align: center;">
            제목
        </div>
        <div style = "float: left; width: 25%; text-align: center;">
            내용
        </div>
        <div style = "float: left; width: 10%; text-align: center;">
            리뷰일
        </div>
        </v-row>
        
        <v-col
        v-for="(review, i) in review"
        :key="i"
        >
        
        <v-row class="ml-2">
         
        <div style = "float: left; width: 20%; text-align: center; margin: auto;">
            <img :src=item[i].img style = "width: 75%; height: 75%;">
        </div>

        <div style = "float: left; width: 20%; text-align: center; margin: auto;">
            {{item[i].name}}
        </div>
            <div style = "float: left; width: 10%; text-align: center; margin: auto;">
                    {{review.score}}
            </div>
        <div style = "float: left; width: 15%; text-align: center; margin: auto;">
            {{review.title}}
        </div>
        <div style = "float: left; width: 25%; text-align: center; margin: auto;">
            {{review.content}}
        </div>
        <div style = "float: left; width: 10%; text-align: center; margin: auto;">
            {{review.review_date}}
        </div>
        </v-row>
        </v-col>
      </div>
    </v-container>
    <v-footer class="pa-3" fixed>
      <v-spacer></v-spacer>
      <div>&copy; {{ new Date().getFullYear() }} team7</div>
    </v-footer>
</div>

</template>

<script>
import firebase from 'firebase';
import { eventBus } from "../main"
export default {
  data() {
    return {
            form: {
                nickname: '',
                password: '',
                email: ''
            },
            reviewnum: 0,
            review:[],
            item:[],
            email: "",
            id: 0,
        }
         
  },
  
  methods: {
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
    console.log(email)
    this.email=email;
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
                    var tar = data[key]
                    var tmp =
                        {
                            item_id: tar.item_id,
                            score: tar.score,
                            title: tar.title,
                            content: tar.content,
                            review_date: tar.review_date,
                        }
                    tmp.review_date = tmp.review_date.substr(5,5)
                    console.log(tmp.review_date)
                    this.review.push(tmp)
                    this.reviewnum = this.reviewnum + 1
                  }
                }
                  this.$http.get('https://comparewise.firebaseio.com/item.json').then(function(data){
                      return data.json();
                  }).then(function(data){
                      for(var i=0; i<this.reviewnum; i++) {
                    this.id = this.review[i].item_id
                            for (let key in data) {
                                if(data[key].item_id== this.id){
                                var tar = data[key]
                                var tmp =
                                  {
                                    name: tar.item_name,
                                    img: tar.img_src,
                                  }
                                this.item.push(tmp)
                                }
                            }
                        }})
                  });
                
  }
}
</script>

<style>
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
