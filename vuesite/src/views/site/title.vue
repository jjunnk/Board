<template>
<div>
    <v-toolbar-title>
        <a @click="home" color="primary" class="font-weight-bold">{{ propstitle }}</a>
        <v-btn icon @click="opendialog" v-if=" user && user.level=== 0">
            <v-icon> mdi-pencil</v-icon>
        </v-btn>
        <v-dialog v-model="dialog">
            <v-card>
                <v-card-title>
                    사이트 이름 수정
                    <v-spacer></v-spacer>
                    <v-btn icon @click="save">
                        <v-icon> mdi-content-save</v-icon>
                    </v-btn>
                    <v-btn icon @click="dialog = false">
                        <v-icon> mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <v-text-field v-model="text" label="제목" @keypress.enter="save"></v-text-field>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-toolbar-title>
</div>
</template>

<script>
export default {
    props: ["propstitle"],
    data() {
        return {
            dialog: false,
            text: this.title
        };
    },
    computed: {
        user() {
            return this.$store.state.user
        },
        fireUser() {
            return this.$store.state.fireUser
        }
    },
    methods: {
        opendialog() {
            this.dialog = true;
        },
        async save() {
            try {
                await this.$firebase
                    .database()
                    .ref()
                    .child("site")
                    .update({
                        title: this.text
                    });
            } finally {
                this.dialog = false;
            }
        },
        home() {
            if (this.$route.path !== '/') {
                this.$router.push({
                    path: '/'
                })
            }

        }
    }
};
</script>
