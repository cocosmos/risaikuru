import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import TabsPage from "@/views/TabsPage.vue";

export const onlyLoggedOut: string[] = ["/login", "/signup"];
export const onlyLoggedIn: string[] = [
  "/add",
  "/add/type",
  "/profile",
  "/profile/my-demands",
  "/profile/my-demands/:id",
  "/profile/payment",
  "/profile/payment/confirmed",
  "/messages",
  "/messages/:id",
];

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/search",
  },
  {
    path: "/add",
    redirect: "/add/type",
  },
  {
    path: "/",
    component: TabsPage,
    children: [
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
        component: () => import("@/views/ConversationsTab.vue"),
      },
      {
        path: "messages/:id",
        component: () => import("@/views/Messages/MessagesTab.vue"),
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
        path: "forget-password",
        component: () => import("@/views/Auth/ForgetPassword.vue"),
      },
      {
        path: "reset-password",
        component: () => import("@/views/Auth/ResetPassword.vue"),
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
        path: "/profile/payment/infos",
        component: () => import("@/views/Profil/PaymentInfos.vue"),
      },
      {
        path: "/profile/payment/ask",
        component: () => import("@/views/Profil/PaymentAsk.vue"),
      },
      {
        path: "/profile/payment/confirmed",
        component: () => import("@/views/Profil/PaymentConfirmed.vue"),
      },
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
      {
        path: "/:catchAll(.*)",
        component: () => import("@/views/ErrorTab.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
