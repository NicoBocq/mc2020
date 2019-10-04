<template>
  <v-app id="app">
    <v-app-bar dark color="red darken-4" app>
      <v-toolbar-title>MumuChallenge 2020</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <v-container>
        <router-view/>
      </v-container>
    </v-content>
    <v-footer
      dark app
    >
      <div class="flex-grow-1"></div>
      <span class="white--text">&copy; NicoBocq</span>
    </v-footer>
  </v-app>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
