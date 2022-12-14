<script lang="ts" setup>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonRange,
  onIonViewWillEnter,
} from "@ionic/vue";
import CardDemand from "../components/Card/CardDemand.vue";
import LocationSearch from "@/components/LocationSearch.vue";
import { computed, ref, watch } from "vue";
import { Demand } from "@/types/Demand";
import { supabase } from "@/supabase";
import CardDemandSkeleton from "@/components/Card/CardDemandSkeleton.vue";
import Location from "@/types/Location";
import { LngLatBounds, MercatorCoordinate } from "mapbox-gl";
import { useAuthStore } from "@/store/auth";
import { add } from "ionicons/icons";
import { useRouter } from "vue-router";
const PAGE_SIZE = 5;

const authStore = useAuthStore();

const loading = ref(false);
const hasMoreResults = ref(true);
const demands = ref<Demand[]>([]);
const page = ref(1);
const scrollTriggerElement = ref<HTMLElement>();
const location = ref<Location>({ long: 0, lat: 0, name: "" });
const range = ref(10);
const router = useRouter();

onIonViewWillEnter(() => {
  resetDemandsList();
});

watch([location, range], () => {
  resetDemandsList();
  /*   subscribeDemands(); */
});

const nextResultsMin = computed(() => {
  return (page.value - 1) * PAGE_SIZE;
});

const nextResultsMax = computed(() => {
  return page.value * PAGE_SIZE - 1;
});

const searchBoundsCoordinates = computed((): LngLatBounds => {
  const mercatorLocation = MercatorCoordinate.fromLngLat(
    { lng: location.value.long, lat: location.value.lat },
    0
  );
  const rangeInMeters = range.value * 1000;
  const offsetInMercator =
    rangeInMeters * mercatorLocation.meterInMercatorCoordinateUnits();
  const swBound = new MercatorCoordinate(
    mercatorLocation.x - offsetInMercator,
    mercatorLocation.y - offsetInMercator,
    0
  ).toLngLat();
  const neBound = new MercatorCoordinate(
    mercatorLocation.x + offsetInMercator,
    mercatorLocation.y + offsetInMercator,
    0
  ).toLngLat();
  return new LngLatBounds(swBound, neBound);
});

const pinFormatter = (value: number) => `${value}km`;
const updatePosition = (newLocation: Location) => {
  location.value = newLocation;
};

const resetDemandsList = () => {
  if (location.value.name !== "") {
    demands.value = [];
    page.value = 1;
    if (!loading.value) {
      loading.value = true;
      getDemands();
    }
  }
};

function getDemands() {
  searchBoundsCoordinates.value;
  supabase
    .from("demands")
    .select("*, user(*), conversations(*)")
    .eq("status", "pending")
    .filter("dateEnd", "not.lt", new Date().toISOString())
    .gt("long", searchBoundsCoordinates.value.getWest())
    .lt("long", searchBoundsCoordinates.value.getEast())
    .gt("lat", searchBoundsCoordinates.value.getNorth())
    .lt("lat", searchBoundsCoordinates.value.getSouth())
    .order("dateBegin")
    .range(nextResultsMin.value, nextResultsMax.value)
    .then(({ data }) => {
      data?.forEach((demand) => {
        const location = {
          lat: demand.lat,
          long: demand.long,
          name: demand.address,
        };
        if (!authStore.isLoggedIn) demand.conversationId = "";
        else {
          const conversation = demand.conversations.find(
            (conversation: any) => {
              return conversation.requester === authStore.user.id;
            }
          );
          demand.conversationId = conversation ? conversation.id : "";
        }
        demands.value.push({ ...demand, location });
      });
      page.value += 1;
      loading.value = false;
      hasMoreResults.value = data?.length === PAGE_SIZE;
    });
}

const handleScroll = (event: CustomEvent | any) => {
  if (!loading.value && hasMoreResults.value) {
    const scrollTriggerPos = scrollTriggerElement.value?.offsetTop;
    const scrollBottomPos = event.detail.scrollTop + event.target?.scrollHeight;
    if (
      scrollTriggerPos &&
      scrollBottomPos &&
      scrollBottomPos > scrollTriggerPos
    ) {
      loading.value = true;
      getDemands();
    }
  }
};

const handleRefresh = (event: CustomEvent) => {
  resetDemandsList();
  setTimeout(() => {
    event.detail.complete();
  }, 100);
};
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Rechercher</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content
      :fullscreen="true"
      class="ion-padding"
      :scroll-events="true"
      @ion-scroll="handleScroll"
    >
      <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <location-search
        @locationUpdated="updatePosition"
        get-initial-location
      ></location-search>
      <div class="range">
        <ion-text class="text__bold"> Rayon</ion-text>
        <ion-range
          :min="0"
          :max="20"
          :value="10"
          :pin="true"
          :pin-formatter="pinFormatter"
          v-model="range"
          class="ion-no-padding"
        ></ion-range>
      </div>

      <div class="no-demands" v-if="demands.length === 0 && !loading">
        <ion-text>Il n'y a pas d'annonces dans ce rayon.</ion-text>
        <ion-button @click="router.push('/add')" class="ion-margin-top"
          ><ion-icon :icon="add" />Ajoutes en une !</ion-button
        >
      </div>

      <div class="cards">
        <card-demand
          v-for="demand in demands"
          v-bind:key="demand.id"
          :demand="demand"
          :card-of-current-user="false"
        ></card-demand>
        <card-demand-skeleton v-if="loading"></card-demand-skeleton>
        <card-demand-skeleton v-if="loading"></card-demand-skeleton>
      </div>
      <div ref="scrollTriggerElement"></div>
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
  .no-demands {
    text-align: center;
    margin-top: 50%;
  }
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
  color: var(--ion-text-color);
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
