<template>
<v-container class="pa-0">
    <v-card-title>
        <v-textarea rows="1" append-icon="mdi-send" @click:append="save" v-model="comment" label="댓글 작성" placeholer="Ctrl + Enter로 댓글 작성 가능" outlined hide-details auto-grow @keypress.ctrl.enter="save" color="accent">
        </v-textarea>
    </v-card-title>
    <template v-for="(item, i) in items">
        <v-list-item :key="item.id">
            <v-list-item-action>
                <display-user :user="item.user" color="primary"></display-user>
            </v-list-item-action>
            <v-list-item-content class="flex-nowrap flex-column flex-sm-row flex-md-row flex-lg-row">
                <v-list-item-subtitle v-if="!item.edit" color="primary" class="comment" auto-grow>
                    <v-chip color="success" class="mr-2" small label outlined v-if="newCheck(item.updatedAt)">new</v-chip>
                    {{item.comment}}
                </v-list-item-subtitle>
                <v-list-item-subtitle v-else class="comment">
                    <v-textarea v-model="item.comment" outlined label="댓글 수정" placeholder="Ctrl + Enter 를 누르면 저장됩니다" append-icon="mdi-comment-edit" @click:append="update(item)" @keypress.ctrl.enter="update(item)" hide-details auto-grow rows="1" class="comment " color="accent" clearable>
                    </v-textarea>
                </v-list-item-subtitle>
                <v-list-item-subtitle class="text-end time" max-width="100px">
                    <display-time :time="item.createdAt"></display-time>
                </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
                <v-btn text @click="like(item)">
                    <v-icon left :color="liked(item) ? 'success' : '#444'">mdi-thumb-up</v-icon>
                    <span>{{ item.likeCount}}</span>
                </v-btn>
                <v-btn icon @click="item.edit =! item.edit" v-if="(fireUser && fireUser.uid ===item.uid) " :color="item.edit ? 'accent' : ''">
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon @click="remove(item)" v-if="(fireUser && fireUser.uid ===item.uid) || (user && user.level === 0)">
                    <v-icon>mdi-delete</v-icon>
                </v-btn>

            </v-list-item-action>
        </v-list-item>
        <v-divider :key="i" v-if="i < items.length -1"></v-divider>
    </template>
    <v-list-item>
        <v-btn :loading="loading" v-if="lastDoc && items.length < article.commentCount" v-intersect="onIntersect" @click="more" text color="accent" block outlined>더보기</v-btn>
    </v-list-item>
</v-container>
</template>

<script>
import {
    last
} from 'lodash'
import DisplayTime from '@/components/display-time'
import DisplayUser from '@/components/display-user'
import newCheck from '@/util/newCheck'

const LIMIT = 5

export default {
    props: ['article', 'docRef'],
    components: {
        DisplayTime,
        DisplayUser
    },
    data() {
        return {
            comment: '',
            items: [],
            unsubscribe: null,
            // limit: 5
            lastDoc: null,
            loading: false,
            newCheck
        }
    },
    computed: {
        user() {
            return this.$store.state.user
        },
        fireUser() {
            return this.$store.state.fireUser
        }
    },
    watch: {
        docRef() { // docRef 바뀔때마다 subscribe한다
            this.subscribe()
        }
    },
    created() {
        this.subscribe()
    },
    destroyed() {
        if (this.unsubscribe) this.unsubscribe()
    },
    methods: {
        snapshotToItems(sn) {
            this.lastDoc = last(sn.docs)
            sn.docs.forEach(doc => {
                const exists = this.items.some(item => doc.id === item.id)
                if (!exists) {
                    const item = doc.data()
                    item.id = doc.id
                    item.createdAt = item.createdAt.toDate()
                    item.updatedAt = item.updatedAt.toDate()
                    item.edit = false
                    this.items.push(item)
                    // toDate : Convert a Timestamp to a JavaScript Date object. 
                }
            })
            this.items.sort((before, after) => {
                const beforeId = Number(before.id)
                const afterId = Number(after.id)
                return afterId - beforeId
            })
        },
        subscribe() {
            if (this.unsubscribe) this.unsubscribe()
            this.items = [] // 초기화
            this.unsubscribe = this.docRef.collection('comments').orderBy('createdAt', 'desc').limit(LIMIT).onSnapshot(sn => {
                // console.log(sn)
                if (sn.empty) {
                    this.items = []
                    return
                }
                this.snapshotToItems(sn)
            })
        },
        async more() {
            if (!this.lastDoc) alert('더이상 데이터가 없습니다')
            if (this.loading) return
            this.loading = true
            try {
                const sn = await this.docRef.collection('comments').orderBy('createdAt', 'desc').startAfter(this.lastDoc).limit(LIMIT).get()
                this.snapshotToItems(sn)
            } finally {
                this.loading = false
            }
        },
        onIntersect(entries, observer, isIntersecting) {
            // console.log(isIntersecting)
            if (isIntersecting) this.more()
        },
        async save() {
            if (!this.fireUser) alert('로그인이 필요합니다')
            if (!this.comment) {
                alert('댓글을 작성해주세요')
                return
            }
            if (this.comment.length > 300) {
                alert('300자를 초과하였습니다. 300자 이내로 작성해주세요')
                return
            }
            const doc = {
                createdAt: new Date(),
                updatedAt: new Date(),
                comment: this.comment,
                uid: this.$store.state.fireUser.uid,
                user: {
                    email: this.user.email,
                    photoURL: this.user.photoURL,
                    displayName: this.user.displayName
                },
                likeCount: 0,
                likeUids: []
            }
            const id = doc.createdAt.getTime().toString()
            // const batch = this.$firebase.firestore().batch()
            // batch.update(this.docRef, {
            //     commentCount: this.$firebase.firestore.FieldValue.increment(1)
            // })
            // batch.set(this.docRef.collection('comments').doc(id), doc)
            // await batch.commit()
            this.docRef.collection('comments').doc(id).set(doc)
            this.comment = ''

        },
        liked(item) {
            if (!this.fireUser) return false
            return item.likeUids.includes(this.fireUser.uid)
        },
        async like(comment) {
            if (!this.fireUser) throw Error('로그인이 필요합니다')
            if (this.liked(comment)) {
                await this.docRef.collection('comments').doc(comment.id).update({
                    likeCount: this.$firebase.firestore.FieldValue.increment(-1),
                    likeUids: this.$firebase.firestore.FieldValue.arrayRemove(this.fireUser.uid)
                })
            } else {
                await this.docRef.collection('comments').doc(comment.id).update({
                    likeCount: this.$firebase.firestore.FieldValue.increment(1),
                    likeUids: this.$firebase.firestore.FieldValue.arrayUnion(this.fireUser.uid)
                })
            }
            const doc = await this.docRef.collection('comments').doc(comment.id).get()
            const item = doc.data()
            comment.likeCount = item.likeCount
            comment.likeUids = item.likeUids
        },
        async remove(comment) {
            await this.docRef.collection('comments').doc(comment.id).delete()
            const i = this.items.findIndex(el => el.id === comment.id) // 지우는 댓글 인덱스가 몇번째인지 찾음
            this.items.splice(i, 1) // i로부터 1개 지운다. 
        },
        async update(comment) {
            comment.updatedAt = new Date()
            try {
                await this.docRef.collection('comments').doc(comment.id).update(comment)
            } finally {
                comment.edit = false
            }
        }
    }
}
</script>

<style scoped>
.comment {
    white-space: pre-wrap;
    flex: 0 0 80%
}

.time {
    font-size: small
}
</style>
