import { supabase } from "@/supabase/config";
import { Conversation, Message } from "@/types/Message";
import { UserType } from "../types/User";
import { makeMessage } from "../types/Message";

/**
 * Get messages by conversation id from supabase
 * @param conversationId
 * @param user
 * @returns
 */

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

/**
 *  Create conversation in supabase
 * @param demandId
 * @param requesterId
 * @param neederId
 * @returns
 */

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

/**
 * get conversation by id from supabase
 * @param conversationId
 * @param userId
 * @returns
 */

export const getConversation = async (
  conversationId: string,
  userId: string
) => {
  let conversation = {} as Conversation;
  const { data, error } = await supabase
    .from("conversations")
    .select(
      `*, requester!inner(*), needer!inner(*), demand!inner(*, user!inner(*))`
    )
    .eq("id", conversationId)
    .single();

  if (error) {
    console.error(error);
  } else {
    if (data) {
      const sender =
        data.requester.id === userId ? data.requester : data.needer;
      const receiver =
        data.requester.id === userId ? data.needer : data.requester;

      const location = {
        lat: data.demand.lat,
        long: data.demand.long,
        name: data.demand.address,
      };

      conversation = {
        id: data.id,
        sender: sender,
        receiver: receiver,
        demand: {
          ...data.demand,
          location: location,
        },
        isAsker: data.requester.id === userId,
        canceled: data.canceled,
      };
    }
  }
  return conversation;
};

/**
 *  Insert message in supabase
 * @param conversationId
 * @param userId
 * @param message
 * @returns
 */
export const insertMessage = async (
  conversationId: string,
  userId: string,
  message: string
) => {
  const { data, error } = await supabase
    .from("messages")
    .insert([
      {
        conversation: conversationId,
        user: userId,
        content: message,
      },
    ])
    .select(`*`)
    .single();

  if (data) return data;
  if (error) return error;
};

export const cancelDemand = async (conversationId: string) => {
  const { error } = await supabase
    .from("conversations")
    .update({ canceled: true })
    .eq("id", conversationId);

  if (error) {
    console.log(error);
  }
};
