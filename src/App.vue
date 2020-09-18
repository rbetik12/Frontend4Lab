<template>
    <div id="app">
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand href="#">Вариант 2528</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="ml-auto" type="dark">
                    <b-nav-item>Прикота Виталий Александрович</b-nav-item>
                    <b-nav-item>P33113</b-nav-item>
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
    }
}
</script>

<style lang="scss">
</style>
