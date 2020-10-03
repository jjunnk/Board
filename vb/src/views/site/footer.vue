<template>
<v-footer app absolute dark class="text--center" color=" primary" v-bind:propsfooter="footer">
    <v-col cols="12">&copy; {{ new Date().getFullYear() + "&nbsp;" + propsfooter}}</v-col>
</v-footer>
</template>

<script>
export default {
    props: ['propsfooter']
}
</script>
