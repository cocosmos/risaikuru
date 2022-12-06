<template>
  <IconInfo :waste="props.waste" size="50px" @click="toggle" :inverted="state.selected"></IconInfo>
</template>

<script lang="ts" setup>
import {computed, defineProps, defineEmits, reactive} from 'vue';
import IconInfo from './IconInfo.vue';
import {Waste} from "@/types/Demand";

const props = defineProps<{
  waste: Waste
  modelValue: boolean,
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>();

const state = reactive({
  selected: props.modelValue,
});

const toggle = () => {
  state.selected = !state.selected;
  emit('update:modelValue', state.selected);
}
</script>

<style lang="scss" scoped>

</style>