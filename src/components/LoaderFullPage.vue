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
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  ion-spinner {
    width: 50px;
    height: 50px;
  }
}
</style>
