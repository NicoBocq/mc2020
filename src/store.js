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

const dbScores = db.collection('scores')
const dbUsers = db.collection('users')

export default new Vuex.Store({
  strict: true,
  state: {
    scores:[],
    players:players,
    users:[],
  },
  mutations: {
    ...vuexfireMutations,
  },
  actions: {
    bindUsers: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef('users', dbUsers)
    }),
    bindScores: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef('scores', dbScores.orderBy('created_at', 'desc'))
    }),
    addScore: firestoreAction((context, score) => {
      dbScores
        .add(score)
    }),
    removeScore: firestoreAction((context, scoreId) => {
      dbScores
        .doc(scoreId)
        .delete()
    }),
    updateScore: firestoreAction((context, payload) => {
      return dbScores
        .doc(payload.id)
        .set(payload.data)
    })
  },
  getters: {
    // scores: state => state.scores,
    // users: state => state.users,
    statPlayer (state) {
      const stats = players.map((e) => {
        const container = {}
        const isPresent = state.scores.filter(el => el.player1 === e.name || el.player2 === e.name)
        const isP1 = state.scores.filter(el => el.player1 === e.name)
        const isP2 = state.scores.filter(el => el.player2 === e.name)
        const lastTen = isPresent.slice(0, 10)
        container.name = e.name
        container.avatar = e.avatar
        container.total = isPresent.length
        container.win = isP1.filter(el => parseInt(el.score1) > parseInt(el.score2)).length + isP2.filter(el => parseInt(el.score2) > parseInt(el.score1)).length
        container.draw = isPresent.filter(el => el.score1 === el.score2).length
        container.lose = container.total - (container.win + container.draw)
        container.goals = isP1.reduce((acc, e) => acc + parseInt(e.score1),0) + isP2.reduce((acc, e) => acc + parseInt(e.score2),0)
        container.goalsagainst = isP1.reduce((acc, e) => acc + parseInt(e.score2),0) + isP2.reduce((acc, e) => acc + parseInt(e.score1),0)
        container.diff = parseInt(container.goals) - parseInt(container.goalsagainst)
        container.last = lastTen.map(x => {
          if ((x.player1 === e.name && parseInt(x.score1) > parseInt(x.score2)) || (x.player2 === e.name && parseInt(x.score2) > parseInt(x.score1))) {
            return 'w'
          } else if (x.score1 === x.score2) {
            return 'd'
          } else {
            return 'l'
          }
        })
        return container
      })
      return stats
    },
  }
})
