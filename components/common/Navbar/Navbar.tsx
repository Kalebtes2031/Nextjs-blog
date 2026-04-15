"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { authActions } from "@/store/slices/authSlice";
import { User, LogOut, Code2, LayoutDashboard } from "lucide-react";
import Button from "../Button/Button";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    document.cookie = "token=; path=/;";
    dispatch(authActions.logout());
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
  ];

  return (
    <nav 
      className={`font-sans fixed top-0 w-full z-[100] transition-all duration-300 px-6 md:px-12 flex justify-between items-center h-16 border-b ${
        scrolled 
          ? "bg-white/80 backdrop-blur-lg border-gray-100 shadow-sm" 
          : "bg-white border-transparent"
      }`}
    >
      {/* LEFT SIDE: Brand & Links */}
      <div className="flex items-center gap-10">

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-blue-900 ${
                pathname === link.href ? "text-blue-900" : "text-gray-500"
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
                  ? "bg-blue-50 text-blue-900" 
                  : "text-blue-900 hover:bg-blue-50"
              }`}
            >
              <LayoutDashboard size={14} />
              Dashboard
            </Link>
          )}
        </div>
      </div>

      {/* RIGHT SIDE: Auth Actions */}
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-100">
              <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-900">
                <User size={14} />
              </div>
              <span className="text-xs font-bold text-gray-700 uppercase tracking-tight">
                {user?.username}
              </span>
            </div>

            <Button 
              variant="danger" 
              onClick={handleLogout}
            >
              <LogOut size={14} />
              Logout
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-6">
            <Link 
              href="/login" 
              className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
            >
              Login
            </Link>
            <Link 
              href="/signup" 
              className="bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 transition-all active:scale-95 shadow-lg shadow-gray-200"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}