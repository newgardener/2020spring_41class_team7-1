import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

import firebase from 'firebase'
import VueResource from 'vue-resource'


Vue.config.productionTip = false

export const eventBus = new Vue()

router.push('main')

const firebaseConfig = {
    apiKey: "AIzaSyBdhbrNHxxRdSH9E3609MoAWx2EOgY544c",
    authDomain: "comparewise.firebaseapp.com",
    databaseURL: "https://comparewise.firebaseio.com",
    projectId: "comparewise",
    storageBucket: "comparewise.appspot.com",
    messagingSenderId: "82840898656",
    appId: "1:82840898656:web:e8bf80980d53b0fcec8705",
    measurementId: "G-X8DKE8YWW5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
Vue.use(VueResource);


new Vue({
    el: '#app',
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')