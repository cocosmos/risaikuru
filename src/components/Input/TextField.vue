<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  error?: string;
  label?: string;
  isError: boolean;
  name: string;
  isMargin?: boolean;
}>();
</script>

<template>
  <ion-item
    fill="outline"
    mode="md"
    :class="{
      'ion-invalid': props.isError,
      'ion-margin-bottom': !props.isMargin,
    }"
  >
    <ion-label position="floating">{{ props.label }}</ion-label>
    <ion-input
      :name="props.name"
      type="text"
      required
      @input="$emit('update:modelValue', $event.target.value)"
    ></ion-input>
    <slot></slot>
    <ion-note slot="error">{{ props.error }}</ion-note>
  </ion-item>
</template>
