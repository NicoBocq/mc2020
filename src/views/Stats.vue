<template>
  <div class="about">
       <v-sparkline
      :line-width="width"
      :padding="padding"
      :smooth="radius || false"
      :value="zob"
      :fill="fill"
      auto-draw
      show-labels
      ></v-sparkline>
  </div>
</template>


<script>
import { db } from '@/repositories/db'

export default {
  name:'stats',
  data() {
    return {
      scores:[],
      fill: true,
      padding: 8,
      radius: 1,
      width: 2,
    }
  },
  computed: {
    zob () {
      return this.scores.map(e => parseInt(e.score1) + parseInt(e.score2))
    }
  },
  firestore: {
    scores: db.collection('scores').orderBy('created_at'),
  },
}
</script>