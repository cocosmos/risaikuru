import { supabase } from "./config";

/**
 * Get image from supabase storage
 * @param name
 * @returns
 */
export const getImage = (name: string) => {
  if (name) {
    return supabase.storage.from("avatars").getPublicUrl(name).data.publicUrl;
  } else {
    return "../assets/avatar.svg";
  }
};

/**
 * Paid a demand
 * @param demandId
 */
export const inscreasePot = async (id: string, amount: number) => {
  const { error } = await supabase
    .from("profiles")
    .update({ balance: amount })
    .eq("id", id);

  if (error) {
    console.log(error);
  }
};
