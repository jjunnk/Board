<template>
<v-app>
    <v-card class="overflow-hidden" height="100%">
        <v-app-bar color="white">
            <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>
            <SiteTitle :propstitle="site.title"></SiteTitle>
            <v-spacer />
            <v-btn icon @click="check">
                <v-icon>mdi-check</v-icon>
            </v-btn>
        </v-app-bar>
        <SiteFooter :propsfooter="site.footer"></SiteFooter>
        <v-navigation-drawer app v-model="drawer">
            <SiteMenu :propsitems="site.menu"></SiteMenu>
        </v-navigation-drawer>
    </v-card>
</v-app>
</template>

<script>
import SiteTitle from '@/site/title.vue'
import SiteFooter from '@/site/footer.vue'
import SiteMenu from '@/site/menu.vue'

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
            site: {
                title: 'Vue Site',
                footer: 'Footer text',
                menu: []
            }

        }
    },
    created() {
        this.subscribe()
    },
    methods: {
        check() {
            console.log("check")
            this.$firebase.database().ref().child('abc').child('abc').set({
                title: 'abcde',
                text: 'eeeee'
            })
        },
        subscribe() {
            this.$firebase.database().ref().child('site').on('value', (sn) => {
                const v = sn.val()
                if (!v) {
                    this.$firebase.database().ref().child('site').set(this.site)
                }
                this.site = v

            }, (e) => {
                console.log(e.message)
            })
        }
    }
}
</script>

<style>
</style>
