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
      <h2 class="ion-text-center">Choisis le moment auquel tu es disponible pour qu'on vienne chercher tes
        déchêts</h2>
      <div class="moment-selection">
        <ion-datetime presentation="date" v-model="state.rawDate"></ion-datetime>
        <div class="moment-selection__time">
          <ion-text>Entre</ion-text>
          <ion-datetime presentation="time" minuteValues="0,15,30,45" v-model="state.rawStartTime"></ion-datetime>
          <ion-text>et</ion-text>
          <ion-datetime presentation="time" minuteValues="0,15,30,45" v-model="state.rawEndTime"></ion-datetime>
        </div>
      </div>

      <fixed-bottom-container>
        <ion-button expand="block" @click="validate()">
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
  IonText
} from "@ionic/vue";
import {chevronForwardOutline} from "ionicons/icons";
import {useRouter} from "vue-router";
import FixedBottomContainer from "@/components/FixedBottomContainer.vue";
import {computed, reactive} from "vue";

const router = useRouter();

const state = reactive({
  rawDate: new Date().toISOString(),
  rawStartTime: new Date().toISOString(),
  rawEndTime: new Date().toISOString(),
});

const dateBegin = computed(() => {
  const date = new Date(state.rawDate).toDateString();
  const time = new Date(state.rawStartTime).toTimeString();
  return new Date(`${date} ${time}`);
});

const dateEnd = computed(() => {
  const date = new Date(state.rawDate).toDateString();
  const time = new Date(state.rawEndTime).toTimeString();
  return new Date(`${date} ${time}`);
})

const validate = () => {
  router.push('/add/location');
}
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
    gap: .5rem;
  }
}
</style>