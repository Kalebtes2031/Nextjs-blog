"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import { useEffect } from "react";
import { authActions } from "@/store/slices/authSlice";

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      store.dispatch(
        authActions.restoreSession({
          token,
          user: JSON.parse(user),
        })
      );
    }
  }, []);

  return <Provider store={store}>{children}</Provider>;
}