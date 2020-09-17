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

        <b-container>
            <b-form @submit="onSubmit" @reset="onReset">
                <b-form-group
                    id="input-group-1"
                    label="Username:"
                    label-for="input-1"
                >
                    <b-form-input
                        id="input-1"
                        v-model="form.username"
                        type="text"
                        required
                        placeholder="Enter username"
                    ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-2" label="Your password:" label-for="input-2">
                    <b-form-input
                        id="input-2"
                        v-model="form.password"
                        type="password"
                        required
                        placeholder="Enter password"
                    ></b-form-input>
                </b-form-group>

                <b-button type="submit" variant="primary" v-if="signup">Sign up</b-button>
                <b-button type="submit" variant="primary" v-if="!signup">Sign in</b-button>
                <b-button variant="info" v-on:click="signup = !signup">Switch</b-button>
            </b-form>

            <div class="form-error" v-if="error">User already exists or server error!</div>
        </b-container>
    </div>
</template>

<script>
export default {
    name: 'app',
    data() {
        return {
            msg: 'Welcome to Your Vue.js App',
            form: {
                username: '',
                password: ''
            },
            error: false,
            signup: false,
            address: "192.168.1.41:8090"
        }
    },
    methods: {
        onSubmit(evt) {
            evt.preventDefault()
            const requestOptions = {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                method: 'POST',
                body: JSON.stringify(this.form)
            }
            console.log(this.form)
            if (this.signup) {
                fetch(`http://${this.address}/backend/api/auth/signup`, requestOptions)
                    .then(res => {
                        if (res.status === 400) {
                            this.error = true;
                        } else {
                            this.error = false;
                        }
                    })
            }
            else {
                fetch(`http://${this.address}/backend/api/auth/signin`, requestOptions)
                    .then(res => {
                        if (res.status === 400) {
                            this.error = true;
                        } else {
                            this.error = false;
                        }
                    })
            }
        },
        onReset(evt) {
            evt.preventDefault()
            // Reset our form values
            this.form.username = ''
            this.form.name = ''
            this.form.food = null
            this.form.checked = []
            // Trick to reset/clear native browser form validation state
            this.$nextTick(() => {
            })
        }
    }
}
</script>

<style lang="scss">
</style>
