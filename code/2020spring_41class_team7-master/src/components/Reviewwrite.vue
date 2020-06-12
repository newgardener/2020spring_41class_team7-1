<template>
  <div>
          <v-container>
      <div class = "block" id = "first">
        <p>(d)선택된 리뷰상품 출력</p>
      </div>
      <form style="width:100%;">
        <div class = "block">
          <div class="star_grade">
            <v-row class="ml-2" style="display: flex; justify-content: center; margin: 30px 30px">
                <div v-for="n in 5"
                                :key="n" v-on:click="stars($event)">
                    <v-icon v-if="value - n >= 0" color="amber" class="ml-1" x-large>
                      mdi-star
                    </v-icon>
                    <v-icon v-if="value - n < 0 && value - n >= -0.5" color="amber" class="ml-1" x-large>
                      mdi-star-half-full
                    </v-icon>
                    <v-icon v-if="value - n <= -1" color="amber" class="ml-1" x-large>
                      mdi-star-outline
                    </v-icon>
                </div>
            </v-row>
          </div>
        </div>
        <div class = "block" style="text-align:center;">
          <textarea rows="10" cols="50" placeholder="솔직한 리뷰를 남겨주세요." style="resize: none;"></textarea>
        </div>
        
      <div class="my-2" style="text-align:center;">
        <v-btn color="primary" v-on:click="write">리뷰 등록</v-btn>
      </div>
      </form>

    </v-container>
  </div>
</template>

<script>
import firebase from 'firebase';
// import 'expose-loader?$!expose-loader?jQuery!jquery'
import { eventBus } from "../main"

export default {
    data(){
      return{
        stanx: 0,
        stany: 0,
        x: 0,
        y: 0,
        value: 0,
      }
    },
    methods: {
      stars: function(event){
        this.x = event.pageX;
        console.log(this.x)
        this.y = event.pageY;
      },
        write() { // DB에 보내기..
            console.log(1)
        },
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
  .star{
    color:yellow;
  }
  textarea::placeholder{
    text-align: center;
    line-height: 230px;
  }

</style>