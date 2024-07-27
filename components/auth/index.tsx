"use client";

import { useState } from "react";
import Signin from "./signin";
import SignUp from "./signup";

export default function Auth() {
  const [view, setView] = useState("SIGNUP");
  return (
    <main className="h-screen flex items-center justify-center bg-gray-300">
      {view === "SIGNUP" ? (
        <SignUp setView={setView} />
      ) : (
        <Signin setView={setView} />
      )}

    </main>
  );
}
