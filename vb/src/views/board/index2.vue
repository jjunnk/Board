<template>
<v-card class="my-6 text-center">
  <h1 class="text-center py-6">Board Test</h1>
  <v-data-table :headers="headers" :items="items" :options.sync="options" :items-per-page="5" :server-items-length="serverItemsLength" class="mx-auto ma-xs-4">
    <template v-slot:[`item.id`]="{ item }">
      <v-btn icon @click="openDialog(item)">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn icon @click="remove(item)">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </template>
    <template v-slot:[`item.createdAt`]="{ item }">
      {{ item.createdAt.toLocaleString()}}
    </template>
  </v-data-table>
  <v-card-actions class="ma-3 mx-auto">
    <v-btn @click="openDialog(null)">
      <v-icon left>mdi-pencil</v-icon>글쓰기
    </v-btn>
  </v-card-actions>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-form>
        <v-card-text>
          <v-text-field v-model="form.title"></v-text-field>
          <v-text-field v-model="form.content"></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn @click="update" v-if="selectedItem">save</v-btn>
          <v-btn @click="add" v-else>save</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</v-card>
</template>

<script>
import {
  head,
  last
} from 'lodash'

export default {
  data() {
    return {
      headers: [{
          text: '작성일',
          value: 'createdAt'
        }, {
          text: '제목',
          value: 'title'
        }, {
          text: '내용',
          value: 'content'
        },
        {
          text: 'ID',
          value: 'id'
        }
      ],
      items: [],
      form: {
        title: '',
        content: ''
      },
      dialog: false,
      selectedItem: null,
      unsubscribe: null,
      unsubscribeCount: null,
      serverItemsLength: 0,
      options: {},
      docs: []
    }
  },
  watch: {
    options: {
      handler(n, o) {
        console.log(n) // new 변경전
        console.log(o) // old 변경후
        this.subscribe()
      },
      deep: true
    }
  },
  created() {
    // this.read()

  },
  destroyed() {
    if (this.unsubscribe) this.unsubscribe() // if 문 실행코드가 한 줄이면 중괄호 생략
    if (this.unsubscribeCount) this.unsubscribeCount()
  },
  methods: {
    subscribe() {
      this.unsubscribeCount = this.$firebase.firestore().collection('meta').doc('boards').onSnapshot((doc) => {
        if (!doc.exists) return // 존재하지 않으면
        this.serverItemsLength = doc.data().count
      })
      this.unsubscribe = this.$firebase.firestore().collection('boards').limit(this.options.itemsPerPage).onSnapshot((snap) => {
        if (snap.empty) { // 비어있으면
          this.items = []
          return
        }

        this.docs = snap.docs
        console.log(head(snap.docs).data())
        console.log(last(snap.docs).data())
        this.items = snap.docs.map(v => {
          const item = v.data()
          return {
            id: v.id,
            title: item.title,
            content: item.content,
            createdAt: item.createdAt.toDate()

          }
        })
      })
    },
    openDialog(item) {
      this.selectedItem = item
      this.dialog = true
      if (!item) {
        this.form.title = ''
        this.form.content = ''
      } else {
        this.form.title = item.title
        this.form.content = item.content
      }
    },
    add() {
      const item = {}
      Object.assign(item, this.form) // this.form 카피
      item.createdAt = new Date()
      this.$firebase.firestore().collection('boards').add(item)
      this.dialog = false
    },
    update() {
      this.$firebase.firestore().collection('boards').doc(this.selectedItem.id).update(this.form)
      this.dialog = false
    },
    /*
            async read() {
                const snap = await this.$firebase.firestore().collection('boards').get()
                this.items = snap.docs.map(v => {
                    const item = v.data()
                    return {
                        id: v.id,
                        title: item.title,
                        content: item.content
                    }
                })
            }, */
    remove(item) {
      this.$firebase.firestore().collection('boards').doc(item.id).delete()
    }

  }
}
</script>

<style scoped>
.v-data-table {
  max-width: 800px;
  border: 1px solid #ddd;
  box-shadow: none;
}

.v-card.v-sheet {
  box-shadow: none;
}

.v-card__actions {
  max-width: 800px;
  display: block !important;
}
</style>
