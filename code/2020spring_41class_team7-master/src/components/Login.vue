 <template>
    <div>
            <v-layout class="justify-center" style="padding: 50px auto">
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

                    <v-card-actions v-on:click="login" class="justify-center">
                        <v-btn color="blue" width="100%" height="50px" style="font-size: 20px">
                            <button>Login</button>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-layout>
    </div>
</template>


<script>
import firebase from 'firebase'
import { eventBus } from "../main"


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

        setCookie(name, value, day) {
        var date = new Date();
        date.setTime(date.getTime() + day * 60 * 60 * 24 * 1000);
        document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
         },
        getCookie(name) {
        var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return value? value[2] : null;
         },
        deleteCookie(name) {
        var date = new Date();
        document.cookie = name + "= " + "; expires=" + date.toUTCString() + "; path=/";
         },

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
                        this.setCookie("email", data[key].email,1);
                        this.setCookie("nick", data[key].nickname,1);
                        this.setCookie("pw", data[key].password,1);
                        this.setCookie("name", data[key].name,1);
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
    div.v-card.v-sheet.theme--light {
        margin-top: 50px;
    }
</style>