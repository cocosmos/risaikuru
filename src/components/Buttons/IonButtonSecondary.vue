<template>
  <ion-button v-bind="$props">
    <slot></slot>
  </ion-button>
</template>

<script lang="ts" setup>
import {IonButton} from "@ionic/vue";
</script>

<style scoped>
ion-button {
  --background: var(--ion-color-secondary);
  --background-hover: var(--ion-color-secondary-shade);
  --background-activated: var(--ion-color-secondary-shade);
  --background-focused: var(--ion-color-secondary-shade);

  --color: var(--ion-color-primary);

  --border-color: var(--ion-color-primary);
  --border-style: solid;
  --border-width: 2px;
}
</style>