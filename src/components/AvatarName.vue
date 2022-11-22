<script lang="ts" setup>
import { defineProps } from "vue";
import { IonAvatar, IonLabel } from "@ionic/vue";
const props = defineProps<{
  profilePicture: string;
  fname: string;
  lname?: string;
  size: "small" | "medium" | "large";
}>();

const sizeClass = () => {
  switch (props.size) {
    case "small":
      return "avatar__small";
    case "medium":
      return "avatar__medium";
    case "large":
      return "avatar__large";
  }
};
</script>
<template>
  <div class="avatar" :class="sizeClass()">
    <ion-avatar>
      <img :src="props.profilePicture" alt="Avatar" />
    </ion-avatar>
    <ion-label class="text__bold avatar__name">
      {{ props.fname }} {{ props.lname }}</ion-label
    >
  </div>
</template>

<style lang="scss" scoped>
.avatar {
  display: flex;
  align-items: center;
  ion-avatar {
    margin-right: 0.7rem;
  }

  &__small {
    font-size: 1em;
    ion-avatar {
      width: 30px;
      height: 30px;
    }
  }
  &__medium {
    font-size: 1em;
    ion-avatar {
      width: 40px;
      height: 40px;
    }
  }
  &__large {
    font-size: 1.5em;
    ion-avatar {
      width: 60px;
      height: 60px;
    }
  }
}
</style>
