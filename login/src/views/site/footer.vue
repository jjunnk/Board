<template>
<<<<<<< HEAD
<v-footer absolute :footer="footer" class="blue darken-4 text-center">
    <v-col cols="12" style=" color:#fff;">&copy; {{ new Date().getFullYear() + "&nbsp;" + footer}}
        <v-btn icon @click="openDialog">
            <v-icon>mdi-pencil</v-icon>
        </v-btn>
    </v-col>
    <v-dialog v-model="dialog" max-width="400">
=======
<v-footer absolute v-bind:footer="footer" class="blue darken-4 text-center">
    <v-col justify="center" no-gutters class="white--text" cols="12">&copy; {{ new Date().getFullYear() + "&nbsp;" + footer}}
        <v-btn icon @click="openDialog">
            <v-icon class="white--text">mdi-pencil</v-icon>
        </v-btn>
    </v-col>
    <v-dialog v-model="dialog">
>>>>>>> 076f3b43180ae228af9c809080ef79118d68b036
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
<<<<<<< HEAD
                <v-text-field v-model="text" outlined label="Footer 내용 입력" @keypress.enter="save" hide-details placeholder="푸터 내용을 입력하세요" />
=======
                <v-text-field v-model="text" @keypress.enter="save" outlined label="푸터내용" hide-details placeholder="푸터 내용을 입력하세요" />
>>>>>>> 076f3b43180ae228af9c809080ef79118d68b036
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
