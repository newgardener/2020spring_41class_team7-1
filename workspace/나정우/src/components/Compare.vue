<template>
  <div>
    
   <v-container fluid>
        <v-row dense>
            <v-col v-for="item in items" :key="item.name" :cols=6>
            <router-link 
                class="routerLink" v-bind:to='"/itemdetail/" + item.id'
                >
                <v-card>
                    <v-img :src="item.src" aspect-ratio="1.0" class="white--text align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
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
                    <div v-for="attributes in item" :key=attributes >
                      <v-list v-if="attributes != 'default' && attributes != item.id && attributes != item.src && attributes != item.score && attributes != item.reviewNum && attributes != item.describer" >
                        <v-divider></v-divider>
                          <v-list-item style="font-family:'휴먼편지체'; font-size:large">
                              {{attributes}}
                          </v-list-item>
                      </v-list>
                    </div>
                    <v-divider></v-divider><br>
                    <h1 style="text-align:center; font-family:'휴먼엑스포'">상세 정보</h1>
                    <v-img :src="item.describer"></v-img>
                </v-card>
            </router-link>
            </v-col>
        </v-row>
    </v-container>
  </div>
</template>




<script>
export default {
  created(){
    this.compareid2 = this.$route.params.id1
    this.compareid1 = this.$route.params.id2
    this.compareprice2 = this.$route.params.price1
    this.compareprice1 = this.$route.params.price2
    this.$http.get('https://comparewise.firebaseio.com/item.json').then(function(data){
                return data.json();
            }).then(function(data){
                for (let key in data) {
                    var tar = data[key]
                    if(tar.item_id === this.compareid1){
                        this.items[0].id = tar.item_id,
                        this.items[0].src =  tar.img_src,
                        this.items[0].score = tar.avg_score,
                        this.items[0].name = "상품명 : " + tar.item_name,
                        this.items[0].keyword =  "핵심 키워드 : " + tar.keyword,
                        this.items[0].price = "최저가 : " + this.compareprice1,
                        this.items[0].reviewNum = "리뷰수 : " + tar.review_volume,
                        this.items[0].describer  = tar.describer,
                        this.items[0].category_id = tar.category_id
                        switch(this.items[0].category_id){
                          case 1:
                            this.items[0].category_id = "카테고리 : 생활용품";
                            this.items[0].form = "형태 : " + tar.form;
                            this.items[0].total_volume = "용량 : " + tar.total_volume;
                            break;
                          case 2:
                            this.items[0].category_id = "카테고리 : 패션";
                            this.items[0].color = "용량 : " + tar.color;
                            this.items[0].material = "재질 : " + tar.material;
                            this.items[0].size_range = "사이즈 범위 : " + tar.size_range;
                            break;
                          case 3:
                            this.items[0].category_id = "카테고리 : 뷰티";
                            this.items[0].ingredient = "성분 : " + tar.ingredient;
                            this.items[0].speciality = "제품 특징 : " + tar.speciality;
                            this.items[0].type = "권장 타입 : " + tar.type;
                            break;
                          case 4:
                            this.items[0].category_id = "카테고리 : 탄산수";
                            this.items[0].flavor = "맛 : " + tar.flavor;
                            this.items[0].price_per_500ml = "500ml 당 " + tar.price_per_500ml;
                            break;
                          case 5:
                            this.items[0].category_id = "카테고리 : 가전제품";
                            this.items[0].CPU = "CPU : " + tar.CPU;
                            this.items[0].RAM = "RAM : " + tar.RAM;
                            this.items[0].SSD = "SSD : " + tar.SSD;
                            this.items[0].weight = "무게 : " + tar.weight;
                            this.items[0].size = "크기 : " + tar.size;
                            this.items[0].color = "색상 : " + tar.color;
                            break;
                          default:
                            break;
                        }
                    }
                  else if(tar.item_id === this.compareid2){
                        this.items[1].id = tar.item_id,
                        this.items[1].src =  tar.img_src,
                        this.items[1].score = tar.avg_score,
                        this.items[1].name = "상품명 : " + tar.item_name,
                        this.items[1].keyword =  "핵심 키워드 : " + tar.keyword,
                        this.items[1].price = "최저가 : " + this.compareprice2,
                        this.items[1].reviewNum = "리뷰수 : " + tar.review_volume,
                        this.items[1].describer  = tar.describer,
                        this.items[1].category_id = tar.category_id
                        switch(this.items[1].category_id){
                          case 1:
                            this.items[1].category_id = "카테고리 : 생활용품";
                            this.items[1].form = "형태 : " + tar.form;
                            this.items[1].total_volume = "용량 : " + tar.total_volume;
                            break;
                          case 2:
                            this.items[1].category_id = "카테고리 : 패션";
                            this.items[1].color = "용량 : " + tar.color;
                            this.items[1].material = "재질 : " + tar.material;
                            this.items[1].size_range = "사이즈 범위 : " + tar.size_range;
                            break;
                          case 3:
                            this.items[1].category_id = "카테고리 : 뷰티";
                            this.items[1].ingredient = "성분 : " + tar.ingredient;
                            this.items[1].speciality = "제품 특징 : " + tar.speciality;
                            this.items[1].type = "권장 타입 : " + tar.type;
                            break;
                          case 4:
                            this.items[1].category_id = "카테고리 : 식품";
                            this.items[1].flavor = "맛 : " + tar.flavor;
                            this.items[1].price_per_500ml = "500ml 당 " + tar.price_per_500ml;
                            break;
                          case 5:
                            this.items[1].category_id = "카테고리 : 가전제품";
                            this.items[1].CPU = "CPU : " + tar.CPU;
                            this.items[1].RAM = "RAM : " + tar.RAM;
                            this.items[1].SSD = "SSD : " + tar.SSD;
                            this.items[1].weight = "무게 : " + tar.weight;
                            this.items[1].size = "크기 : " + tar.size;
                            this.items[1].color = "색상 : " + tar.color;
                            break;
                          default:
                            break;
                        }
                  }
                }
            })
  },
    data() {
    return {
      items : [ 
        {
          id:'',
          category_id:'',
          src:'',
          score:'',
          name:'',
          keyword:'',
          price:'',
          reviewNum:'',
          describer:'',
          color:'default',
          material: 'default',
          size_range: 'default',
          //
          form: 'default',
          total_volume: 'default',
          //
          speciality: 'default',
          type: 'default',
          ingredient: 'default',
          //
          flavor:'default',
          price_per_500ml: 'default',
          //
          CPU: 'default',
          RAM: 'default',
          SSD: 'default',
          size: 'default',
          weight: 'default'
        },
        {
          id:'',
          category_id:'',
          src:'',
          score:'',
          name:'',
          keyword:'',
          price:'',
          reviewNum:'',
          describer:'',
          color:'default',
          material: 'default',
          size_range: 'default',
          //
          form: 'default',
          total_volume: 'default',
          //
          speciality: 'default',
          type: 'default',
          ingredient: 'default',
          //
          flavor:'default',
          price_per_500ml: 'default',
          //
          CPU: 'default',
          RAM: 'default',
          SSD: 'default',
          size: 'default',
          weight: 'default'
        }
      ],
      multiLine: true,
      snackbar: false,
      compareid1:'',
      compareid2:'',
      compareprice1:'',
      compareprice2:'',
      
      
    }
  }
}
</script>
