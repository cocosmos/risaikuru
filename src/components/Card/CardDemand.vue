<script lang="ts" setup>
import { trophy, chevronDown, chevronUp } from "ionicons/icons";
import IconInfo from "../IconInfo.vue";
import { defineProps, ref } from "vue";
import {
  IonCard,
  IonCardHeader,
  IonIcon,
  IonText,
  IonCardContent,
  IonButton,
} from "@ionic/vue";
import { Demand } from "@/types/Demand";
import { fDate } from "../../utils/formatDate";
import QuantityOnCard from "../QuantityOnCard.vue";
import AvatarName from "../AvatarName.vue";
import router from "@/router";
const props = defineProps<{
  demand: Demand;
  cardOfCurrentUser: boolean;
}>();

const dateBegin = new Date(props.demand.dateBegin);
const dateEnd = new Date(props.demand.dateEnd);

const dateFormatted = fDate(dateBegin, dateEnd);

const isOpen = ref(false);
const toggleOpen = () => {
  isOpen.value = !isOpen.value;
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
        <ion-text v-if="props.cardOfCurrentUser">{{ dateFormatted }} </ion-text>
        <div class="card__header-price">
          <ion-icon :icon="trophy" color="primary" size="medium" />
          <ion-text color="primary" class="text__bold"
            >{{ props.demand.reward }} CHF</ion-text
          >
        </div>
      </div>
    </ion-card-header>

    <ion-card-content>
      <ion-text class="card__date" v-if="!props.cardOfCurrentUser"
        >{{ dateFormatted }}
      </ion-text>
      <div class="icon__list">
        <icon-info
          v-for="waste in props.demand.waste"
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
          ></ion-icon> </ion-button
        ><ion-button>Contacter</ion-button>
      </div>

      <div class="map-closed" :class="{ open: isOpen }"></div>
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
.map-closed {
  background: red;
  height: 200px;
  max-height: 0;
  transition: 0.5s ease-in;
}

.open {
  max-height: 200px;
  transition: 0.5s ease-out;
}
</style>
