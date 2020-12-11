import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home/Home.vue";
import Project from "@/views/Project.vue";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "home",
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
    component: () => import( /* webpackChunkName: "board" */ "@/views/storage")
  },
  {
    path: "/editor",
    name: "editor",
    component: () => import( /* webpackChunkName: "board" */ "@/views/editor")
  },
  {
    path: "/project",
    name: "Project",
    component: Project,
    props:true
  },
  {
    path: "/project/:id",
    name: "ProjectPage",
    component: () => import( "@/views/Project/ProjectPage.vue"),
    props:true,
    children:[
    ]

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