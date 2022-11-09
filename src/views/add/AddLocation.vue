<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>Nouvelle demande</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding relative">
      <h2 class="ion-text-center">Choisis l'endroit un tu as veux qu'on vienne te débarrasser</h2>
      <ion-button expand="block" class="btn-bottom" @click="validate()">
        Choisir la récompense
        <ion-icon slot="end" :icon="chevronForwardOutline"></ion-icon>
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonButtons,
    IonBackButton,
  IonIcon,
  IonPage
} from "@ionic/vue";
import {chevronForwardOutline} from "ionicons/icons";
import {useRouter} from "vue-router";

const router = useRouter();

const validate = () => {
  router.push('/add/reward')
}
</script>

<style>
.btn-bottom {
  position: absolute;
  width: calc(100% - var(--padding-end) - var(--padding-start));
  bottom: 67px;
}
</style>