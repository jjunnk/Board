<template>
<v-container fluid class="pa-0">
    <v-form>
        <v-card :loading="loading" :tile="$vuetify.breakpoint.xs" flat>
            <v-toolbar color="transparent" dense flat>
                <v-toolbar-title>게시판 정보 작성</v-toolbar-title>
                <v-spacer />
                <v-btn icon @click="$router.push('/board/' + boardId)">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-btn icon @click="save" :disabled="user && user.level !==0">
                    <v-icon>mdi-content-save</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text class="pb-0">
                <v-text-field v-model="form.category" outlined label="분류"></v-text-field>
                <v-text-field v-model="form.title" outlined label="게시판 이름"></v-text-field>
                <v-textarea v-model="form.description" outlined label="내용"></v-textarea>
            </v-card-text>
            <v-row class="pa-5 pt-0">
                <v-col cols="12" sm="6" md="6" lg="6">
                    <v-card>
                        <v-subheader>게시판 내 카테고리</v-subheader>
                        <v-card-text>
                            <v-chip label small outlined v-for="(item,i) in form.categories" :key="i" class="mr-2 mb-2" color="accent">{{item}}
                                <v-icon @click="removeCategory(item,i)">mdi-close</v-icon>
                            </v-chip>
                        </v-card-text>
                        <v-card-actions>
                            <div>
                                <v-text-field v-model="category" append-icon="mdi-plus" placeholder="ex) 공지" label="추가" hide-details dense outlined @click:append="saveCategory" @keypress.enter="saveCategory" />
                            </div>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col cols="12" sm="6" md="6" lg="6">
                    <v-card>
                        <v-subheader>등록된 태그</v-subheader>
                        <v-card-text>
                            <v-chip label small v-for="(item,i) in form.tags" :key="i" class="mr-2 mb-2" color="accent">{{item}}
                                <v-icon @click="removeTag(item,i)">mdi-close</v-icon>
                            </v-chip>
                        </v-card-text>
                        <v-card-actions>
                            <div>
                                <v-text-field v-model="tag" append-icon="mdi-plus" placeholder="ex) 투데이" label="등록" hide-details dense outlined @click:append="saveTag" @keypress.enter="saveTag" />
                            </div>
                        </v-card-actions>
                    </v-card>
                </v-col>

            </v-row>
        </v-card>
    </v-form>
</v-container>
</template>

<script>
export default {
    props: ['boardId', 'action'],
    data() {
        return {
            form: {
                category: '',
                title: '',
                description: '',
                categories: [],
                tags: []
            },
            exists: false,
            loading: false,
            ref: null,
            category: '',
            tag: ''
        }
    },
    computed: {
        user() {
            return this.$store.state.user
        }
    },
    watch: {
        boardId() {
            this.fetch()
        }
    },
    created() {
        this.fetch()
    },
    methods: {
        async fetch() {
            this.ref = this.$firebase.firestore().collection('boards').doc(this.boardId)
            const doc = await this.ref.get()
            this.exists = doc.exists
            if (this.exists) {
                const item = doc.data()
                this.form.category = item.category
                this.form.title = item.title
                this.form.description = item.description
                this.form.categories = item.categories
                this.form.tags = item.tags
            }
        },
        async save() {
            if (!this.$store.state.fireUser) throw Errow('로그인이 필요합니다') // 로그인 X 상태
            if (!this.form.category || !this.form.title) throw Error('분류,제목은 필수 입력 항목입니다')

            const form = {
                category: this.form.category,
                title: this.form.title,
                description: this.form.description,
                categories: this.form.categories,
                tags: this.form.tags,
                updatedAt: new Date(),
                uid: this.$store.state.fireUser.uid
            }
            this.loading = true

            try {
                if (!this.exists) { // 생성
                    form.createdAt = new Date()
                    form.count = 0
                    form.uid = this.$store.state.fireUser.uid
                    form.user = {
                        email: this.$store.state.user.email,
                        photoURL: this.$store.state.user.photoURL,
                        displayName: this.$store.state.user.displayName
                    }
                    form.categories = ['일반']
                    form.tags = ['vue', 'firebase']
                    await this.ref.set(form)
                } else {
                    await this.ref.update(form)
                }
                this.$router.push('/board/' + this.boardId)
            } finally {
                this.loading = false
            }
        },
        saveCategory() {
            if (this.category.length > 20) {
                alert('글자수를 초과했습니다. 20자 이내로 작성해주세요')
                return
            }
            const exists = this.form.categories.includes(this.category)
            if (exists) {
                alert('사용중인 카테고리입니다')
                return
            }
            this.form.categories.push(this.category)
            this.category = ''
        },
        async removeCategory(item, i) {
            const sn = this.ref.collection('articles').where('category', '==', item).limit(1).get()
            if (!sn.empty) alert('사용중인 카테고리입니다')
            this.form.categories.splice(i, 1)
        },
        saveTag() {
            if (this.tag.length > 20) {
                alert('글자수를 초과했습니다. 20자 이내로 작성해주세요')
                return
            }
            const exists = this.form.tags.includes(this.tag)
            if (exists) {
                alert('사용되고 있는 태그입니다')
                return
            }
            this.form.tags.push(this.tag)
            this.tag = ''

        },
        async removeTag(item, i) {
            const sn = await this.ref.collection('articles').where('tags', 'array-contains', item).limit(1).get()
            if (!sn.empty) alert('사용되고 있는 태그입니다')
            this.form.tags.splice(i, 1)
        }

    }
}
</script>
