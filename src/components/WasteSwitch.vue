<template>
  <IconInfo
    :waste="props.waste"
    size="50px"
    @click="toggle"
    :inverted="modelValue"
  ></IconInfo>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
import IconInfo from "./IconInfo.vue";
import { Waste } from "@/types/Demand";

const props = defineProps<{
  waste: Waste;
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

const toggle = () => {
  emit("update:modelValue", !props.modelValue);
};
</script>

<style lang="scss" scoped></style>
