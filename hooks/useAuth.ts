"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { authActions } from "@/store/slices/authSlice";
import { 
  selectUser, 
  selectIsAuthenticated, 
  selectAuthLoading, 
  selectAuthError 
} from "@/store/selectors/authSelectors";
import { useCallback } from "react";

/**
 * Centralized hook for common Authentication logic.
 */
export const useAuth = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  const login = useCallback((credentials: { username: string; password: string }) => {
    dispatch(authActions.loginRequest(credentials));
  }, [dispatch]);

  const logout = useCallback(() => {
    dispatch(authActions.logoutRequest());
  }, [dispatch]);

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    logout,
  };
};
