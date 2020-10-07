<template>
<div>
    <v-progress-circular inderterminate v-if="loading">
    </v-progress-circular>
    <v-menu offset-y v-else-if="!$store.state.fireUser">
        <template v-slot:activator="{on}">
            <v-btn v-on="on" outlined class="text-center">로그인</v-btn>
        </template>
        <v-card min-width="340" class="pa-5">
            <v-card-actions>
                <v-btn color="red" dark block @click="signInWidthGoogle">
                    <v-icon left>mdi-google</v-icon>구글로 로그인
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-menu>
    <v-menu offset-y v-else>
        <template v-slot:activator="{on}">
            <v-btn icon v-on="on">
                <v-avatar size="24">
                    <v-img :src="$store.state.fireUser.photoURL"></v-img>
                </v-avatar>
            </v-btn>
        </template>
        <v-card min-width="340">
            <v-card-title class="text-center">내 계정</v-card-title>
            <v-card-actions>
                <v-btn color="red" dark block @click="signOut">
                    로그아웃
                </v-btn>
            </v-card-actions>

        </v-card>
    </v-menu>

</div>
</template>

<script>
export default {
    data() {
        return {
            loading: false
        }
    },
    methods: {
        // 구글 로그인
        async signInWidthGoogle() {
            const provider = new this.$firebase.auth.GoogleAuthProvider()
            this.$firebase.auth().languageCode = 'ko'
            try {
                const result1 = await this.$firebase.auth().signInWithPopup(provider)
                this.$store.commit('setFireUser', result1.user)
            } finally {
                this.loading = false
            }
        },

        // 로그아웃
        signOut() {
            this.$firebase.auth().signOut()
        }

    }
}
</script>
