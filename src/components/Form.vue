<template>
    <b-container>
        <b-form @submit="onSubmit">
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

        <div class="form-error" v-if="signUpError">User already exists!</div>
        <div class="form-error" v-if="loginError">Incorrect login or password!</div>
        <div class="form-success" v-if="successLogin">Logged in successfully!</div>
        <div class="form-sign" v-if="successSignUp">Sign up successfully!</div>
    </b-container>
</template>

<script>
export default {
name: "Form",
    data() {
        return {
            msg: 'Welcome to Your Vue.js App',
            form: {
                username: '',
                password: ''
            },
            signup: false,
            address: "localhost:1400",
            successLogin: false,
            successSignUp: false,
            signUpError: false,
            loginError: false
        }
    },
    methods: {
        onTest(evt) {
            evt.preventDefault();
            fetch(`http://${this.address}/backend/api/auth/test`).then(res => res);
        },
        onSubmit(evt) {
            evt.preventDefault()
            const requestOptions = {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                method: 'POST',
                body: JSON.stringify(this.form),
                credentials: 'include'
            }
            console.log(this.form)
            if (this.signup) {
                fetch(`http://${this.address}/backend/api/auth/signup`, requestOptions)
                    .then(res => {
                        if (res.status === 400) {
                            this.signUpError = true;
                            this.loginError = false;
                            this.successLogin = false;
                            this.successSignUp = false;
                        } else {
                            this.signUpError = false;
                            this.loginError = false;
                            this.successLogin = false;
                            this.successSignUp = true;
                        }
                    })
            }
            else {
                fetch(`http://${this.address}/backend/api/auth/signin`, requestOptions)
                    .then(res => {
                        if (res.status === 400) {
                            this.signUpError = false;
                            this.loginError = true;
                            this.successLogin = false;
                            this.successSignUp = false;
                        } else {
                            this.signUpError = false;
                            this.loginError = false;
                            this.successLogin = true;
                            this.successSignUp = false;
                            res.text().then(res => {
                                sessionStorage.setItem("JSESSIONID", res);
                                this.$router.push({path: "/main"})
                            });
                        }
                    })
            }
        }
    }
}
</script>

<style scoped>

</style>
