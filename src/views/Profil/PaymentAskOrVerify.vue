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

/**
 *  TODO
 */
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Informations de paiement</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding">
      <h2 class="ion-text-center">Indique ici tes coordonnées bancaires</h2>

      <ion-button expand="block" @click="validate()">
        Choisir le lieu
        <ion-icon slot="end" :icon="chevronForwardOutline"></ion-icon>
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<style lang="scss" scoped></style>
