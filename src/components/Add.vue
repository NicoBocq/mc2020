<template>
<v-card>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col
          cols="4"
        >
          <v-text-field
            v-model="player1"
            :playerules="playerules"
            label="Joueur 1"
            required
            @keypress.enter="addScore"
          ></v-text-field>
        </v-col>
        <v-col
          cols="2"
        >
          <v-text-field
            v-model="score1"
            :scoreRules="scoreRules"
            label="Score"
            required
            type="number"
            @keypress.enter="addScore"
          ></v-text-field>
        </v-col>
        <v-col
          cols="2"
        >
          <v-text-field
            v-model="score2"
            :scoreRules="scoreRules"
            label="Score"
            required
            type="number"
            @keypress.enter="addScore"
          ></v-text-field>
        </v-col>
        <v-col
          cols="4"
        >
          <v-text-field
            v-model="player2"
            :playerules="playerules"
            label="Joueur 2"
            required
            @keypress.enter="addScore"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
  </v-card>
</template>


<script>

import { db } from '@/repositories/db'

export default {
  name:'Add',
  data: () => ({
    valid: false,
    scores:[],
    player1: '',
    player2:'',
    playerules: [
      v => !!v || 'Name is required',
      v => v.length <= 20 || 'Name must be less than 20 characters',
    ],
    score1: '',
    score2: '',
    scoreRules: [
      v => !!v || 'Score is required',
    ],
    error:''
  }),
  firestore: {
      scores: db.collection('scores').orderBy('created_at', 'desc'),
  },
  methods: {
    addScore () {
      this.errors = ''

      db.collection('scores').add({
        player1: this.player1,
        score1: this.score1,
        player2: this.player2,
        score2: this.score2,
        game: "PES 2019",
        created_at:Date.now()
      }).then((response) => {
        if (response) {
        this.player1 = this.player1
        this.player2 = this.player2
      }
      }).catch((error) => {
        this.errors = error
      })
    }
  },
}
</script>
