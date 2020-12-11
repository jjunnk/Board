<template>
<div id="mobileNav" class="text-center">
    <v-toolbar flat :color="$vuetify.theme.dark? 'base1' :'info'" height="80px">
        <SiteTitle :propstitle="site.title"></SiteTitle>
        <v-spacer/>
        <v-btn icon @close="drawer = false"><v-icon large>mdi-close</v-icon></v-btn>
    </v-toolbar>
    <nav>
        <router-link to="/">HOME</router-link>
        <router-link to="/aboutme">ABOUT ME</router-link>
        <router-link to="/project">PROJECTS</router-link>
    </nav>
    <v-tooltip disabled>
        <template v-slot:activator="{ on, attrs }">
            <v-btn @click="darkMode" v-bind="attrs" v-on="on"  outlined class="darkmodeBtn" :color="$vuetify.theme.dark? 'primary':'secondary'" large aria-expanded="false">
                <v-icon  left class="mr-3">{{ ($vuetify.theme.dark) ? 'mdi-brightness-5' : 'mdi-weather-night'  }}</v-icon>
                 {{ ($vuetify.theme.dark) ? 'Light Mode' : 'Dark Mode'  }}
            </v-btn>
        </template>
    </v-tooltip>

</div>
</template>
<script>
import SiteTitle from "@/views/site/title.vue";

export default {
    components: {SiteTitle},
    data() {
        return {
            drawer: false,
            site: {
                title: "",
                menu: []
            },
        }
    },
    created() {
        this.subscribe();
    },
    methods: {
    subscribe() {
        this.$firebase
            .database()
            .ref()
            .child("site")
            .on(
                "value",
                sn => {
                    const v = sn.val();
                    if (!v) {
                        this.$firebase
                            .database()
                            .ref()
                            .child("site")
                            .set(this.site);
                    }
                    this.site = v;
                },
                e => {
                    console.log(e.message);
                }
            )
        },
        darkMode() {
            this.$vuetify.theme.dark = !this.$vuetify.theme.dark
        },

    }
}

</script>

<style scoped lang="scss">
@import '@/assets/scss/animations.scss'; //animations


nav{
    width:90%;
    align-items: center;
    -webkit-box-align: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    font-size: 2rem;
    height: auto;
    font-family: 'Ubuntu', 'Noto Sans KR', sans-serif; 
    margin:3em auto;

    a{
        color:#ebdaca;    
        font-family: 'Ubuntu', 'Noto Sans KR', sans-serif; 
        width:100%;
        opacity:0;
        animation: mobileText;
        animation-duration: 0.5s;
        animation-timing-function: ease;
        animation-fill-mode: forwards;
        text-align: center;

        &:nth-child(1){
             animation-delay: 0.2s;
        }
        &:nth-child(2){
             animation-delay: 0.4s;
        }
        &:nth-child(3){
             animation-delay: 0.6s;
        }
        
    }
}

.theme--dark #mobileNav > nav > a.router-link-active{
    color:#ebdaca;
    background:none;
    border:1px solid #ebdaca;
    border-radius:4px;

}        
.theme--light #mobileNav > nav > a.router-link-active{
            background-color: #ebdaca;
            color: #655d5d;
}

.darkmodeBtn{
    animation: mobileText;
    animation-duration: 0.5s;
    animation-timing-function: ease;
    animation-fill-mode: forwards;
    text-align: center;
    animation-delay: 0.8s;

}
</style>