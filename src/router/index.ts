import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import TabsPage from "../views/TabsPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/search",
  },
  {
    path: "/",
    component: TabsPage,
    children: [
      {
        path: "",
        redirect: "/search",
      },
      {
        path: "search",
        component: () => import("@/views/SearchTab.vue"),
      },
      {
        path: "add",
        component: () => import("@/views/Add.vue"),
      },
      {
        path: "messages",
        component: () => import("@/views/Messages.vue"),
      },
      {
        path: "profil",
        component: () => import("@/views/Profil.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
