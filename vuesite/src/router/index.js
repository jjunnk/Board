import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home/Home.vue";
import Project from "@/views/Project.vue";
import ProjectPage from "@/views/Project/ProjectPage.vue"
import AboutMe from "@/views/AboutMe/AboutMe.vue";
Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/board",
    name: "board",
    component: () => import("@/views/board")
  },
  {
    path: "/board/:info",
    component: () => import("@/views/board/info")
  },
  {
    path: "/board/:info/:article",
    component: () => import("@/views/board/article")
  },
  {
    path: "/storage",
    name: "storage",
    component: () => import("@/views/storage")
  },
  {
    path: "/editor",
    name: "editor",
    component: () => import("@/views/editor")
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
    component: ProjectPage,
    props:true,
  },
  {
    path: '/AboutMe',
    name: 'AboutMe',
    component: AboutMe,
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