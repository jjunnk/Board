<template>
<v-card>
    <v-card-title>board test</v-card-title>
    <v-data-table :headers="headers" :items="items" :items-per-page="5" :options.sync="options" :server-items-length="serverItemsLength">
        <template v-slot:[`item.id`]="{ item }">
            <v-btn icon @click="openDialog(item)">
                <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon @click="remove(item)">
                <v-icon>mdi-delete</v-icon>
            </v-btn>
        </template>
    </v-data-table>
    <v-card-actions>
        <v-btn @click="openDialog(null)">
            <v-icon left>mdi-pencil</v-icon>
        </v-btn>
    </v-card-actions>
    <v-dialog max-width="500" v-model="dialog">
        <v-card>
            <v-form>
                <v-card-text>
                    <v-text-field v-model="form.title"></v-text-field>
                    <v-text-field v-model="form.content"></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn @click="update" v-if="selectedItem">save</v-btn>
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
                    value: "title",
                    text: "제목"
                },
                {
                    value: "content",
                    text: "내용"
                },
                {
                    value: "id",
                    text: "id"
                }
            ],
            items: [],
            form: {
                title: "",
                content: ""
            },
            dialog: false,
            selectedItem: null,
            unsubscribe: null,
            unsubscribeCount: null,
            serverItemsLength: 0,
            options: {}
        };
    },
    watch: {
        options: {
            handler(n, o) {
                console.log(o);
                console.log(n);
                this.subscribe();
            },
            deep: true
        }
    },
    created() {
        // this.read()
    },
    destroyed() {
        if (this.unsubscribe) this.unsubscribe();
        if (this.unsubscribeCount) this.unsubscribeCount();
    },
    methods: {
        subscribe() {
            this.unsubscribeCount = this.$firebase
                .firestore()
                .collection("meta")
                .doc("boards")
                .onSnapshot(doc => {
                    if (!doc.exists) return;
                    this.serverItemsLength = doc.data().count;
                });
            this.unsubscribe = this.$firebase
                .firestore()
                .collection("boards")
                .limit(this.options.itemsPerPage)
                .onSnapshot(sn => {
                    if (sn.empty) {
                        this.items = [];
                        return;
                    }
                    this.items = sn.docs.map(v => {
                        const item = v.data();
                        return {
                            id: v.id,
                            title: item.title,
                            content: item.content
                        };
                    });
                });
        },
        openDialog(item) {
            this.selectedItem = item;
            this.dialog = true;
            if (!item) {
                this.form.title = "";
                this.form.content = "";
            } else {
                this.form.title = item.title;
                this.form.content = item.content;
            }
        },
        add() {
            this.$firebase
                .firestore()
                .collection("boards")
                .add(this.form);
            this.dialog = false;
        },
        update() {
            this.$firebase
                .firestore()
                .collection("boards")
                .doc(this.selectedItem.id)
                .update(this.form);
            this.dialog = false;
        },
        remove(item) {
            this.$firebase
                .firestore()
                .collection("boards")
                .doc(item.id)
                .delete();
        }
    }
};
</script>
