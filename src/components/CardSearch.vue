<script lang="ts" setup>
import { trophy, chevronDown, chevronUp } from "ionicons/icons";
import IconInfo from "./IconInfo.vue";
import { defineProps, ref } from "vue";
import { User } from "@/types/User";
import {
  IonCard,
  IonCardHeader,
  IonRow,
  IonCol,
  IonItem,
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

console.log(isOpen);
</script>
<template>
  <ion-card color="light">
    <ion-card-header>
      <div>
        <ion-row>
          <ion-col>
            <ion-item color="light" lines="none">
              <ion-avatar>
                <img
                  alt="Silhouette of a person's head"
                  :src="props.demand.user.profilePicture"
                />
              </ion-avatar>
              <ion-label class="text__bold">{{
                props.demand.user.fname
              }}</ion-label>
            </ion-item></ion-col
          >
          <ion-col>
            <ion-item color="light" lines="none">
              <ion-icon :icon="trophy" color="primary" />
              <ion-text color="primary" class="text__bold"
                >{{ props.demand.reward }} CHF</ion-text
              >
            </ion-item></ion-col
          >
        </ion-row>
      </div>
      <ion-text>{{ dateFormatted }} </ion-text>
    </ion-card-header>

    <ion-card-content>
      <div class="icon__list">
        <icon-info
          v-for="waste in props.demand.waste"
          v-bind:key="waste"
          :waste="waste"
        ></icon-info>
      </div>
      <ion-text class="text__bold">Quantité</ion-text>
      <div class="quantity__list">
        <quantity-on-card
          v-for="quantity in props.demand.quantity"
          v-bind:key="quantity.id"
          :quantity="quantity"
        ></quantity-on-card>
      </div>
      <div class="buttons">
        <ion-button fill="clear" @click="toggleOpen">
          <ion-icon
            :icon="isOpen ? chevronUp : chevronDown"
            size="large"
          ></ion-icon> </ion-button
        ><ion-button>Contacter</ion-button>
      </div>

      <div class="test" v-if="isOpen"></div>
    </ion-card-content>
  </ion-card>
</template>

<style lang="scss">
.icon__list {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  margin-top: 20px;
}
.quantity__list {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  margin-top: 10px;
}
.buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
  :first-child::part(native) {
    padding: 0;
  }
}
.test {
  background: red;
  height: 100px;
}
</style>
