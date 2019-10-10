import Vue from 'vue'
import { firestorePlugin } from 'vuefire'

Vue.use(firestorePlugin)

import firebase from 'firebase/app'
import 'firebase/firestore'

// Get a Firestore instance
export const db = firebase
  .initializeApp({ projectId: process.env.VUE_APP_PROJECT_ID })
  .firestore()