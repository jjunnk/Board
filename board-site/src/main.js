import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";


  new Vue({
    render: h => h(App),
}).$mount('#app');
