<script lang="ts" setup>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonBackButton,
  IonButtons,
} from "@ionic/vue";
import PaymentAskOrVerify from "@/components/PaymentAskOrVerify.vue";
import { useAuthStore } from "@/store/auth";
const authStore = useAuthStore();
const text = {
  title: "Demande de paiement de " + authStore.user.balance + " CHF",
  text: "Vérifie tes coordonnées bancaires pour pouvoir te payer le montant de ta cagnotte directement sur ton compte. ",
  link: "/profile/payment/confirmed",
  button: "Demander un paiement",
};
</script>

<template>
  <ion-page class="md">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/profile"></ion-back-button>
        </ion-buttons>
        <ion-title>Demande de paiement</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding">
      <payment-ask-or-verify :text="text" :isAsking="true" />
    </ion-content>
  </ion-page>
</template>
