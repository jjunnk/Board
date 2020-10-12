<template>
<v-card>
    <v-card-title>Board Test</v-card-title>
    <v-card-actions>
        <v-btn @click="read" icon>
            <v-icon left>mdi-page-next</v-icon>
        </v-btn>
        <v-btn @click="openDialog" icon>
            <v-icon left>mdi-pencil</v-icon>
        </v-btn>
    </v-card-actions>
    <v-dialog max-width="500" v-model="dialog">
        <v-card>
            <v-card-text>
                <v-form>
                    <v-text-field v-model="form.title"></v-text-field>
                    <v-text-field v-model="form.content"></v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn @click="save">save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</v-card>
</template>

<script>
export default {
    data() {
        return {
            items: [],
            dialog: false,
            form: {
                title: '',
                content: ''
            }
        }
    },
    methods: {
        openDialog() {
            this.dialog = true
        },
        save() { // create of CRUD
            this.$firebase.firestore().collection('boards').add(this.form)
            this.dialog = false
        },
        async read() { // Read of CRUD
            const snap = await this.$firebase.firestore().collection('boards').get()

            /*  snap.docs.forEach(v => {
                console.log(v.id)
                console.log(v.data())
            }) */
            this.items = snap.docs.map(v => {
                const item = v.data() // 함수형태로 아이디를 꺼내기
                return {
                    id: v.id,
                    title: item.title,
                    content: item.content
                }
            })
            console.log(this.items)
        }
    }
}
</script>
