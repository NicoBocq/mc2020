import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'

Vue.use(Vuex)

import { db } from '@/repositories/db'

const players = [
  { 
    name:'Ber',
    avatar:require('./assets/ber.jpg')
  },
  { 
    name: 'Peg',
    avatar:require('./assets/peg.jpg')
  }
]

export default new Vuex.Store({
  state: {
    scores:[],
  },
  mutations: vuexfireMutations,

  actions: {
    bindScores: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef('scores', db.collection('scores').orderBy('created_at', 'desc'))
    }),
  },
  getters: {
    // scores: state => state.scores,
    statPlayer (state) {
        const total = players.map((e) => {
          const container = {}
          const isPresent = state.scores.filter(el => el.player1 === e.name || el.player2 === e.name)
          const isP1 = state.scores.filter(el => el.player1 === e.name)
          const isP2 = state.scores.filter(el => el.player2 === e.name)
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
      },
  }
})
