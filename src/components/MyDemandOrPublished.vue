<script setup lang="ts">
import { Demand } from "@/types/Demand";
import { computed, defineProps } from "vue";
import { calendarOutline, location, trophy } from "ionicons/icons";
import QuantityOnCard from "@/components/Card/Demand/QuantityOnCard.vue";
import IconInfo from "@/components/IconInfo.vue";

import moment from "moment";
const props = defineProps<{
  demand: Demand;
}>();
const momentStr = computed(() => {
  moment.locale("fr");
  return (
    moment(props.demand.dateBegin).format("dddd D MMMM [entre] HH:mm [et] ") +
    moment(props.demand.dateEnd).format("HH:mm")
  );
});
console.log(props.demand);
</script>

<template>
  <div class="wastes">
    <IconInfo
      v-for="wasteType in demand.wastes"
      :waste="wasteType"
      :key="wasteType"
      size="50px"
    ></IconInfo>
  </div>
  <div class="infos">
    <div class="infos__volume">
      <p>Volume</p>
      <div class="infos__quantities">
        <quantity-on-card
          v-for="quantity in demand.quantity"
          :quantity="quantity"
          :key="quantity.id"
        ></quantity-on-card>
      </div>
    </div>
    <div class="infos__line">
      <ion-icon :icon="calendarOutline" color="primary"></ion-icon>
      <span>{{ momentStr }}</span>
    </div>
    <div class="infos__line">
      <ion-icon :icon="location" color="primary"></ion-icon>
      <span>{{
        demand.location !== undefined ? demand.location.name : ""
      }}</span>
    </div>
    <div class="infos__line">
      <ion-icon :icon="trophy" color="primary"></ion-icon>
      <span class="infos__reward">
        {{ demand.reward }} CHF
        <span class="infos__reward__fees">+ {{ demand.fees }} CHF (frais)</span>
      </span>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.wastes {
  margin-top: 2rem;
  max-width: 100%;
  display: flex;
  gap: 1rem;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.infos {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  margin-top: 1rem;

  &__volume {
    font-weight: bold;
    margin-bottom: 1rem;

    p {
      text-align: center;
      margin-bottom: 0;
    }
  }

  &__quantities {
    display: flex;
    gap: 0.5rem;
  }

  &__line {
    display: flex;
    gap: 1rem;
    font-weight: bold;
    align-items: center;

    ion-icon {
      font-size: 50px;
    }

    span {
      max-width: 150px;
    }
  }

  &__reward {
    position: relative;
    color: var(--ion-color-primary);
    font-size: 1.5rem;
    font-weight: bold;

    &__fees {
      position: absolute;
      top: calc(100% + 10px);
      left: 0;
      font-size: 0.75rem;
      color: var(--ion-color-text);
    }
  }
}
</style>
