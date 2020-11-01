<template>
<v-card>
    <v-divider class="mx-4" vertical color="#999" />
    <v-toolbar flat>
        <span>Article Title</span>
        <v-divider class="mx-4" vertical color="#999"></v-divider>
        <v-toolbar-title>{{item.title}}</v-toolbar-title>
        <v-spacer />
        <v-btn icon @click="articleWrite">
            <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon @click="remove">
            <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-btn icon @click="$emit('close')">
            <v-icon>mdi-close</v-icon>
        </v-btn>
    </v-toolbar>
    <v-card-actions>
        <v-row>
            <v-col cols="6" style="border-right:1px solid #999;">작성일 : <display-time :time="item.createdAt"></display-time>
            </v-col>
            <v-col cols="6">수정일 : <display-time :time="item.updatedAt"></display-time>
            </v-col>
        </v-row>
    </v-card-actions>
    <v-card-text>
        <viewer v-if="content" :initialValue="content"></viewer>
        <v-container v-else>
            <v-row justify="center" align="center">
                <v-progress-circular indeterminate></v-progress-circular>
            </v-row>
        </v-container>
    </v-card-text>
    <display-comment :docRef="this.ref.collection('articles').doc(this.item.id)">댓글</display-comment>
</v-card>
</template>

<!--initialValue는 한번만 작동.렌더링해주려면 content 가 있을때 채워지도록.
content가 없으면 v - container 
docRef = comment를 사용할 document의 레퍼런스 주소
-->

<script>
import axios from 'axios'
import DisplayTime from '@/components/display-time'
import DisplayComment from '@/components/display-comment'

export default {
    props: ['document', 'item'],
    components: {
        DisplayTime,
        DisplayComment
    },
    data() {
        return {
            content: '',
            ref: this.$firebase.firestore().collection('boards').doc(this.document)
        }
    },
    mounted() {
        // console.log('mounted')
        this.fetch()
    },
    methods: {
        async fetch() {
            const r = await axios.get(this.item.url)
            this.content = r.data
            await this.ref.collection('articles').doc(this.item.id)
                .update({
                    readCount: this.$firebase.firestore.FieldValue.increment(1)
                })
        },
        async articleWrite() {
            this.$router.push({
                path: this.$route.path + '/article-write',
                query: {
                    articleId: this.item.id
                }
            })
        },
        async remove() {
            const batch = this.$firebase.firestore().batch()
            batch.update(this.ref, {
                count: this.$firebase.firestore.FieldValue.increment(-1)
            })
            batch.delete(this.ref.collection('articles').doc(this.item.id))
            await batch.commit()
            // 아티클 게시물 삭제하려면 count, 게시물, storage 파일 => 3 개를 삭제해야함
            //await this.ref.update({ count: this.$firebase.firestore.FieldValue.increment(-1)})  -> 조회수
            // await this.ref.collection('articles').doc(this.item.id).delete() -> 게시물 삭제
            await this.$firebase.storage().ref().child('boards').child(this.document).child(this.item.id + '.md').delete() // storage 파일 삭제
            this.$emit('close')
        }

    }
}
</script>

<style scoped>
.v-card {
    padding: 0 20px;
}

.v-toolbar__content,
.v-toolbar__extension {
    padding: 4px 0 !important;
}

.v-toolbar__content span,
.v-toolbar__title {
    font-size: 1.1rem
}

header {
    border-top: 1px solid #999 !important;
    border-bottom: 1px solid #999 !important;
}

.v-dialog>.v-card>.v-card__text {
    padding: 24px 0;
}

/* 작성일 수정일*/
.v-card__actions {
    border-bottom: 1px solid #999;
    padding: 4px
}
</style>
