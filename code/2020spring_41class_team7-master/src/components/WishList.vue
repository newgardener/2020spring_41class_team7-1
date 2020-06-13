<template>
  <div>
    <v-app-bar dense>
      <div style="width: 100%;">
        <select name="category" style="width: 100%" @change="changecate($event)">
            <option value="overall" selected>전체</option>
            <option value="one">가전제품</option>
            <option value="two">뷰티</option>
            <option value="three">생활용품</option>
            <option value="four">식품</option>
            <option value="five">패션</option>
        </select>
      </div>
    </v-app-bar>

    <v-container>
      
      <div style="overflow:auto; height:700px;"> <!-- height 조절로 스크롤 div 크기 조정가능 -->
        <div class = "block" id = "cate1">
          가전제품<hr>
          <v-col
        v-for="(item5, i) in item5"
        :key="i"
          >
        <v-row class="ml-2">

        <div style = "float: left; width: 20%; text-align: center;">
            <v-avatar
                        class="mb-5 ml-7"
                        size="90%"
                        tile
                      ><img :src=item5.img></v-avatar>
        </div>

        <div style = "float: left; width: 20%; text-align: center; margin: auto;">
            {{item5.name}}
        </div>
            <div style = "float: left; width: 20%; text-align: center; margin: auto; ">
                <v-row class="ml-2" style="display: flex; justify-content: center;">
                <div v-for="n in 5"
                                :key="n">
                    <v-icon v-if="item5.score - n > -0.2" color="amber" class="ml-1">
                      mdi-star
                    </v-icon>
                    <v-icon v-if="item5.score - n <= -0.2 && item5.score - n >= -0.7" color="amber" class="ml-1">
                      mdi-star-half-full
                    </v-icon>
                    <v-icon v-if="item5.score - n < -0.7" color="amber" class="ml-1">
                      mdi-star-outline
                    </v-icon>
                </div>
                </v-row>
                {{item5.score}}
            </div>
        <div style = "float: left; width: 10%; text-align: center; margin: auto;">
            {{item5.price}}
        </div>
        <div style = "float: left; width: 10%; text-align: center; margin: auto;">
            {{item5.site_name}}
        </div>
        <div style = "float: left; width: 10%; text-align: center; margin: auto;">
            {{item5.date}}
        </div>
        <div style = "float: left; width: 5%; text-align: center; margin: auto;">
          <v-btn class="mx-2" v-on:click=deleted5(i) fab dark small color="red" >
            <v-icon dark>mdi-minus</v-icon>
          </v-btn>
        </div>
        <v-card flat tile color="#E8EAF6" class="d-flex flex-row-reverse" style="margin: auto; width: 5%;">
          <v-tooltip bottom>
              <template v-slot:activator="{}">
                    <v-btn icon v-on:click=Iscompare(item5)  class="ma-2">
                      <v-icon x-large>mdi-scale-balance</v-icon>
                    </v-btn>
              </template>
              <span>Compare</span>
          </v-tooltip>
        </v-card>
                </v-row>
        </v-col>
        </div>


        <div class = "block" id = "cate2">
          뷰티<hr>
          <v-col
        v-for="(item3, i) in item3"
        :key="i"
          >
        <v-row class="ml-2">

        <div style = "float: left; width: 20%; text-align: center;">
            <v-avatar
                        class="mb-5 ml-7"
                        size="90%"
                        tile
                      ><img :src=item3.img></v-avatar>
        </div>

        <div style = "float: left; width: 20%; text-align: center; margin: auto;">
            {{item3.name}}
        </div>
            <div style = "float: left; width: 20%; text-align: center; margin: auto; ">
                <v-row class="ml-2" style="display: flex; justify-content: center;">
                <div v-for="n in 5"
                                :key="n">
                    <v-icon v-if="item3.score - n > -0.2" color="amber" class="ml-1">
                      mdi-star
                    </v-icon>
                    <v-icon v-if="item3.score - n <= -0.2 && item3.score - n >= -0.7" color="amber" class="ml-1">
                      mdi-star-half-full
                    </v-icon>
                    <v-icon v-if="item3.score - n < -0.7" color="amber" class="ml-1">
                      mdi-star-outline
                    </v-icon>
                </div>
                </v-row>
                {{item3.score}}
            </div>
        <div style = "float: left; width: 10%; text-align: center; margin: auto;">
            {{item3.price}}
        </div>
        <div style = "float: left; width: 10%; text-align: center; margin: auto;">
            {{item3.site_name}}
        </div>
        <div style = "float: left; width: 10%; text-align: center; margin: auto;">
            {{item3.date}}
        </div>
        <div style = "float: left; width: 5%; text-align: center; margin: auto;">
          <v-btn class="mx-2" v-on:click=deleted3(i) fab dark small color="red" >
            <v-icon dark>mdi-minus</v-icon>
          </v-btn>
        </div>
        <v-card flat tile color="#E8EAF6" class="d-flex flex-row-reverse" style="margin: auto; width: 5%;">
          <v-tooltip bottom>
              <template v-slot:activator="{}">
                    <v-btn icon v-on:click=Iscompare(item3)  class="ma-2">
                      <v-icon x-large>mdi-scale-balance</v-icon>
                    </v-btn>
              </template>
              <span>Compare</span>
          </v-tooltip>
        </v-card>
                </v-row>
        </v-col>
        </div>


        <div class = "block" id = "cate3">
          생활용품<hr>
          <v-col
        v-for="(item1, i) in item1"
        :key="i"
          >
        <v-row class="ml-2">

        <div style = "float: left; width: 20%; text-align: center;">
            <v-avatar
                        class="mb-5 ml-7"
                        size="90%"
                        tile
                      ><img :src=item1.img></v-avatar>
        </div>

        <div style = "float: left; width: 20%; text-align: center; margin: auto;">
            {{item1.name}}
        </div>
            <div style = "float: left; width: 20%; text-align: center; margin: auto; ">
                <v-row class="ml-2" style="display: flex; justify-content: center;">
                <div v-for="n in 5"
                                :key="n">
                    <v-icon v-if="item1.score - n > -0.2" color="amber" class="ml-1">
                      mdi-star
                    </v-icon>
                    <v-icon v-if="item1.score - n <= -0.2 && item1.score - n >= -0.7" color="amber" class="ml-1">
                      mdi-star-half-full
                    </v-icon>
                    <v-icon v-if="item1.score - n < -0.7" color="amber" class="ml-1">
                      mdi-star-outline
                    </v-icon>
                </div>
                </v-row>
                {{item1.score}}
            </div>
        <div style = "float: left; width: 10%; text-align: center; margin: auto;">
            {{item1.price}}
        </div>
        <div style = "float: left; width: 10%; text-align: center; margin: auto;">
            {{item1.site_name}}
        </div>
        <div style = "float: left; width: 10%; text-align: center; margin: auto;">
            {{item1.date}}
        </div>
        <div style = "float: left; width: 5%; text-align: center; margin: auto;">
          <v-btn class="mx-2" v-on:click=deleted1(i) fab dark small color="red" >
            <v-icon dark>mdi-minus</v-icon>
          </v-btn>
        </div>
        
        <v-card flat tile color="#E8EAF6" class="d-flex flex-row-reverse" style="margin: auto; width: 5%;">
          <v-tooltip bottom>
              <template v-slot:activator="{}">
                    <v-btn icon v-on:click=Iscompare(item1)  class="ma-2">
                      <v-icon x-large>mdi-scale-balance</v-icon>
                    </v-btn>
              </template>
              <span>Compare</span>
          </v-tooltip>
        </v-card>
                </v-row>
        </v-col>
        </div>


        <div class = "block" id = "cate4">
          식품<hr>
          <v-col
        v-for="(item4, i) in item4"
        :key="i"
          >
        <v-row class="ml-2">

        <div style = "float: left; width: 20%; text-align: center;">
            <v-avatar
                        class="mb-5 ml-7"
                        size="90%"
                        tile
                      ><img :src=item4.img></v-avatar>
        </div>

        <div style = "float: left; width: 20%; text-align: center; margin: auto;">
            {{item4.name}}
        </div>
            <div style = "float: left; width: 20%; text-align: center; margin: auto; ">
                <v-row class="ml-2" style="display: flex; justify-content: center;">
                <div v-for="n in 5"
                                :key="n">
                    <v-icon v-if="item4.score - n > -0.2" color="amber" class="ml-1">
                      mdi-star
                    </v-icon>
                    <v-icon v-if="item4.score - n <= -0.2 && item4.score - n >= -0.7" color="amber" class="ml-1">
                      mdi-star-half-full
                    </v-icon>
                    <v-icon v-if="item4.score - n < -0.7" color="amber" class="ml-1">
                      mdi-star-outline
                    </v-icon>
                </div>
                </v-row>
                {{item4.score}}
            </div>
        <div style = "float: left; width: 10%; text-align: center; margin: auto;">
            {{item4.price}}
        </div>
        <div style = "float: left; width: 10%; text-align: center; margin: auto;">
            {{item4.site_name}}
        </div>
        <div style = "float: left; width: 10%; text-align: center; margin: auto;">
            {{item4.date}}
        </div>
        <div style = "float: left; width: 5%; text-align: center; margin: auto;">
          <v-btn class="mx-2" v-on:click=deleted4(i) fab dark small color="red" >
            <v-icon dark>mdi-minus</v-icon>
          </v-btn>
        </div>
        <v-card flat tile color="#E8EAF6" class="d-flex flex-row-reverse" style="margin: auto; width: 5%;">
          <v-tooltip bottom>
              <template v-slot:activator="{}">
                    <v-btn icon v-on:click=Iscompare(item4)  class="ma-2">
                      <v-icon x-large>mdi-scale-balance</v-icon>
                    </v-btn>
              </template>
              <span>Compare</span>
          </v-tooltip>
        </v-card>
                </v-row>
        </v-col>
        </div>


        <div class = "block" id = "cate5">
          패션<hr>
          <v-col
        v-for="(item2, i) in item2"
        :key="i"
          >
        <v-row class="ml-2">

        <div style = "float: left; width: 20%; text-align: center;">
            <v-avatar
                        class="mb-5 ml-7"
                        size="90%"
                        tile
                      ><img :src=item2.img></v-avatar>
        </div>

        <div style = "float: left; width: 20%; text-align: center; margin: auto;">
            {{item2.name}}
        </div>
            <div style = "float: left; width: 20%; text-align: center; margin: auto; ">
                <v-row class="ml-2" style="display: flex; justify-content: center;">
                <div v-for="n in 5"
                                :key="n">
                    <v-icon v-if="item2.score - n > -0.2" color="amber" class="ml-1">
                      mdi-star
                    </v-icon>
                    <v-icon v-if="item2.score - n <= -0.2 & item2.score - n >= -0.75" color="amber" class="ml-1">
                      mdi-star-half-full
                    </v-icon>
                    <v-icon v-if="item2.score - n < -0.75" color="amber" class="ml-1">
                      mdi-star-outline
                    </v-icon>
                </div>
                </v-row>
                {{item2.score}}
            </div>
        <div style = "float: left; width: 10%; text-align: center; margin: auto;">
            {{item2.price}}
        </div>
        <div style = "float: left; width: 10%; text-align: center; margin: auto;">
            {{item2.site_name}}
        </div>
        <div style = "float: left; width: 10%; text-align: center; margin: auto;">
            {{item2.date}}
        </div>
        <div style = "float: left; width: 5%; text-align: center; margin: auto;">
          <v-btn class="mx-2" v-on:click=deleted2(i) fab dark small color="red" >
            <v-icon dark>mdi-minus</v-icon>
          </v-btn>
        </div>
        <v-card flat tile color="#E8EAF6" class="d-flex flex-row-reverse" style="margin: auto; width: 5%;">
          <v-tooltip bottom>
              <template v-slot:activator="{}">
                    <v-btn icon v-on:click=Iscompare(item2)  class="ma-2">
                      <v-icon x-large>mdi-scale-balance</v-icon>
                    </v-btn>
              </template>
              <span>Compare</span>
          </v-tooltip>
        </v-card>
                </v-row>
        </v-col>
        </div>
      </div>

    </v-container>

    <v-footer class="pa-3">
      <v-spacer></v-spacer>
      <div>&copy; {{ new Date().getFullYear() }}</div>
    </v-footer>

  </div>
