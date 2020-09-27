<template>
<v-footer absolute :footer="footer">
    <v-row justify="center" no-gutters>
        <v-spacer></v-spacer>
        <v-row>
            <v-col class="white--text">&copy; {{ new Date().getFullYear() + '' + footer}}</v-col>

        </v-row>
    </v-row>
</v-footer>
</template>

<script>
export default {
    props: ['footer']
}
</script>
