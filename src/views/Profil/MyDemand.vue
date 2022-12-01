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
import { store } from "@/data/store";

const demands = store.demands;
const route = useRoute();
const demand = demands.find((demand) => demand.id === route.params.id);
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
    <ion-content :fullscreen="true" class="ion-padding">
      <h1>{{ demand!.id }}</h1>
    </ion-content>
  </ion-page>
</template>

<style lang="scss"></style>
