<template>
  <v-app id="app">
    <v-app-bar dark color="black" app>
      <v-toolbar-title>MumuChallenge 2020</v-toolbar-title>

      <template v-slot:extension>
        <Add />
        <v-tabs
          align-with-title
          background-color="transparent"
        >
          <v-tab>
            <router-link to="/" class="router-link">
              Home
            </router-link>
          </v-tab>
          <v-tab>
            <router-link to="/admin" class="router-link">
              Admin
            </router-link>
          </v-tab>
        </v-tabs>
      </template>
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

<script>

import Add from '@/components/Add'

export default {
  components: {
    Add
  }
  
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
  a {
    font-weight: bold;
    color: #fff;
    text-decoration: none;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
.v-application a.router-link {
  color: #fff;
}
</style>
