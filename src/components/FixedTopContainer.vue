<template>
  <div class="fixed-top">
    <slot></slot>
  </div>
  <div class="padding" ref="size">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
const size = ref();

onMounted(() => {
  size.value.addEventListener("rezize", () => console.log("test"));
  if (size.value) {
    console.log(size.value.clientHeight);
  }
});
</script>

<style scoped lang="scss">
.fixed-top {
  position: fixed;
  width: calc(100% - var(--padding-end) - var(--padding-start));
}
.padding {
  width: 0;
  overflow: hidden;
  padding-top: 1rem;
}
</style>
