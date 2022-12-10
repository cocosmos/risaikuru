/**
 * Get image from supabase storage
 * @param name
 * @returns
 */

import { supabase } from "./config";

export const getImage = (name: string) => {
  if (name) {
    return supabase.storage.from("avatars").getPublicUrl(name).data.publicUrl;
  } else {
    return "../assets/avatar.svg";
  }
};
