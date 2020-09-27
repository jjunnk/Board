<template>
<div>
    <v-list>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to">
            <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </v-list>
</div>
</template>

<script>
export default {
    props: ['footer'],

    data() {
        return {
            items: [{
                    title: 'home',
                    to: '/',

                },
                {
                    title: 'about',
                    to: '/about',
                },
                {
                    title: 'xxx',
                    to: '/xxx'

                },

            ]

        }
    },
}
</script>
