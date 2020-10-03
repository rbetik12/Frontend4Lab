<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="/">Вариант 2528</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto" type="dark">
          <div class="navbar-text">Прикота Виталий Александрович</div>
          <div class="navbar-text">P33113</div>
          <div class="navbar-text">{{ this.time }}</div>
          <b-button type="primary" v-on:click="onLogOut">Log out</b-button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>


    <router-view></router-view>

  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    onLogOut(evt) {
      evt.preventDefault();

      sessionStorage.setItem("JSESSIONID", null);
      this.$router.push("/");
    },
    updateTime() {
      this.currentTime = new Date();
      this.time = `${this.currentTime.getHours()}:${this.currentTime.getMinutes()}:${this.currentTime.getSeconds()}`;
    }
  },
  data() {
    return {
      currentTime: new Date(),
      time: "00:00:00"
    }
  },
  beforeMount() {
    setInterval(function () {
      this.updateTime();
    }.bind(this), 100);
  }
}
</script>

<style lang="scss" scoped>

@import 'styles/custom.scss';

.navbar-text {
  color: white;
  padding: 1em;
}
</style>
