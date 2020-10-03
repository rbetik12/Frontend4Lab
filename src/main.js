import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import App from './App.vue'
import './styles/custom.scss';
import VueRouter from 'vue-router'
import Form from "./components/Form.vue";
import Main from "./components/Main.vue";

Vue.use(BootstrapVue)
Vue.use(VueRouter)

function isAuthenticated() {
    return !!sessionStorage.getItem("JSESSIONID");

}

const routes = [
    {path: "/", component: Form},
    {
        path: "/main",
        component: Main,
        beforeEnter: (to, from, next) => {
            if (isAuthenticated()) {
                next();
            }
            next(false);
        }
    }
]

const router = new VueRouter({
    routes
})
new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
