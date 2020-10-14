<template>
<v-sheet>
  Storage
  <v-btn @click="write" outlined> write</v-btn>
</v-sheet>
</template>

<script>
export default {
  data() {
    return {
      text: ''
    }
  },
  methods: {
    async write() {
      const sn = await this.$firebase.storage().ref().child('xxx.text').putString('ABCD')
      const url = await sn.ref.getDownloadURL()
      console.log(url)
    }
  }
}
</script>
