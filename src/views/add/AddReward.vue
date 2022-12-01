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
      <h2 class="ion-text-center">Choisis le montant de la récompense pour le trieur</h2>
      <reward-toggle-list v-model="rewardAmount"></reward-toggle-list>
      <h1>{{ rewardAmount }}</h1>
      <fixed-bottom-container>
        <ion-button expand="block" @click="validate()">
          Poster mon annonce
        </ion-button>
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
  IonButtons,
  IonBackButton,
  IonPage
} from "@ionic/vue";
import {useRouter} from "vue-router";
import {ref} from "vue";

import FixedBottomContainer from "@/components/FixedBottomContainer.vue";
import RewardToggleList from '@/components/RewardToggleList.vue';

const router = useRouter();

const rewardAmount = ref(0);

const validate = () => {
  router.push('/add/published');
}
</script>

<style>
</style>