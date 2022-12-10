import { supabase } from "@/data/supabase";
import { Message } from "@/types/Message";
import { UserType } from "../types/User";
import { makeMessage } from "../types/Message";

export const getImage = (name: string) => {
  if (name) {
    return supabase.storage.from("avatars").getPublicUrl(name).data.publicUrl;
  } else {
    return "../assets/avatar.svg";
  }
};

export const getMessages = async (conversationId: string, user: UserType) => {
  const messages: Message[] = [];

  const { data, error } = await supabase
    .from("messages")
    .select(`*, user!inner(*)`)
    .eq("conversation", conversationId)
    .order("created_at", { ascending: true });

  if (error) {
    console.log(error);
  } else
    data?.forEach((message) => {
      messages.push(makeMessage(message, user));
    });

  return messages;
};

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

export const createConversation = async (
  demandId: string,
  requesterId: string,
  neederId: string
) => {
  const { data, error } = await supabase
    .from("conversations")
    .insert([
      {
        demand: demandId,
        requester: requesterId,
        needer: neederId,
      },
    ])
    .select(`*`)
    .single();
  if (data) return data;
  if (error) return error;
};
