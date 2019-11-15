<template>
  <v-data-table
    :headers="headers"
    :items="scores"
    class="elevation-1"
		hide-default-header
		:footer-props="{
      /* showFirstLastPage: true, */
      prevIcon: '<',
      nextIcon: '>',
			firstIcon: '<',
      lastIcon: '>',
    }"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Derniers matchs</v-toolbar-title>
        <div class="flex-grow-1"></div>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">Modifier</span>
            </v-card-title>

            <Editscore :editedItem = 'editedItem' />

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="" text @click="close">Close</v-btn>
              <v-btn color="" text @click="saveScore">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
		<template v-slot:item.score="{ item }">
      {{ item.score1 }} - {{ item.score2 }}
			<br><small>{{ item.club1 }} / {{ item.club2 }}</small>
    </template>
		<template v-slot:item.player1="{ item }">
				{{ item.player1 }}
    </template>
		<template v-slot:item.player2="{ item }">
      {{ item.player2 }}
    </template>
    <template v-slot:item.action="{ item }" class="text-right">
      <v-icon
        small
        class="mr-2"
        @click="editScore(item)"
      >
        {{ icons.mdiPencil }}
      </v-icon>
      <v-icon
        small
        @click="removeScore(item.id)"
      >
        {{ icons.mdiDelete }}
      </v-icon>
    </template>
  </v-data-table>
</template>


<script>

import { mapState } from 'vuex'

import Editscore from '@/components/Editscore'

import {
    mdiPencil,
		mdiDelete,
		mdiChevronLeft,
		mdiChevronRight
	} from '@mdi/js'
	
export default {
  name: 'list',
  components: {
    Editscore
  },
	data() {
    return {
			icons: {
        mdiPencil,
				mdiDelete,
				mdiChevronLeft,
				mdiChevronRight
      },
      headers: 
      [
        {
          text: 'Joueur',
          align: 'center',
          sortable: false,
          value: 'player1',
        },
        {
          text: 'Score',
          value: 'score',
          align:'center',
          sortable: false,
        },
        {
          text: 'Joueur',
          value: 'player2',
          sortable: false,
          align:'center'
        },
        { 
          text: '',
          value: 'action',
          sortable: false,
          align:"right"
        }
      ],
      dialog: false,
      editedItem: {
        player1: '',
        score1: '',
        player2:'',
        score2:'',
        club1: '',
        club2:'',
        game: '',
      },
      itemId:''
		}
	},
  computed: 
    mapState(['scores']),

  methods: {
    removeScore (id) {
      confirm('Méfi') && this.$store.dispatch('removeScore',id)
    },
    editScore (item) {
      this.itemId = item.id
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    saveScore () {
      this.$store.dispatch('updateScore', {
        id: this.itemId,
        data: this.editedItem
      })
      this.itemId = -1
      this.close()
    },
    close () {
      this.dialog = false
      // this.editedItem = Object.assign({}, this.editedItem)
      // this.editedIndex = -1
    },
  },
}
</script>