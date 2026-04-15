import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Toast {
  id: string;
  type: "success" | "error" | "info";
  message: string;
}

interface UIState {
  loading: boolean;
  theme: "light" | "dark";
  toasts: Toast[];
}

const initialState: UIState = {
  loading: false,
  theme: "light",
  toasts: [],
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },

    addToast: (state, action: PayloadAction<Toast>) => {
      state.toasts.push(action.payload);
    },

    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },

    clearToasts: (state) => {
      state.toasts = [];
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;