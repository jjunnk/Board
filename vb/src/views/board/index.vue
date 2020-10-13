<template>
<v-card>
    <v-card-title>Board Test</v-card-title>
    <v-data-table :headers="headers" :items="items" width="1000px">
        <template v-slot:item.id="{ item }">
            <v-btn icon @click="openDialog(item)">
                <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon @click="remove(item)">
                <v-icon>mdi-delete</v-icon>
            </v-btn>
        </template>
    </v-data-table>
    <v-card-actions>
        <v-btn @click="read" icon>
            <v-icon left>mdi-page-next</v-icon>
        </v-btn>
        <v-btn @click="openDialog(null)" icon>
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
                <v-btn @click="update" v-if="selectedItem">save</v-btn>
                <v-btn @click="add" v-else>save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</v-card>
</template>

<script>
export default {
    data() {
        return {
            headers: [{
                    value: 'title',
                    text: '제목'
                },
                {
                    value: 'content',
                    text: '내용'
                }, {
                    value: 'id',
                    text: 'ID'
                }
            ],
            items: [],
            dialog: false,
            form: {
                title: '',
                content: ''
            },
            selectedItem: null
        }
    },
    created() {
        this.read()
    },
    methods: {
        openDialog(item) {
            this.selectedItem = item
            this.dialog = true
            if (!item) {
                this.form.title = ''
                this.form.content = ''
            } else {
                this.form.title = item.title
                this.form.content = item.content
            }
        },
        add() { // create of CRUD
            this.$firebase.firestore().collection('boards').add(this.form)
            this.dialog = false
        },
        update() { // create of CRUD
            this.$firebase.firestore().collection('boards').doc(this.selectedItem.id).update(this.form) // selectedItem.id를 this.form에 하겠다
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
        },
        remove(item) {
            this.$firebase.firestore().collection('boards').doc(item.id).delete()
        }
    }
}
</script>
