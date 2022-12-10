<script lang="ts" setup>
import { defineProps, ref } from "vue";
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
import { Conversation, Label } from "@/types/Message";
const props = defineProps<{
  conversation: Conversation;
  label: Label;
}>();

const isAsker = ref(props.conversation.isAsker);
</script>

<template>
  <ion-card class="ion-no-margin">
    <ion-card-header :color="props.label.color">
      <ion-card-subtitle
        >{{ fDay(props.conversation.demand.dateBegin) }}
      </ion-card-subtitle>
      <ion-text v-if="!isAsker && props.label.status === 'pending'">
        {{
          formatMoney(
            props.conversation.demand.reward + props.conversation.demand.fees
          )
        }}
        <span class="price__fees"> (Frais inclus)</span>
      </ion-text>
    </ion-card-header>

    <ion-card-content>
      <ion-text class="text__label"
        ><p>
          <span v-if="label.showFname">{{
            props.conversation.receiver.fname
          }}</span
          >{{ label.text }}
        </p></ion-text
      >

      <ion-button shape="round" :color="isAsker ? 'danger' : 'success'">
        <ion-icon
          slot="start"
          :icon="isAsker ? closeCircleOutline : checkmarkCircleOutline"
        ></ion-icon>
        <ion-text>
          {{ !isAsker ? "Accepter et payer" : "Annuler la demande" + " " }}
          <ion-text v-if="!isAsker">
            {{
              formatMoney(
                props.conversation.demand.reward +
                  props.conversation.demand.fees
              )
            }}
          </ion-text>
        </ion-text>
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
    justify-content: space-around;
    text-align: center;
    padding: 0.8em;
    ion-card-subtitle {
      font-size: 1em;
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
    padding: 1%;
    padding-top: 3%;
    text-align: center;
    .text__label {
      color: var(--ion-color-text);
    }
  }

  .price {
    &__fees {
      font-size: 0.7em;
      font-weight: 300;
    }
  }
}
</style>
