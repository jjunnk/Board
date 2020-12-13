<template>
    <v-footer padless class="font-weight-medium text-center" :footer="footer" :color="$vuetify.theme.dark ? 'base' : 'secondary'">
        <v-col cols="12">
            <div :color="$vuetify.theme.dark ? 'base' : ''">
                {{ new Date().getFullYear() }} — <strong>{{ footer }}</strong>
            
            <v-btn icon @click="openDialog">
                <v-icon> mdi-pencil</v-icon>
            </v-btn>
            </div>
            <v-dialog v-model="dialog" max-width="400">
                <v-card>
                    <v-card-title>
                        Footer 수정
                        <v-spacer></v-spacer>
                        <v-btn icon @click="save">
                            <v-icon> mdi-content-save</v-icon>
                        </v-btn>
                        <v-btn icon @click="dialog = false">
                            <v-icon> mdi-close</v-icon>
                        </v-btn>
                    </v-card-title>
                    <v-card-text>
                        <v-text-field v-model="text" label="제목" @keypress.enter="save"></v-text-field>
                    </v-card-text>
                </v-card>
            </v-dialog>

        </v-col>
    </v-footer>
</template>

<script>
    export default {
        props: ["footer"],
        data() {
            return {
                dialog: false,
                text: this.footer
            };
        },
        methods: {
            openDialog() {
                this.dialog = true;
            },
            async save() {
                try {
                    await this.$firebase
                        .database()
                        .ref()
                        .child("site")
                        .update({
                            footer: this.text
                        });
                } finally {
                    this.dialog = false;
                }
            }
        }
    };
</script>
<style scoped>
.v-footer.theme--dark > .col{border-top:1px solid #1E1E1E; }
</style>