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
      <h2 class="ion-text-center">Choisis l'endroit un tu as veux qu'on vienne te débarrasser</h2>
      <location-search @locationUpdated="saveLocation"></location-search>
      <fixed-bottom-container>
        <ion-button expand="block" @click="validate()" :disabled="!valid">
          Choisir la récompense
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
  IonPage,
} from "@ionic/vue";
import {chevronForwardOutline} from "ionicons/icons";
import {useRouter} from "vue-router";
import FixedBottomContainer from "@/components/FixedBottomContainer.vue";
import LocationSearch from '@/components/LocationSearch.vue';
import {computed, ref} from "vue";

const router = useRouter();

const location = ref<{ lat: number, long: number }>({lat: 0, long: 0});

const saveLocation = (value: { lat: number, long: number }) => {
  location.value = value;
}

const valid = computed(() => {
  return location.value.lat !== 0 && location.value.long !== 0;
});

const validate = () => {
  if (valid.value) router.push('/add/reward')
}
</script>

<style>
</style>