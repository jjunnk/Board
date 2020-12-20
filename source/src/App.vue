<template>
  <v-app id="app" v-resize="onResize">
    <transition name="page" mode="in-out">
      <TransitionRouter v-if="transition" />
    </transition>
    <transition name="intro" mode="in-out">
      <SiteHeader
        v-if="(isIntroVisible && rangeSliderValue > maxValue - 1) || !isIntroVisible"
      />
    </transition>
    <div class="wrapper" :class="introBg" color="">
      <router-view :class="{ perspective: changePerspective }" />
    </div>
    <transition name="intro" mode="in-out">
      <SiteFooter
        :footer="site.footer"
        v-if="(isIntroVisible && rangeSliderValue > maxValue - 1) || !isIntroVisible"
      />
    </transition>
  </v-app>
</template>

<script>
/* eslint-disable */
/*eslint no-shadow: [2, { "hoist": "all" }]*/
import TransitionRouter from "@/views/Home/TransitionRouter.vue";
import SiteFooter from "@/views/site/footer.vue";
import SiteHeader from "@/views/site/header.vue";

import router from "@/router/index.js";
import store from "@/store/index.js";

router.beforeEach((to, from, next) => {
  store.commit("updateChangePerspective", false);
  store.commit("updateTransition", true);
  setTimeout(function () {
    next();
  }, 1000);

  to.name == "home"
    ? store.commit("isIntroVisible", true)
    : store.commit("isIntroVisible", false);
});
router.afterEach((to, from) => {
  document.querySelector("#app").style.overflow = "auto";

  store.commit("isMobile", false);
  setTimeout(function () {
    store.commit("updateTransition", false);
    window.scrollTo(0, 0);
  }, 800);
});

export default {
  name: "App",
  components: {
    TransitionRouter,
    SiteHeader,
    SiteFooter,
  },
  data() {
    return {
      drawer: false,
      site: {
        footer: "",
      },
      text: "3D Mode",
      maxValue: this.$store.state.maxRangeSliderValue,
      windowSize: 0,
    };
  },
  created() {
    this.subscribe();
    this.$store.commit("updateTransition", false);
  },
  mounted() {
    let height = Math.min(
      document.documentElement.clientHeight,
      window.screen.height,
      window.innerHeight
    );
    document.querySelector("#app").style.height = height + "px";
    this.onResize();
  },
  computed: {
    makeModalVisible() {
      return this.$store.getters.showModal;
    },
    transition() {
      return this.$store.getters.routeTransition;
    },
    changePerspective() {
      return this.$store.getters.changePerspective;
    },
    rangeSliderValue() {
      return this.$store.getters.getRangeSliderValue;
    },
    isIntroVisible() {
      return this.$store.getters.isIntroVisible;
    },
    isHome() {
      return window.location.pathname != "/";
    },
  },
  methods: {
    subscribe() {
      this.$firebase
        .database()
        .ref()
        .child("site")
        .on(
          "value",
          (sn) => {
            const v = sn.val();
            if (!v) {
              this.$firebase.database().ref().child("site").set(this.site);
            }
            this.site = v;
          },
          (e) => {
            console.log(e.message);
          }
        );
    },
    introBg() {
      if (this.isIntroVisible) {
        document.getElementsByClassName("wrapper").style.backgroundColor = "#655d5d";
      }
    },
    onResize() {
      this.windowSize = window.innerWidth;
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/_base.scss"; //perspective
@import "@/assets/scss/animations.scss"; //animations

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: auto;
  height: 100% !important;
}

.wrapper {
  margin: 0 auto;
  max-width: 1440px;
  width: 90%;
  padding: 0 5%;
  position: relative;
  display: block;
  height: 100%;
}

.page-enter-active {
  animation: transiton 1.8s ease;
}
</style>
