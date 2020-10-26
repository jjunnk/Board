<template>
  <div>
    <v-toolbar-title>
      {{ propstitle }}
      <v-btn icon @click="opendialog">
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
            <v-text-field
              v-model="text"
              label="제목"
              @keypress.enter="save"
            ></v-text-field>
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
    }
  }
};
</script>
