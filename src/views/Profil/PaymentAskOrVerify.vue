<script lang="ts" setup>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
} from "@ionic/vue";
import { store } from "@/data/store";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { regexCheckIban } from "@/utils/helper";

const isIbanValid = ref<null | boolean>(null);
const ibanValue = ref("");

store.update();
const currentUser = store.currentUser;
const router = useRouter();

const texts = [
  {
    toolbar: "Informations de paiement",
    title: "Indique ici tes coordonnées bancaires",
    text: "Nous avons besoin de ces informations pour pouvoir te payer le montant de ta cagnotte directement sur ton compte.",
    link: "/profile",
    button: "Confimer mes coordonnées",
  },
  {
    toolbar: "Demande de paiement",
    title: "Demande de paiement",
    text: "Nous allons te transférer le montant de ta cagnotte sur ton compte bancaire.",
    link: "/profile/payment/confirmed",
    button: "Finaliser la demande de paiement",
  },
];
const text = computed(() => texts[currentUser.iban ? 1 : 0]);
const useRoute = () => {
  router.push(text.value.link);
};

const validateIban = (ev: any) => {
  ibanValue.value = ev.target.value;

  isIbanValid.value = regexCheckIban(ibanValue.value);
};
</script>

<template>
  <ion-page class="md">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/profile"></ion-back-button>
        </ion-buttons>
        <ion-title>{{ text.toolbar }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding">
      <h2 class="ion-text-center">{{ text.title }}</h2>
      <p class="ion-text-center">
        {{ text.text }}
      </p>
      <div class="ion-text-center">
        <img src="../../assets/images/savings.svg" alt="cochon tirelire" />
      </div>

      <ion-item
        fill="outline"
        mode="md"
        class="ion-margin-top"
        :class="{
          'ion-invalid': isIbanValid === false,
        }"
      >
        <ion-label position="floating">IBAN</ion-label>
        <ion-input
          type="text"
          placeholder="CH00 0000 0000 0000 0000 0"
          @ionInput="validateIban"
          v-model="currentUser.iban"
          v-maska="'AA## #### #### #### #### #'"
        ></ion-input>
        <ion-note slot="error">IBAN Invalide</ion-note>
      </ion-item>

      <ion-item fill="outline" mode="md" class="ion-margin-top">
        <ion-label position="floating">Adresse</ion-label>
        <ion-textarea
          placeholder="Chemin du petit Chevreuil 19, 1000 Lausanne"
          v-model="currentUser.adress"
        ></ion-textarea>
      </ion-item>

      <ion-button expand="block" class="ion-margin-top" @click="useRoute()">
        {{ text.button }}
      </ion-button>
    </ion-content>
  </ion-page>
</template>
