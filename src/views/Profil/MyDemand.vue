<script lang="ts" setup>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
} from "@ionic/vue";
import { useRoute } from "vue-router";

import { useAuthStore } from "../../store/auth";
import MyDemandOrPublished from "@/components/MyDemandOrPublished.vue";
import FixedBottomContainer from "@/components/FixedBottomContainer.vue";

const { dataOfUser } = useAuthStore();
const route = useRoute();
const demand = dataOfUser.myDemands.find(
  (demand) => demand.id === route.params.id
);
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/profile/my-demands"></ion-back-button>
        </ion-buttons>
        <ion-title>Votre annonce</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding relative background">
      <MyDemandOrPublished :demand="demand" v-if="demand" />
      <fixed-bottom-container>
        <ion-button
          expand="block"
          router-link="/profile/my-demands"
          router-direction="back"
        >
          Retour à mes annonces
        </ion-button>
        <ion-button expand="block" color="danger">
          Supprimer cette annonce
        </ion-button>
      </fixed-bottom-container>
    </ion-content>
  </ion-page>
</template>

<style lang="scss">
.background {
  --background: none;
  background: white url("../../assets/summary-background.png") center 105%
    no-repeat;
  background-size: 125%;
}
</style>
