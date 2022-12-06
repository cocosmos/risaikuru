<script setup lang="ts">
import { ref, defineProps } from "vue";
import { eye, eyeOff } from "ionicons/icons";

const props = defineProps<{
  error?: string;
  label?: string;
  isError: boolean;
}>();
const password = ref("");
const showPassword = ref(false);
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};
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
      :type="showPassword ? 'text' : 'password'"
      required
      value="password"
      name="password"
      v-model="password"
      @input="$emit('update:modelValue', $event.target.value)"
    >
    </ion-input>
    <ion-button @click="togglePassword" fill="clear">
      <ion-icon :icon="showPassword ? eyeOff : eye" slot="icon-only"></ion-icon>
    </ion-button>
    <ion-note slot="error">{{ props.error }}</ion-note>
  </ion-item>
</template>

<style scoped lang="scss">
ion-button {
  position: absolute;
  right: 10px;
  top: 0;
  bottom: 0;
  margin: auto;
  z-index: 999;
}
</style>
