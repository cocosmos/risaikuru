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
import { createDemand, Demand } from "@/types/Demand";
import { createUser } from "@/types/User";

const pinFormatter = (value: number) => `${value}km`;
const printCurrentPosition = async () => {
  const coordinates = await Geolocation.getCurrentPosition();

  console.log("Current position:", coordinates);
};
const demands: Demand[] = [];
demands.push(
  createDemand(
    ["alu", "papier"],
    [{ id: "S", number: 3, description: "Small" }],
    "chemin de la fontaine 3, 1000 Lausanne",
    createUser("John", "Doe", "john.doe@example.com", 5),
    5,
    new Date(),
    new Date()
  ),
  createDemand(
    ["cafe", "piles", "compost", "papier", "alu", "verre", "lampes"],
    [
      { id: "S", number: 3, description: "Small" },
      { id: "M", number: 2, description: "Medium" },
      { id: "L", number: 1, description: "Large" },
      { id: "XL", number: 1, description: "Extra Large" },
    ],
    "chemin de la fontaine 3, 1000 Lausanne",
    createUser("John", "Doe", "john.doe@example.com"),
    15,
    new Date(),
    new Date()
  )
);

console.log(demands);
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Rechercher</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding">
      <ion-grid class="ion-no-padding">
        <ion-row>
          <ion-col class="margin-right">
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
      <div class="range">
        <ion-text class="text__bold"> Rayon </ion-text>
        <ion-range
          :min="0"
          :max="20"
          :value="10"
          :pin="true"
          :pin-formatter="pinFormatter"
          class="ion-no-padding"
        ></ion-range>
      </div>

      <div class="cards">
        <card-search
          v-for="demand in demands"
          v-bind:key="demand.id"
          :demand="demand"
        ></card-search>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped lang="scss">
.margin-right {
  margin-right: 10px;
}
.range {
  margin-top: 10px;
}
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
  margin-right: 20px;
}

ion-range {
  --bar-background: var(--ion-color-light);
  --bar-background-active: var(--ion-color-primary);
  --bar-height: 20px;
  --bar-border-radius: 8px;
  --knob-background: var(--ion-color-primary-tint);
  --knob-size: 40px;
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
.cards {
  margin-top: 1.5em;
  & > * {
    margin-bottom: 1.5em;
  }
}
</style>
