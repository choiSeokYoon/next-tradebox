"use server";

import { Database } from "types_db";
import { createServerSupabaseClient } from "utils/supabase/server";

export type LikesRow = Database["public"]["Tables"]["likes"]["Row"];
export type LikesRowInsert = Database["public"]["Tables"]["likes"]["Insert"];
export type LikesRowUpdate = Database["public"]["Tables"]["likes"]["Update"];

function handleError(error) {
  console.log(error);
  throw null;
}

export async function getLikeAction(userId) {
    const supabase = await createServerSupabaseClient();
  
    const { data: data, error } = await supabase
      .from("likes")
      .select("*, exchanges(*, exchange_images(*))") 
      .eq("user_id", userId);
    
    if (error) {
      handleError(error);
      return []; 
    }
  
    return data
}

