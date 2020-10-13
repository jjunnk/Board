<template>
  <div>
    <v-list-item>
<<<<<<< HEAD
        <v-list-item-content>
            <v-list-item-title class="title">
                Application
            </v-list-item-title>
            <v-list-item-subtitle>
                subtext
            </v-list-item-subtitle>
        </v-list-item-content>

=======
      <v-list-item-content>
        <v-list-item-title class="title">
          Application
        </v-list-item-title>
        <v-list-item-subtitle>
          subtext
        </v-list-item-subtitle>
      </v-list-item-content>
>>>>>>> 9fd574b3781e37776dcaa9d349f5b4524f838dc1
    </v-list-item>
    <v-divider></v-divider>
    <v-list>
<<<<<<< HEAD
        <v-list-group v-for="(item, i) in items" :key="i" v-model="item.active" :prepend-icon="item.icon" no-action>
            <template v-slot:activator>
                <v-list-item-content>
                    <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                    <v-btn @click="openDialogItem(i)" icon>
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn @click="removeItem(items,i)" icon>
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </v-list-item-action>
            </template>

            <v-list-item v-for="(subItem, j) in item.subItems" :key="j" :to=" subItem.to">
                <v-list-item-content>
                    <v-list-item-title v-text="subItem.title"></v-list-item-title>
                </v-list-item-content>
                <v-btn @click="removeItem(item.subItems,j)" icon>
                    <v-icon>mdi-delete</v-icon>
                </v-btn>

            </v-list-item>
            <v-list-item>
                <v-list-item-icon>
                    <v-icon>mdi-plus</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>서브추가하기</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list-group>
        <v-list-item @click="openDialogItem(-1)">
            <v-list-item-icon>
                <v-icon>mdi-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title>추가하기</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </v-list>
    <v-dialog v-model="dialogItem" max-width="400">
        <v-card>
            <v-card-title>
                수정하기
                <v-spacer />
                <v-btn icon @click="saveItem">
                    <v-icon>mdi-content-save</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <v-text-field v-model="formItem.title"></v-text-field>
            </v-card-text>
        </v-card>
    </v-dialog>

</div>
=======
      <v-list-group
        v-for="(item, i) in items"
        :key="i"
        v-model="item.active"
        :prepend-icon="item.icon"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn @click="openDialogItem(i)" icon><v-icon>mdi-pencil</v-icon></v-btn>
          </v-list-item-action>
        </template>

        <v-list-item
          v-for="(subItem, j) in item.subItems"
          :key="j"
          :to="subItem.to"
        >
          <v-list-item-content>
            <v-list-item-title v-text="subItem.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>서브추가하기</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
      <v-list-item @click="openDialogItem(-1)">
        <v-list-item-icon>
          <v-icon>mdi-plus</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>추가하기</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-dialog v-model="dialogItem" max-width="400">
      <v-card>
        <v-card-title>
          수정하기
          <v-spacer/>
          <v-btn icon @click="saveItem"><v-icon>mdi-content-save</v-icon></v-btn>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="formItem.title"></v-text-field>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
>>>>>>> 9fd574b3781e37776dcaa9d349f5b4524f838dc1
</template>

<script>
export default {
<<<<<<< HEAD
    props: ['items'],
    data() {
        return {
            dialogItem: false,
            dialogSubItem: false,
            formItem: {
                icon: '',
                title: ''
            },
            selectedItemIndex: -1
        }
    },
    methods: {
        openDialogItem(index) {
            this.selectedItemIndex = index
            this.dialogItem = true
            if (index < 0) {
                this.formItem.title = ''
            } else {
                this.formItem.title = this.items[index].title
            }
        },
        saveItem() {
            if (this.selectedItemIndex < 0) {
                this.items.push(this.formItem)
            } else {
                this.items[this.selectedItemIndex] = this.formItem
            }
            this.save()
        },
        async save() {
            try {
                await this.$firebase.database().ref().child('site').update({
                    menu: this.items
                })
            } finally {
                this.dialogItem = false
            }
        },
        removeItem(items, i) {
            items.splice(i, 1)
            this.save()
        }

=======
  props: ['items'],
  data () {
    return {
      dialogItem: false,
      dialogSubItem: false,
      formItem: {
        icon: '',
        title: ''
      },
      selectedItemIndex: -1
    }
  },
  methods: {
    openDialogItem (index) {
      this.selectedItemIndex = index
      this.dialogItem = true
      if (index < 0) {
        this.formItem.title = ''
      } else {
        this.formItem.title = this.items[index].title
      }
    },
    saveItem () {
      if (this.selectedItemIndex < 0) {
        this.items.push(this.formItem)
      } else {
        this.items[this.selectedItemIndex] = this.formItem
      }
      this.save()
    },
    async save () {
      try {
        await this.$firebase.database().ref().child('site').update({ menu: this.items })
      } finally {
        this.dialogItem = false
      }
>>>>>>> 9fd574b3781e37776dcaa9d349f5b4524f838dc1
    }
  }
}
</script>
