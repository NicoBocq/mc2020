<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on"
        color="pink"
        dark
        large
        absolute
        bottom
        right
        fab
      >
        <v-icon>{{ icons.mdiPlus }}</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Ajouter</span>
      </v-card-title>

      <Editscore :editedItem = 'editedItem' />

      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="red darken-4" text @click="save">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

import Editscore from '@/components/Editscore'

import {
    mdiPlus
	} from '@mdi/js'

export default {
  name:'Add',
  components: {
    Editscore
  },
  data() {
    return {
      icons: {
        mdiPlus,
      },
      dialog: false,
      editedItem: {
        player1: 'Ber',
        score1: 0,
        player2: 'Peg',
        score2: 0,
        club1: 'F.C. Autunois',
        club2:'S.C. de Bonneveine',
        game: 'PES 2019',
        created_at:Date.now()
      }
    }
  },
  computed: {
		formTitle () {
			return this.editedIndex === -1 ? 'Ajouter' : 'Modifier'
		},
	},
	watch: {
		dialog (val) {
			val || this.close()
		},
	},
	methods: {
    save () {
      this.$store.dispatch('addScore',this.editedItem)
      this.close()
    },
    close () {
      this.dialog = false
      this.editedItem = Object.assign({}, this.editedItem)
      this.editedIndex = -1
    },
  },
}
</script>
