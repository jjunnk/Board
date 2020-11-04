<template>
<v-app>
    <v-card class="overflow-hidden" height="100%">
        <v-app-bar color="white">
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <SiteTitle :propstitle="site.title"></SiteTitle>
            <v-spacer />
            <SiteSign></SiteSign>
        </v-app-bar>
        <v-navigation-drawer app v-model="drawer" width="400">
            <SiteMenu :items="site.menu" @close="drawer = false"></SiteMenu>
        </v-navigation-drawer>
        <v-main>
            <router-view />
        </v-main>

        <SiteFooter :footer="site.footer"></SiteFooter>
    </v-card>
</v-app>
</template>

<script>
import SiteTitle from "@/views/site/title.vue";
import SiteFooter from "@/views/site/footer.vue";
import SiteMenu from "@/views/site/menu.vue";
import SiteSign from "@/views/site/sign.vue";

export default {
    name: "App",
    components: {
        SiteTitle,
        SiteFooter,
        SiteMenu,
        SiteSign
    },
    data() {
        return {
            drawer: false,
            site: {
                title: "Vue Site",
                footer: "Footer text",
                menu: [{
                        title: "Home",
                        icon: "mdi-home",
                        subItems: [{
                            title: "Dashboard",
                            to: "/"
                        }]
                    },
                    {
                        title: "About",
                        icon: "mdi-heart",
                        active: true,
                        subItems: [{
                            title: "Dashboard",
                            to: "/about"
                        }]
                    },
                    {
                        title: "xxx",
                        icon: "mdi-circle",
                        to: "/xxx"
                    }
                ]
            }
        };
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
        }

    }
};
</script>

<style></style>
