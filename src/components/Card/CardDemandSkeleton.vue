<template>
  <ion-card class="card-demand-skeleton"
            color="light">
    <ion-card-header class="flex-space-between">
      <ion-skeleton-text :animated="true" style="width: 40%; height: 30px;"></ion-skeleton-text>
      <ion-skeleton-text :animated="true" style="width: 20%; height: 30px;"></ion-skeleton-text>
    </ion-card-header>
    <ion-card-content>
      <ion-skeleton-text :animated="true" style="width: 50%;"></ion-skeleton-text>
      <ion-skeleton-text :animated="true" style="width: 100%; height: 70px;"></ion-skeleton-text>

      <ion-skeleton-text :animated="true" style="width: 15%;"></ion-skeleton-text>
      <ion-skeleton-text :animated="true" style="width: 100%; height: 40px;"></ion-skeleton-text>

      <div class="flex-space-between">
        <ion-skeleton-text :animated="true" style="width: 10%; height: 30px;"></ion-skeleton-text>
        <ion-skeleton-text :animated="true" style="width: 25%; height: 45px;"></ion-skeleton-text>
      </div>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.card-demand-skeleton {
  margin: 0;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;

  .flex-space-between {
    display: flex;
    justify-content: space-between;
  }

  ion-skeleton-text {
    border-radius: 5px;
  }
}
</style>