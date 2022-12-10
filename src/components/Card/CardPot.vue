<script lang="ts" setup>
import { defineProps } from "vue";
import { fDay, formatMoney } from "@/utils/format";
import ProgressBar from "../Profile/ProgressBar.vue";
const props = defineProps<{
  balance: number;
}>();
</script>

<template>
  <ion-card class="ion-no-margin">
    <ion-card-header color="primary">
      <ion-card-subtitle>Cagnotte</ion-card-subtitle>

      <ion-card-title>{{ formatMoney(props.balance) }}</ion-card-title>
    </ion-card-header>

    <ion-card-content>
      <progress-bar :balance="balance"></progress-bar
    ></ion-card-content>
  </ion-card>
</template>

<style lang="scss" scoped>
ion-card {
  border-radius: 1.5em;
  background-color: var(--ion-color-primary-contrast);
  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    ion-card-subtitle {
      font-size: 1.3em;
      text-transform: capitalize;
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
  }
}
</style>
