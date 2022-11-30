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
        path: "/profil/mes-annonces",
        component: () => import("@/views/Profil/MyDemands.vue"),
      },

      {
        path: "/profil/mes-annonces/:id",
        component: () => import("@/views/Profil/MyDemand.vue"),
      },

      {
        path: "/profil/paiement",
        component: () => import("@/views/Profil/PaymentAskOrVerify.vue"),
      },
      {
        path: "/profil/paiement-confirmé",
        component: () => import("@/views/Profil/PaymentConfirmed.vue"),
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
