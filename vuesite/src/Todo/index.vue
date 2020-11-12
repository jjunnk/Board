<template>
<v-flex fluid cols7 sm8 md6 lg5 xl5 class="box mt-4 ma-auto">
    <TodoHeader></TodoHeader>
    <TodoInput v-on:addTodo="addTodo"></TodoInput>
    <TodoList v-bind:propsdata="todoItems" v-on:removeTodo="removeTodo"></TodoList>
    <TodoFooter v-on:removeAll="clearAll"></TodoFooter>
</v-flex>
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
.v-main__wrap {
    background-color: #ebdaca;
}

.box {
    border-radius: 10px;
    border: 1px solid #ad9789;
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.2)
}
</style>
