<template>
<div>
    <v-app-bar color="base" flat fluid >
        <v-app-bar-nav-icon @click="drawer = !drawer" color="primary"></v-app-bar-nav-icon>
        <SiteTitle :propstitle="site.title"></SiteTitle>
        <v-spacer />
        <v-tooltip bottom class="darkMode-btn">
            <template v-slot:activator="{ on, attrs }">
                <v-btn icon @click="darkMode" color="primary" v-bind="attrs" v-on="on">
                    <v-icon>{{ ($vuetify.theme.dark) ? 'mdi-brightness-5' : 'mdi-weather-night'  }}</v-icon>
                </v-btn>
            </template>
            <span color="primary">{{ ($vuetify.theme.dark) ? 'Light Mode' : 'Dark Mode'  }}</span>
        </v-tooltip>
        <SiteSign></SiteSign>
    </v-app-bar>
    <v-navigation-drawer app temporary v-model="drawer" :width="$store.state.editable ? 400 : 350">
        <SiteMenu :items="site.menu" @close="drawer = false"></SiteMenu>
    </v-navigation-drawer>
</div>
</template>

<script>
import SiteTitle from "@/views/site/title.vue";
import SiteSign from "@/views/site/sign.vue";
import SiteMenu from "@/views/site/menu.vue";


export default {

    components: {
        SiteTitle,
        SiteSign,
        SiteMenu,

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

    }
}
</script>

<style scoped>
.v-app-bar {
    margin: auto !important;padding:4px 12px !important;
}
/deep/ .v-toolbar__content {
  padding: 0px !important;
}
@media only screen and (min-width:1264px) {
    .v-app-bar {
        max-width: 1185px !important;
    }
}

@media only screen and (min-width:960px) {
    .v-app-bar {
        max-width: 900px
    }
}


#app.theme--dark>.v-tooltip__content {
    background-color: #FEFCF5 !important;
    color: #0D0D0D !important;
    font-weight: bold;
}

#app.theme--light>.v-tooltip__content {
    background-color: #0D0D0D !important;
    color: #FEFCF5 !important;
}
</style>