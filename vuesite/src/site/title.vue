<template>
<v-toolbar-title>
    {{ propstitle }}
    <v-spacer></v-spacer>
    <v-btn icon>
        <v-icon>mdi-check</v-icon>
    </v-btn>
</v-toolbar-title>
</template>

<script>
export default {
    props: ['propstitle']
}
</script>
