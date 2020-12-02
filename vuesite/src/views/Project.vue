<template>
  <v-card flat class="project">
    <v-card-title>Projects</v-card-title>
    <v-col cols="6">
      <v-card v-for="item in project" :key="item">
        <v-img :src="item.imgSrc"></v-img>
        <h2>{{item.name}}</h2>
        <p>project description</p>
      </v-card>
    </v-col>
  </v-card>
</template>
<script>
import axios from 'axios'

  export default {
    data() {
      return {
        project: []
      }
    },
    created(){
      axios.get('@/views/project.json').then(function(response){
        this.project = response.data
      }.bind(this)).catch((e)=>{
          console.error(e)
      })
    }
  }
</script>
<style lang="scss">
  @import '@/assets/scss/_variables.scss';

  .v-card__title,
  .v-btn__content {
    font-family: $fontfamily
  }
</style>