<template>
	<v-card>
		<v-card v-for="(item, index) in statPlayer" :key="index" dark class="mb-4">
			<v-list-item>
				<v-list-item-avatar size="60">
					<v-img :src="item.avatar" class="elevation-6"></v-img>
				</v-list-item-avatar>
				<v-list-item-content>
					<v-list-item-title class="headline">{{ item.name }}</v-list-item-title>
					<!-- <v-list-item-subtitle>by Kurt Wagner</v-list-item-subtitle> -->
				</v-list-item-content>
			</v-list-item>

			<v-card-text>
				<v-simple-table dark>
					<template v-slot:default>
						<tbody>
							<tr>
								<td class="text-left">Victoires</td>
								<td>{{ item.win }}</td>
							</tr>
							<tr>
								<td class="text-left">Nuls</td>
								<td>{{ item.draw }}</td>
							</tr>
							<tr>
								<td class="text-left">Défaites</td>
								<td>{{ item.lose }}</td>
							</tr>
							<tr>
								<td class="text-left">Différence</td>
								<td>{{ item.diff }} ({{ item.goals }}/{{ item.goalsagainst }})</td>
							</tr>
							<tr>
								<td colspan="2">
									<div class="last10">
										<div 
											:class="'last10-item bg-'+item"
											v-for="(item, index) in item.last"
											:key="'last10-'+ index"
										>
											{{ item }}
										</div>
									</div>
								</td>
							</tr>
						</tbody>
					</template>
				</v-simple-table>
			</v-card-text>    
		</v-card>
	</v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	computed: mapGetters([ 'statPlayer'])
}
</script>

<style scoped>

.last10 {
	padding:0.5rem 0;
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	grid-gap: 0.5rem;
	align-items: center;
	text-transform: uppercase;
}

.last10-item {
	min-height: 2rem;
	display: flex;
	align-items: center;
	justify-content: center;
}

.bg-w {
	background-color: green;
}
.bg-d {
	background-color: grey;
}
.bg-l {
	background-color: red;
}

</style>