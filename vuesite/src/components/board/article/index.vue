<template>
<div>
    <v-data-table :headers="headers" :items="items" :server-items-length="board.count" :options.sync="options" :items-per-page="5" :footer-props="{
      'items-per-page-options':[5, 10, 20, 30],
    }" must-sort item-key="id" color="info">
        <template v-slot:[`item.category`]="{item}">
            <v-chip v-if="category != item.category" color="info" label depressed small>{{item.category}}</v-chip>
        </template>
        <template v-slot:[`item.createdAt`]="{item}">
            <display-time :time="item.createdAt"></display-time>
        </template>
        <template v-slot:[`item.title`]="{item}">
            <a @click="read(item)" color="#383644" :to="category ? `${boardId}/${item.id}?category=${category}`: `${boardId}/${item.id}`">{{item.title}}</a>
        </template>
        <template v-slot:[`item.user.displayName`]="{item}">
            <display-user :user="item.user"></display-user>
        </template>
    </v-data-table>
    <v-container fluid v-if="!items">
        <v-alert type="warning" border="left" class="mb-0 pl-3">
            게시물이 없습니다
            <v-icon>mdi-plus</v-icon> 버튼을 눌러서 게시물을 작성하세요
        </v-alert>
    </v-container>
</div>
</template>

<script>
import {
    head,
    last
} from 'lodash'
import DisplayTime from '@/components/display-time'
import DisplayUser from '@/components/display-user'

const LIMIT = 5

export default {
    props: ['board', 'boardId', 'category', 'tag'],
    components: {
        DisplayTime,
        DisplayUser
    },
    data() {
        return {
            headers: [{
                    value: 'category',
                    text: '카테고리'
                }, {
                    value: 'createdAt',
                    text: '작성일'
                },
                {
                    value: 'title',
                    text: '제목'
                },
                {
                    value: 'user.displayName',
                    text: '작성자'
                },
                {
                    value: 'readCount',
                    text: '조회수'
                },
                {
                    value: 'commentCount',
                    text: '댓글'
                }
            ],
            items: [],
            unsubscribe: null,
            options: {
                sortBy: ['createdAt'],
                sortDesc: [true]
            },
            docs: [],
        }
    },
    watch: {
        boardId() {
            this.subscribe()
        },
        category() {
            this.subscribe()
        },
        options: {
            handler(n, o) {
                if (!o.page) {
                    this.subscribe(0)
                    return
                }
                if (head(o.sortBy) !== head(n.sortBy) || head(o.sortDesc) !== head(n.sortDesc)) {
                    n.page = 1
                    this.subscribe(0)
                    return
                }
                const arrow = n.page - o.page
                this.subscribe(arrow)
            },
            deep: true
        },
        dialog(n) {
            if (!n) this.selectedItem = null
        }
    },
    created() {
        // this.subscribe(0)
    },
    destroyed() {
        if (this.unsubscribe) this.unsubscribe()
    },
    methods: {
        subscribe(arrow) {
            if (this.unsubscribe) this.unsubscribe()
            this.items = []
            const order = this.options.sortBy[0]
            const sort = this.options.sortDesc[0] ? 'desc' : 'asc'
            const limit = this.options.itemsPerPage

            if (!this.category) {
                this.ref = this.$firebase.firestore().collection('boards').doc(this.boardId).collection('articles').orderBy(order, sort).limit(LIMIT)

            } else {
                this.ref = this.$firebase.firestore().collection('boards').doc(this.boardId).collection('articles').where('category', '==', this.category).orderBy(order, sort).limit(LIMIT)
            }

            const ref = this.$firebase.firestore().collection('boards').doc(this.boardId).collection('articles').orderBy(order, sort)
            let query
            switch (arrow) {
                case -1:
                    query = ref.endBefore(head(this.docs)).limitToLast(limit)
                    break
                case 1:
                    query = ref.startAfter(last(this.docs)).limit(limit)
                    break
                default:
                    query = ref.limit(limit)
                    break
            }

            this.unsubscribe = query.onSnapshot(sn => {
                if (sn.empty) {
                    this.items = []
                    return
                }
                this.docs = sn.docs
                this.items = sn.docs.map(doc => {
                    const item = doc.data()
                    item.id = doc.id
                    item.createdAt = item.createdAt.toDate()
                    item.updatedAt = item.updatedAt.toDate()
                    return item
                })
            })

        },
        read(item) {
            this.$router.push({
                path: this.$route.path + '/' + item.id
            })
        }
    }
}
</script>

<style scoped>
a {
    color: #383644;
}

.theme--light.v-data-table>.v-data-table__wrapper>table>tbody>tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background: #fceaea !important
}
</style>
