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
  size: string;
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
    <ion-icon
      :src="iconFinded.path"
      color="primary"
      :style="{ width: props.size, height: props.size }"
    ></ion-icon>
    <ion-text>{{ iconFinded.description }}</ion-text>
  </span>
</template>

<style scoped lang="scss">
ion-icon {
  border: 2px solid var(--ion-color-primary);
  border-radius: 10px;
  background-color: var(--ion-color-primary-contrast);
}
ion-text {
  font-size: calc(0.5em + 0.5vw);
}
.icon {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
