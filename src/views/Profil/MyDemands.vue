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
import { onMounted, ref } from "vue";
import { useAuthStore } from "../../store/auth";

const authStore = useAuthStore();
const loading = ref(true);

onMounted(() => {
  authStore.subscribeDemands();
  authStore.getMyDemands();
  loading.value = false;
});

const handleRefresh = async (event: CustomEvent) => {
  await authStore.getMyDemands();
  event.detail.complete();
};
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
      <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <loader-full-page v-if="loading"></loader-full-page>
      <div class="cards__list" v-if="!loading">
        <ion-text
          v-if="authStore.dataOfUser.myDemands.length === 0"
          class="ion-text-center"
        >
          Vous n'avez pas encore d'annonces.
        </ion-text>

        <card-demand
          v-for="demand in authStore.dataOfUser.myDemands"
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
