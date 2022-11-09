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
        path: "messages",
        component: () => import("@/views/Messages.vue"),
      },
      {
        path: "profil",
        component: () => import("@/views/Profil.vue"),
      },
    ],
  },
  {
    path: "/add",
    redirect: "/add/type",
    component: () => TabsPage,
    children: [
      {
        path: "/add/type",
        component: () => import("@/views/add/AddWasteType.vue"),
      },
      {
        path: "/add/quantity",
        component: () => import("@/views/add/AddQuantity.vue"),
      },
      {
        path: "/add/moment",
        component: () => import("@/views/add/AddMoment.vue"),
      },
      {
        path: "/add/location",
        component: () => import("@/views/add/AddLocation.vue"),
      },
      {
        path: "/add/reward",
        component: () => import("@/views/add/AddReward.vue"),
      },
      {
        path: "/add/published",
        component: () => import("@/views/add/AddPublished.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
