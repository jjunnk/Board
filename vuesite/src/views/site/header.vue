<template>
<div v-if="$vuetify.breakpoint.sm || $vuetify.breakpoint.xs">
    <v-app-bar color="base" flat fluid height="80px">
        <v-app-bar-nav-icon @click="drawer = !drawer" color="primary"></v-app-bar-nav-icon>
        <SiteTitle :propstitle="site.title"></SiteTitle>
        <v-spacer />
        <v-tooltip bottom class="darkMode-btn">
            <template v-slot:activator="{ on, attrs }" >
                <v-btn icon @click="darkMode" color="primary" v-bind="attrs" v-on="on" >
                    <v-icon large>{{ ($vuetify.theme.dark) ? 'mdi-brightness-5' : 'mdi-weather-night'  }}</v-icon>
                </v-btn>
            </template>
            <span color="primary">{{ ($vuetify.theme.dark) ? 'Light Mode' : 'Dark Mode'  }}</span>
        </v-tooltip>
        <SiteSign></SiteSign>
    </v-app-bar>
    <v-navigation-drawer id="mobile" v-model="drawer" :color="$vuetify.theme.dark? 'base1' :'info'" app hide-overlay width="100%" >
        <MobileMenu @close-Drawer="closeDrawer" />
    </v-navigation-drawer>
</div>
<div v-else >
    <v-app-bar color="base" flat fluid height="80px">
        <v-app-bar-nav-icon @click="drawer = !drawer" color="primary"></v-app-bar-nav-icon>
        <SiteTitle :propstitle="site.title"></SiteTitle>
        <v-spacer />
        <nav class="mr-2">
            <ul class="list">
                <li class="item">
                    <router-link to="/aboutme">ABOUT ME</router-link>
                </li>
                <li class="item">
                    <router-link to="/project">PROJECTS</router-link>
                </li>
            </ul>
        </nav>
        <v-tooltip bottom class="darkMode-btn">
            <template v-slot:activator="{ on, attrs }" >
                <v-btn icon @click="darkMode" color="primary" v-bind="attrs" v-on="on">
                    <v-icon large>{{ ($vuetify.theme.dark) ? 'mdi-brightness-5' : 'mdi-weather-night'  }}</v-icon>
                </v-btn>
            </template>
            <span color="primary">{{ ($vuetify.theme.dark) ? 'Light Mode' : 'Dark Mode'  }}</span>
        </v-tooltip>
        <SiteSign></SiteSign>
    </v-app-bar>

    <v-navigation-drawer app temporary v-model="drawer" :width="$store.state.editable ? 400 : 350" >
        <SiteMenu :items="site.menu" @close="drawer = false"></SiteMenu>
    </v-navigation-drawer>
</div>
</template>

<script>
import SiteTitle from "@/views/site/title.vue";
import SiteSign from "@/views/site/sign.vue";
import SiteMenu from "@/views/site/menu.vue";
import MobileMenu from "@/views/site/mobile.vue";


export default {

    components: {
        SiteTitle,
        SiteSign,
        SiteMenu,
        MobileMenu
    },
    data() {
        return {
            drawer: false,
            site: {
                title: "",
                menu: []

            }

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
                );
        },
        darkMode() {
            this.$vuetify.theme.dark = !this.$vuetify.theme.dark
        },
        closeDrawer(){
            this.drawer = false
            document.getElementById("mobile").classList.remove('v-navigation-drawer--open')
            document.getElementById("mobile").classList.add('v-navigation-drawer--close')
        }
    }
}


</script>

<style scoped>
/* stylelint-disable */
   header >>> .v-toolbar__content {
      padding: 0px !important;
}
</style>

<style scoped lang="scss">

.v-application  a:after{left:auto;right:0 !important;transform:none;}

header{
    margin: 0 auto;
    max-width: 1440px;
    width: 90%;
    padding: 0 5%;
    font-family: 'Ubuntu', 'Noto Sans KR', sans-serif; 

    .list{
        height: 36px;
        line-height: 36px;
        letter-spacing: 1px;
        padding:0;
        display:inline-flex;

        @media screen and (max-width:660px) {
            display:none;
        }
    }
    .item{
        $item : &;
        position:relative;
        border:none;
        height:100%;
        line-height: 36px;
        margin-left:20px;
        &::after, &::before{
            width:0;
            height:1px;
            transition-delay: 0s;
            backface-visibility:hidden;
            bottom:0px;
            content:'';
            position:absolute;
            transition: all 0.2s linear;
            justify-content:center;
            background: #0D0D0D;
        }
        &::after{
            left:0;
            bottom:0;
            transition-delay: 0.6s ;
        }
        &::before{
            right:0;
            top:0;
            transition-delay:0.2s;
        }
        &:hover::after, &:hover::before{
            width:100%;
        }
        &:hover::after{
            transition-delay:0s;
        }
        &:hover::before{
            transition-delay:0.4s;
        }
        &:hover a::before, &:hover a::after{
            height:100%;
            
        }
        &:hover a::after{
            transition-delay:0.2s;
        }
        &:hover a::before{
            transition-delay:0.6s;
            
        }
        &:hover a{
            padding:0 10px;
        }
        a{
            color:#0D0D0D;
            display: block;
            padding: 0;
            width:100%;
            height:100%;
            line-height:36px;
            letter-spacing: 3px;
            padding:0;

            &::after{
                right:0;
                bottom:0;
                transition-delay:0.4s;
            }
            &::before{
                left:0;
                top:0;
                transition-delay:0s;
            }
            &::before, &::after{
                width:1px;
                height:0;
                backface-visibility:hidden;
                bottom:0px;
                content:'';
                position:absolute;
                transition: all 0.2s linear;
                background:#0D0D0D;
            }
            &.router-link-active{
                letter-spacing: 3px;
                border-bottom:3px solid;
            }
            

        }
    }
    /* Header dark mode */
    &.theme--dark{
        nav{
            .item{
                &::after, &::before{
                    background:#ebdaca;
                }
            }
            a{
                color:#ebdaca;

                &::after, &::before{
                    background:#ebdaca;
                }
            }
        }
    }
}


#app.theme--dark>.v-tooltip__content {
    background-color: #FEFCF5 !important;
    color: #0D0D0D !important;
    font-weight: bold;
}

#app.theme--light>.v-tooltip__content {
    background-color: #121212 !important;
    color: #FEFCF5 !important;
}
.theme--dark #mobileNav > nav > a.router-link-exact-active.router-link-active
{
    color:#0D0D0D !important;
    background:none !important;
    border:1px solid #ebdaca !important;

}

</style>