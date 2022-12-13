<template>
  <div class="stack">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.stack {
  display: flex;
  gap: 1rem;
  flex-direction: column;
}
</style>