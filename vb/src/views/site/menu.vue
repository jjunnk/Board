<template>
<div>
    <v-list-item v-for="item in items" :key="item.title" :to="item.to">
        <v-list-item-title>{{item.title}}</v-list-item-title>
    </v-list-item>

</div>
</template>

<script>
export default {
    props: ['propsfooter'],
    data() {
        return {
            items: [{
                    title: 'home',
                    to: '/'
                },
                {
                    title: 'about',
                    to: '/about'
                }
            ]
        }
    }
}
</script>
