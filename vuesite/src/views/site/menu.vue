<template>
<div>
    <v-list-item three-line>
        <v-list-item-content>
            <v-list-item-title class="title">
                Menu
            </v-list-item-title>
            <v-list-item-subtitle>
                0.0.1
            </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
            <v-btn icon @click="$store.commit('setEdit', !$store.state.editable)">
                <v-icon v-text="$store.state.editable ? 'mdi-eye' : 'mdi-pencil'"></v-icon>
            </v-btn>
        </v-list-item-action>
    </v-list-item>
    <v-divider></v-divider>
    <v-list>
        <v-list-group v-for="(item, i) in items" :key="i" v-model="item.active" :prepend-icon="item.icon" :no-action="!$store.state.editable">
            <template v-slot:activator>
                <v-list-item-content>
                    <v-list-item-title>
                        {{ item.title }}
                        <span v-if="$store.state.editable">
                            <v-btn icon @click="openDialog(i)">
                                <v-icon>mdi-pencil</v-icon>
                            </v-btn>
                            <v-btn icon @click="removeItem(items, i)">
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                        </span>
                    </v-list-item-title>
                </v-list-item-content>
            </template>

            <v-list-item v-for="(subItem, j) in item.subItems" :key="j" :to="$store.state.editable ? null : subItem.to" exact>
                <v-list-item-content :class="$store.state.editable ? 'pl-4' : ''">
                    <v-list-item-title>{{ subItem.title }}
                        <span v-if="$store.state.editable">
                            <v-btn icon @click="openDialogSubItem(i, j)">
                                <v-icon>mdi-pencil</v-icon>
                            </v-btn>
                            <v-btn icon @click="removeItem(item.subItems, i)">
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                        </span>
                    </v-list-item-title>
                </v-list-item-content>
                <v-list-item-action v-if="$store.state.editable">
                    <v-btn icon :to="subItem.to" exact>
                        <v-icon>mdi-arrow-right</v-icon>
                    </v-btn>
                </v-list-item-action>
            </v-list-item>
            <v-list-item @click="openDialogSubItem(i, -1)" v-if="$store.state.editable">
                <v-list-item-icon :class="$store.state.editable ? 'pl-4' : ''">
                    <v-icon>mdi-plus</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>메뉴 추가/수정</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list-group>

        <v-list-item @click="openDialog(-1)" v-if="$store.state.editable">
            <v-list-item-icon>
                <v-icon>mdi-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title>메뉴 추가/수정</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </v-list>
    <v-dialog v-model="dialogItem" max-width="400">
        <v-card>
            <v-card-title>
                메뉴 추가/수정
                <v-spacer></v-spacer>
                <v-btn icon @click="saveItem" color="success">
                    <v-icon> mdi-content-save</v-icon>
                </v-btn>
                <v-btn icon @click="dialogItem = false">
                    <v-icon> mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="2">
                        <v-icon v-text="formItem.icon" required></v-icon>
                    </v-col>
                    <v-col cols="10">
                        <v-text-field v-model="formItem.icon" label="mdi-icon" outlined clearable required></v-text-field>
                    </v-col>
                </v-row>
                <v-text-field v-model="formItem.title" outlined hide-details></v-text-field>
            </v-card-text>
        </v-card>
    </v-dialog>
    <v-dialog v-model="dialogSubItem" max-width="400">
        <v-card>
            <v-card-title>
                서브 메뉴 추가/수정
                <v-spacer />
                <v-btn icon @click="saveSubItem" color="success">
                    <v-icon> mdi-content-save</v-icon>
                </v-btn>
                <v-btn icon @click="dialogSubItem = false">
                    <v-icon> mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <v-text-field v-model="formSubItem.title" label="메뉴 이름" outlined hide-details class="mt-7 mb-9"></v-text-field>
                <v-text-field v-model="formSubItem.to" label="메뉴 경로" outlined hide-details></v-text-field>
            </v-card-text>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
export default {
    props: ["items"],
    data() {
        return {
            loading: false,
            dialogItem: false,
            dialogSubItem: false,
            formItem: {
                title: "",
                icon: ""
            },
            formSubItem: {
                title: "",
                to: ""
            },
            selectedItemIndex: 0,
            selectedSubItemIndex: 0
        };
    },
    methods: {
        async save() {
            try {
                this.loading = true;
                await this.$firebase
                    .database()
                    .ref()
                    .child("site")
                    .child("menu")
                    .set(this.items);
            } finally {
                this.dialogItem = false;
                this.dialogSubItem = false;
                this.loading = false;
            }
        },

        openDialog(index) {
            this.selectedItemIndex = index;
            if (index < 0) {
                this.formItem.title = "";
                this.formItem.icon = "";
            } else {
                this.formItem.title = this.items[index].title;
                this.formItem.icon = this.items[index].icon;
            }
            this.dialogItem = true;
        },
        async saveItem() {
            if (this.selectedItemIndex < 0) {
                this.items.push(this.formItem);
            } else {
                this.items[this.selectedItemIndex].icon = this.formItem.icon;
                this.items[this.selectedItemIndex].title = this.formItem.title;
            }
            this.save();
        },
        openDialogSubItem(index, subIndex) {
            this.selectedItemIndex = index;
            this.selectedSubItemIndex = subIndex;
            if (subIndex < 0) {
                this.formSubItem.title = "";
                this.formSubItem.to = "";
            } else {
                this.formSubItem.title = this.items[index].subItems[subIndex].title;
                this.formSubItem.to = this.items[index].subItems[subIndex].to;
            }
            this.dialogSubItem = true;
        },
        async saveSubItem() {
            if (this.selectedSubItemIndex < 0) {
                if (!this.items[this.selectedItemIndex].subItems)
                    this.items[this.selectedItemIndex].subItems = [];
                this.items[this.selectedItemIndex].subItems.push({
                    title: this.formSubItem.title,
                    to: this.formSubItem.to
                });
            } else {
                this.items[this.selectedItemIndex].subItems[
                    this.selectedSubItemIndex
                ].to = this.formSubItem.to;
                this.items[this.selectedItemIndex].subItems[
                    this.selectedSubItemIndex
                ].title = this.formSubItem.title;
            }
            this.save();
        },
        removeItem(items, i) {
            items.splice(i, 1);
            this.save();
        }
    }
};
</script>
