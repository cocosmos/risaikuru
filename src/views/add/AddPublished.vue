<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Nouvelle demande</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding relative">
      <h2 class="ion-text-center">Félicitations, ton annonce est publiée</h2>

      <fixed-bottom-container>
        <ion-button expand="block" router-link="/" router-direction="back">
          Retour à l'accueil
        </ion-button>
        <ion-button-secondary expand="block">
          Gérer mes annonces
        </ion-button-secondary>
      </fixed-bottom-container>
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
  IonPage
} from "@ionic/vue";
import FixedBottomContainer from "@/components/FixedBottomContainer.vue";
import IonButtonSecondary from "@/components/IonButtonSecondary.vue";

</script>

<style>
</style>