<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
import { IonAvatar, IonLabel } from "@ionic/vue";
import { ref, toRefs, watch } from "vue";
import { supabase } from "@/data/supabase";
import { Camera, CameraResultType } from "@capacitor/camera";
import { UserType } from "@/types/User";
const props = defineProps<{
  user: UserType;
  profilePicture: string | null;
  fname: string;
  lname?: string;
  size: "small" | "medium" | "large";
  add?: boolean;
}>();

const { profilePicture, fname, lname, size, user } = toRefs(props);

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

const emit = defineEmits(["upload", "update:path"]);

const avatarUrl = ref<string | null>(null);

const downloadImage = async (name: string) => {
  if (name) {
    const { data } = await supabase.storage.from("avatars").getPublicUrl(name);
    avatarUrl.value = data.publicUrl;
  }
};

const uploadAvatar = async () => {
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
      emit("update:path", fileName);
      emit("upload");
      console.log(fileName);
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar: fileName })
        .eq("id", user.value.id);

      if (updateError) {
        throw updateError;
      } else {
        downloadImage(fileName);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
watch(profilePicture, () => {
  if (profilePicture.value) downloadImage(profilePicture.value);
});
</script>
<template>
  <div class="avatar" :class="sizeClass()">
    <ion-avatar @click="uploadAvatar">
      <img
        :src="avatarUrl ?? '../assets/avatar.svg'"
        alt="Avatar"
        class="avatar image"
      />
    </ion-avatar>
    <ion-label class="text__bold avatar__name">
      {{ fname }} {{ lname }}</ion-label
    >
  </div>
</template>

<style lang="scss" scoped>
.avatar {
  display: flex;
  align-items: center;
  ion-avatar {
    margin-right: 0.7rem;
    position: relative;
    &:hover {
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
