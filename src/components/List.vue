<template>
  <v-data-table
    :headers="headers"
    :items="scores"
    class="elevation-1"
		hide-default-header
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Derniers matchs</v-toolbar-title>
        <div class="flex-grow-1"></div>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on" icon>
							<v-icon>
								{{ icons.mdiPlusThick }}
							</v-icon>
						</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="4">
                    <v-text-field v-model="editedItem.player1" label="Joueur"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-text-field v-model="editedItem.score1" label="Score"></v-text-field>
                  </v-col>
									<v-col cols="12" sm="4">
                    <v-text-field v-model="editedItem.club1" label="Club"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-text-field v-model="editedItem.player2" label="Joueur"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-text-field v-model="editedItem.score2" label="Score"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-text-field v-model="editedItem.club2" label="Club"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="blue darken-1" text @click="save">
								Save
							</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
		<template v-slot:item.player1="{ item }">
      <v-chip :class="item.score1 > item.score2 ? 'green darken-3' : 'grey lighten-1'" dark>{{ item.player1 }}</v-chip>
    </template>
		<template v-slot:item.player2="{ item }">
      <v-chip :class="item.score1 < item.score2 ? 'green darken-3' : 'grey lighten-1'" dark>{{ item.player2 }}</v-chip>
    </template>
    <template v-slot:item.action="{ item }" class="text-right">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        {{ icons.mdiPencil }}
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item.id)"
      >
        {{ icons.mdiDelete }}
      </v-icon>
    </template>
  </v-data-table>
</template>


<script>

import { db } from '@/repositories/db'

import {
    mdiPlusThick,
    mdiPencil,
    mdiDelete,
	} from '@mdi/js'
	
export default {
	name: 'list',
	props: ['scores'],
	data() {
    return {
			icons: {
        mdiPlusThick,
        mdiPencil,
        mdiDelete,
      },
		 	headers: [
          {
            text: 'Joueur',
            align: 'center',
            sortable: false,
            value: 'player1',
          },
          {
            text: '',
            value: 'score1',
						align:'center',
						sortable: false,
          },
          {
            text: '',
            value: 'score2',
						align:'center',
						sortable: false
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
						sortable: false
					}
				],
				dialog: false,
				editedIndex: -1,
				editedItem: {
					player1: '',
					score1: 0,
					player2: '',
					score2: 0,
					club1: '',
					club2:'',
					game: 'PES 2019',
        	created_at:Date.now()
				},
      	defaultItem: {
					player1: '',
					score1: 0,
					player2: '',
					score2: 0,
					club1: '',
					club2:'',
      	},
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
      editItem (item) {
				this.editedIndex = this.scores.indexOf(item)
				/* Get id from firecloud object */
				this.editedId = item.id
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (id) {
        // const index = this.scores.indexOf(item)
				// confirm('Méfi') && this.scores.splice(index, 1)
				confirm('Méfi') && db.collection('scores').doc(id).delete()
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
					// Object.assign(this.scores[this.editedIndex], this.editedItem)
					db.collection('scores').doc(this.editedId)
						.set(this.editedItem)
						// .then(() => {
						// })
						.catch((error) => {
							console.log(error)
						})
        } else {
					// this.scores.push(this.editedItem)
					db.collection('scores')
						.add(this.editedItem)
						// .then(
						// 	console.log('added')
						// )
						.catch((error) => {
							console.log(error)
						})
        }
        this.close()
      },
    },
}
</script>