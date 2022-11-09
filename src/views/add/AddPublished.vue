<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Nouvelle demande</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding relative">
      <h2 class="ion-text-center">Félicitations, ton annonce est publiée</h2>
      <ion-button expand="block" class="btn-bottom">
        Retour à l'accueil
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
  IonIcon,
  IonPage
} from "@ionic/vue";
import {chevronForwardOutline} from "ionicons/icons";
import {useRouter} from "vue-router";

const router = useRouter();
</script>

<style>
.btn-bottom {
  position: absolute;
  width: calc(100% - var(--padding-end) - var(--padding-start));
  bottom: 67px;
}
</style>