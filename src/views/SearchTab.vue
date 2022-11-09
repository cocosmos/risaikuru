<script lang="ts" setup>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonRange,
} from "@ionic/vue";
import { locate } from "ionicons/icons";
import CardSearch from "../components/CardSearch.vue";
import { Geolocation } from "@capacitor/geolocation";
import IconInfo from "../components/IconInfo.vue";

const pinFormatter = (value: number) => `${value}km`;
const printCurrentPosition = async () => {
  const coordinates = await Geolocation.getCurrentPosition();

  console.log("Current position:", coordinates);
};
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Rechercher</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding">
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-searchbar
              show-cancel-button="never"
              placeholder="Adresse"
              class="custom"
            ></ion-searchbar>
          </ion-col>
          <ion-col size="auto">
            <ion-button shape="circle" @click="printCurrentPosition">
              <ion-icon :icon="locate"></ion-icon>
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-text class="text__bold"> Rayon </ion-text>
      <ion-range
        :min="0"
        :max="20"
        :value="10"
        :pin="true"
        :pin-formatter="pinFormatter"
      ></ion-range>
      <card-search></card-search>
    </ion-content>
  </ion-page>
</template>

<style scoped>
ion-content {
  margin: 5px;
}

ion-icon {
  font-size: x-large;
}

ion-button[shape="circle"] {
  --border-radius: 50%;
  width: 56px;
  height: 56px;
}

ion-searchbar.custom {
  --background: transparent;
  border: 2px solid var(--ion-color-primary);
  border-radius: 10px;
  --placeholder-color: var(--ion-color-primary);
}

ion-range {
  --bar-background: var(--ion-color-light);
  --bar-background-active: var(--ion-color-primary);
  --bar-height: 20px;
  --bar-border-radius: 8px;
  --knob-background: var(--ion-color-primary-tint);
  --knob-size: 40px;

  padding-top: 5px;
}

ion-range::part(pin) {
  color: var(--ion-color-text);
  transform: scale(1.1);
  top: 55px;
  background: transparent;
}

ion-range::part(pin)::before {
  content: none;
}

ion-item::part(native) {
  padding: 0;
}
</style>
