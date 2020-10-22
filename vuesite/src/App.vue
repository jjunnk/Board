<template>
<v-app>
    <v-card class="overflow-hidden" height="100%">
        <v-app-bar color="white">
            <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

            <v-toolbar-title>Title</v-toolbar-title>
            <v-spacer />
            <v-btn icon @click="save">
                <v-icon>mdi-circle</v-icon>
            </v-btn>
        </v-app-bar>
        <v-footer absolute class="font-weight-medium">
            <v-col class="text-center" cols="12">
                {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
            </v-col>
        </v-footer>

        <v-navigation-drawer v-model="drawer" absolute temporary>
            <v-list nav dense>
                <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
                    <v-list-item>
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
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
    </v-card>
</v-app>
</template>

<script>
export default {
    name: 'App',
    components: {},
    data() {
        return {

        }
    },
    methods: {
        save() {
            console.log('save')
            this.$firebase.database().ref().child('abcd')
        }
    }
}
</script>

<style>
</style>
