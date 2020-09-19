<template>
    <div id="app">
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand href="#">Вариант 2528</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="ml-auto" type="dark">
                    <div class="navbar-text">Прикота Виталий Александрович</div>
                    <div class="navbar-text">P33113</div>
                    <b-button type="primary" v-on:click="onLogOut">Log out</b-button>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>


        <router-view></router-view>

    </div>
</template>

<script>
import Test from "./components/Test.vue";
import Form from "./components/Form.vue";

export default {
    name: 'app',
    components: {
      Test, Form
    },
    methods: {
        onLogOut(evt) {
            evt.preventDefault();

            sessionStorage.setItem("JSESSIONID", null);
            this.$router.push("/");
        }
    }
}
</script>

<style lang="scss" scoped>
.navbar-text {
    color: white;
    padding: 1em;
}
</style>
