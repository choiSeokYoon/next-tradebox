"use server";

import { Database } from "types_db";
import { createServerSupabaseClient } from "utils/supabase/server";

export type ExchangeRow = Database["public"]["Tables"]["exchanges"]["Row"];
export type ExchangeRowInsert = Omit<
  Database["public"]["Tables"]["exchanges"]["Insert"],
  "user_id"
> & {
  user_id?: string;
};
export type ExchangeRowUpdate =
  Database["public"]["Tables"]["exchanges"]["Update"];

function handleError(error) {
  console.log(error);
  throw null;
}

export async function fetchExchangesByCategoryAndSearch(
  category: string,
  searchInput: string,
  userId?: string
) {
  const supabase = await createServerSupabaseClient();
  let query = supabase
    .from("exchanges")
    .select("*, exchange_images(*)")
    .order("created_at", { ascending: false });

  if (category && category !== "전체") {
    query = query.eq("category", category);
  }

  if (searchInput) {
    query = query.ilike("title", `%${searchInput}%`);
  }

  if (userId) {
    query = query.eq("user_uid", userId);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data || [];
}

export async function fetchExchangeById(
  id: string | number
): Promise<ExchangeRow | null> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("exchanges")
    .select("*, exchange_images(*)")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}

export async function createExchange(exchange: ExchangeRowInsert) {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("로그인 확인 필요");
  }

  const { data, error } = await supabase
    .from("exchanges")
    .insert({
      ...exchange,
      user_id: user.email,
      user_uid: user.id,
      user_nickname: user.user_metadata.nickname,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select("id");

  if (error) {
    handleError(error);
  }
  return data && data[0] ? data[0].id : null;
}

export async function updateExchange(exchange: ExchangeRowUpdate) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("로그인 확인 필요");
  }

  const { data, error } = await supabase
    .from("exchanges")
    .update({
      ...exchange,
      updated_at: new Date().toISOString(),
    })
    .eq("id", exchange.id)
    .eq("user_id", user.email);

  if (error) {
    handleError(error);
  }
  return data;
}

export async function deleteExchange(id: number) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("로그인 확인 필요");
  }

  const { data, error } = await supabase
    .from("exchanges")
    .delete()
    .eq("id", id)
    .eq("user_id", user.email);

  if (error) {
    handleError(error);
  }

  return data;
}
