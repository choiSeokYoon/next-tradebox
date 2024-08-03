"use server";
import { createServerSupabaseClient } from "utils/supabase/server";

export async function createNickname(nickname: string) {
      const supabase = await createServerSupabaseClient();
  
      const {
        data: { user },
      } = await supabase.auth.getUser();
  
      if (!user) {
        throw new Error("로그인 확인 필요");
      }
  
      const { data: authData, error: authError } = await supabase.auth.updateUser({
        data: { nickname: nickname },
      });
  
      if (authError) throw authError;
  
      return { success: true, data: authData };
  }
