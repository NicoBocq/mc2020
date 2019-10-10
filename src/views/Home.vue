<template>
  <div class="home">
    <v-row>
      <v-col
        cols="12"
        md="8"
        order="2"
        order-md="1"
      >
        <list :scores = "scores" />
      </v-col>

        <v-col
          cols="12"
          md="4"
          order="1"
          order-md="2"
        >
          <v-card v-for="(item, index) in $store.getters.statPlayer" :key="index" dark class="mb-4">

            <v-list-item>
              <v-list-item-avatar size="60">
                <v-img :src="item.avatar" class="elevation-6"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="headline">{{ item.name }}</v-list-item-title>
                <!-- <v-list-item-subtitle>by Kurt Wagner</v-list-item-subtitle> -->
              </v-list-item-content>
            </v-list-item>

    <v-card-text>
      <v-simple-table dark>
        <template v-slot:default>
          <tbody>
            <tr>
              <td class="text-left">Victoires</td>
              <td>{{ item.win }}</td>
            </tr>
            <tr>
              <td class="text-left">Nuls</td>
              <td>{{ item.draw }}</td>
            </tr>
            <tr>
              <td class="text-left">Défaites</td>
              <td>{{ item.lose }}</td>
            </tr>
            <tr>
              <td class="text-left">Différence</td>
              <td>{{ item.diff }} ({{ item.goals }}/{{ item.goalsagainst }})</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card-text>

             
          </v-card>
        </v-col>
    </v-row>
  </div>
</template>

<script>

import List from '@/components/List'

import { mapState, mapGetters } from 'vuex'

export default {
  name: 'home',
  data() {
    return {
    }
  },
  components: {
    List
  },
  computed: mapState(['scores']),

  mounted() {
    this.$store.dispatch('bindScores')
  }
}
</script>
