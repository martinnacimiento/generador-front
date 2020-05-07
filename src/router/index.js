import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import CongruencialMulti from "../views/CongruencialMulti";
import Fibonacci from "../views/Fibonacci";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/fibonacci",
    name: "fibonacci",
    component: Fibonacci,
  },
  {
    path: "/congruencial-multiplicativo",
    name: "congruencial-multi",
    component: CongruencialMulti,
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

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
