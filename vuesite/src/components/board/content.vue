<template>
<v-container>
    <v-card outlined :item="$vuetify.breakpoint.xs" v-if="board">
        <v-toolbar color="primary" dense flat>
            <v-toolbar-title v-text="board.title"></v-toolbar-title>
            <v-spacer />
            <v-btn icon @click="dialog=true">
                <v-icon>mdi-information-outline</v-icon>
            </v-btn>
            <template v-if="user">
                <v-btn icon @click="articleWrite" :disabled="!user">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </template>
        </v-toolbar>
        <v-divider />
        <board-article :boardId="boardId" :board="board"></board-article>
        <v-dialog v-model="dialog" max-width="400">
            <v-card class="px-3">
                <v-toolbar color="transparent" flat>
                    <v-toolbar-title class="font-weight-bold">게시판 정보</v-toolbar-title>
                    <v-spacer />
                    <v-btn icon @click="write" :disabled="user && user.level > 0">
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn icon @click="dialog=false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-divider class="mb-4" />
                <v-row class="mx-0">
                    <v-col cols="3">작성자</v-col>
                    <v-divider vertical color="#edbbba" />
                    <v-col cols="7">
                        <display-user :user="board.user"></display-user>
                    </v-col>
                </v-row>
                <v-row class="mx-0">
                    <v-col cols="3">작성일</v-col>
                    <v-divider vertical color="#edbbba" />
                    <v-col cols="7">
                        <display-time :time="board.createdAt"></display-time>
                    </v-col>
                </v-row>
                <v-row class="mx-0">
                    <v-col cols="3">수정일</v-col>
                    <v-divider vertical color="#edbbba" />
                    <v-col cols="7">
                        <display-time :time="board.updatedAt"></display-time>
                    </v-col>
                </v-row>
                <v-row class="mx-0">
                    <v-col cols="3">게시물수</v-col>
                    <v-divider vertical color="#edbbba" />
                    <v-col cols="7">{{board.count}} </v-col>
                </v-row>
                <v-row class="mx-0">
                    <v-col cols="3">분류</v-col>
                    <v-divider vertical color="#edbbba" />
                    <v-col cols="7">
                        <v-chip v-for="item in board.categories" :key="item" v-text="item" class="mb-2 mr-2 rounded"></v-chip>
                    </v-col>
                </v-row>
                <v-row class="mx-0">
                    <v-col cols="3">태그</v-col>
                    <v-divider vertical color="#edbbba" />
                    <v-col cols="7">
                        <v-chip v-for="item in board.tags" :key="item" v-text="item" class="mb-2 mr-2 rounded" outlined></v-chip>
                    </v-col>
                </v-row>
                <v-row class="mx-0">
                    <v-col cols="3">설명</v-col>
                    <v-divider vertical color="#edbbba" />
                    <v-col cols="7" class="comment" v-text="board.description"></v-col>
                </v-row>
                <v-spacer />
                <v-col class="d-flex justify-end">
                    <v-btn icon @click="dialog=false">닫기<v-icon small>mdi-close</v-icon>
                    </v-btn>
                </v-col>
            </v-card>
        </v-dialog>
    </v-card>
</v-container>
</template>

<script>
import BoardArticle from './article/index'
import DisplayTime from '@/components/display-time'
import DisplayUser from '@/components/display-user'

export default {
    props: ['boardId'],
    components: {
        BoardArticle,
        DisplayTime,
        DisplayUser
    },
    data() {
        return {
            unsubscribe: null,
            loading: false,
            dialog: false,
            board: null
        }
    },
    watch: {
        boardId() {
            this.subscribe()
        }
    },
    computed: {
        user() {
            return this.$store.state.user
        }
    },
    created() {
        this.subscribe()
    },
    destroyed() {
        if (this.unsubscribe) this.unsubscribe()
    },
    methods: {
        subscribe() {
            if (this.unsubscribe) this.unsubscribe()
            const ref = this.$firebase.firestore().collection('boards').doc(this.boardId)
            this.unsubscribe = ref.onSnapshot(doc => {
                if (!doc.exists) return this.write()
                const item = doc.data()
                item.createdAt = item.createdAt.toDate()
                item.updatedAt = item.updatedAt.toDate()
                this.board = item
            }, console.error)
        },
        async write() {
            this.$router.push({
                path: this.$route.path,
                query: {
                    action: 'write'
                }
            })
        },
        async articleWrite() {
            this.$router.push({
                path: this.$route.path + '/new',
                query: {
                    action: 'write'
                }
            })
        }
    }
}
</script>

<style scoped>
.v-toolbar.primary .theme--light.v-btn.v-btn--icon,
.v-toolbar.primary .v-toolbar__title {
    color: #fff;
}

.v-dialog__content div {
    color: #383644;
}

.comment {
    white-space: pre-wrap;
}

.v-list-item {
    flex-wrap: wrap;
    margin: 5px 0;
}

.col-3 {
    font-weight: bold;
    font-size: .9em;
}

.col-7 {
    font-size: .85em;
}
</style>
