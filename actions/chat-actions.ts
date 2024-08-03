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
    .or(`creator_id.eq.${user.id},participant_id.eq.${user.id}`);

  if (error) throw error;
  return data;
}

export async function createChatRoom(
  exchangeId: number,
  participantId: string,
  title: string,
  imgUrl:string,
  nickname:string,
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
        user_nickname: nickname,
      img_url:imgUrl
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getMessages(chatRoomId: string) {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");
  
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("chat_room_id", chatRoomId)
      .order("created_at", { ascending: true });
  
    if (error) throw error;
    return data;
  }
  
  export async function sendMessage(chatRoomId: string, content: string) {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");
  
    const { data, error } = await supabase
      .from("messages")
      .insert({
        chat_room_id: chatRoomId,
        sender_id: user.id,
        content: content,
      })
      .select()
      .single();
  
    if (error) throw error;
    return data;
  }
