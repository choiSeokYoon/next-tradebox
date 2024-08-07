import { useMutation } from "@tanstack/react-query";
import { createBrowserSupabaseClient } from "utils/supabase/client";

export const useSignUp = () => {
  const supabase = createBrowserSupabaseClient();

  return useMutation({
    mutationFn: async ({
      email,
      password,
      nickname,
    }: {
      email: string;
      password: string;
      nickname: string;
    }) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nickname: nickname,
          },
        },
      });
      if (error) {
        throw error;
      }
      return data;
    },
  });
};


export const useSignIn = () => {
    const supabase = createBrowserSupabaseClient();
  
    return useMutation({
      mutationFn: async ({ email, password }: { email: string; password: string }) => {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) {
          throw error;
        }
        return data;
      },
    });
  };

export const useVerifyOtp = () => {
  const supabase = createBrowserSupabaseClient();

  return useMutation({
    mutationFn: async ({ email, otp }: { email: string; otp: string }) => {
      const { data, error } = await supabase.auth.verifyOtp({
        type: "signup",
        email,
        token: otp,
      });
      if (error) {
        throw error;
      }
      return data;
    },
  });
};
