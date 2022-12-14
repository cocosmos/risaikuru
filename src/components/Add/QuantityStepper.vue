<template>
  <div
    class="quantity-stepper"
    :class="{ 'quantity-stepper--selected': isSelected }"
  >
    <div class="quantity-stepper__infos">
      <span>{{ props.size.toUpperCase() }}</span>
      <ion-icon :icon="icon" color="primary" size="large"></ion-icon>
    </div>
    <div class="quantity-stepper__content">
      <p class="quantity-stepper__label">{{ props.description }}</p>
      <div class="quantity-stepper__stepper">
        <ion-fab-button
          size="small"
          @click="decrement()"
          :disabled="!isSelected"
        >
          -
        </ion-fab-button>
        <span>{{ props.modelValue }}</span>
        <ion-fab-button size="small" @click="increment()"> + </ion-fab-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IonFabButton, IonIcon } from "@ionic/vue";
import { bag, car, cube, logoDropbox } from "ionicons/icons";
import { computed, defineEmits, defineProps } from "vue";

const props = defineProps<{
  modelValue: number;
  size: string;
  description: string;
}>();

const icon = computed(() => {
  switch (props.size) {
    case "S":
      return cube;
    case "M":
      return bag;
    case "L":
      return logoDropbox;
    case "XL":
      return car;
    default:
      return cube;
  }
});

const emit = defineEmits(["update:modelValue"]);

const increment = () => {
  emit("update:modelValue", props.modelValue + 1);
};

const decrement = () => {
  if (props.modelValue > 0) {
    emit("update:modelValue", props.modelValue - 1);
  }
};

const isSelected = computed((): boolean => {
  return props.modelValue > 0;
});
</script>

<style scoped lang="scss">
.quantity-stepper {
  background: var(--ion-color-light);
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 2px solid transparent;

  &--selected {
    border-color: var(--ion-color-primary);
  }

  &__infos {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    font-weight: bold;
    gap: 1rem;
  }

  &__label {
    margin-top: 0;
  }

  &__content {
    flex-grow: 1;
  }

  &__stepper {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    align-items: center;

    text-align: center;

    ion-input {
      --padding-start: var(--padding-end);
    }
  }
}
</style>
