<template>
<div class="clearAllContainer">
    <span class="clearAllBtn" v-on:click="clearTodo">Clear All</span>
</div>
</template>

<script>
export default {
    methods: {
        clearTodo() {
            this.$emit("removeAll");
        },
    },
};
</script>

<style>
.clearAllcontainer {
    width: 8.5rem;
    height: 50px;
    line-height: 50px;
    background-color: white;
    border-radius: 5px;
    margin: 1rem auto;
}

.clearAllBtn {
    color: #fff;
    display: block;
    border-radius: 5px;
    background-color: #655d5d;
    text-align: center;
    width: 150px;
    padding: .7em 1em;
    margin: 1em auto
}

.clearAllBtn:hover {
    cursor: pointer;
}
</style>
