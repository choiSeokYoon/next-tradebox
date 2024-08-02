"use server";
import { Database } from "types_db";
import { createServerSupabaseClient } from "utils/supabase/server";

export type ExchangeRowInsert = Omit<
  Database["public"]["Tables"]["chat_rooms"]["Insert"],
  "user_id"
> & {
  user_id?: string;
};

export async function getChatRooms() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("chat_rooms")
    .select("*")
    .eq("creator_id", user.id);

  if (error) throw error;
  return data;
}

export async function createChatRoom(
  exchangeId: number,
  participantId: string,
  title: string,
) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const { data: existingChatRoom } = await supabase
    .from("chat_rooms")
    .select("id")
    .eq("exchange_id", exchangeId)
    .eq("participant_id", participantId)
    .single();

  if (existingChatRoom) {
    throw new Error("이 채팅방이 이미 존재합니다.");
  }

  const { data, error } = await supabase
    .from("chat_rooms")
    .insert({
      exchange_id: exchangeId,
      creator_id: user.id,
      participant_id: participantId,
      item_title: title,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}
