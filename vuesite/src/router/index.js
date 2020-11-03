import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/board",
    name: "board",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "board" */ "@/views/board")
  },
  {
    path: "/board/:info",
    component: () => import( /* webpackChunkName: "info" */ "@/views/board/info")
  },
  {
    path: "/board/:info/:article",
    component: () => import( /* webpackChunkName: "article" */ "@/views/board/article")
  },
  {
    path: "/storage",
    name: "storage",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "board" */ "@/views/storage")
  },
  {
    path: "/editor",
    name: "editor",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "board" */ "@/views/editor")
  },
  {
    path: '*',
    name: 'error',
    component: () => import('../views/error')
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;