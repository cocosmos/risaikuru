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
        Choisis le moment auquel tu es disponible pour qu'on vienne chercher tes
        déchêts
      </h2>
      <div class="moment-selection">
        <ion-datetime
          presentation="date"
          v-model="state.rawDate"
        ></ion-datetime>
        <div class="moment-selection__time">
          <ion-text>Entre</ion-text>
          <ion-datetime
            presentation="time"
            minuteValues="0,15,30,45"
            v-model="state.rawStartTime"
            hourCycle="h23"
          ></ion-datetime>
          <ion-text>et</ion-text>
          <ion-datetime
            presentation="time"
            minuteValues="0,15,30,45"
            v-model="state.rawEndTime"
            hourCycle="h23"
          ></ion-datetime>
        </div>
      </div>

      <fixed-bottom-container>
        <ion-button expand="block" @click="validate()" :disabled="!valid">
          Choisir le lieu
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
  IonDatetime,
  IonText,
  onIonViewWillEnter,
} from "@ionic/vue";
import { chevronForwardOutline } from "ionicons/icons";
import { useRouter } from "vue-router";
import FixedBottomContainer from "@/components/FixedBottomContainer.vue";
import { computed, reactive } from "vue";
import moment from "moment";
import { useNewDemand } from "@/composables/newDemand";

const router = useRouter();
const newDemand = useNewDemand();

const state = reactive({
  rawDate: moment().format(),
  rawStartTime: moment().startOf("hour").format(),
  rawEndTime: moment().startOf("hour").format(),
});

onIonViewWillEnter(() => {
  if (!newDemand.hasMoment.value) {
    state.rawDate = moment().format();
    state.rawStartTime = moment().startOf("hour").format();
    state.rawEndTime = moment().startOf("hour").format();
  }
});

const dateBegin = computed(() => {
  const date = moment(state.rawDate).format("YYYY-MM-DD");
  const time = moment(state.rawStartTime).format("HH:mm:ss");
  return new Date(`${date} ${time}`);
});

const dateEnd = computed(() => {
  const date = moment(state.rawDate).format("YYYY-MM-DD");
  const time = moment(state.rawEndTime).format("HH:mm:ss");
  return new Date(`${date} ${time}`);
});

const valid = computed(() => {
  return dateBegin.value < dateEnd.value && dateEnd.value > new Date();
});

const validate = () => {
  newDemand.dateBegin.value = dateBegin.value;
  newDemand.dateEnd.value = dateEnd.value;
  if (valid.value) router.push("/add/location");
};
</script>

<style lang="scss">
.moment-selection {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  ion-datetime {
    border-radius: 1rem;
  }

  &__time {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
}
</style>
