<template>
  <div class="reward-toggle-list">
    <reward-toggle v-for="reward in rewards" :amount="reward.value"
                   :model-value="reward.selected" @update:modelValue="() => {updateReward(reward.value)}"
                   :key="reward.value"></reward-toggle>
    <reward-custom :selected="isCustomRewardValue" :model-value="customReward"
                   @update:modelValue="(value) => {updateReward(value)}"></reward-custom>
  </div>
</template>

<script lang="ts" setup>
import {defineProps, defineEmits, ref, computed} from 'vue';

import RewardToggle from '@/components/RewardToggle.vue';
import RewardCustom from '@/components/RewardCustom.vue';

const props = defineProps<{
  modelValue: number
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>();

const rewards = ref([
  {value: 3, selected: false},
  {value: 5, selected: false},
  {value: 8, selected: false},
  {value: 10, selected: false},
  {value: 15, selected: false}
]);
const customReward = ref(0);

const isCustomRewardValue = computed(() => {
  const selectedRewardIndex = rewards.value.findIndex((reward) => reward.selected);
  return selectedRewardIndex === -1;
});

const updateReward = (newValue: number) => {
  console.log(newValue);
  rewards.value = rewards.value.map((reward) => {
    return {value: reward.value, selected: reward.value === newValue};
  });
  customReward.value = isCustomRewardValue.value ? newValue : 0;
  emit('update:modelValue', newValue);
}

</script>

<style lang="scss" scoped>
.reward-toggle-list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1.5rem 1rem;
}
</style>