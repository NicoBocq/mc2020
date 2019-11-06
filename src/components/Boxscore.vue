<template>
	<v-col>
		<v-card
		v-for="(score, index) in scores"
		:key="index"
		shape
		mb-2
		>
		{{ score.player1}} - {{ score.player2}}
		{{ score.club1}} - {{ score.club2}}
		{{ score.score1}} - {{ score.score2}}
		</v-card>
	</v-col>
</template>

<script>

import { mapState } from 'vuex'

export default {
	name:'Boxscore',
	computed: mapState([ 'scores'])
}
</script>