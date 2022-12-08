<script lang="ts" setup>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonRange, onIonViewWillEnter,
} from "@ionic/vue";
import {locate} from "ionicons/icons";
import CardDemand from "../components/Card/CardDemand.vue";
import {Geolocation} from "@capacitor/geolocation";
import {store} from "@/data/store";
import LocationSearch from "@/components/LocationSearch.vue";
import {computed, onMounted, reactive, ref} from "vue";
import {createDemand, Demand} from "@/types/Demand";
import {supabase} from "@/data/supabase";
import {createUser} from "@/types/User";

const PAGE_SIZE = 5;

const pinFormatter = (value: number) => `${value}km`;
const printPosition = async (coordinates: any) => {
  console.log("Position:", coordinates);
};

const loading = ref(true);
const hasMoreResults = ref(true);
const demands = ref<Demand[]>([]);
const page = ref(1);
const scrollTriggerElement = ref<HTMLElement>();

const nextResultsMin = computed(() => {
  return (page.value - 1) * PAGE_SIZE;
});

const nextResultsMax = computed(() => {
  return page.value * PAGE_SIZE - 1;
})

onMounted(() => {
  getDemands();
});

onIonViewWillEnter(() => {
  demands.value = [];
  page.value = 1;
  loading.value = true;
  getDemands();
})

// TODO : afficher que ce qui correspond au rayon décidé
function getDemands() {
  supabase.from("demands")
      .select("*, user(*)")
      .filter('dateEnd', 'not.lt', new Date().toISOString())
      .order('dateBegin')
      .range(nextResultsMin.value, nextResultsMax.value)
      .then(({data}) => {
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
        });
        page.value += 1;
        loading.value = false;
        hasMoreResults.value = data?.length === PAGE_SIZE;
      });
}

const handleScroll = (event: CustomEvent) => {
  const scrollTriggerPos = scrollTriggerElement.value?.offsetTop;
  const scrollBottomPos = event.detail.scrollTop + event.target?.scrollHeight;
  if (scrollTriggerPos && scrollBottomPos && scrollBottomPos > scrollTriggerPos && !loading.value && hasMoreResults.value) {
    loading.value = true;
    getDemands();
  }
}
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Rechercher</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding" :scroll-events="true" @ion-scroll="handleScroll">
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
