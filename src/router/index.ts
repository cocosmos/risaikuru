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
        component: () => import("@/views/AddTab.vue"),
      },
      {
        path: "messages",
        component: () => import("@/views/MessagesTab.vue"),
      },
      {
        path: "profil",
        component: () => import("@/views/ProfilTab.vue"),
      },
    ],
  },
  {
    path: "/profil",
    redirect: "/profil",
    component: () => TabsPage,
    children: [
      {
        path: "/profil/ask-payment",
        component: () => import("@/views/Profil/AskPayment.vue"),
      },
      {
        path: "/profil/confirm-payment",
        component: () => import("@/views/Profil/ConfirmPayment.vue"),
      },
      {
        path: "/profil/my-demands",
        component: () => import("@/views/Profil/MyDemands.vue"),
      },
    ],
  },
  { path: "/:catchAll(.*)", component: () => import("@/views/ErrorTab.vue") },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
