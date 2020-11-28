<template>
    <v-container color="base" class="mx-lg-0 my-md-7 my-sm-4  ma-xs-4 rounded py-7 px-sm-7 px-md-12" :class="ThemeColor()">
        <h1 color="primary" class="text-h4 font-weight-bold text-center">Todo List</h1>
        <v-card-subtitle class="text-right">Totals : {{ Totals }}</v-card-subtitle>
        <v-text-field v-model="todo.title" append-icon="mdi-plus" @click:append="addTodo" placeholder="할 일을 입력하세요"
            outlined hide-details @keypress.enter="addTodo" rows="1" color="accent"></v-text-field>

        <v-list-item v-for="todo in todos" :key="todo.id" >
            <input type="checkbox" @change="updateTodoItem(todo.id, $event)" :checked="todo.isCompleted" class="mr-3" />
            <v-list-item-title>{{ todo.title }}</v-list-item-title>
            <v-btn icon @click="deleteTodo(todo.id)">
                <v-icon>mdi-delete</v-icon>
            </v-btn>
        </v-list-item>
    </v-container>
</template>
<script>
    import moment from '@/plugins/moment'
    import {
        last
    } from 'lodash'


    export default {
        data() {
            return {
                unsubscribe: null,
                todos: [],
                todo: {
                    title: '',
                },

            }
        },
        created() {
            this.subscribe()
        },
        computed: {
            Totals() {
                return this.todos.length
            },
        },
        methods: {
            async subscribe() {
                var todosRef = await this.$firebase
                    .firestore()
                    .collection("todoItems")

                todosRef.onSnapshot(snap => {
                    this.todos = []
                    snap.forEach(doc => {
                        var todo = doc.data();
                        todo.id = doc.id;
                        this.todos.push(todo);
                    });
                });
            },
            addTodo() {
                this.$firebase.firestore().collection('todoItems').add({
                    title: this.todo.title,
                    createdAt: new Date().toLocaleString(),
                    isCompleted: false,
                })
            },
            updateTodoItem(docId, e) {
                var isChecked = e.target.checked;
                this.$firebase
                    .firestore()
                    .collection("todoItems")
                    .doc(docId)
                    .update({
                        isCompleted: isChecked
                    });
            },
            deleteTodo(docId) {
                this.$firebase.firestore().collection('todoItems').doc(docId).delete()
            },
        ThemeColor(){
            return this.$vuetify.theme.dark ? 'BgDark' : 'BgLight'
        }

        },
    }
</script>

<style scoped>
.BgLight{background-color:#fff !important;border:4px solid #ebdaca;}
.BgDark{background-color:#0D0D0D !important;border:none !important;}

.flex.box {
    background-color: #fff;
    border-radius: 10px;
    border: 4px solid #ad9789;
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.2);
    position: absolute;
    transform: translate(-50%, -20%);
    left: 50%;
    top: 20%;
}

ul>li {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>