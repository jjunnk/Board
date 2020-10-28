<template>
<v-sheet>
    <v-subheader>
        <h1>Toast Editor
            <v-btn @click="read" class="ml-7 white--text" color="black">READ</v-btn>
            <v-btn @click="toggle=!toggle" class="ml-3">TOGGLE</v-btn>
        </h1>
    </v-subheader>
    <v-main class="my-8">
        <editor :options="options" :initialValue="text" ref="editor"></editor>
        <viewer v-if="toggle" :initialValue="text"></viewer>
    </v-main>
</v-sheet>
</template>

<script>
export default {
    data() {
        return {
            options: {
                language: 'ko'
            },
            text: '# abcdefg',
            toggle: false
        }
    },
    methods: {
        read() {
            this.text = this.$refs.editor.invoke('getMarkdown')
            alert(this.$refs.editor.invoke('getMarkdown'))
        }
    }
}
</script>
