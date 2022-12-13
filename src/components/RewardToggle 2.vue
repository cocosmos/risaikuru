<template>
  <button @click="toggle" :class="{'reward-toggle--selected': props.modelValue}" class="reward-toggle">
    {{ props.amount }} CHF
  </button>
</template>

<script lang="ts" setup>
import {defineProps, defineEmits} from 'vue';

const props = defineProps<{
  modelValue: boolean,
  amount: number
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const toggle = () => {
  emit('update:modelValue', !props.modelValue);
}
</script>

<style lang="scss" scoped>
.reward-toggle {
  font-size: 24px;
  padding: 24px 10px;
  border-radius: 10px;
  border: 2px solid transparent;
  background: var(--ion-color-primary-light);

  &--selected {
    border-color: var(--ion-color-primary);
  }
}
</style>