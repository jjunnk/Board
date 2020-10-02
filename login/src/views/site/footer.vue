<template>
<v-footer absolute v-bind:footer="footer" class="blue darken-4 text-center">
    <v-col justify="center" no-gutters class="white--text" cols="12">&copy; {{ new Date().getFullYear() + "&nbsp;" + footer}}
        <v-btn icon @click="openDialog">
            <v-icon class="white--text">mdi-pencil</v-icon>
        </v-btn>
    </v-col>
    <v-dialog v-model="dialog">
        <v-card>
            <v-card-title>푸터 수정
                <v-spacer />
                <v-btn icon @click="save">
                    <v-icon>mdi-content-save</v-icon>
                </v-btn>
                <v-btn icon @click="dialog=false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <v-text-field v-model="text" @keypress.enter="save" outlined label="푸터내용" hide-details placeholder="푸터 내용을 입력하세요" />
            </v-card-text>
        </v-card>
    </v-dialog>
</v-footer>
</template>

<script>
export default {
    props: ['footer'],
    data() {
        return {
            dialog: false,
            text: this.footer
        }
    },
    methods: {
        openDialog() {
            this.dialog = true
            this.text = ""
        },
        async save() {
            try {
                await this.$firebase.database().ref().child('site').update({
                    footer: this.text
                })
            } finally {
                this.dialog = false
            }
        }
    }
}
</script>
