<template>
<v-card flat width="100%" height="100%">
<v-flex fluid cols7 sm8 md7 lg5 xl5 class="box">
    <TodoHeader></TodoHeader>
    <TodoInput v-on:addTodo="addTodo"></TodoInput>
    <TodoList v-bind:propsdata="todoItems" v-on:removeTodo="removeTodo"></TodoList>
    <TodoFooter v-on:removeAll="clearAll"></TodoFooter>
</v-flex>

</v-card>
</template>

<script>
import TodoHeader from "@/todo/TodoHeader.vue";
import TodoInput from "@/todo/TodoInput.vue";
import TodoList from "@/todo/TodoList.vue";
import TodoFooter from "@/todo/TodoFooter.vue";

export default {
    data() {
        return {
            todoItems: []
        };
    },
    methods: {
        clearAll() {
            localStorage.clear();
            this.todoItems = [];
        },
        addTodo(todoItem) {
            localStorage.setItem(todoItem, todoItem);
            this.todoItems.push(todoItem);
        },
        removeTodo(todoItem, index) {
            localStorage.removeItem(todoItem);
            this.todoItems.splice(index, 1);
        }
    },
    created() {
        if (localStorage.length > 0) {
            for (var i = 0; i < localStorage.length; i++) {
                this.todoItems.push(localStorage.key(i));
            }
        }
    },
    components: {
        TodoHeader: TodoHeader,
        TodoInput: TodoInput,
        TodoList: TodoList,
        TodoFooter: TodoFooter
    }
};
</script>

<style scoped>
.v-card {
    background-color: #F2ECEB !important;
}

.box {
    background-color:#fff;
    border-radius: 10px;
    border: 1px solid #ad9789;
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.2);
    position:absolute;
    transform:translate(-50%, -20%);
    left:50%;
    top:20%;
}

ul > li{white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;}
</style>
