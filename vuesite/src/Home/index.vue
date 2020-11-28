<template>
    <v-sheet height="100vh" color="base">
        <v-container>
            <v-row>
                <v-col cols="12" sm="12" md="6" class="home-title">
                    <h1 class="text-h3  mb-4" :class="$vuetify.theme.dark? 'font-weight-medium' : 'font-weight-black'">
                        이수진</h1>
                    <h1 class="text-h3 mb-16" :class="$vuetify.theme.dark? 'font-weight-medium' : 'font-weight-bold'">
                        Lee Sujin</h1>
                    <h2 :class="$vuetify.theme.dark? 'font-weight-light' : 'font-weight-bold'">Front-End Developer</h2>
                </v-col>
                <v-col cols="12" sm="12" md="6" class="home-contents">
                    <vue-scratchable v-slot="{ init }" :brushOptions="brush" :hideOptions="hide" getPercentageCleared>
                        <div class="wrapper">
                            <img :src="require('@/assets/scratch2.jpg')" @load="init()">
                        </div>
                    </vue-scratchable>
                </v-col>
            </v-row>
        </v-container>

    </v-sheet>
</template>
<script>
import VueScratchable from '@/plugins/scratchable';

export default {
    data() {
        return {
            hide: {
                type: 'pattern',
                src: '@/assets/scratch1.jpg',
                repeat: 'repeat',
            },
            brush: {
            size: 80,
            shape: 'round',
            },
        }
    },
}
</script>
<style scoped>
    .home-title {
        margin-top: 4rem;
    }

    .home-title h1,
    .home-title h2 {
        font-family: 'Ubuntu', 'Noto Sans KR', sans-serif !important;
    }
</style>