</template>

<script>
import firebase from 'firebase';
import { eventBus } from "../main"
export default {
    data(){
      return{
          email: "",
          wishnum: 0,
          wish: [],
          item: [],
          seller: [],
          id: '',
          item1: [],
          item2: [],
          item3: [],
          item4: [],
          item5: [],
          compareID1:'defult',
          compareID2:'defult',
          compare_price1:'defult',
          compare_price2:'defult',
      }
    },
    methods: {
      Iscompare(item){
        console.log(item)
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
      changecate(selected){
        if (event.target.value == "overall"){
          document.getElementById("cate1").style.display = "block"
          document.getElementById("cate2").style.display = "block"
          document.getElementById("cate3").style.display = "block"
          document.getElementById("cate4").style.display = "block"
          document.getElementById("cate5").style.display = "block"
        }
        else if (event.target.value == "one"){
          document.getElementById("cate1").style.display = "block"
          document.getElementById("cate2").style.display = "none"
          document.getElementById("cate3").style.display = "none"
          document.getElementById("cate4").style.display = "none"
          document.getElementById("cate5").style.display = "none"
        }
        else if (event.target.value == "two"){
          document.getElementById("cate1").style.display = "none"
          document.getElementById("cate2").style.display = "block"
          document.getElementById("cate3").style.display = "none"
          document.getElementById("cate4").style.display = "none"
          document.getElementById("cate5").style.display = "none"
        }
        else if (event.target.value == "three"){
          document.getElementById("cate1").style.display = "none"
          document.getElementById("cate2").style.display = "none"
          document.getElementById("cate3").style.display = "block"
          document.getElementById("cate4").style.display = "none"
          document.getElementById("cate5").style.display = "none"
        }
        else if (event.target.value == "four"){
          document.getElementById("cate1").style.display = "none"
          document.getElementById("cate2").style.display = "none"
          document.getElementById("cate3").style.display = "none"
          document.getElementById("cate4").style.display = "block"
          document.getElementById("cate5").style.display = "none"
        }
        else if (event.target.value == "five"){
          document.getElementById("cate1").style.display = "none"
          document.getElementById("cate2").style.display = "none"
          document.getElementById("cate3").style.display = "none"
          document.getElementById("cate4").style.display = "none"
          document.getElementById("cate5").style.display = "block"
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
        deleted1(num) {
          console.log(this.item1[num].key)
            this.$http.delete('https://comparewise.firebaseio.com/WishList/'+this.item1[num].key+'.json').then(function(data){
            alert('성공적으로 삭제되었습니다.');
            location.reload();
            })
        },
        deleted2(num) {
          console.log(this.item2[num].key)
            this.$http.delete('https://comparewise.firebaseio.com/WishList/'+this.item2[num].key+'.json').then(function(data){
            alert('성공적으로 삭제되었습니다.');
            location.reload();
            })
        },
        deleted3(num) {
          console.log(this.item3[num].key)
            this.$http.delete('https://comparewise.firebaseio.com/WishList/'+this.item3[num].key+'.json').then(function(data){
            alert('성공적으로 삭제되었습니다.');
            location.reload();
            })
        },
        deleted4(num) {
          console.log(this.item4[num].key)
            this.$http.delete('https://comparewise.firebaseio.com/WishList/'+this.item4[num].key+'.json').then(function(data){
            alert('성공적으로 삭제되었습니다.');
            location.reload();
            })
        },
        deleted5(num) {
          console.log(this.item5[num].key)
            this.$http.delete('https://comparewise.firebaseio.com/WishList/'+this.item5[num].key+'.json').then(function(data){
            alert('성공적으로 삭제되었습니다.');
            location.reload();
            })
        },
    },
    mounted(){
      let recaptchaScript = document.createElement('script')
      recaptchaScript.setAttribute('src', 'https://code.iconify.design/1/1.0.6/iconify.min.js')
      document.head.appendChild(recaptchaScript)
    },
    created() {
    eventBus.$on('loginTrue', isTrue => {
      this.$store.commit('loginTrue')
    })
    var email = this.getCookie("email")
    console.log(email)
    this.email=email;
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
                    var tar = data[key]
                    var tmp =
                        {
                            item_id: tar.item_id,
                            date: tar.wish_list_date,
                            key: key,
                        }
                    this.wish.push(tmp)
                    this.wishnum = this.wishnum + 1
                  }
                }
                this.$http.get('https://comparewise.firebaseio.com/item.json').then(function(data){
                      return data.json();
                  }).then(function(data){
                      for(var i=0; i<this.wishnum; i++) {
                          this.id = this.wish[i].item_id
                            for (let key in data) {
                                if(data[key].item_id == this.id){
                                var tar = data[key]
                                var tmp =
                                  {
                                    name: tar.item_name,
                                    img: tar.img_src,
                                    score: tar.avg_score,
                                    cate: tar.category_id
                                  }
                                this.item.push(tmp)
                                }
                            }
                      }
                    this.$http.get('https://comparewise.firebaseio.com/ItemSeller.json').then(function(data){
                return data.json();
            }).then(function(data){
                  for(var i=0; i<this.wishnum; i++) {
                          this.id = this.wish[i].item_id
                            for (let key in data) {
                                if(key == this.id){
                                var tar = data[key]
                                var tmp =
                                  {
                                    cost: tar[0].cost,
                                    site_name : tar[0].site_name,
                                    site_url: tar[0].site_url,
                                    key: this.wish[i].key
                                  }
                                this.seller.push(tmp)
                                }
                            }
                    }
                    for(var i=0; i<this.wishnum; i++) {
        var tmp = {
          date: this.wish[i].date,
          name: this.item[i].name,
          img: this.item[i].img,
          score: this.item[i].score,
          price: this.seller[i].cost,
          site_name: this.seller[i].site_name,
          site_url: this.seller[i].site_url,
          key: this.seller[i].key,
          id: this.wish[i].item_id,
        }
        if (this.item[i].cate == 1){
          this.item1.push(tmp)
        }
        else if (this.item[i].cate == 2){
          this.item2.push(tmp)
        }
        else if (this.item[i].cate == 3){
          this.item3.push(tmp)
        }
        else if (this.item[i].cate == 4){
          this.item4.push(tmp)
        }
        else if (this.item[i].cate == 5){
          this.item5.push(tmp)
        }
        
      }
                    
                    })
                  
              
              })
              
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
</style>