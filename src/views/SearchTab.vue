<script lang="ts" setup>
import { IonRange } from "@ionic/vue";

import { locate, trophy } from "ionicons/icons";

const pinFormatter = (value: number) => `${value}km`;
</script>
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Rechercher</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-searchbar
              show-cancel-button="never"
              placeholder="Adresse"
              class="custom"
            ></ion-searchbar
          ></ion-col>
          <ion-col size="auto">
            <ion-button shape="circle">
              <ion-icon :icon="locate"></ion-icon> </ion-button
          ></ion-col>
        </ion-row>
      </ion-grid>
      <ion-text>
        <b>Rayon</b>
      </ion-text>
      <ion-range
        :min="0"
        :max="20"
        :value="10"
        :pin="true"
        :pin-formatter="{ pinFormatter }"
      ></ion-range>
      <ion-card color="secondary">
        <ion-card-header>
          <div>
            <ion-row>
              <ion-col>
                <ion-item color="secondary" lines="none">
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
                <ion-item color="secondary" lines="none">
                  <ion-icon :icon="trophy" color="primary" />
                  <ion-text class="text__bold" color="primary">5 CHF</ion-text>
                </ion-item></ion-col
              >
            </ion-row>
          </div>
          <ion-card-subtitle>Date</ion-card-subtitle>
        </ion-card-header>

        <ion-card-content> Card Content </ion-card-content>
      </ion-card>
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
