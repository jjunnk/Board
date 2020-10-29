<template>
<v-card>
    <v-divider class="mx-4" vertical color="#999" />
    <v-toolbar flat>
        <span>Article Title</span>
        <v-divider class="mx-4" vertical color="#999"></v-divider>
        <v-toolbar-title>{{item.title}}</v-toolbar-title>
        <v-spacer />
        <v-btn icon @click="$emit('close')">
            <v-icon>mdi-close</v-icon>
        </v-btn>
    </v-toolbar>
    <v-card-text>
        {{item.url}}
    </v-card-text>
</v-card>
</template>

<script>
export default {
    props: ['item'],
    mounted() {
        console.log('mounted')
    }

}
</script>

<style scoped>
.v-card {
    padding: 0 20px;
}

.v-toolbar__content,
.v-toolbar__extension {
    padding: 4px 0 !important;
}

.v-toolbar__content span,
.v-toolbar__title {
    font-size: 1.1rem
}

header {
    border-top: 1px solid #999 !important;
    border-bottom: 1px solid #999 !important;
}

.v-dialog>.v-card>.v-card__text {
    padding: 24px 0;
}
</style>
