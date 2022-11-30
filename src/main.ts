import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import {
  IonBackButton,
  IonBadge,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonIcon,
  IonicVue,
  IonItem,
  IonLabel,
  IonRow,
  IonSearchbar,
  IonText,
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

const app = createApp(App).use(IonicVue, { mode: "ios" }).use(router);
router.isReady().then(() => {
  app.mount("#app");
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
  .component("ion-card-content", IonCardContent);
