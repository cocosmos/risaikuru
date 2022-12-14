<script lang="ts" setup>
import { defineProps, ref, computed } from "vue";
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
import { Conversation } from "@/types/Message";
import { acceptDemand } from "@/supabase";
import { cancelDemand } from "@/supabase/conversation";
import { useAuthStore } from "@/store/auth";
import { stripe } from "@/utils/stripe";
import { paidDemand } from "../../supabase/demand";
import { useRouter } from "vue-router";
import { inscreasePot } from "@/supabase/profile";

const props = defineProps<{
  conversation: Conversation;
}>();
const router = useRouter();
const authStore = useAuthStore();
const isAsker = ref(props.conversation.isAsker);
const conversation = ref(props.conversation);

const stripeFinded = computed(() => {
  return stripe.find(
    ({ reward }) => reward === props.conversation.demand.reward
  );
});

const label = computed(() => {
  switch (conversation.value.demand.status) {
    case "pending":
      if (conversation.value.isAsker) {
        if (conversation.value.canceled) {
          return {
            text: `Prise en charge refusée.`,
            color: "danger",
          };
        } else {
          return {
            text: `${conversation.value.receiver.fname} n'a pas encore validé votre demande.`,
            color: "warning",
          };
        }
      } else {
        if (conversation.value.canceled) {
          return {
            text: `${conversation.value.receiver.fname} a refusé de prendre vos déchets.`,
            color: "danger",
          };
        } else {
          return {
            text: `${conversation.value.receiver.fname} veux récupérer vos déchets.`,
            color: "warning",
          };
        }
      }
    case "accepted":
      if (!conversation.value.isAsker) {
        return {
          text: `Prise en charge acceptée.`,
          color: "success",
        };
      } else {
        if (conversation.value.demand.attributedTo === authStore.user.id) {
          return {
            text: `${conversation.value.receiver.fname} a accepté votre demande.`,
            color: "success",
          };
        } else {
          return {
            text: `${conversation.value.receiver.fname} a attribué le rammassage à une autre personne`,
            color: "danger",
          };
        }
      }
    default:
      return {
        text: ``,
        color: "warning",
      };
  }
});

const handleAction = () => {
  if (isAsker.value) {
    cancelDemand(conversation.value.id);
    conversation.value.canceled = true;
  } else {
    if (stripeFinded.value) {
      acceptDemand(
        conversation.value.demand.id,
        conversation.value.receiver.id
      );
      window.location.href = stripeFinded.value.link;
    }
  }
};

const handleFinishTransactions = () => {
  const id = conversation.value.receiver.id;
  const total =
    conversation.value.demand.reward + conversation.value.receiver.balance;
  if (conversation.value) {
    paidDemand(conversation.value.demand.id);
    inscreasePot(id, total);
    router.push("/messages");
  }
};
</script>

<template>
  <ion-card class="ion-no-margin">
    <ion-card-header :color="label.color">
      <ion-card-subtitle>
        {{ fDay(conversation.demand.dateBegin) }}
      </ion-card-subtitle>
      <ion-text v-if="!isAsker && conversation.demand.status === 'pending'">
        {{ formatMoney(conversation.demand.reward + conversation.demand.fees) }}
        <span class="price__fees"> (Frais inclus)</span>
      </ion-text>
    </ion-card-header>

    <ion-card-content>
      <ion-text class="text__label"
        ><p>
          {{ label.text }}
        </p></ion-text
      >

      <ion-button
        shape="round"
        :color="isAsker ? 'danger' : 'success'"
        v-if="
          !conversation.canceled && conversation.demand.status === 'pending'
        "
        @click="handleAction()"
      >
        <ion-icon
          slot="start"
          :icon="isAsker ? closeCircleOutline : checkmarkCircleOutline"
        ></ion-icon>
        <ion-text>
          {{ !isAsker ? "Accepter et payer" : "Annuler la demande" + " " }}
          <ion-text v-if="!isAsker">
            {{
              formatMoney(conversation.demand.reward + conversation.demand.fees)
            }}
          </ion-text>
        </ion-text>
      </ion-button>
      <ion-button
        shape="round"
        color="success"
        v-if="conversation.demand.status === 'accepted' && !isAsker"
        @click="handleFinishTransactions()"
      >
        <ion-icon slot="start" :icon="checkmarkCircleOutline"></ion-icon>
        <ion-text>
          {{ conversation.receiver.fname }} est venu chercher vos déchets.
        </ion-text>
      </ion-button>
    </ion-card-content>
  </ion-card>
</template>

<style lang="scss" scoped>
ion-card {
  border-radius: 1.5em;
  background-color: var(--ion-color-light);

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
      color: var(--ion-text-color);
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
