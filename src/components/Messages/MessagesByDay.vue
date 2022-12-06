<script lang="ts" setup>
import { defineProps } from "vue";

import MessageCard from "@/components/Messages/MessageCard.vue";
import { Day } from "@/types/Message";

defineProps<{
  day: Day;
}>();
</script>

<template>
  <p>{{ day.date.toISOString() }}</p>
  <message-card
    v-for="message in day.messages"
    :key="message.id"
    :message="message"
  />
</template>
