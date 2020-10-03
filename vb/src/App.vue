<template>
<v-app>
    <v-card class="overflow-hidden">
        <v-app-bar absolute app color="white">
            <v-app-bar-nav-icon @click="drawer =!drawer"></v-app-bar-nav-icon>
            <site-title v-bind:propstitle="title"></site-title>
            <v-spacer />
            <v-btn icon @click="save">
                <v-icon>mdi-check</v-icon>
            </v-btn>
            <v-btn icon @click="read">
                <v-icon>mdi-circle</v-icon>
            </v-btn>
            <v-btn icon @click="readOne">
                <v-icon>mdi-heart</v-icon>
            </v-btn>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" app>
            <site-menu></site-menu>
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
    },
    mounted() {
        console.log(this.$firebase)
    },
    methods: {
        save() {
            console.log('save click')
            this.$firebase.database().ref().child('abcd').set({
                title: 'abcd',
                text: 'tttttexttttt'
            })
        },
        read() {
            this.$firebase.database().ref().child('abcd').on('value', (sn) => {
                console.log(sn)
                console.log(sn.val())
            })
        },
        async readOne() {
            const sn = await this.$firebase.database().ref().child('abcd').once('value')
            console.log(sn.val())
        }
    }
}
</script>
