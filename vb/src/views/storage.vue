<template>
<v-sheet>
  <v-textarea v-model="text">
  </v-textarea>
  <v-btn @click="write" outlined> write</v-btn>
  <v-btn @click="read" outlined> read</v-btn>
</v-sheet>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      text: '',
      utl: ''
    }
  },
  methods: {
    async write() {
      const sn = await this.$firebase.storage().ref().child('xx2.text').putString('ABCD')
      const url = await sn.ref.getDownloadURL()
      console.log(url)
      this.url = url
    },
    async read() {
      const r = await axios.get(this.url)
      console.log(r)
      this.text = r.data
    }
  }
}
</script>
