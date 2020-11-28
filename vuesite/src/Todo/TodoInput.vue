<template>
<div class="inputBox shadow">
    <input type="text" v-model="newTodoItem" placeholder="할 일을 입력하세요" v-on:keypress.enter="addTodo" />
    <span class="addContainer" v-on:click="addTodo">
        <i class="addBtn fas fa-plus" aria-hidden="true"></i>
    </span>

    <div class="modal-mask" v-on:keyup.esc="$emit('close')" v-if="showModal" v-on:close="showModal = false">
        <div class="modal-wrapper">
            <div class="modal-container">
                <div class="modal-header">
                    <h3 slot="header">경고</h3>
                </div>

                <div class="modal-footer">
                    <span slot="footer" v-on:click="showModal = false">
                        할 일을 입력하세요.
                        <i class="closeModalBtn fas fa-times" aria-hidden="true"></i>
                    </span>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            newTodoItem: "",
            showModal: false
        };
    },
    methods: {
        save(){},

        addTodo() {
            if (this.newTodoItem !== "") {
                const todo = {
                    title : this.newTodoItem,
                    createdAt : new Date()
                }
                this.firebase.firestore().collection('todoItems').add(this.todo)

                var value = this.newTodoItem && this.newTodoItem.trim();
                this.$emit("addTodo", value);
                this.clearInput();
            } else {
                this.showModal = !this.showModal;
            }
        },
        clearInput() {
            this.newTodoItem = "";
        }
    },
    components: {}
};
</script>

<style scoped>
input:focus {
    outline: none;
}

.inputBox {
    background: white;
    height: 50px;
    line-height: 50px;
    border-radius: 5px;
    padding: 0 1rem;
    display: flex;

}

.inputBox input {
    text-align: left;
    border-style: none;
    font-size: 0.9rem;
    border: 1px solid #ad9789;
    padding: 0 10px;
    box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.3);
    flex: 1 1 100%;
}

.addContainer {
    float: right;
    background: #655d5d;
    display: block;
    width: 3rem;
    border-radius: 0 5px 5px 0;
    text-align: center;

}

.addBtn {
    color: white;
    vertical-align: middle;
}
</style>
