<template>
  <ion-grid class="ion-no-padding location-search">
    <ion-row>
      <ion-col class="ion-margin-end">
        <ion-searchbar
            class="location-search__searchbar"
            show-cancel-button="never"
            placeholder="Adresse"
        ></ion-searchbar>
      </ion-col>
      <ion-col size="auto">
        <ion-button class="location-search__btn" shape="circle" @click="getCurrentLocation">
          <ion-icon :icon="locate"></ion-icon>
        </ion-button>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script lang="ts" setup>
/*
* TODO: Emettre la localisation quand une adresse est selectionnée... Pour l'instant le composant n'emmet la localisation que quand le bouton de localisation est cliqué
* */

import {defineEmits} from 'vue';
import {IonGrid, IonCol, IonRow, IonSearchbar, IonButton, IonIcon} from "@ionic/vue";
import {locate} from "ionicons/icons";
import {Geolocation, Position} from "@capacitor/geolocation";

const emit = defineEmits<{
  (e: 'locationUpdated', value: { lat: number, long: number }): void
}>();

const getCurrentLocation = () => {
  Geolocation.getCurrentPosition().then((position) => {
    emit('locationUpdated', {lat: position.coords.latitude, long: position.coords.longitude})
  });
}
</script>

<style lang="scss" scoped>

.location-search {
  &__searchbar {
    --background: transparent;
    border: 2px solid var(--ion-color-primary);
    border-radius: 10px;
    --placeholder-color: var(--ion-color-primary);
    margin-right: 20px;
  }

  &__btn {
    --border-radius: 50%;
    width: 56px;
    height: 56px;

    ion-icon {
      font-size: x-large;
    }
  }
}
</style>