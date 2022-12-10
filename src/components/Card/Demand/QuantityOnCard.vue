<script lang="ts" setup>
import { Quantity } from "@/types/Demand";
import { defineProps } from "vue";

/**
 * Props
 */
const props = defineProps<{
  quantity: Quantity;
}>();
</script>
/**Template */

<template>
  <div class="quantity__list-chip">
    <ion-text class="text__bold">{{ props.quantity.id }}</ion-text>
    <ion-text color="secondary"> {{ props.quantity.number }}</ion-text>
  </div>
</template>

<style scoped lang="scss">
.quantity__list-chip {
  display: flex;
  align-items: center;
  margin-top: 0.5em;
  border-radius: 20px;
  border: 1px solid var(--ion-color-text);
  background: var(--ion-color-primary);
  ion-text {
    padding: 5px 15px 5px 15px;
    &:first-child {
      background: var(--ion-color-secondary);
      border-radius: 20px 3px 3px 20px;
      padding: 5px 10px 5px 10px;
    }
  }
}
</style>
