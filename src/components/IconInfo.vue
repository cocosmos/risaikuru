<script lang="ts" setup>
import { Waste } from "@/types/Demand";
import { defineProps } from "vue";
import { icons } from "../assets/icons/index";

/**
 * Props
 */
const props = defineProps<{
  waste: Waste;
  border?: boolean;
  description?: boolean;
}>();

let iconFinded = { path: "", name: "", description: "" };
icons.forEach((icon) => {
  if (icon.name === props.waste.toString()) {
    iconFinded = icon;
  }
});
</script>
/**Template */

<template>
  <span class="icon">
    <ion-icon :src="iconFinded.path" color="primary"></ion-icon>
    <ion-text>{{ iconFinded.description }}</ion-text>
  </span>
</template>

<style scoped lang="scss">
ion-icon {
  width: 50px;
  height: 50px;
  border: 2px solid var(--ion-color-primary);
  border-radius: 10px;
}
ion-text {
  font-size: 12px;
}
.icon {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
