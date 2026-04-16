import { useState, useCallback } from "react";

/**
 * Hook for interacting with LocalStorage safely.
 */
export const useLocalStorage = () => {
  const setItem = useCallback((key: string, value: any) => {
    try {
      if (typeof window !== "undefined") {
        const valueToStore = typeof value === "string" ? value : JSON.stringify(value);
        localStorage.setItem(key, valueToStore);
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, []);

  const getItem = useCallback((key: string) => {
    try {
      if (typeof window !== "undefined") {
        return localStorage.getItem(key);
      }
    } catch (error) {
      console.error(`Error getting localStorage key "${key}":`, error);
    }
    return null;
  }, []);

  const removeItem = useCallback((key: string) => {
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, []);

  return { setItem, getItem, removeItem };
};
