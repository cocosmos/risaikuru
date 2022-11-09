<script lang="ts" setup>
import { trophy } from "ionicons/icons";
import IconInfo from "./IconInfo.vue";
import { defineProps } from "vue";
import { User } from "@/types/User";
import {
  IonCard,
  IonCardHeader,
  IonRow,
  IonCol,
  IonItem,
  IonAvatar,
  IonLabel,
  IonIcon,
  IonText,
  IonCardSubtitle,
  IonCardContent,
} from "@ionic/vue";
import { Waste } from "@/types/Demand";
import { Demand } from "@/types/Demand";
const props = defineProps<{
  demand: Demand;
}>();
</script>
<template>
  <ion-card color="light">
    <ion-card-header>
      <div>
        <ion-row>
          <ion-col>
            <ion-item color="light" lines="none">
              <ion-avatar>
                <img
                  alt="Silhouette of a person's head"
                  src="https://ionicframework.com/docs/img/demos/avatar.svg"
                />
              </ion-avatar>
              <ion-label class="text__bold">Name</ion-label>
            </ion-item></ion-col
          >
          <ion-col>
            <ion-item color="light" lines="none">
              <ion-icon :icon="trophy" color="primary" />
              <ion-text class="text__bold" color="primary">5 CHF</ion-text>
            </ion-item></ion-col
          >
        </ion-row>
      </div>
      <ion-card-subtitle>Date</ion-card-subtitle>
    </ion-card-header>

    <ion-card-content>
      <div class="icon__list">
        <icon-info waste="piles"></icon-info>
        <icon-info waste="alu"></icon-info>
        <icon-info waste="piles"></icon-info>
        <icon-info waste="cafe"></icon-info>
      </div>
      Card Content
    </ion-card-content>
  </ion-card>
</template>

<style>
.icon__list {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  margin-top: 20px;
}
</style>
