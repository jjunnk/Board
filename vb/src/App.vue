<template>
<v-app>
    <v-card class="overflow-hidden">
        <v-app-bar absolute app color="white">
            <v-app-bar-nav-icon @click="drawer =!drawer"></v-app-bar-nav-icon>
            <site-title v-bind:propstitle="title"></site-title>
            <v-spacer />
            <v-btn icon to="/about">
                <v-icon>mdi-circle</v-icon>
            </v-btn>
            <v-btn icon to="/">
                <v-icon>mdi-home</v-icon>
            </v-btn>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" app>
            <v-list nav>
                <v-list-item-group v-model="group">
                    <v-list-item class="title">
                        <v-list-item-icon>
                            <v-icon>mdi-home</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Home</v-list-item-title>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon>mdi-account</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Account</v-list-item-title>
                    </v-list-item>
                    <v-divider></v-divider>
                    <site-menu></site-menu>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
        <v-main>
            <router-view />
        </v-main>
        <site-footer :propsfooter="footer"></site-footer>
    </v-card>
</v-app>
</template>

<script>
import SiteTitle from '@/views/site/title'
import SiteFooter from '@/views/site/footer'
import SiteMenu from '@/views/site/menu'

export default {
    name: 'App',

    components: {
        SiteTitle,
        SiteFooter,
        SiteMenu
    },

    data() {
        return {
            drawer: false,
            items: [],
            group: null,
            title: '사이트 제목',
            footer: 'sujin'
        }
    }
}
</script>
