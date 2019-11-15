<template>
	<v-card-text>
		<v-container>
			<v-row>
				<v-col cols="12" sm="4">
					<!-- <v-select
						:items="this.$store.state.users"
						item-text="name"
						return-object
						label="Joueur"
						dense
						v-model="editedItem.player1"
					></v-select> -->
					<v-text-field
						label="Joueur"
						dense
						v-model="editedItem.player1"
					></v-text-field>
				</v-col>
				<v-col cols="12" sm="2">
					<v-text-field
						type="number"
						dense
						v-model="editedItem.score1"
						label="Score"
					></v-text-field>
				</v-col>
				<v-col cols="12" sm="6">
					<v-autocomplete
      			label="Club"
						item-text="name"
      			:items="items"
						:loading="loading"
      			:search-input.sync="search"
						v-model="editedItem.club1"
						hide-no-data
						cache-items
						dense
    			></v-autocomplete>
				</v-col>
				<v-col cols="12" sm="4">
					<v-text-field
						label="Joueur"
						dense
						v-model="editedItem.player2"
					></v-text-field>
				</v-col>
				<v-col cols="12" sm="2">
					<v-text-field
						dense
						type="number"
						v-model="editedItem.score2"
						label="Score"
					></v-text-field>
				</v-col>
				<v-col cols="12" sm="6">
					<v-autocomplete
      			label="Club"
						item-text="name"
      			:items="items"
						:loading="loading"
      			:search-input.sync="search2"
						v-model="editedItem.club2"
						hide-no-data
						cache-items
						dense
    			></v-autocomplete>
				</v-col>
			</v-row>
		</v-container>
	</v-card-text>
</template>

<script>

import jsonClubs from '../assets/clubs.json'

export default {
	name:'Editfield',
	props: ['editedItem'],
	data() {
		return {
			loading: false,
			items: [],
			search: null,
			select: null,
		}
	},
	watch: {
      search (val) {
        val && val !== this.select && this.querySelections(val)
			},
			search2 (val) {
        val && val !== this.select && this.querySelections(val)
      },
    },
    methods: {
      querySelections (v) {
        this.loading = true
        this.items = jsonClubs.clubs.filter(e => {
            return (e || '')
          })
        this.loading = false
      },
    },
}
</script>