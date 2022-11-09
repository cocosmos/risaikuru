<template>
  <div class="quantity-stepper" :class="{'quantity-stepper--selected': isSelected}">
    <div class="quantity-stepper__infos">
      <span>S</span>
      <ion-icon :icon="information" color="primary" size="large"></ion-icon>
    </div>
    <div class="quantity-stepper__content">
      <p class="quantity-stepper__label">Équivalent d'une boite à chaussures</p>
      <div class="quantity-stepper__stepper">
        <ion-fab-button size="small" @click="decrement()">
          -
        </ion-fab-button>
        <ion-input placeholder="0" type="number" v-model="quantity"></ion-input>
        <ion-fab-button size="small" @click="increment()">
          +
        </ion-fab-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {IonFabButton, IonInput, IonIcon} from "@ionic/vue";
import {information, addOutline, removeOutline} from "ionicons/icons";
import {ref, computed} from "vue";

const quantity = ref(0);

const increment = () => {
  quantity.value++;
}

const decrement = () => {
  if (quantity.value > 0) {
    quantity.value--;
  }
}

const isSelected = computed((): boolean => {
  return quantity.value > 0;
});
</script>

<style scoped lang="scss">
.quantity-stepper {
  background: var(--ion-color-primary-light);
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