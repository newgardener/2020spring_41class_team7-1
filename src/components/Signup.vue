<template>
  <div>
      <router-link to="/main">
            <v-btn 
            icon 
            width="auto" 
            height="auto"  
            class="ma-1"
            >
            <v-avatar size="90">
            <img src="../assets/ComparewiseLOGO.jpg">
            </v-avatar>
            </v-btn>  
        </router-link> 
        
        <v-layout class="justify-center">
                <v-card>
                    <v-img src="../assets/signupLogo.png" width="500px"></v-img>
                    <v-card-title primary-title>
                        <div>
                            <form>
                                <input type="text" v-model="userInfo.name" placeholder="name" width="100%"> <br />
                                <input type="text" v-model="userInfo.nickname" placeholder="nickname" width="100%"> <br />
                                <input type="text" v-model="userInfo.email" placeholder="email" width="100%"> <br />
                                <input type="password" v-model="userInfo.password" placeholder="password" width="100%"> <br />
                                <input type="password" v-model="passwordConfirmation" placeholder="password confirmation" width="100%"> <br />
                            </form>
                        </div>
                    </v-card-title>

                    <v-card-actions class="justify-center">
                        <v-btn color="blue" width="100%" height="50px" style="font-size: 20px">
                            <button v-on:click.prevent="post">Register</button>
                        </v-btn>
                    </v-card-actions>
                </v-card>
        </v-layout>

        <div v-if="submitted">
            <v-card-actions class="justify-center">
                <v-btn depressed large style="font-size: 20px">
                    <router-link to="/login">Login</router-link>
                </v-btn>
            </v-card-actions>
        </div>


  </div>
    
</template>

<script>
import firebase from 'firebase'

export default {
    name: 'signUp',
    data() {
        return {
            userInfo: {
                name: '',
                nickname: '',
                password: '',
                email: ''
            },
            passwordConfirmation: '',
            idChecked: false,
            idError: false,
            passwordError: false,
            submitted: false,

        }
    },
    methods: {
        checkId: function() {
            this.$http.get('https://comparewise.firebaseio.com/user.json').then(function(data){
                return data.json();
            }).then(function(data){
                for (let key in data) {
                    if (data[key].email == this.userInfo.email) {
                        this.idError = true;
                    }
                }
            })
            return this.idError
        },
        post: function() {
            if (this.userInfo.password != this.passwordConfirmation) {
                passwordError = true;
                alert('Error: password is not identical!');
            } else if (!checkId()) {
                alert('Error: email already exists!');
            }
            else {
                this.$http.post('https://comparewise.firebaseio.com/user.json', this.userInfo).then(function(data){
                this.submitted = true;
                alert('Successfully signed up');
                this.$router.replace(this.$route.query.redirect || '/main');
            })
            }

        }
    }
}
</script>

<style>
    div.layout.justify-center{
        height: "450px";
    }
    div.v-responsive.v-image {
        display: block;
        margin: 0 auto;
        width: 100%;
    }
    v-card__title {
        text-align: center;
        color:cornflowerblue;
    }
    form, input{
        width: 500px;
    }

</style>