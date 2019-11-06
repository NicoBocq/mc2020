<template>
  <div>
    <v-row>
      <v-col
        cols="12"
      >
        <List />
      </v-col>
    </v-row>
  </div>
</template>

<script>

import List from '@/components/List'

export default {
  name: 'Admin',
  data() {
    return {
    }
  },
  components: {
    List
  }
}
</script>
