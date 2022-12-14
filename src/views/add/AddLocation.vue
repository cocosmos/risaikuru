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
      <h2 class="ion-text-center">
        Choisis l'endroit ou tu veux qu'on vienne te débarrasser
      </h2>
      <location-search @locationUpdated="saveLocation"></location-search>
      <loader-full-page :loading="loading"></loader-full-page>
      <div id="map" :style="{ opacity: loading ? 0 : 1 }"></div>
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
  onIonViewWillEnter,
} from "@ionic/vue";
import {chevronForwardOutline} from "ionicons/icons";
import {useRouter} from "vue-router";
import FixedBottomContainer from "@/components/FixedBottomContainer.vue";
import LocationSearch from "@/components/LocationSearch.vue";
import {computed, onMounted, ref, watchEffect} from "vue";
import Location from "@/types/Location";
import {ACCESS_TOKEN, theme} from "@/services/mapbox";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {useNewDemand} from "@/composables/newDemand";
import LoaderFullPage from "@/components/LoaderFullPage.vue";

const router = useRouter();
const newDemand = useNewDemand();

mapboxgl.accessToken = ACCESS_TOKEN;
let map: mapboxgl.Map | undefined;
let marker: mapboxgl.Marker | undefined;
const loading = ref(true);

const location = ref<Location>({lat: 0, long: 0, name: ""});

onMounted(() => {
  mapboxgl.accessToken = ACCESS_TOKEN;

  map = new mapboxgl.Map({
    container: "map", // container ID
    style: theme(), // style URL
    center: [6.14569, 46.20222], // starting position [lng, lat]
    zoom: 9, // starting zoom
  });

  map.on("load", () => {
    loading.value = false;
    if (map?.loaded()) {
      map.resize();
    }
  });
});

onIonViewWillEnter(() => {
  if (!newDemand.hasLocation.value && valid.value) {
    location.value = {lat: 0, long: 0, name: ""};
  }
});

watchEffect(() => {
  if (marker) {
    marker.remove();
  }

  marker = new mapboxgl.Marker()
      .setLngLat([location.value.long, location.value.lat])
      .addTo(map as mapboxgl.Map);

  if (map && valid.value) {
    map.setCenter({lat: location.value.lat, lon: location.value.long});
    map.zoomTo(16);
  } else if (map) {
    map.setCenter({lon: 6.14569, lat: 46.20222});
    map.zoomTo(9);
  }
});

const valid = computed(() => {
  return location.value.lat !== 0 && location.value.long !== 0;
});

const saveLocation = (value: Location) => {
  location.value = value;
};

const validate = () => {
  newDemand.location.value = location.value;
  if (valid.value) router.push("/add/reward");
};
</script>

<style lang="scss" scoped>
#map {
  width: 100%;
  height: 58vh;
  margin-top: 1rem;
  border-radius: 20px;
  transition: opacity 0.7s ease-in-out;
}
</style>
