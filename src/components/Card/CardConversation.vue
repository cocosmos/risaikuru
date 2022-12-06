<script lang="ts" setup>
import { Demand, Status } from "@/types/Demand";
import { defineProps, ref, toRefs } from "vue";
import { fDay, formatMoney } from "@/utils/format";
import { checkmarkCircleOutline, closeCircleOutline } from "ionicons/icons";
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardContent,
  IonText,
  IonButton,
  IonIcon,
} from "@ionic/vue";
const props = defineProps<{ demand: Demand; isAsker: boolean }>();
const { demand, isAsker } = toRefs(props);
const name = ref(demand.value.user.fname);

interface Label {
  status: Status;
  icon?: string;
  text: string;
  button?: string;
  colorButton?: string;
  isAsker: boolean;
}

const labels: Label[] = [
  {
    status: "pending",
    icon: checkmarkCircleOutline,
    colorButton: "success",
    text: `${name.value} veut récupérer vos déchets.`,
    button: "Accepter et payer",
    isAsker: true,
  },
  {
    status: "accepted",
    text: "Prise en charge acceptée",
    isAsker: true,
  },
  {
    status: "rejected",
    text: "Vous avez refusé la prise en charge",
    isAsker: true,
  },
  {
    status: "pending",
    text: `${name.value} n'a pas encore validé votre demande.`,
    icon: closeCircleOutline,
    colorButton: "danger",
    button: "Annuler",
    isAsker: false,
  },
  {
    status: "accepted",
    text: `${name.value} a accepté votre demande.`,
    isAsker: false,
  },
  {
    status: "rejected",
    text: "Prise en charge annulée",
    isAsker: false,
  },
];

let label = ref(labels[0]);
label.value = labels.find(
  (l) => props.demand.status === l.status && isAsker.value === l.isAsker
) as Label;

const colorHeader = ref("primary");

switch (label.value.status) {
  case "pending":
    colorHeader.value = "warning";
    break;
  case "accepted":
    colorHeader.value = "success";
    break;
  case "rejected":
    colorHeader.value = "danger";
    break;

  default:
    colorHeader.value = "primary";
    break;
}
</script>

<template>
  <ion-card class="ion-no-margin">
    <ion-card-header :color="colorHeader">
      <ion-card-subtitle>{{ fDay(demand.dateBegin) }}</ion-card-subtitle>
    </ion-card-header>

    <ion-card-content>
      <ion-text
        ><p>{{ label.text }}</p></ion-text
      >
      <ion-text v-if="label.isAsker && label.status === 'pending'">
        <p>
          {{ formatMoney(props.demand.reward + props.demand.fees)
          }}<span> (Frais inclus)</span>
        </p>
      </ion-text>
      <ion-button
        shape="round"
        expand="full"
        :color="label.colorButton"
        v-if="label.button"
      >
        <ion-icon slot="start" :icon="label.icon"></ion-icon>
        {{ label.button }}
      </ion-button>
    </ion-card-content>
  </ion-card>
</template>

<style lang="scss" scoped>
ion-card {
  border-radius: 1.5em;
  background-color: var(--ion-color-primary-contrast);
  &-header {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 1em;
    ion-card-subtitle {
      font-size: 1.2em;
      text-transform: lowercase;
      font-weight: normal;
    }
    ion-card-title {
      font-size: 1.5em;
      font-weight: 700;
    }
    border-radius: 1.5em;
  }
  &-content {
    padding-top: 5%;
    ion-text {
      color: var(--ion-color-text);
      text-align: center;
      p {
        font-size: 1em;
        font-weight: 500;
      }
      span {
        font-size: 0.7em;
        font-weight: 300;
      }
    }
  }
}
</style>
