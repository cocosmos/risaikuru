<script lang="ts" setup>
import { onMounted } from "vue";
import { IonApp, IonRouterOutlet } from "@ionic/vue";

import { supabase } from "./data/supabase";
import { store } from "./data/store";
import router from "./router";

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    store.session = data.session;
  });
  supabase.auth.onAuthStateChange((_, _session) => {
    store.session = _session;
  });

  if (!store.session) {
    router.push("/login");
  }
});
</script>

<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>
