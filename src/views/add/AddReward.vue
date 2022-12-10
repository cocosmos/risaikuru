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
        Choisis le montant de la récompense pour le trieur
      </h2>
      <div class="inner-content">
        <reward-toggle-list v-model="rewardAmount"></reward-toggle-list>
        <section class="summary">
          <h3>Récapitulatif:</h3>
          <p class="summary__line">
            <span>Récompense :</span>
            <span>{{ rewardAmount }} CHF</span>
          </p>
          <p class="summary__line">
            <span>TVA & Frais de fonctionnement :</span>
            <span>{{ fees }} CHF</span>
          </p>
          <p class="summary__line summary__total">
            <span>Total* :</span>
            <span>{{ total }} CHF</span>
            <span class="summary__line--indication">
              *Facturé au momement de la prise en charge
            </span>
          </p>
        </section>
      </div>
      <fixed-bottom-container>
        <ion-button expand="block" @click="validate()">
          Poster mon annonce
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
  IonPage,
} from "@ionic/vue";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";

import FixedBottomContainer from "@/components/FixedBottomContainer.vue";
import RewardToggleList from "@/components/Add/RewardToggleList.vue";
import { useNewDemand } from "@/composables/newDemand";

const router = useRouter();
const newDemand = useNewDemand();

const rewardAmount = ref(5);

// TODO: Mettre ça dans le composable pour povoir le réutiliser dans l'écran de résumé
const fees = computed(() => {
  return rewardAmount.value * 0.25;
});

const total = computed(() => {
  return rewardAmount.value + fees.value;
});

const validate = () => {
  newDemand.reward.value = rewardAmount.value;
  router.push("/add/published");
};
</script>

<style lang="scss" scoped>
.inner-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4rem;
  min-height: 60vh;
}

.summary {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  &__line {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 0;
    margin: 0;

    &--indication {
      position: absolute;
      bottom: -5px;
      font-size: 0.75rem;
      transform: translateY(100%);
    }
  }

  &__total {
    font-weight: bold;
    margin-top: 0.5rem;
  }
}
</style>
