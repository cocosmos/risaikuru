<script lang="ts" setup>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";
import { useRouter } from "vue-router";
const router = useRouter();
const validate = () => {
  router.push("/profile");
};
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/profile"></ion-back-button>
        </ion-buttons>
        <ion-title>Demande confirmée !</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding">
      <div class="confirmed">
        <ion-text><h1>Tout bon !</h1></ion-text>
        <img src="../../assets/images/okay.svg" alt="it's all good" />
        <ion-text>
          <p>
            Ta demande de paiement à bien été reçue, tu seras payé dans les 5
            jours ouvrables.
          </p>
        </ion-text>
        <ion-button expand="block" @click="validate"
          >Retour à mon profil</ion-button
        >
      </div>
    </ion-content>
  </ion-page>
</template>

<style lang="scss" scoped>
.confirmed {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  height: 100%;
  h1 {
    font-size: 3rem;
  }
}
</style>
