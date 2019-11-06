<template>
	<v-card-text>
		<v-container>
			<v-row>
				<v-col cols="12" sm="4">
					<v-text-field v-model="editedItem.player1" label="Joueur"></v-text-field>
				</v-col>
				<v-col cols="12" sm="4">
					<v-text-field number v-model="editedItem.score1" label="Score"></v-text-field>
				</v-col>
				<v-col cols="12" sm="4">
					<v-text-field v-model="editedItem.club1" label="Club"></v-text-field>
				</v-col>
				<v-col cols="12" sm="4">
					<v-text-field v-model="editedItem.player2" label="Joueur"></v-text-field>
				</v-col>
				<v-col cols="12" sm="4">
					<v-text-field number v-model="editedItem.score2" label="Score"></v-text-field>
				</v-col>
				<v-col cols="12" sm="4">
					<v-text-field v-model="editedItem.club2" label="Club"></v-text-field>
				</v-col>
			</v-row>
		</v-container>
	</v-card-text>
</template>
<script>
export default {
	props: ['editedItem'],
}
</script>