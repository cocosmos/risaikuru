<script lang="ts" setup>
import { formatPercent } from "@/utils/format";
import { IonText } from "@ionic/vue";
import { computed, defineProps } from "vue";

const props = defineProps<{
  balance: number;
}>();
const maxWidthdraw = 20;
const progress = computed(() => formatPercent(props.balance, maxWidthdraw));
const isFull = computed(() => props.balance >= maxWidthdraw);
</script>
<template>
  <div class="progress">
    <ion-text>Retrait minimum de {{ maxWidthdraw }} CHF.</ion-text>
    <div class="progress__bar">
      <div
        class="progress__track"
        :class="isFull ? 'progress__track--full' : ''"
        :style="`width:${progress}%`"
      ></div>
    </div>
    <div class="progress__labels">
      <ion-text color="primary">CHF 0.00</ion-text>
      <ion-text color="primary">CHF {{ maxWidthdraw }}.00</ion-text>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.progress {
  $colorSuccess: var(--ion-color-success);
  $colorTertiary: var(--ion-color-tertiary);

  &__bar {
    display: flex;
    justify-content: space-between;
    background-color: rgba($colorTertiary, 0.3);
    border-radius: 1.5em;
    height: 25px;
    border: 2px solid var(--ion-color-primary);
  }
  &__track {
    background-color: $colorTertiary;
    border-radius: 1.5em;
    height: 100%;
    &--full {
      background-color: $colorSuccess;
    }
  }
  &__labels {
    display: flex;
    justify-content: space-between;
  }
  ion-text {
    font-size: 0.8em;
  }
}
</style>
