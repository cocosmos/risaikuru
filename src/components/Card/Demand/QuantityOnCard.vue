<script lang="ts" setup>
import { Quantity } from "@/types/Demand";
import { defineProps, ref } from "vue";
import { nanoid } from "nanoid";

/**
 * Props
 */
const props = defineProps<{
  quantity: Quantity;
}>();
const id = ref(nanoid());
</script>

<template>
  <div class="quantity__list-chip" v-if="props.quantity.number !== 0" :id="id">
    <ion-text class="text__bold">{{ props.quantity.id }}</ion-text>
    <ion-text color="secondary"> {{ props.quantity.number }}</ion-text>
  </div>
  <ion-popover :trigger="id" trigger-action="hover">
    <ion-content class="ion-padding">{{ quantity.description }}</ion-content>
  </ion-popover>
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
