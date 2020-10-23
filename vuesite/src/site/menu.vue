<template>
<div>
    <v-list-item>
        <v-list-item-content>
            <v-list-item-title class="title">
                Application
            </v-list-item-title>
            <v-list-item-subtitle>
                subtext
            </v-list-item-subtitle>
        </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-list>
        <v-list-group v-for="(item,i) in items" :key="i" :to="item.to" :prepend-icon="item.icon">
            <template v-slot:activator>
                <v-list-item-content>
                    <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item-content>
            </template>

            <v-list-item v-for="(subItem, j) in item.subItems" :key="j" :to="subItem.to">
                <v-list-item-content>
                    <v-list-item-title v-text="subItem.title"></v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list-group>
    </v-list>

</div>
</template>

<script>
export default {
    props: ['propsitems'],
    data() {
        return {
            items: [{
                    title: 'Home',
                    icon: 'mdi-home',
                    subItems: [{
                        title: 'Dashboard',
                        to: '/'
                    }]
                },
                {
                    title: 'About',
                    icon: 'mdi-heart',
                    active: true,
                    subItems: [{
                        title: 'Dashboard',
                        to: '/about'
                    }]
                },
                {
                    title: 'xxx',
                    icon: 'mdi-circle',
                    to: '/xxx'

                }
            ]
        }
    },
}
</script>
