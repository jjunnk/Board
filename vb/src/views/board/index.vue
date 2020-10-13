<template>
<v-card>
    <h1 class="text-center mb-6">Board Test</h1>
    <v-data-table :headers="headers" :items="items" class="mx-auto ma-xs-4">
        <template v-slot:item.id="{ item }">
            <v-btn icon @click="openDialog(item)">
                <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon @click="remove(item)">
                <v-icon>mdi-delete</v-icon>
            </v-btn>
        </template>
    </v-data-table>
    <v-card-actions class="float-right ma-3">
        <v-btn @click="read" outlined>
            <v-icon left>mdi-page-next</v-icon>다음 페이지
        </v-btn>
        <v-btn @click="openDialog(null)">
            <v-icon left>mdi-pencil</v-icon>글쓰기
        </v-btn>
    </v-card-actions>
    <v-dialog v-model="dialog" max-width="500">
        <v-card>
            <v-form>
                <v-card-text>
                    <v-text-field v-model="form.title"></v-text-field>
                    <v-text-field v-model="form.content"></v-text-field>
                </v-card-text>

                <v-card-actions>
                    <v-spacer />
                    <v-btn @click="update" v-if="selectedItem" @keypress.enter="update">save</v-btn>
                    <v-btn @click="add" v-else>save</v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>
</v-card>
</template>

<script>
export default {
    data() {
        return {
            headers: [{
                    text: '제목',
                    value: 'title'
                }, {
                    text: '내용',
                    value: 'content'
                },
                {
                    text: 'ID',
                    value: 'id'
                }
            ],
            items: [],
            form: {
                title: '',
                content: ''
            },
            dialog: false,
            selectedItem: null,
            unsubscribe: null
        }
    },
    created() {
        // this.read()
        this.subscribe()
    },
    destroyed() {
        if (this.unsubscribe) this.unsubscribe() // if 문 실행코드가 한 줄이면 중괄호 생략
    },
    methods: {
        subscribe() {
            this.unsubscribe = this.$firebase.firestore().collection('boards').onSnapshot((snap) => {
                if (snap.empty) {
                    this.items = []
                    return
                }
                this.items = snap.docs.map(v => {
                    const item = v.data()
                    return {
                        id: v.id,
                        title: item.title,
                        content: item.content
                    }
                })
            })
        },
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
        add() {
            this.$firebase.firestore().collection('boards').add(this.form)
            this.dialog = false
        },
        update() {
            this.$firebase.firestore().collection('boards').doc(this.selectedItem.id).update(this.form)
            this.dialog = false
        },
        async read() {
            const snap = await this.$firebase.firestore().collection('boards').get()
            this.items = snap.docs.map(v => {
                const item = v.data()
                return {
                    id: v.id,
                    title: item.title,
                    content: item.content
                }
            })
        },
        remove(item) {
            this.$firebase.firestore().collection('boards').doc(item.id).delete()
        }

    }
}
</script>

<style scoped>

</style>
