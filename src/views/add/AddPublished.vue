<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Nouvelle demande</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding relative background">
      <template v-if="newDemand.published">
        <h2 class="ion-text-center">Félicitations, ton annonce est publiée</h2>
        <div class="wastes">
          <IconInfo
            v-for="wasteType in newDemand.wasteTypes.value"
            :waste="wasteType"
            :key="wasteType"
            size="50px"
          ></IconInfo>
        </div>
        <div class="infos">
          <div class="infos__volume">
            <p>Volume</p>
            <div class="infos__quantities">
              <quantity-on-card
                v-for="quantity in quantities"
                :quantity="quantity"
                :key="quantity.id"
              ></quantity-on-card>
            </div>
          </div>
          <div class="infos__line">
            <ion-icon :icon="Icons.calendarOutline" color="primary"></ion-icon>
            <span>{{ momentStr }}</span>
          </div>
          <div class="infos__line">
            <ion-icon :icon="Icons.location" color="primary"></ion-icon>
            <span>{{
              newDemand.location.value !== undefined
                ? newDemand.location.value.name
                : ""
            }}</span>
          </div>
          <div class="infos__line">
            <ion-icon :icon="Icons.trophy" color="primary"></ion-icon>
            <span class="infos__reward">
              {{ newDemand.reward.value }} CHF
              <span class="infos__reward__fees">+ {{ fees }} CHF (frais)</span>
            </span>
          </div>
        </div>
      </template>
      <fixed-bottom-container>
        <ion-button expand="block" router-link="/" router-direction="back">
          Retour à l'accueil
        </ion-button>
        <ion-button-secondary expand="block">
          Gérer mes annonces
        </ion-button-secondary>
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
  IonPage,
  IonIcon,
} from "@ionic/vue";
import * as Icons from "ionicons/icons";
import FixedBottomContainer from "@/components/FixedBottomContainer.vue";
import IonButtonSecondary from "@/components/Buttons/IonButtonSecondary.vue";
import IconInfo from "@/components/IconInfo.vue";
import QuantityOnCard from "@/components/Card/Demand/QuantityOnCard.vue";
import { useNewDemand } from "@/composables/newDemand";
import { computed, onMounted, watchEffect } from "vue";
import moment from "moment";
import { useRouter } from "vue-router";

const router = useRouter();
const newDemand = useNewDemand();

onMounted(() => {
  newDemand.saveDemand();
});

// TODO: mettre cette propriété computed dans le composable pour pouvoir envoyer le resultat de celle-ci à supabase
const quantities = computed(() => {
  return newDemand.quantities.value.filter((quantity) => {
    return quantity.number > 0;
  });
});

const momentStr = computed(() => {
  moment.locale("fr");
  return (
    moment(newDemand.dateBegin.value).format(
      "dddd D MMMM [entre] HH:mm [et] "
    ) + moment(newDemand.dateEnd.value).format("HH:mm")
  );
});

const fees = computed(() => {
  return newDemand.reward.value * 0.25;
});
</script>

<style lang="scss" scoped>
.background {
  --background: none;
  background: white url("../../assets/summary-background.png") center 105%
    no-repeat;
  background-size: 125%;
}

.wastes {
  margin-top: 2rem;
  max-width: 100%;
  display: flex;
  gap: 1rem;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.infos {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  margin-top: 1rem;

  &__volume {
    font-weight: bold;
    margin-bottom: 1rem;

    p {
      text-align: center;
      margin-bottom: 0;
    }
  }

  &__quantities {
    display: flex;
    gap: 0.5rem;
  }

  &__line {
    display: flex;
    gap: 1rem;
    font-weight: bold;
    align-items: center;

    ion-icon {
      font-size: 50px;
    }

    span {
      max-width: 150px;
    }
  }

  &__reward {
    position: relative;
    color: var(--ion-color-primary);
    font-size: 1.5rem;
    font-weight: bold;

    &__fees {
      position: absolute;
      top: calc(100% + 10px);
      left: 0;
      font-size: 0.75rem;
      color: var(--ion-color-text);
    }
  }
}
</style>
