<script setup lang="ts">
import { defineProps } from "vue";
import { UserType } from "../../types/User";

const props = defineProps<{
  content: string;
  date: Date;
  isSender: boolean;
  user: UserType;
}>();
</script>

<template>
  <div class="message-card">
    <div class="message-card__header">
      <avatar-name />
    </div>
    <div class="message-card__content">
      {{ props.content }}
      <span class="message-card__content__date">{{ props.date }}</span>
    </div>
  </div>
</template>
