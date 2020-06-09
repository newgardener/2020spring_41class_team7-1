 <template>
    <div class="login">
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
                    <v-img src="../assets/loginLogo.png" width="500px"></v-img>
                    <v-card-title primary-title>
                        <div>
                            <form>
                                <input type="text" v-model="userInfo.email" required placeholder="email" width="100%"> <br />
                                <input type="password" v-model="userInfo.password" required placeholder="password" width="100%"> <br />
                            </form>
                        </div>
                    </v-card-title>

                    <v-card-actions class="justify-center">
                        <v-btn color="blue" width="100%" height="50px" style="font-size: 20px">
                            <button v-on:click="login">Login</button>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-layout>
    </div>
</template>


<script>
import firebase from 'firebase'
import { eventBus } from "../main"
import App from '../App.vue'

export default {
    name: 'login',
    data() {
        return {
            userInfo: {
                email: '',
                password: ''
            },
            isTrue: false,
            idTrue: false,
            pwdTrue: false,
        }
    },
    methods: {
        login() {
            this.$http.get('https://comparewise.firebaseio.com/user.json').then(function(data){
                return data.json();
            }).then(function(data){
                for (let key in data) {
                    if (data[key].email == this.userInfo.email && data[key].password == this.userInfo.password) {
                        this.isTrue = true;
                        this.idTrue = true;
                        this.pwdTrue = true;
                        eventBus.$emit("loginTrue", this.isTrue);
                        alert(key)
                        App.$setCookie("test", "test1234", 1);
                        alert(getCookie("test"));
                        deleteCookie("test");
                        alert(getCookie("test"));
                        alert('Successfully logged in');
                        this.$router.replace(this.$route.query.redirect || '/main');
                        break;
                    } 
                    if (data[key].email == this.userInfo.email && data[key].password != this.userInfo.password){
                        this.idTrue = true;
                        this.pwdTrue = false;
                    }
                }
                if (this.idTrue && !this.pwdTrue) {
                    alert('Error:' + 'You have error in password. Please check again.');
                }
                if (!this.idTrue && !this.pwdTrue) {
                    alert('Error:' + 'Account does not exist.');
                }
            });
        }
    }
}
</script>


<style scoped>
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