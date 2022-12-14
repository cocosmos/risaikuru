<script lang="ts" setup>
import { IonSpinner } from "@ionic/vue";
import { defineProps } from "vue";

defineProps<{
  loading: boolean;
}>();
</script>

<template>
  <div class="loader">
    <ion-spinner v-if="loading" name="crescent" color="primary" />
  </div>
</template>

<style lang="scss" scoped>
.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  ion-spinner {
    width: 50px;
    height: 50px;
  }
}
</style>
