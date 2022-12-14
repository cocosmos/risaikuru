<template>
  <div
    class="reward-custom"
    :class="{ 'reward-custom--selected': isSelected }"
    @click="focusInput"
  >
    <label class="reward-custom__label" for="reward_custom">Personnalisé</label>
    <input
      type="number"
      class="reward-custom__input"
      :value="displayValue"
      ref="input"
      id="reward_custom"
      @focusout="unselect"
      placeholder="-"
    />
    <span>CHF</span>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, computed, ref } from "vue";

const props = defineProps<{
  modelValue: number;
  selected: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: number): void;
}>();

const input = ref<HTMLInputElement | undefined>(undefined);
const inputSelected = ref(false);

const isSelected = computed(() => {
  return inputSelected.value || props.modelValue !== 0;
});

const displayValue = computed(() => {
  return props.modelValue !== 0 ? props.modelValue : "";
});

const focusInput = () => {
  inputSelected.value = true;
  if (input.value !== undefined) {
    input.value.focus();
  }
};

const unselect = () => {
  inputSelected.value = false;
  updateValue();
};

const updateValue = () => {
  if (input.value !== undefined) {
    const newValue = parseInt(input.value.value);
    if (!isNaN(newValue) && newValue !== 0) {
      emit("update:modelValue", newValue);
    }
  }
};
</script>

<style lang="scss" scoped>
.reward-custom {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
  padding: 24px 10px;
  border-radius: 10px;
  border: 2px solid transparent;
  background: var(--ion-color-primary-light);

  &__input {
    display: inline;
    min-width: 0;
    max-width: 30px;
    background: none;
    border: none;
    padding: 0;

    &:focus-visible {
      border: none;
      outline: none;
    }
  }

  &__label {
    position: absolute;
    font-size: 0.75rem;
    top: -5px;
    left: 50%;
    transform: translate(-50%, -100%);
  }

  &--selected {
    border-color: var(--ion-color-primary);
  }
}
</style>
