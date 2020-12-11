<template>
  <div class="text-center">
    <v-progress-circular indeterminate v-if="loading"></v-progress-circular>
    <v-menu offset-y v-else-if="!$store.state.fireUser">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" outlined color="primary" @click="openDialog" class="ml-2">Login</v-btn>
      </template>
      <v-dialog width="400" v-model="dialog" class="pa-3" >
        <v-card flat class="text-end rounded-0">
          <v-btn icon @click="dialog = false">
              <v-icon> mdi-close</v-icon>
          </v-btn>
        </v-card >
        <v-card flat  class="pa-8 pt-0 rounded-0">
          <v-card-title  class="pa-0 mb-8">
            <v-spacer />
            로그인
            <v-spacer />
          </v-card-title>
          <v-card-actions  class="pa-0">
            <v-btn color="red" @click="signInWithGoogle" class="white--text"  block x-large>
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
      <v-dialog width="400" v-model="dialog" class="pa-3">
        <v-card flat class="text-end rounded-0">
          <v-btn icon @click="dialog = false">
              <v-icon> mdi-close</v-icon>
          </v-btn>
        </v-card >
        <v-card flat class="pa-8 pt-0 rounded-0">
          <v-card-title class="pa-0 mb-9">
          <v-spacer />
            ID : {{ userName }}
            <v-spacer />
          </v-card-title>
          <v-card-actions class="pa-0">
            <v-btn :color="$vuetify.theme.dark? 'primary' :'accent'  " @click="signOut" block x-large>
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
        userName:''
      }
      },
    methods: {
      openDialog(){
        this.dialog = true
        var user = this.$firebase.auth().currentUser
        var name
        if(user != null){
          name = user.displayName
        }
        this.userName = user.displayName
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
<style scoped lang="scss">
  @import '@/assets/scss/_variables.scss';

  .v-menu__content.theme--dark button>span {
    color: $darkBlack;
  }
  .v-card__title, .v-btn__content{font-family:$fontfamily}

  button > span{
    letter-spacing:2px;
  }



  
</style>