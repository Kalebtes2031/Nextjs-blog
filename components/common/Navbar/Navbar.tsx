"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { postsActions } from "@/store/slices/postsSlice";
import { useAuth } from "@/hooks/useAuth";
import { 
  User, 
  LogOut, 
  LayoutDashboard, 
  Search, 
  Sun, 
  Moon, 
  X 
} from "lucide-react";
import Button from "../Button/Button";
import { useTheme } from "next-themes";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Using the new professional useAuth hook
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const handler = setTimeout(() => {
        dispatch(postsActions.searchPostsRequest(searchQuery));
      }, 500);
      return () => clearTimeout(handler);
    } else if (mounted && searchQuery === "") {
      dispatch(postsActions.fetchPostsRequest({ page: 1 }));
    }
  }, [searchQuery, dispatch, mounted]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
  ];

  if (!mounted) return null;

  return (
    <nav 
      className={`fixed font-sans top-0 w-full z-[100] transition-all duration-300 px-6 md:px-12 flex justify-between items-center h-16 border-b ${
        scrolled 
          ? "bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg border-gray-100 dark:border-gray-800 shadow-sm" 
          : "bg-white dark:bg-gray-950 border-transparent"
      }`}
    >
      {/* LEFT SIDE: Brand & Links */}
      <div className="flex items-center gap-10">
        <Link href="/" className="font-bold text-xl tracking-tighter text-blue-600 dark:text-blue-400">
          BLOG
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                pathname === link.href 
                  ? "text-blue-600 dark:text-blue-400" 
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          {isAuthenticated && (
            <Link
              href="/dashboard"
              className={`flex items-center gap-1.5 text-sm font-bold px-3 py-1 rounded-md transition-all ${
                pathname === "/dashboard" 
                  ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600" 
                  : "text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/10"
              }`}
            >
              <LayoutDashboard size={14} />
              Dashboard
            </Link>
          )}
        </div>
      </div>

      {/* RIGHT SIDE: Search, Theme, Auth */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className={`relative flex items-center transition-all duration-300 ${isSearchOpen ? "w-48 md:w-64" : "w-10"}`}>
          <Search 
            size={20} 
            className="absolute left-2.5 text-gray-400 cursor-pointer z-10" 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`pl-10 pr-4 py-1.5 w-full bg-gray-100 dark:bg-gray-800 border-none rounded-full text-sm focus:ring-2 focus:ring-blue-500 transition-all ${
              isSearchOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
          />
          {isSearchOpen && searchQuery && (
            <X 
              size={14} 
              className="absolute right-3 text-gray-400 cursor-pointer" 
              onClick={() => setSearchQuery("")}
            />
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Auth Actions */}
        <div className="h-6 w-px bg-gray-200 dark:bg-gray-800 mx-1 hidden sm:block"></div>

        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-50 dark:bg-gray-800/50 rounded-full border border-gray-100 dark:border-gray-800 text-gray-700 dark:text-gray-200">
               <div className="h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-bold text-[10px]">
                {user?.username.charAt(0).toUpperCase()}
              </div>
              <span className="text-xs font-bold uppercase tracking-tight">
                {user?.username}
              </span>
            </div>

            <Button 
              variant="danger" 
              onClick={logout}
              className="!py-1.5 !px-3"
            >
              <LogOut size={14} />
              <span className="hidden xs:inline">Logout</span>
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link 
              href="/login" 
              className="text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Login
            </Link>
            <Link 
              href="/signup" 
              className="hidden xs:block bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-600 dark:hover:bg-blue-400 hover:text-white transition-all active:scale-95 shadow-md"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}