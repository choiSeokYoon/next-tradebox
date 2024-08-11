"use client";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

interface ToastProviderProps {
  children: React.ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
    const contextClass = {
        success: "bg-blue-600 !important",
        error: "bg-red-600 !important",
        info: "bg-gray-600 !important",
        warning: "bg-orange-400 !important",
        default: "bg-indigo-600 !important",
        dark: "bg-white-600 !important",
      };
  
    return (
      <>
        {children}
        <ToastContainer
          toastClassName={(context) =>
            contextClass[context?.type || "default"] +
            "relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer bg-white mt-1"
          }
          bodyClassName={() => "text-sm font-med block p-3 text-black"}
          autoClose={2000}
          pauseOnHover={true}
          limit={3}
          
        />
      </>
    );
  }