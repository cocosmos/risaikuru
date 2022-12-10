<script lang="ts" setup>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
} from "@ionic/vue";
import CardDemand from "@/components/Card/CardDemand.vue";
import { useDemandStore } from "@/store/demand";

const { demands } = useDemandStore();
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/profile"></ion-back-button>
        </ion-buttons>
        <ion-title>Mes annonces</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding">
      <div class="cards__list">
        <card-demand
          v-for="demand in demands"
          v-bind:key="demand.id"
          :demand="demand"
          :card-of-current-user="true"
        ></card-demand>
      </div>
    </ion-content>
  </ion-page>
</template>

<style lang="scss" scoped>
.cards__list {
  display: flex;
  flex-direction: column;

  gap: 1rem;
}
</style>
