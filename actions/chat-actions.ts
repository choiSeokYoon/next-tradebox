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
    .or(`creator_id.eq.${user.id},participant_id.eq.${user.id}`)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function createChatRoom(
  exchangeId: number,
  participantId: string,
  title: string,
  imgUrl: string,
  nickname: string
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
    .eq("creator_id", user.id,)
    .single();

  if (existingChatRoom) {
    return {
      message: "이 채팅방이 이미 존재합니다.",
      chatRoomId: existingChatRoom.id,
    }

  }

  const { data, error } = await supabase
    .from("chat_rooms")
    .insert({
      exchange_id: exchangeId,
      creator_id: user.id,
      creator_nickname: user.user_metadata.nickname,
      participant_id: participantId,
      item_title: title,
      user_nickname: nickname,
      img_url: imgUrl,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteChatRoom(chatRoomId: string, creatorId: string) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const { data: chatRoom, error: error } = await supabase
    .from("chat_rooms")
    .select("*")
    .eq("id", chatRoomId)
    .single();

  if (error) throw error;

  const isCreator = user.id === creatorId;
  const otherUserField = isCreator ? "participant_id" : "creator_id";
  const currentUserFields = isCreator
    ? { creator_id: null, creator_nickname: null }
    : { participant_id: null, user_nickname: null };

  if (chatRoom[otherUserField] === null) {
    const { error } = await supabase
      .from("chat_rooms")
      .delete()
      .eq("id", chatRoomId);
    if (error) throw error;
  } else {
    const { error } = await supabase
      .from("chat_rooms")
      .update(currentUserFields)
      .eq("id", chatRoomId);
    if (error) throw error;
  }

  return chatRoom;
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
