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
        path: "profile",
        component: () => import("@/views/ProfilTab.vue"),
      },
      {
        path: "login",
        component: () => import("@/views/Auth/LoginTab.vue"),
      },
      {
        path: "signup",
        component: () => import("@/views/Auth/SignupTab.vue"),
      },
      {
        path: "password-reset",
        component: () => import("@/views/Auth/ForgetPassword.vue"),
      },
      {
        path: "/profile/my-demands",
        component: () => import("@/views/Profil/MyDemands.vue"),
      },

      {
        path: "/profile/my-demands/:id",
        component: () => import("@/views/Profil/MyDemand.vue"),
      },

      {
        path: "/profile/payment",
        component: () => import("@/views/Profil/PaymentAskOrVerify.vue"),
      },
      {
        path: "/profile/payment/confirmed",
        component: () => import("@/views/Profil/PaymentConfirmed.vue"),
      },
    ],
  },

  /*   {
    path: "/profile",
    redirect: "/profile",
    component: () => TabsPage,
    children: [
      {
        path: "/profile/my-demands",
        component: () => import("@/views/Profil/MyDemands.vue"),
      },

      {
        path: "/profile/my-demands/:id",
        component: () => import("@/views/Profil/MyDemand.vue"),
      },

      {
        path: "/profile/payment",
        component: () => import("@/views/Profil/PaymentAskOrVerify.vue"),
      },
      {
        path: "/profile/payment/confirmed",
        component: () => import("@/views/Profil/PaymentConfirmed.vue"),
      },
    ],
  }, */

  { path: "/:catchAll(.*)", component: () => import("@/views/ErrorTab.vue") },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
