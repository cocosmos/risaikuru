<script lang="ts" setup>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";
import PaymentAskOrVerify from "@/components/PaymentAskOrVerify.vue";

const text = {
  title: "Indique ici tes coordonnées bancaires",
  text: "Nous avons besoin de ces informations pour pouvoir te payer le montant de ta cagnotte directement sur ton compte.",
  link: "/profile",
  button: "Confimer mes coordonnées",
};
</script>

<template>
  <ion-page class="md">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/profile"></ion-back-button>
        </ion-buttons>
        <ion-title>Informations de paiement</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding">
      <payment-ask-or-verify :text="text" :isAsking="false" />
    </ion-content>
  </ion-page>
</template>
