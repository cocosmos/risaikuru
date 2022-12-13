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
import {ref, onMounted, watch} from "vue";
import {useAuthStore} from "../../store/auth";

const authStore = useAuthStore();

onMounted(() => {
  authStore.subscribeDemands();
  authStore.getMyDemands();
});
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
