<template>
  <div class="fixed-bottom">
    <slot></slot>
  </div>
  <div class="padding">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
.fixed-bottom {
  position: fixed;
  width: calc(100% - var(--padding-end) - var(--padding-start));
  bottom: var(--padding-end);
}

.padding {
  width: 0;
  overflow: hidden;
  padding-top: 1rem;
}
</style>