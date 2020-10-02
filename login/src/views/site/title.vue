<template>
<div>
    <v-toolbar-title>{{ title }}
        <v-btn icon @click="openDialog">
            <v-icon>mdi-pencil</v-icon>
        </v-btn>
    </v-toolbar-title>
    <v-dialog v-model="dialog">
        <v-card>
            <v-card-title>제목 수정
                <v-spacer />
                <v-btn icon @click="save">
                    <v-icon>mdi-content-save</v-icon>
                </v-btn>
                <v-btn icon @click="dialog=false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <v-text-field v-model="text" @keypress.enter="save" outlined label="제목" hide-details />
            </v-card-text>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
export default {
    props: ['title'],
    data() {
        return {
            dialog: false,
            text: this.title
        }
    },
    methods: {
        openDialog() {
            this.dialog = true
        },
        async save() {
            try {
                await this.$firebase.database().ref().child('site').update({
                    title: this.text
                })
            } finally {

                this.dialog = false
            }
        }
    }
}
</script>
