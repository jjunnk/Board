<template>
<v-app>
    <v-card class="overflow-hidden">
        <v-app-bar absolute app color="white">
            <v-app-bar-nav-icon @click="drawer =!drawer"></v-app-bar-nav-icon>
            <site-title v-bind:propsTitle="site.title"></site-title>
            <v-spacer />
            <site-sign></site-sign>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" app>
            <site-menu :items="site.menu"></site-menu>
        </v-navigation-drawer>
        <v-main>
            <router-view />
        </v-main>
        <site-footer :propsFooter="site.footer"></site-footer>
    </v-card>
</v-app>
</template>

<script>
import SiteTitle from '@/views/site/title'
import SiteFooter from '@/views/site/footer'
import SiteMenu from '@/views/site/menu'
import SiteSign from '@/views/site/sign'

export default {
    name: 'App',

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
                menu: [{
                        title: 'home',
                        icon: 'mdi-home',
                        subItems: [{
                                title: 'Dashboard',
                                to: '/'
                            },
                            {
                                title: 'About',
                                to: '/about'
                            }
                        ]
                    },
                    {
                        title: 'about',
                        active: true,
                        icon: 'mdi-account',
                        subItems: [{
                            title: 'xxx',
                            to: '/xxx'
                        }]
                    }
                ],
                title: '사이트 제목',
                footer: 'sujin'
            }
        }
    },
    created() {
        this.subscribe()
    },
    methods: {
        subscribe() {
            this.$firebase.database().ref().child('site').on('value', (sn) => {
                const v = sn.val()
                if (!v) {
                    this.$firebase.database().ref().child('site').set(this.site)
                    return
                }
                this.site = v
            }, (e) => {
                console.log(e.message)
            })
        }
    }
}
</script>
