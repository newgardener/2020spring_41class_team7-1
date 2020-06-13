<template>
  <div>

    <!-- Sign Up form -->
        
    <v-layout class="justify-center" style="padding: 200px auto">
            <v-card>
                <v-img src="../assets/signupLogo.png" width="500px"></v-img>
                <v-card-title primary-title>
                    <div class="text-center">
                        <form>
                            <input type="text" v-model="form.name" required placeholder="name" width="100%"> <br />
                            <input type="text" v-model="form.nickname" required placeholder="nickname" width="100%"> <br />
                            <input id="emailform" type="text" v-model="form.email" required placeholder="email" width="70%"> 
                            <v-btn class="ma-2" color="secondary" @click="checkId" width="30%">Check Email</v-btn>
                            <input type="password" v-model="form.password" required placeholder="password" width="100%"> <br />
                            <input type="password" v-model="passwordConfirmation" required placeholder="password confirmation" width="100%"> <br />
                        </form>
                    </div>
                </v-card-title>
                <div v-if="checkId">
                <div v-bind:value="{ idError: true }"></div>
                </div>
                
                

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
            form: {
                name: '',
                nickname: '',
                password: '',
                email: ''
            },
            passwordConfirmation: '',
            idError: false,
            passwordError: false,
            submitted: false
        }
    },
    methods: {
        post: function() {
            if (!this.form.name || !this.form.nickname || !this.form.password || !this.form.email) {
                alert('Error: You have some missing input. Please check again.');
            }
            else if (this.form.password != this.passwordConfirmation) {
                this.passwordError = true;
                alert('Error: password is not identical!');
            } 
            else {
                this.$http.post('https://comparewise.firebaseio.com/user.json', this.form).then(function(data){
                this.submitted = true;
                alert('Successfully signed up');
            })
            }

        }, 
        checkId: function() {
            this.$http.get('https://comparewise.firebaseio.com/user.json').then(function(data){
                return data.json();
            }).then(function(data){
                for (let key in data) {
                    if (data[key].email == this.form.email) {
                        this.idError = true;
                    }
                }
                if (this.idError) {
                    alert('Error: This id already exists. choose another one.')
                }
            })
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
    input#emailform{
        width: 300px;
        position: relative;
        margin-right: 30px;
    }
    div.v-card.v-sheet.theme--light {
        margin-top: 50px;
    }

</style>