<template>
	<v-col>
		<v-card>
			<template v-for="(score, index) in scores">
			<v-list-item
				two-line	
				:key="index"
			>
			<v-list-item-content>
				<v-list-item-title>
					<span :class="score.score1 > score.score2 ? 'winner' : ''">
						{{ score.player1}}
					</span>
					<span class="score">
						{{ score.score1}} - {{ score.score2}}
					</span>
					<span :class="score.score2 > score.score1 ? 'winner' : ''">
						{{ score.player2}}
					</span>
				</v-list-item-title>
				<v-list-item-title>
					
				</v-list-item-title>
					
				<v-list-item-subtitle>
					{{ score.club1}} - {{ score.club2}}
				</v-list-item-subtitle>
			</v-list-item-content>
			
			</v-list-item>

			<v-divider :key="'divider'+index"></v-divider>
			</template>
		</v-card>
	</v-col>
</template>

<script>

import { mapState } from 'vuex'

export default {
	name:'Boxscore',
	computed: {
		...mapState(['scores', 'users'])
	}
}
</script>

<style>
	.score {
		padding: 0.5rem 1rem;
		margin: 0 1rem;
		background-color: red;
		display: inline-block;
		color: #fff;
	}

	.winner {
		font-weight: 900;
	}
</style>