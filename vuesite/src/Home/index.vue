<template>
    <v-sheet height="100vh" color="base">
        <v-container>
            <v-row>
                <v-col cols="12" sm="12" md="" class="home-title">
                    <h1 class="text-h3  mb-4" :class="$vuetify.theme.dark? 'font-weight-medium' : 'font-weight-black'">
                        이수진</h1>
                    <h1 class="text-h3 mb-16" :class="$vuetify.theme.dark? 'font-weight-medium' : 'font-weight-bold'">
                        Lee Sujin</h1>
                    <h2 :class="$vuetify.theme.dark? 'font-weight-light' : 'font-weight-bold'">Front-End Developer</h2>
                </v-col>
                <v-col cols="12" sm="12" md="7" class="home-contents">
                    <div class="photoContainer">
                        <draw-canvas></draw-canvas>
                    </div>
                </v-col>
            </v-row>
        </v-container>

    </v-sheet>
</template>
<script>
import DrawCanvas from './DrawCanvas.vue'
export default {
    components:{DrawCanvas},
    data() {
        return {
        
        }
    },
}
</script>
 <style lang="scss" scoped>
    .home-title {
        margin-top: 4rem;
    }

    .home-title h1,
    .home-title h2 {
        font-family: 'Ubuntu', 'Noto Sans KR', sans-serif !important;
    }
     .photoContainer {
         -webkit-box-align: end;
    justify-content: center;
    align-items: flex-end;
    flex: 0 63%;
    margin: 0 auto;
    animation: mobileText 0.5s ease;
    animation-fill-mode: forwards;
    overflow: hidden;

  }
</style>