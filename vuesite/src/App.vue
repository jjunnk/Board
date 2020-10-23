<template>
<v-app>
    <v-card class="overflow-hidden" height="100%">
        <v-app-bar color="white">
            <v-app-bar-nav-icon @click="drawer =!drawer"></v-app-bar-nav-icon>
            <SiteTitle :propstitle="title"></SiteTitle>
        </v-app-bar>
        <SiteFooter :propsfooter="footer"></SiteFooter>
        <v-navigation-drawer app v-model="drawer">
            <SiteMenu></SiteMenu>
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
            title: 'Vue Site',
            footer: 'Footer text',
            items: []
        }
    },
    methods: {},
    mounted() {},
}
</script>

<style>
</style>
