<script setup lang="ts">
import { Message } from "@/types/Message";
import { defineProps } from "vue";
import AvatarName from "../AvatarName.vue";
import { fHour } from "@/utils/formatDate";

const props = defineProps<{
  message: Message;
}>();
</script>

<template>
  <div class="message">
    <div class="message__header">
      <avatar-name
        :user="props.message.user"
        size="medium"
        :show-lname="false"
      />
    </div>
    <div class="message__content">
      {{ props.message.content }}
      <span class="message__content__date">{{
        fHour(props.message.createdAt)
      }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.message {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0.5rem 0;
  &__header {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
  }
  &__content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: var(--ion-color-secondary);
    &__date {
      font-size: 0.75rem;
      color: #999;
    }
  }
}
</style>
