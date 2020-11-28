<template>
    <v-app>
        <v-card class="overflow-hidden" height="100%">
            <site-header color="base"></site-header>
            <vue-page-transition name="overlay-up-full" class="app-body-wrap" height="100vh">
                <router-view class="auto-size" style="position:static" height="100vh" />
            </vue-page-transition>
            <SiteFooter :footer="site.footer"></SiteFooter>
        </v-card>
    </v-app>
</template>

<script>
    import SiteFooter from "@/views/site/footer.vue";
    import SiteHeader from "@/views/site/header.vue";

    export default {
        name: "App",
        components: {
            SiteHeader,
            SiteFooter,
        },
        data() {
            return {
                drawer: false,
                site: {
                    footer: "",
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
            },
        },
    };
</script>

<style>
    /*roboto noto sanse font*/
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,400&display=swap');

    /*Ubuntu font */
    @import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap');

    html,
    body,
    div,
    h1,
    h2,
    h3 {
        font-family: 'Ubuntu', 'Noto Sans KR', sans-serif;
    }

    html,
    body {
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
    }

    .v-main {
        min-height: 100vh;
        box-sizing: border-box;
        overflow-x: hidden;
        overflow-y: hidden;
    }
    div[data-v-4c22b934].app-body-wrap{height:100vh !important}
    /* header background */
    div.theme--dark > div[data-v-33faa3ab]{background-color: #0D0D0D;}

    /* Dark theme color*/
    .theme--dark.v-sheet,
    .theme--dark.v-data-table,
    .theme--dark.v-icon {
        color: #ebdaca !important;
    }

    .v-main__wrap .theme--dark.v-card {
        border: 1px solid #655d5d
    }

    ::-webkit-scrollbar {
        width: 8px
    }

    ::-webkit-scrollbar-track {
        background: #ebdaca
    }

    ::-webkit-scrollbar-thumb {
        background: #ad9789
    }
</style>