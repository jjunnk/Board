<template >
<v-sheet>
<v-container class="px-lg-0 py-md-7 py-sm-4  pa-xs-4" max-width="980px">
    <v-card outlined :tile="$vuetify.breakpoint.xs" v-if="items.length" :class="listBg()">
        <v-toolbar color="transparent" flat>
            <v-toolbar-title class="text-h5 font-weight-bold" color="primary">게시판 목록</v-toolbar-title>
            <v-spacer />
        </v-toolbar>
        <v-card-text>
            <v-row>
                <v-col cols="12" v-if="user && user.level === 0">
                    <v-card height="100%" color="base">
                        <v-subheader>
                            새로운 게시판 추가
                        </v-subheader>
                        <v-divider />
                        <v-card-text>
                            <v-text-field v-model="boardId" label="게시판 아이디" placeholder="게시판 링크에 사용될 게시판 아이디를 입력하세요" outlined />
                        </v-card-text>
                        <v-card-actions v-if="boardId">
                            <v-btn :to="`${$route.path}/${boardId}`" x-large color="primary" text block>
                                <v-icon left>mdi-plus</v-icon>
                                추가
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col cols="12" v-for="(item) in items" :key="item.id">
                    <v-card height="100%" color="base" >
                        <v-subheader>
                            <v-chip color="success" class="mr-2" small label left v-if="newCheck(item.updatedAt)">new</v-chip>
                            {{item.title}}
                            <v-spacer />
                            <template v-if="user && user.level === 0">
                                <v-btn icon :to="`${$route.path}/${item.id}?&action=write`">
                                    <v-icon>mdi-pencil</v-icon>
                                </v-btn>
                                <v-btn icon @click="remove(item)">
                                    <v-icon>mdi-delete</v-icon>
                                </v-btn>
                            </template>
                        </v-subheader>
                        <v-divider />
                        <v-card-text>
                            <v-alert border="left" type="info" outlined class="white-space" :color="$vuetify.theme.dark ? 'primary' : 'success'">{{item.description}}</v-alert>
                        </v-card-text>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title>
                                    게시물수
                                </v-list-item-title>
                                <v-list-item-subtitle class="font-italic">
                                    {{item.count}}
                                </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        <v-divider />
                        <v-list-item :to="`${$route.path}/${item.id}`">
                            <v-list-item-content>
                                전체
                            </v-list-item-content>
                            <v-list-item-action>
                                <v-btn icon>
                                    <v-icon>mdi-menu-right</v-icon>
                                </v-btn>
                            </v-list-item-action>
                        </v-list-item>
                        <v-divider />
                        <template v-for="(category, i) in item.categories">
                            <v-list-item :key="category" :to="`${$route.path}/${item.id}?category=${category}`">
                                <v-list-item-content>
                                    {{category}}
                                </v-list-item-content>
                                <v-list-item-action>
                                    <v-btn icon>
                                        <v-icon>mdi-menu-right</v-icon>
                                    </v-btn>
                                </v-list-item-action>
                            </v-list-item>
                            <v-divider :key="i" />
                        </template>
                    </v-card>
                </v-col>
                <v-col cols="12" sm="6" md="4" lg="3" xl="2" v-if="lastDoc">
                    <v-container fluid fill-height>
                        <v-btn @click="more" v-intersect="onIntersect" text color="primary" block :loading="loading">
                            <v-icon>mdi-dots-horizontal</v-icon>더보기
                        </v-btn>
                    </v-container>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
    <v-skeleton-loader v-else type="card"></v-skeleton-loader>
</v-container>

</v-sheet>
</template>

<script>
import {
    last
} from 'lodash'
import newCheck from '@/util/newCheck'

const LIMIT = 5
export default {
    data() {
        return {
            unsubscribe: null,
            items: [],
            ref: null,
            lastDoc: null,
            order: 'createdAt',
            sort: 'desc',
            boardId: '',
            loading: false,
            newCheck,
            BgColor:'#FEFCF5 !important'
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
        snapshotToItems(sn) {
            this.lastDoc = last(sn.docs)
            sn.docs.forEach(doc => {
                const findItem = this.items.find(item => doc.id === item.id)
                const item = doc.data()
                if (!findItem) {
                    item.id = doc.id
                    item.createdAt = item.createdAt.toDate()
                    item.updatedAt = item.updatedAt.toDate()
                    this.items.push(item)
                } else {
                    findItem.category = item.category
                    findItem.title = item.title
                    findItem.count = item.count
                    findItem.description = item.description
                    findItem.categories = item.categories
                    findItem.tags = item.tags
                    findItem.updatedAt = item.updatedAt.toDate()
                }
            })
            this.items.sort((before, after) => {
                return Number(after.createdAt.getTime()) - Number(before.createdAt.getTime())
            })
        },
        subscribe() {
            this.ref = this.$firebase.firestore()
                .collection('boards')
                .orderBy(this.order, this.sort).limit(LIMIT)
            this.unsubscribe = this.ref.onSnapshot(sn => {
                if (sn.empty) {
                    this.items = []
                    return
                }
                this.snapshotToItems(sn)
            })
        },
        async more() {
            if (!this.lastDoc) throw Error('더이상 데이터가 없습니다')
            if (this.loading) return
            this.loading = true
            try {
                const sn = await this.ref.startAfter(this.lastDoc).get()
                this.snapshotToItems(sn)
            } finally {
                this.loading = false
            }
        },
        onIntersect(entries, observer, isIntersecting) {
            if (isIntersecting) this.more()
        },
        async remove(item) {
            await this.$firebase.firestore()
                .collection('boards').doc(item.id).delete()
            const i = this.items.findIndex(el => el.id === item.id)
            this.items.splice(i, 1)
        },
        listBg(){
            return this.$vuetify.theme.dark ? 'listBgDark' : 'listBgLight'
        }
    }
}
</script>
<style scoped>

.lightTheme{
    background-color:#FEFCF5 !important;
    }
.listBgLight{background-color:#fff !important;border:4px solid #ebdaca;}
.listBgDark{background-color:#0D0D0D !important;border:none !important;}
.v-main__wrap > .v-sheet.theme--light{background-color:#FEFCF5  !important;}

.row > .col > .v-card.theme--dark{border: 1px solid #655d5d !important;}
</style>
