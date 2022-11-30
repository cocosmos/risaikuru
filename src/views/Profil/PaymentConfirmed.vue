<script lang="ts" setup>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
} from "@ionic/vue";
import { chevronForwardOutline } from "ionicons/icons";
import { useRouter } from "vue-router";
const router = useRouter();
const validate = () => {
  router.push("/add/location");
};
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Paiement confirmez</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding"> </ion-content>
  </ion-page>
</template>

<style lang="scss" scoped></style>
