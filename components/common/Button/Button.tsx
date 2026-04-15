import { Send } from "lucide-react";
import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  loading?: boolean;
  variant?: "primary" | "danger" | "success";
  showSendIcon?: boolean;
};

export default function Button({
  children,
  onClick,
  type = "button",
  loading = false,
  variant = "primary",
  showSendIcon = false,
}: ButtonProps) {
  const base = "flex justify-center items-center gap-2 px-4 py-2 rounded-full text-white cursor-pointer";

  const styles = {
    primary: "bg-blue-900",
    danger: "bg-red-500",
    success: "bg-green-600",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`${base} ${styles[variant]} opacity-${loading ? "50" : "100"}`}
    >
      {loading ? "Loading..." : children}
      {showSendIcon && <Send size={14} />}
    </button>
  );
}