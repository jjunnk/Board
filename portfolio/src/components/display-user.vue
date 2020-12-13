<template>
<v-tooltip bottom>
    <template v-slot:activator="{on}">
        <v-chip v-on="on" color="transparent" class="rounded" :small="size === 'small'">
            <v-avatar left v-if="size !== 'small'">
                <v-img :src="user.photoURL" />
            </v-avatar>{{user.displayName}}
        </v-chip>
    </template>
    <span>{{ user.email}}</span>
</v-tooltip>
</template>

<script>
export default {
    props: ['user', 'size'],
}
</script>
