<script lang="ts" setup>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonRange,
} from "@ionic/vue";
import {locate} from "ionicons/icons";
import CardDemand from "../components/Card/CardDemand.vue";
import {Geolocation} from "@capacitor/geolocation";
import {store} from "@/data/store";
import LocationSearch from "@/components/LocationSearch.vue";
import {onMounted, ref} from "vue";
import {createDemand, Demand} from "@/types/Demand";
import {supabase} from "@/data/supabase";
import {createUser} from "@/types/User";

const pinFormatter = (value: number) => `${value}km`;
const printPosition = async (coordinates: any) => {
  console.log("Position:", coordinates);
};

const demands = ref<Demand[]>([]);

onMounted(getDemands);

// TODO : trier dans le bon ordre
// TODO : afficher que ce qui correspond au rayon décidé
// TODO : Pagination (infinite scroll)
function getDemands() {
  demands.value = [];
  supabase.from("demands").select("*, user(*)").then(({data}) => {
    data?.forEach((demand) => {
      const location = {lat: demand.lat, long: demand.long, name: demand.address};
      const dateBegin = new Date(demand.dateBegin);
      const dateEnd = new Date(demand.dateEnd);
      const user = {
        id: demand.user.id,
        fname: demand.user.fname,
        lname: demand.user.lname,
        email: demand.user.email,
        adress: demand.user.adress,
        profilePicture: demand.user.avatar,
        iban: undefined,
        balance: 0
      }
      demands.value.push(createDemand(demand.wastes, demand.quantity, location, user, demand.reward, dateBegin, dateEnd));
    })
  });
}
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Rechercher</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding">
      <location-search @locationUpdated="printPosition"></location-search>
      <div class="range">
        <ion-text class="text__bold"> Rayon</ion-text>
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
        <card-demand
            v-for="demand in demands"
            v-bind:key="demand.id"
            :demand="demand"
            :card-of-current-user="false"
        ></card-demand>
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
