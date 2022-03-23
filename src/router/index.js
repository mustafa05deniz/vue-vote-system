import { createRouter, createWebHistory } from "vue-router";
import List from "../views/vote/List";
import CreateVote from "../views/vote/CreateVote";

const routes = [
  {
    path: "/",
    redirect: "/vote",
  },
  {
    path: "/vote",
    name: "Vote",
    component: List,
  },
  {
    path: "/vote/create",
    name: "CreateVote",
    component: CreateVote,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
