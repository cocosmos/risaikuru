<template>
  <ion-grid class="ion-no-padding location-search">
    <ion-row>
      <ion-col class="ion-margin-end">
        <div class="location-search__searchbar-container">
          <ion-searchbar
              class="location-search__searchbar"
              show-cancel-button="never"
              placeholder="Adresse"
              v-model="address"
              :debounce="300"
              @ionChange="searchAdress"
          >
          </ion-searchbar>
          <div class="location-search__results" v-if="searching">
            <span v-for="result in results" :key="result">{{ result.name }}</span>
          </div>
        </div>
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

import {defineEmits, ref} from 'vue';
import {IonGrid, IonCol, IonRow, IonSearchbar, IonButton, IonIcon} from "@ionic/vue";
import {locate} from "ionicons/icons";
import {Geolocation, Position} from "@capacitor/geolocation";
import axios from "axios";
import GeocodingClient from "@/services/geocoding"
import Location from "@/types/Location";

const emit = defineEmits<{
  (e: 'locationUpdated', value: { lat: number, long: number }): void
}>();

const searching = ref(false);
const address = ref("");
const results = ref<Location[]>([]);

const getCurrentLocation = () => {
  Geolocation.getCurrentPosition().then((position) => {
    GeocodingClient.get(`/${position.coords.longitude},${position.coords.latitude}.json`).then(result => {
      address.value = result.data.features[0].place_name;
    })
    emit('locationUpdated', {lat: position.coords.latitude, long: position.coords.longitude})
  });
}

const searchAdress = () => {
  results.value = [];
  if (address.value !== "") {
    GeocodingClient.get(`/${address.value}.json`).then(result => {
      searching.value = true;
      // TODO : Enlever ce type dégeulasse
      result.data.features.forEach((feature: { place_name: string; geometry: { coordinates: number[]; }; }) => {
        results.value.push({
          name: feature.place_name,
          lat: feature.geometry.coordinates[1],
          long: feature.geometry.coordinates[0]
        });
      });
      console.log(results.value);
    });
  }
}
</script>

<style lang="scss" scoped>

.location-search {
  background: white;

  &__searchbar {
    --background: transparent;
    border: 2px solid var(--ion-color-primary);
    border-radius: 10px;
    --placeholder-color: var(--ion-color-primary);
    margin-right: 20px;
  }

  &__searchbar-container {
    position: relative;
  }

  &__results {
    background: white;
    position: absolute;
    top: calc(100% - 10px);
    display: flex;
    flex-direction: column;
    padding: 0 10px;
    border: 2px solid var(--ion-color-primary);
    border-top: none;
    border-radius: 10px;
    z-index: -1;
    font-size: .9rem;

    & > * {
      padding: 5px 0;
      border-top: 1px solid var(--ion-color-primary-light);

      &:first-child {
        border: none;
        padding-top: 20px;
      }
    }
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