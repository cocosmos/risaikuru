<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  error?: string;
  label?: string;
  isError: boolean;
  name: string;
}>();
</script>

<template>
  <ion-item
    fill="outline"
    mode="md"
    class="ion-margin-bottom"
    :class="{
      'ion-invalid': props.isError,
    }"
  >
    <ion-label position="floating">{{ props.label }}</ion-label>
    <ion-input
      :name="props.name"
      type="text"
      required
      @input="$emit('update:modelValue', $event.target.value)"
    ></ion-input>
    <ion-note slot="error">{{ props.error }}</ion-note>
  </ion-item>
</template>
