<script setup lang="ts">
import { Message } from "@/types/Message";
import { defineProps } from "vue";
import AvatarName from "../Profile/AvatarName.vue";
import { fHour } from "@/utils/format";

const props = defineProps<{
  message: Message;
}>();
</script>

<template>
  <div class="message" :class="message.isSender ? 'sender' : 'receiver'">
    <div class="message__header">
      <avatar-name
        :user="message.user"
        size="medium"
        :show-lname="false"
        v-if="!message.isSender"
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
  z-index: -1;
  margin: 1rem 0;
  &__header {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
  }
  &__content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border-radius: 1rem;
    background-color: var(--ion-color-secondary);
    padding: 0.75rem 0.75rem 0.5rem 0.75rem;
    min-width: 50px;
    &__date {
      font-size: 0.65rem;
      color: #999;
      text-align: right;
      width: 100%;
    }
  }
}
.receiver {
  position: relative;

  .message__content {
    border-top-left-radius: 0;
    margin-top: -15px;
    margin-left: 20px;
    z-index: -1;
  }
}
.sender {
  align-items: flex-end;
  .message__content {
    border-bottom-right-radius: 0;

    background-color: var(--ion-color-primary);
    color: var(--ion-color-primary-contrast);
  }
}
</style>
