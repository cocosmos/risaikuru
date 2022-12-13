<script lang="ts" setup>
import { defineProps, ref, onMounted } from "vue";
import { IonAvatar, IonLabel } from "@ionic/vue";
import { toRefs } from "vue";
import { supabase, getImage } from "@/supabase";

import { Camera, CameraResultType } from "@capacitor/camera";
import { UserType } from "@/types/User";
const props = defineProps<{
  user: UserType;
  size: "small" | "medium" | "large";
  showLname: boolean;
  add?: boolean;
}>();

const { size, user, showLname } = toRefs(props);

const avatar = ref("");

const sizeClass = () => {
  switch (size.value) {
    case "small":
      return "avatar__small";
    case "medium":
      return "avatar__medium";
    case "large":
      return "avatar__large";
  }
};

onMounted(() => {
  avatar.value = getImage(props.user.avatar);
});

const uploadAvatar = async () => {
  if (!props.add) return;
  try {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
    });
    if (photo.dataUrl) {
      const file = await fetch(photo.dataUrl)
        .then((res) => res.blob())
        .then(
          (blob) =>
            new File([blob], "my-file", { type: `image/${photo.format}` })
        );

      const fileName = `${Math.random()}-${new Date().getTime()}.${
        photo.format
      }`;

      let { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, file);
      if (uploadError) {
        throw uploadError;
      }

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar: fileName })
        .eq("id", user.value.id);

      if (updateError) {
        throw updateError;
      } else {
        avatar.value = getImage(fileName);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
</script>
<template>
  <div class="avatar" :class="(sizeClass(), add ? 'avatar__add' : '')">
    <ion-avatar @click="uploadAvatar">
      <img :src="avatar" alt="Avatar" class="avatar image" />
    </ion-avatar>
    <ion-label class="text__bold avatar__name">
      {{ user.fname }} {{ showLname ? user.lname : "" }}
    </ion-label>
  </div>
</template>

<style lang="scss" scoped>
.avatar {
  display: flex;
  align-items: center;
  ion-avatar {
    margin-right: 0.7rem;
    position: relative;
  }
  &__add {
    cursor: pointer;

    ion-avatar:hover {
      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.452);
      }
      &::after {
        content: "\002B";
        position: absolute;
        color: white;
        font-size: 2.5rem;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
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
