<template>
  <v-card flat class="project" color="base">
    <v-card-title class="base__title pa-0">Projects</v-card-title>
    <v-row class="mb-16">
      <v-col cols="12" sm="6" md="6" lg="4" class="grid">
          <router-link class="project__Container description-wrap rounded " to="/board/notice">
                  <img :src="require('@/assets/board.jpg')" />
                  <div class="description">
                      <h2>Board With Firebase</h2>
                      <p>Skill :<br/><span v-for="label in labels" :key="label">{{ label }}</span></p>
                  </div>
          </router-link>
      </v-col>
      <v-col cols="12" sm="6" md="6" lg="4" class="grid">
          <router-link class="project__Container description-wrap rounded " to="/board">
                  <img :src="require('@/assets/boardlist.jpg')" />
                  <div class="description">
                      <h2 class="long">Board List With Firebase</h2>
                      <p>Skill :<br/><span v-for="label in labels" :key="label">{{ label }}</span></p>
                  </div>
          </router-link>
      </v-col>
      <ProjectItem v-for="(project, i) in projects" :key="i" :project="project" />     
  </v-row>
  </v-card>
</template>
<script>
// @ is an alias to /src
import ProjectItem from './ProjectItem.vue'

  export default {
      
    components:{ProjectItem},
    data() {
      return {
        projects: this.$store.state.projects,
        labels:['Vue.js', 'Vuetify','firebase','sass','javascript']
      }
    },
    created(){
    }
  }
</script>
<style lang="scss" scoped>
  @import '@/assets/scss/_variables.scss';
  @import '@/assets/scss/projectgrid.scss';


  .v-card__title{
    font-family: $fontfamily;
    line-height:inherit;

  }
  
</style>