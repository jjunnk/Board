<template>
  <v-container fluid v-if="!loaded">
    <v-skeleton-loader type="board"></v-skeleton-loader>
  </v-container>
  <v-container fluid v-else-if="loaded && !board">
    <v-alert type="warning" border="left" class="mb-0"
      >게시판 정보를 불러오지 못했습니다</v-alert
    >
  </v-container>
  <v-container v-else>
    <v-card
      outlined
      :item="$vuetify.breakpoint.xs"
      class="mx-lg-0 my-md-7 my-sm-4 ma-xs-4"
    >
      <v-toolbar :color="$vuetify.theme.dark ? 'primary' : 'secondary'" dense flat>
        <v-toolbar-title class="font-weight-bold" v-text="board.title"> </v-toolbar-title>
        <v-spacer />
        <v-sheet width="120" class="rounded">
          <v-select
            :value="getCategory"
            :items="board.categories"
            @change="changeCategory"
            solo
            dense
            single-line
            hide-details
          />
        </v-sheet>
        <v-btn icon @click="dialog = true" color="primary">
          <v-icon>mdi-information-outline</v-icon>
        </v-btn>
        <template v-if="user">
          <v-btn icon @click="articleWrite" :disabled="!user" color="primary">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
      </v-toolbar>
      <v-divider />
      <board-article
        :boardId="boardId"
        :board="board"
        :category="category"
      ></board-article>
      <v-dialog v-model="dialog" max-width="400">
        <v-card class="px-3">
          <v-toolbar color="transparent" flat>
            <v-toolbar-title class="font-weight-bold" color="primary"
              >게시판 정보</v-toolbar-title
            >
            <v-spacer />
            <v-btn icon @click="write" :disabled="user && user.level > 0">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider class="mb-4" background-color="primary" />
          <v-row class="mx-0">
            <v-col cols="3">작성자</v-col>
            <v-divider vertical background-color="primary" />
            <v-col cols="7">
              <display-user :user="board.user"></display-user>
            </v-col>
          </v-row>
          <v-row class="mx-0">
            <v-col cols="3">작성일</v-col>
            <v-divider vertical background-color="primary" />
            <v-col cols="7">
              <display-time :time="board.createdAt"></display-time>
            </v-col>
          </v-row>
          <v-row class="mx-0">
            <v-col cols="3">수정일</v-col>
            <v-divider vertical background-color="primary" />
            <v-col cols="7">
              <display-time :time="board.updatedAt"></display-time>
            </v-col>
          </v-row>
          <v-row class="mx-0">
            <v-col cols="3">게시물수</v-col>
            <v-divider vertical background-color="primary" />
            <v-col cols="7">{{ board.count }} </v-col>
          </v-row>
          <v-row class="mx-0">
            <v-col cols="3">분류</v-col>
            <v-divider vertical background-color="primary" />
            <v-col cols="7">
              <v-chip
                v-for="item in board.categories"
                :key="item"
                v-text="item"
                class="mb-2 mr-2 rounded"
              ></v-chip>
            </v-col>
          </v-row>
          <v-row class="mx-0">
            <v-col cols="3">태그</v-col>
            <v-divider vertical background-color="primary" />
            <v-col cols="7">
              <v-chip
                v-for="item in board.tags"
                :key="item"
                v-text="item"
                class="mb-2 mr-2 rounded"
                outlined
              ></v-chip>
            </v-col>
          </v-row>
          <v-row class="mx-0">
            <v-col cols="3">설명</v-col>
            <v-divider vertical background-color="primary" />
            <v-col cols="7" class="comment" v-text="board.description"></v-col>
          </v-row>
          <v-spacer />
          <v-col class="d-flex justify-end">
            <v-btn icon @click="dialog = false"
              >닫기<v-icon small>mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-card>
      </v-dialog>
    </v-card>
  </v-container>
</template>

<script>
import BoardArticle from "./article/index";
import DisplayTime from "@/components/display-time";
import DisplayUser from "@/components/display-user";

export default {
  props: ["boardId", "category", "tag"],
  components: {
    BoardArticle,
    DisplayTime,
    DisplayUser,
  },
  data() {
    return {
      unsubscribe: null,
      loading: false,
      dialog: false,
      board: null,
      loaded: false,
    };
  },
  watch: {
    boardId() {
      this.subscribe();
    },
  },
  computed: {
    getCategory() {
      if (!this.category) return "전체";
      return this.category;
    },
    user() {
      return this.$store.state.user;
    },
  },
  created() {
    this.subscribe();
  },
  destroyed() {
    if (this.unsubscribe) this.unsubscribe();
  },
  methods: {
    subscribe() {
      if (this.unsubscribe) this.unsubscribe();
      const ref = this.$firebase.firestore().collection("boards").doc(this.boardId);
      this.loaded = false;
      this.unsubscribe = ref.onSnapshot((doc) => {
        this.loaded = true;

        if (!doc.exists) return this.write();
        const item = doc.data();
        item.createdAt = item.createdAt.toDate();
        item.updatedAt = item.updatedAt.toDate();
        item.categories.unshift("전체");
        this.board = item;
      }, console.error);
    },
    async write() {
      // 기존 게시판 생성(수정)
      this.$router.push({
        path: this.$route.path,
        query: {
          action: "write",
        },
      });
    },
    async articleWrite() {
      // 게시글 생성
      this.$router.push({
        path: this.$route.path + "/new",
        query: {
          action: "write",
        },
      });
    },
    changeCategory(item) {
      if (item === "전체") this.$router.push(this.$route.path);
      else
        this.$router.push({
          path: this.$route.path,
          query: {
            category: item,
          },
        });
    },
  },
};
</script>

<style scoped>
header .theme--dark.v-icon,
header.theme--dark {
  color: #0d0d0d !important;
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
  font-size: 0.9em;
}

.col-7 {
  font-size: 0.85em;
}
</style>
