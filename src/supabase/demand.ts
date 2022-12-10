import { supabase } from "./config";

/**
 * get demand by id from supabase
 * @param demandId
 * @returns
 */

export const getDemand = async (demandId: string) => {
  const { data, error } = await supabase
    .from("demands")
    .select(`*, user!inner(*)`)
    .eq("id", demandId)
    .single();

  if (error) {
    console.log(error);
  } else return data;
};

/**
 * Accept demand by id
 * @param demandId
 */

export const acceptDemand = async (demandId: string) => {
  const { error } = await supabase
    .from("demands")
    .update({ status: "accepted" })
    .eq("id", demandId);

  if (error) {
    console.log(error);
  }
};

/**
 * Cancel demand by id
 * @param demandId
 */
export const cancelDemand = async (demandId: string) => {
  const { error } = await supabase
    .from("demands")
    .update({ status: "rejected" })
    .eq("id", demandId);

  if (error) {
    console.log(error);
  }
};
