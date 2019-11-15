<template>
  <div class="home">
    <v-row>
      <v-col
        cols="12"
        md="8"
        order="2"
        order-md="1"
      >
        <Boxscore />
      </v-col>

      <v-col
        cols="12"
        md="4"
        order="1"
        order-md="2"
      >
        <Playerstat />
      </v-col>
    </v-row>
  </div>
</template>

<script>

import Boxscore from '@/components/Boxscore'
import Playerstat from '@/components/Playerstat'

export default {
  name: 'home',
  data() {
    return {
    }
  },
  components: {
    Boxscore, Playerstat
  },
  mounted() {
    this.$store.dispatch('bindScores')
    this.$store.dispatch('bindUsers')
  }
}
</script>
