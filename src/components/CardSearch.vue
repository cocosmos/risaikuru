<script lang="ts" setup>
import { trophy, chevronDown, chevronUp } from "ionicons/icons";
import IconInfo from "./IconInfo.vue";
import { defineProps, ref } from "vue";
import {
  IonCard,
  IonCardHeader,
  IonAvatar,
  IonLabel,
  IonIcon,
  IonText,
  IonCardContent,
} from "@ionic/vue";
import { Demand } from "@/types/Demand";
import { fDate } from "../utils/formatDate";
import QuantityOnCard from "./QuantityOnCard.vue";
const props = defineProps<{
  demand: Demand;
}>();

const dateBegin = new Date(props.demand.dateBegin);
const dateEnd = new Date(props.demand.dateEnd);

const dateFormatted = fDate(dateBegin, dateEnd);

const isOpen = ref(false);
const toggleOpen = () => {
  isOpen.value = !isOpen.value;
};
</script>
<template>
  <ion-card color="light">
    <ion-card-header>
      <div class="card__header">
        <div class="card__header-avatar">
          <ion-avatar>
            <img
              alt="Silhouette of a person's head"
              :src="props.demand.user.profilePicture"
            />
          </ion-avatar>
          <ion-label class="text__bold">{{
            props.demand.user.fname
          }}</ion-label>
        </div>
        <div class="card__header-price">
          <ion-icon :icon="trophy" color="primary" size="medium" />
          <ion-text color="primary" class="text__bold"
            >{{ props.demand.reward }} CHF</ion-text
          >
        </div>
      </div>
    </ion-card-header>

    <ion-card-content>
      <ion-text>{{ dateFormatted }} </ion-text>
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

      <div class="buttons">
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
}
.card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  &-avatar {
    display: flex;
    align-items: center;
    ion-label {
      margin-left: 0.5rem;
    }

    ion-avatar {
      width: 2rem;
      height: 2rem;
    }
  }
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
  margin-top: 20px;
  flex-wrap: wrap;
}
.quantity {
  margin-top: 15px;
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
  margin-top: 1em;
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
