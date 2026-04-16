/**
 * Global constants for the application.
 */

export const API_BASE_URL = "https://dummyjson.com";

export const CACHE_TTL = {
  POSTS: 3600000, // 1 hour
  AUTH: 86400000, // 24 hours
};

export const ROUTES = {
  HOME: "/",
  BLOG: "/blog",
  ABOUT: "/about",
  DASHBOARD: "/dashboard",
  LOGIN: "/login",
  SIGNUP: "/signup",
};

export const AUTH_KEYS = {
  TOKEN: "token",
  USER: "user",
};
