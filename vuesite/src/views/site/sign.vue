<template>
  <div class="text-center">
    <v-progress-circular indeterminate v-if="loading"></v-progress-circular>
    <v-menu offset-y v-else-if="!$store.state.fireUser">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" outlined color="primary" @click="openDialog">Login</v-btn>
      </template>
      <v-dialog width="400" class="pa-3" v-model="dialog">
        <v-card  class="pa-8">
          <v-card-title  class="pa-0 mb-8">로그인
            <v-spacer />
            <v-btn icon @click="dialog = false">
              <v-icon> mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-actions  class="pa-0">
            <v-btn color="red" @click="signInWithGoogle" block class="white--text">
              <v-icon class="mr-3">mdi-google</v-icon>Google Login
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-menu>
    <v-menu offset-y v-else>
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" icon  @click="openDialog">
          <v-avatar size="32" color="primary">
            <img :src="$store.state.fireUser.photoURL" />
          </v-avatar>
        </v-btn>
      </template>
      <v-dialog width="400" v-model="dialog">
        <v-card  class="pa-8">
          <v-card-title class="pa-0 mb-9">ID : {{ $store.state.user.displayName }}
          <v-spacer />
            <v-btn icon @click="dialog = false">
              <v-icon> mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-actions class="pa-0">
            <v-btn :color="$vuetify.theme.dark? 'primary' :'info'  " @click="signOut" block>
              Logout
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-menu>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loading: false,
        dialog: false,
      }
      },
    methods: {
      openDialog(){
        this.dialog = true
      },
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
<style lang="scss">
  @import '@/assets/scss/_variables.scss';

  .v-menu__content.theme--dark button>span {
    color: $darkBlack;
  }
  .v-card__title, .v-btn__content{font-family:$fontfamily}
</style>