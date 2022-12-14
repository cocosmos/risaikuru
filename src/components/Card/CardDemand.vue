<script lang="ts" setup>
import {trophy, chevronDown, chevronUp} from "ionicons/icons";
import IconInfo from "@/components/IconInfo.vue";
import {defineProps, ref, onMounted, computed} from "vue";
import {
  IonCard,
  IonCardHeader,
  IonIcon,
  IonText,
  IonCardContent,
  IonButton,
} from "@ionic/vue";
import {Demand} from "@/types/Demand";
import {fDate} from "../../utils/format";
import QuantityOnCard from "./Demand/QuantityOnCard.vue";
import AvatarName from "../Profile/AvatarName.vue";
import router from "@/router";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {ACCESS_TOKEN} from "@/services/mapbox";
import {useAuthStore} from "@/store/auth";
import {createConversation} from "@/supabase";

const props = defineProps<{
  demand: Demand;
  cardOfCurrentUser: boolean;
}>();

const authStore = useAuthStore();

//const demandFinded = reactive({demand: {} as Demand});

const conversation = computed(() => {
  return props.demand.conversationId;
});

onMounted(() => {
  // getMyDemands();
  //findDemand();
});

const isAsker = ref(props.demand.user.id === authStore.user.id);

const dateBegin = new Date(props.demand.dateBegin);
const dateEnd = new Date(props.demand.dateEnd);

const dateFormatted = fDate(dateBegin, dateEnd);

let map: mapboxgl.Map | undefined;
let marker: mapboxgl.Marker | undefined;

const isOpen = ref(false);

const toggleOpen = () => {
  isOpen.value = !isOpen.value;
  showMap();
};

// TODO : charger la map et afficher le marker à la première ouverture de la carte
const showMap = () => {
  if (map === undefined) {
    mapboxgl.accessToken = ACCESS_TOKEN;

    map = new mapboxgl.Map({
      container: `map-${props.demand.id}`, // container ID
      style: "mapbox://styles/mapbox/streets-v12", // style URL
      center: [props.demand.location.long, props.demand.location.lat], // starting position [lng, lat]
      zoom: 14, // starting zoom
      interactive: false,
    });

    map.on("load", () => {
      if (map !== undefined) map.resize();
      showMarker();
    });
  }
};

const showMarker = () => {
  if (marker === undefined && map !== undefined) {
    marker = new mapboxgl.Marker()
        .setLngLat([props.demand.location.long, props.demand.location.lat])
        .addTo(map);
    console.log(marker);
  }
};

const handleDiscussion = () => {
  if (!authStore.user.id) return router.push("/login");

  if (conversation.value) {
    router.push(`/messages/${conversation.value}`);
  } else {
    const data = createConversation(
        props.demand.id,
        authStore.user.id,
        props.demand.user.id
    );
    data.then((demand) => {
      router.push(`/messages/${demand.id}`);
    });
  }
};

const route = (id: string) => {
  router.push(`/profile/my-demands/${id}`);
};
</script>
<template>
  <ion-card
      color="light"
      @click="cardOfCurrentUser ? route(props.demand.id) : null"
  >
    <ion-card-header>
      <div class="card__header">
        <avatar-name
            :user="props.demand.user"
            :showLname="false"
            size="small"
            v-if="!props.cardOfCurrentUser"
        ></avatar-name>
        <ion-text v-if="props.cardOfCurrentUser">{{ dateFormatted }}</ion-text>
        <div class="card__header-price">
          <ion-icon :icon="trophy" color="primary" size="medium"/>
          <ion-text color="primary" class="text__bold"
          >{{ props.demand.reward }} CHF
          </ion-text>
        </div>
      </div>
    </ion-card-header>

    <ion-card-content>
      <ion-text class="card__date" v-if="!props.cardOfCurrentUser"
      >{{ dateFormatted }}
      </ion-text>
      <div class="icon__list">
        <icon-info
            v-for="waste in props.demand.wastes"
            v-bind:key="waste"
            :waste="waste"
            :size="'40px'"
        ></icon-info>
      </div>
      <div class="quantity">
        <ion-text class="text__bold">Quantité</ion-text>
        <div class="quantity__list">
          <quantity-on-card
              v-for="quantity in props.demand.quantity"
              v-bind:key="quantity.id"
              :quantity="quantity"
          ></quantity-on-card>
        </div>
      </div>

      <div class="buttons" v-if="!props.cardOfCurrentUser">
        <ion-button fill="clear" @click="toggleOpen">
          <ion-icon
              :icon="isOpen ? chevronUp : chevronDown"
              size="large"
          ></ion-icon>
        </ion-button>

        <ion-button
            @click="route(props.demand.id)"
            v-if="isAsker"
            color="warning"
        >Modifier
        </ion-button>
        <ion-button
            @click="handleDiscussion"
            v-if="!isAsker"
            :color="conversation ? 'warning' : 'primary'"
        >
          {{ conversation ? "Contacter" : "Récupérer les déchets" }}
        </ion-button>
      </div>

      <div
          :id="`map-${demand.id}`"
          class="map"
          :class="{ 'map--closed': !isOpen }"
      ></div>
    </ion-card-content>
  </ion-card>
</template>

<style lang="scss">
ion-card {
  margin: 0;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
}

ion-card-content {
  display: flex;
  gap: 8px;
  flex-direction: column;
}

.card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &-price {
    display: flex;
    align-items: center;
    font-size: 1.3em;

    ion-icon {
      margin-right: 0.5rem;
      font-size: 1.3em;
    }
  }
}

.icon__list {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;

  flex-wrap: wrap;
}

.quantity {
  &__list {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
    flex-wrap: wrap;
  }
}

.buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  :first-child::part(native) {
    padding: 0;
  }
}

.map {
  position: relative;
  height: 200px;
  max-height: 200px;
  transition: 0.5s ease-in;

  &--closed {
    max-height: 0;

    & * {
      display: none;
    }
  }
}
</style>
