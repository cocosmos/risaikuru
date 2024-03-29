import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router, { onlyLoggedIn, onlyLoggedOut } from "./router";
import { defineCustomElements } from "@ionic/pwa-elements/loader";
import { useAuthStore } from "@/store/auth";

import "./registerServiceWorker";
import {
  IonBackButton,
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonicVue,
  IonInput,
  IonItem,
  IonLabel,
  IonNote,
  IonPopover,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonSearchbar,
  IonSkeletonText,
  IonText,
  IonTextarea,
} from "@ionic/vue";

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";

/* Theme variables */
import "./theme/variables.css";

const pinia = createPinia();

const app = createApp(App)
  .use(IonicVue, { mode: "ios" })
  .use(router)
  .use(pinia);

const authStore = useAuthStore();

router.isReady().then(() => {
  app.mount("#app");
});

router.beforeEach((to) => {
  if (onlyLoggedOut.indexOf(to.path) >= 0 && authStore.isLoggedIn) {
    router.replace("/profile");
  } else if (onlyLoggedIn.indexOf(to.path) >= 0 && !authStore.isLoggedIn) {
    router.push("/login");
  }
});

/* Add your global components here to avoid the warn in console */
app
  .component("ion-icon", IonIcon)
  .component("ion-badge", IonBadge)
  .component("ion-grid", IonGrid)
  .component("ion-row", IonRow)
  .component("ion-col", IonCol)
  .component("ion-text", IonText)
  .component("ion-button", IonButton)
  .component("ion-searchbar", IonSearchbar)
  .component("ion-label", IonLabel)
  .component("ion-item", IonItem)
  .component("ion-card", IonCard)
  .component("ion-card-header", IonCardHeader)
  .component("ion-card-title", IonCardTitle)
  .component("ion-card-subtitle", IonCardSubtitle)
  .component("ion-back-button", IonBackButton)
  .component("ion-input", IonInput)
  .component("ion-textarea", IonTextarea)
  .component("ion-buttons", IonButtons)
  .component("ion-note", IonNote)
  .component("ion-card-content", IonCardContent)
  .component("ion-skeleton-text", IonSkeletonText)
  .component("ion-chip", IonChip)
  .component("ion-popover", IonPopover)
  .component("ion-refresher", IonRefresher)
  .component("ion-refresher-content", IonRefresherContent)
  .component("ion-content", IonContent);

defineCustomElements(window);
