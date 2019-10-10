<template>
  <div class="home">
    <v-row>
      <v-col
        cols="12"
        md="8"
        order="2"
        order-md="1"
      >
        <List :scores = "scores" />
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

import List from '@/components/List'
import Playerstat from '@/components/Playerstat'

import { mapState, mapGetters } from 'vuex'

export default {
  name: 'home',
  data() {
    return {
    }
  },
  components: {
    List, Playerstat
  },
  computed: {
    ...mapState(['scores']),
    // ...mapGetters(['playerStat'])
  },
  mounted() {
    this.$store.dispatch('bindScores')
  }
}
</script>
