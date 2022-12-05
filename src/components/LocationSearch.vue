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
            <span v-for="result in results" :key="result" @click="selectAdress(result)">{{ result.name }}</span>
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

import {defineEmits, ref, watchEffect} from 'vue';
import {IonGrid, IonCol, IonRow, IonSearchbar, IonButton, IonIcon} from "@ionic/vue";
import {locate} from "ionicons/icons";
import {Geolocation, Position} from "@capacitor/geolocation";
import axios from "axios";
import {geocodingClient} from "@/services/mapbox"
import Location from "@/types/Location";
import MapboxFeature from "@/types/MapboxFeature";

const emit = defineEmits<{
  (e: 'locationUpdated', value: Location): void
}>();

const searching = ref(false);
const address = ref("");
const results = ref<Location[]>([]);
const location = ref<Location>({lat: 0, long: 0, name: ""});


watchEffect(() => {
  emit('locationUpdated', location.value);
});

const getCurrentLocation = () => {
  Geolocation.getCurrentPosition().then((position) => {
    geocodingClient.get(`/${position.coords.longitude},${position.coords.latitude}.json`).then(result => {
      address.value = result.data.features[0].place_name;
      location.value = {
        lat: position.coords.latitude,
        long: position.coords.longitude,
        name: result.data.features[0].place_name
      }
    })
    searching.value = false;
  });
}

const searchAdress = () => {
  results.value = [];
  if (address.value !== "" && address.value !== location.value.name) {
    geocodingClient.get(`/${address.value}.json`).then(result => {
      searching.value = true;
      result.data.features.forEach((feature: MapboxFeature) => {
        results.value.push({
          name: feature.place_name,
          lat: feature.geometry.coordinates[1],
          long: feature.geometry.coordinates[0]
        });
      });
    });
  } else {
    searching.value = false;
  }
}

const selectAdress = (newLocation: Location) => {
  address.value = newLocation.name;
  location.value = newLocation;
  searching.value = false;
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
    z-index: 2;
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
    border-radius: 0 0 10px 10px;
    z-index: 1;
    font-size: .9rem;
    width: 100%;

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