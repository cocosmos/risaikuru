<script lang="ts" setup>
import { defineProps } from "vue";

import MessageCard from "@/components/Messages/MessageCard.vue";
import { Day } from "@/types/Message";
import { fDay } from "@/utils/format";
defineProps<{
  day: Day;
}>();
</script>

<template>
  <ion-text
    ><p class="conversation__date">{{ fDay(day.date) }}</p></ion-text
  >
  <message-card
    v-for="message in day.messages"
    :key="message.id"
    :message="message"
  />
</template>

<style lang="scss" scoped>
.conversation__date {
  font-size: 0.75rem;
  color: #999;
  text-align: center;
  width: 100%;
  margin: 0.2rem 0;
}
</style>
