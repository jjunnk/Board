<template>
    <v-col cols="12" sm="6" md="6" lg="4" class="grid">
        <router-link class="project__Container description-wrap rounded " :to="{name:'ProjectPage', params:{id:project.id}}">
                <img :src="project.imgSrc" />
                <div class="description">
                    <h2>{{project.name}}</h2>
                    <p>Skill :<br/><span v-for="label in project.labels" :key="label">{{ label }}</span></p>
                </div>
        </router-link>
        </v-col>
</template>
<script>
    export default {
        name:'ProjectItem',
        props: ['project'],
        data() {
            return {
            }
        },
        created(){
            
        },
        methods:{
        }
    }
</script>
<style lang="scss" scoped>
@import '@/assets/scss/projectgrid.scss';

</style>