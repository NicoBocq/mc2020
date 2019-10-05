<template>
  <div class="home">
    <v-row>
      <v-col
        cols="12"
      >
        <Add />
      </v-col>

    </v-row>

    <v-row>
      <v-col
        cols="12"
        md="8"
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

        <v-col
          cols="12"
          md="4"
        >
          <v-card v-for="(item, index) in stat" :key="index" dark class="mb-4">

            <v-list-item>
              <v-list-item-avatar size="60" tile>
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

import { db } from '@/repositories/db'
import Add from '@/components/Add'

const players = [
  { 
    name:'Ber',
    avatar:require('../assets/ber.jpg')
  },
  { 
    name: 'Peg',
    avatar:require('../assets/peg.jpg')
  }
]

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
          }
        ],
    }
  },
  components: {
    Add
  },
  firestore: {
    scores: db.collection('scores').orderBy('created_at', 'desc'),
  },
  computed: {
    stat () {
      const total = players.map((e) => {
        const container = {}
        const isPresent = this.scores.filter(el => el.player1 === e.name || el.player2 === e.name)
        const isP1 = this.scores.filter(el => el.player1 === e.name)
        const isP2 = this.scores.filter(el => el.player2 === e.name)
        container.name = e.name
        container.avatar = e.avatar
        container.total = isPresent.length
        container.win = isP1.filter(el => el.score1 > el.score2).length + isP2.filter(el => el.score2 > el.score1).length
        container.draw = isPresent.filter(el => el.score1 === el.score2).length
        container.lose = container.total - (container.win + container.draw)
        container.goals = isP1.reduce((acc, e) => acc + parseInt(e.score1),0) + isP2.reduce((acc, e) => acc + parseInt(e.score2),0)
        container.goalsagainst = isP1.reduce((acc, e) => acc + parseInt(e.score2),0) + isP2.reduce((acc, e) => acc + parseInt(e.score1),0)
        container.diff = parseInt(container.goals) - parseInt(container.goalsagainst)
        return container
      })
      return total
    }
  },
  methods: {
    deleteScore (id) {
      db.collection('scores').doc(id).delete()
    }
  },
}
</script>
