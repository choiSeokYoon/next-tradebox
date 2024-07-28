"use server";

import { Database } from "types_db";
import { createServerSupabaseClient } from "utils/supabase/server";

export type ExchangeRow = Database["public"]["Tables"]["exchanges"]["Row"];

function handleError(error) {
  console.log(error);
  throw new Error(error.message);
}


export async function getExchanges({
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
