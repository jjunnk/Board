<template>
<v-app>
    <v-app-bar app color="primary" dark>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <SiteTitle :title="title"></SiteTitle>
        <v-spacer />
        <v-btn icon to="/about">
            <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn icon to="/">
            <v-icon>mdi-magnify</v-icon>
        </v-btn>

    </v-app-bar>

    <v-navigation-drawer app v-model="drawer">
        <v-list-item>
            <v-list-item-content>
                <v-list-item-title class="title">
                    Application
                </v-list-item-title>
                <v-list-item-subtitle>
                    subtext
                </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <SiteMenu></SiteMenu>
    </v-navigation-drawer>

    <v-content>
        <router-view />
    </v-content>
    <SiteFooter :footer="footer" />
</v-app>
</template>

<script>
import SiteTitle from '@/views/site/title'
import SiteFooter from '@/views/site/footer'
import SiteMenu from '@/views/site/menu'

export default {
    name: 'App',
    items: [],
    components: {
        SiteTitle,
        SiteFooter,
        SiteMenu
    },

    data() {
        return {
            drawer: false,
            title: "나의 타이틀입니다.",
            footer: 'footer입니다',
        }
    },
    mounted() {
        console.log("시작")
        const home = {

            title: 'home',
            to: '/'
        }
        this.items.push(home)
        this.items.push({
            title: 'about',
            to: '/about'

        })
    }

};
</script>
