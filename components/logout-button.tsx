"use client";

import { Button } from "@material-tailwind/react";
import { Logout } from "@mui/icons-material";
import React from "react";
import { createBrowserSupabaseClient } from "utils/supabase/client";

export default function LogoutButton({children }) {
  const supabase = createBrowserSupabaseClient();
  return (
    <button
    className="flex items-center text-gray-600 hover:text-red-600 transition-colors"
    onClick={async () => {
      await supabase.auth.signOut();
    }}
  >
    <Logout className="mr-2" />
    {children}
  </button>
  );
}
