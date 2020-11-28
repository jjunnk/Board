<template>
  <div class="text-center">
    <v-progress-circular indeterminate v-if="loading"></v-progress-circular>
    <v-menu offset-y v-else-if="!$store.state.fireUser">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" outlined color="primary">로그인</v-btn>
      </template>
      <v-card width="400" class="pa-3">
        <v-card-title>로그인</v-card-title>
        <v-card-actions>
          <v-btn
            color="red"
            @click="signInWithGoogle"
            block
            class="white--text"
          >
            <v-icon>mdi-google</v-icon>구글로 로그인
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
    <v-menu offset-y v-else>
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" icon>
          <v-avatar size="32" color="primary">
            <img :src="$store.state.fireUser.photoURL" />
          </v-avatar>
        </v-btn>
      </template>
      <v-card width="400" class="pa-3">
        <v-card-title>내 계정</v-card-title>
        <v-card-actions>
          <v-btn class="white--text" color="primary" @click="signOut" block>
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
    };
  },
  methods: {
    async signInWithGoogle() {
      const provider = new this.$firebase.auth.GoogleAuthProvider();
      this.$firebase.auth().languageCode = "ko";
      this.loading = true;
      try {
        const sn = await this.$firebase.auth().signInWithRedirect(provider);
        this.$store.commit("setFireUser", sn.user);
      } finally {
        this.loading = false;
      }
    },
    signOut() {
      this.$firebase.auth().signOut();
    }
  }
};
</script>
