"use server";

import { Database } from "types_db";
import { createServerSupabaseClient } from "utils/supabase/server";

export type ExchangeRow = Database["public"]["Tables"]["exchanges"]["Row"];

function handleError(error) {
  console.log(error);
  throw null;
}

export async function searchExchanges({
  searchInput = "",
}): Promise<ExchangeRow[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("exchanges")
    .select("*, exchange_images(*)")
    .like("title", `%${searchInput}%`)
    .order("created_at", { ascending: false });

  if (error) {
    handleError(error);
  }

  return data;
}

export async function getExchange(id: string | number): Promise<ExchangeRow | null> {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("exchanges")
      .select("*, exchange_images(*)")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;

}