<template>
<v-container fluid v-if="!loaded">
    <v-skeleton-loader type="article"></v-skeleton-loader>
</v-container>
<v-container fluid v-else-if="loaded && !article">
    <v-alert type="warning" border="left" class="mb-0">게시물이 존재하지 않습니다</v-alert>
</v-container>
<v-container fluid class="pa-0" v-else>
    <v-card class="mx-md-7 my-md-7 mx-lg-12">
        <v-divider />
        <v-toolbar color="transparent" dense flat>
            <v-toolbar-title>
                <v-chip color="success" class="mr-2" small label left v-if="newCheck(article.updatedAt)">new</v-chip>
                <v-chip outlined small label color="accent" class="rounded mr-4">{{article.category}}</v-chip>
                {{article.title}}
            </v-toolbar-title>
            <v-spacer />
            <template v-if="(fireUser && fireUser.uid === article.uid) || (user && user.level === 0)">
                <v-btn @click="articleWrite" icon>
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn @click="remove" icon>
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
            </template>
            <v-btn @click="back" icon>
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-toolbar>
        <v-divider />
        <v-row class="date-writer ma-0 pl-2">
            <v-col cols="3" sm="2" md="2" class="text-left ">
                작성일 : <display-time :time="article.createdAt" class="ml-2"></display-time>
            </v-col>
            <v-col cols="3" sm="2" md="2" class="text-left ">
                수정일 : <display-time :time="article.updatedAt" class="ml-2"></display-time>
            </v-col>
            <v-col cols="3" sm="2" md="2" class="text-left ">
                <v-icon left>mdi-eye</v-icon>
                <span>{{article.readCount}}</span>
            </v-col>
            <v-col cols="3" sm="2" md="2" class="text-left ">
                <v-icon left>mdi-comment</v-icon>
                <span>{{article.commentCount}}</span>
            </v-col>
            <v-col cols="12" sm="4" md="4" class="text-end ">
                작성자 :
                <display-user :user="article.user"></display-user>
            </v-col>
        </v-row>
        <v-divider />
        <v-card-text>
            <viewer v-if="content" :initialValue="content" max-height="100%"></viewer>
            <v-container v-else>
                <v-row justify="center" align="center">
                    <v-progress-circular indeterminate></v-progress-circular>
                </v-row>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-chip small label v-for="tag in article.tags" :key="tag" v-text="tag" class="mr-2" color="accent"></v-chip>
        </v-card-actions>
        <v-card-actions>
            <v-btn @click="like" class="ma-auto py-8 px-3 rounded-circle" outlined :color="liked ? 'success' : ''">
                <v-icon left :color="liked ? 'success' : ''">mdi-thumb-up</v-icon>
                <span>{{ article.likeCount}}</span>
            </v-btn>
        </v-card-actions>

        <v-card-actions>
            <v-row>
                <v-col cols="4" >
                    <v-btn text  @click="go(-1)" color="accent" >
                        <v-icon left>mdi-arrow-left</v-icon>
                        이전글
                    </v-btn>
                </v-col>
                <v-col cols="4" class="text-center">
                    <v-btn text  @click="back" color="accent" center>
                        <v-icon left>mdi-format-list-bulleted</v-icon>
                        목록
                    </v-btn>
                </v-col>
                <v-col cols="4" class="text-right">
                    <v-btn text  @click="go(+1)" color="accent" right>
                        <v-icon left>mdi-arrow-right</v-icon>
                        다음글
                    </v-btn>
                </v-col>
            </v-row>
        </v-card-actions>
        <v-divider />
        <display-comment :article="article" :docRef="ref" color="info"></display-comment>
    </v-card>
</v-container>
</template>

<script>
import axios from 'axios'
import DisplayTime from '@/components/display-time'
import DisplayComment from '@/components/display-comment'
import DisplayUser from '@/components/display-user'
import newCheck from '@/util/newCheck'

