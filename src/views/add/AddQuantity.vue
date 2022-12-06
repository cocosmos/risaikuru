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
      <h2 class="ion-text-center">Choisis la quantité de déchêts que tu dois débarrasser</h2>
      <stack-list>
        <quantity-stepper v-for="quantity in newDemand.quantities.value" v-model="quantity.number" :size="quantity.id"
                          :icon="cube" :key="quantity.id"
                          :description="quantity.description"></quantity-stepper>
        <!--
        <quantity-stepper v-model="quantities.s" size="s" :icon="cube"
                          description="Équivalent d'une boite à chaussures"></quantity-stepper>
        <quantity-stepper v-model="quantities.m" size="m" :icon="bag"
                          description="Équivalent d'un sac de courses"></quantity-stepper>
        <quantity-stepper v-model="quantities.l" size="l" :icon="logoDropbox"
                          description="Équivalent d'un carton de déménagement"></quantity-stepper>
        <quantity-stepper v-model="quantities.xl" size="xl" :icon="car"
                          description="Environ 200 litres"></quantity-stepper>
                          -->
      </stack-list>
      <fixed-bottom-container>
        <ion-button expand="block" @click="validate()" :disabled="!valid">
          Choisir la date
          <ion-icon slot="end" :icon="chevronForwardOutline"></ion-icon>
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
  IonIcon,
  IonPage
} from "@ionic/vue";
import {chevronForwardOutline} from "ionicons/icons";
import {useRouter} from "vue-router";
import {computed} from "vue";
import FixedBottomContainer from "@/components/FixedBottomContainer.vue";
import QuantityStepper from '@/components/QuantityStepper.vue';
import StackList from "@/components/StackList.vue";
import {cube, logoDropbox, bag, car} from "ionicons/icons"
import {useNewDemand} from "@/composables/newDemand";

const router = useRouter();
const newDemand = useNewDemand();

const valid = computed(() => {
  return newDemand.hasQuantity.value;
});

const validate = () => {
  if (valid.value) router.push('/add/moment');
}
</script>

<style>
</style>