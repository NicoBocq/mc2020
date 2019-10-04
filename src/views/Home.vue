<template>
  <div class="home">
    <v-row>
      <v-col
        cols="12"
      >
        <Add />
      </v-col>
      <v-col
        cols="12"
      >
            <v-card>
              <v-card-title>
                Derniers scores
                <div class="flex-grow-1"></div>
                <v-text-field
                  v-model="search"
                  label="Rechercher"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>
              <v-data-table
                :headers="headers"
                :items="scores"

                :search="search"
              ></v-data-table>
            </v-card>

        </v-col>
    </v-row>
  </div>
</template>

<script>

import { db } from '@/repositories/db'
import Add from '@/components/Add'

export default {
  name: 'home',
  data() {
    return {
      myPrice: '',
      myDesc:'',
      errors:'',
      scores:[],
      search:'',
      headers: [
          {
            text: 'Joueur',
            align: 'center',
            sortable: false,
            value: 'player1',
          },
          {
            text: 'Club',
            align: 'center',
            sortable: false,
            value: 'club1',
          },
          {
            text: 'Score',
            value: 'score1',
            align:'center'
          },
          {
            text: 'Score',
            value: 'score2',
            align:'center'
          },
          {
            text: 'Joueur',
            value: 'player2',
            sortable: false,
            align:'center'
          },
          {
            text: 'Club',
            align: 'center',
            sortable: false,
            value: 'club2',
          },
        ],
    }
  },
  components: {
    Add
  },
  firestore: {
      scores: db.collection('scores').orderBy('created_at', 'desc'),
  }
}
</script>
