<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar>
        <ion-tab-button tab="search" href="/search">
          <ion-icon :icon="search"/>
          <ion-label>Rechercher</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="add" href="/add">
          <ion-icon :icon="addCircle"/>
          <ion-label>Ajouter</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="messages" href="/messages">
          <ion-icon :icon="mail"/>
          <ion-label>Messages</ion-label>
          <ion-badge color="danger">6</ion-badge>
        </ion-tab-button>
        <ion-tab-button tab="profil" href="/profile">
          <ion-icon :icon="person" />
          <ion-label>Profil</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
  IonRouterOutlet,
  IonBadge,
} from "@ionic/vue";
import {
  ellipse,
  square,
  triangle,
  add,
  search,
  mail,
  person,
  addCircle,
} from "ionicons/icons";

export default defineComponent({
  name: "TabsPage",
  components: {
    IonLabel,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonPage,
    IonRouterOutlet,
    IonBadge
  },
  setup() {
    return {
      ellipse,
      square,
      triangle,
      add,
      search,
      mail,
      person,
      addCircle,
    };
  },
});
</script>