export default {
    components: {
        DisplayTime,
        DisplayComment,
        DisplayUser
    },
    props: ['boardId', 'articleId', 'user', 'category', 'tag'],
    data() {
        return {
            content: '',
            ref: null,
            unsubscribe: null,
            article: null,
            doc: null,
            newCheck,
            loaded: false
        }
    },
    computed: {
        // eslint-disable-next-line vue/no-dupe-keys
        user() {
            return this.$store.state.user
        },
        fireUser() {
            return this.$store.state.fireUser
        },
        liked() {
            if (!this.fireUser) return false
            return this.article.likeUids.includes(this.fireUser.uid)
            // includes -> likeUids array 에 속해있으면 true, 안속해있으면 false 
        }
    },
    watch: {
        boardId() {
            this.subscribe()
        },
        articleId() {
            this.subscribe()
        }
    },
    async created() {
        // await this.readCountUpdate()
        this.subscribe()
    },
    destroyed() {
        if (this.unsubscribe) this.unsubscribe()
    },
    methods: {
        async readCountUpdate() {
            await this.ref.update({
                readCount: this.$firebase.firestore.FieldValue.increment(1)
            })
        },
        subscribe() {
            if (this.unsubscribe) this.unsubscribe()

            this.ref = this.$firebase.firestore().collection('boards').doc(this.boardId).collection('articles').doc(this.articleId)
            this.ref.update({
                readCount: this.$firebase.firestore.FieldValue.increment(1)

            })

            this.loaded = false

            this.unsubscribe = this.ref.onSnapshot(doc => {
                this.loaded = true

                if (!doc.exists) {
                    this.back()
                    return
                }
                this.doc = doc // document 의 주소 가져오기
                const item = doc.data()
                item.createdAt = item.createdAt.toDate()
                item.updatedAt = item.updatedAt.toDate()
                if (!this.article || this.article.url !== item.url) this.fetch(item.url)
                this.article = item
            }, console.error)
        },
        async fetch(url) {
            this.content = ''
            const r = await axios.get(url)
            this.content = typeof r.data === 'string' ? r.data : r.data.toString()
        },
        async articleWrite() {
            this.$router.push({
                path: this.$route.path,
                query: {
                    action: 'write'
                }
            })
        },
        async remove() {
            await this.ref.delete()
        },
        back() {
            const us = this.$route.path.split('/')
            us.pop()
            if (this.category) {
                this.$router.push({
                    path: us.join('/'),
                    query: {
                        category: this.category
                    }
                })
            } else {
                this.$router.push({
                    path: us.join('/')
                })
            }
        },
        async like() {
            if (!this.fireUser) throw Error('로그인이 필요합니다')
            if (this.liked) {
                await this.ref.update({
                    likeCount: this.$firebase.firestore.FieldValue.increment(-1),
                    likeUids: this.$firebase.firestore.FieldValue.arrayRemove(this.fireUser.uid)
                })
            } else {
                await this.ref.update({
                    likeCount: this.$firebase.firestore.FieldValue.increment(1),
                    likeUids: this.$firebase.firestore.FieldValue.arrayUnion(this.fireUser.uid)
                })
            }
        },
        async go(arrow) {
            if (!this.doc) throw Error('읽지 못하였습니다')
            const ref = this.$firebase.firestore()
                .collection('boards').doc(this.boardId)
                .collection('articles').where('category', '==', this.category).orderBy('createdAt', 'desc')
            let sn
            if (arrow < 0) sn = await ref.endBefore(this.doc).limitToLast(1).get() // 전 도큐먼트
            else sn = await ref.startAfter(this.doc).limit(1).get() // 다음 도큐먼트
            if (sn.empty) throw Error('더이상 페이지가 없습니다')
            const doc = sn.docs[0]

            const us = this.$route.path.split('/')
            us.pop()
            us.push(doc.id)
            if (this.category) this.$router.push({
                path: us.join('/'),
                query: {
                    category: this.category
                }
            })
            else this.$router.push({
                path: us.join('/')
            })

            this.$router.push({
                path: us.join('/')
            })
        }
    }
}
</script>

<style scoped>
.date-writer {
    font-size: 0.7em;
}

.date-writer .col {
    line-height: 32px;
    padding: 4px;
}

@media screen and (max-width:960px){
    .v-main__wrap .theme--dark.v-card{border:none !important}

}
</style>
