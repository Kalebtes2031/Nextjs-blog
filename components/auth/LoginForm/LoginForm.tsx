"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { validateLoginForm } from "@/utils/validators";
import { ROUTES } from "@/utils/constants";
import Button from "@/components/common/Button/Button";
import ErrorMessage from "@/components/common/ErrorMessage/ErrorMessage";
import { Lock, User, ShieldCheck } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const { loading, error, isAuthenticated, login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState<{ username?: string; password?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validation
    const { errors, isValid } = validateLoginForm(username, password);
    setFormErrors(errors);

    if (isValid) {
      login({ username, password });
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push(ROUTES.DASHBOARD);
    }
  }, [isAuthenticated, router]);

  return (
    <div className="w-full max-w-md">
      <div className="bg-white dark:bg-gray-900 p-10 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-2xl shadow-gray-200/50 dark:shadow-none relative overflow-hidden group">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 dark:bg-blue-900/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/20 transition-colors"></div>

        <div className="relative z-10 text-center mb-10">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-blue-500/30 transform -rotate-6 group-hover:rotate-0 transition-transform">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">
            Access <span className="text-blue-600">Portal</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mt-2">
            Enter your professional credentials to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <div className="relative">
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                className={`w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl text-gray-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500 transition-all ${
                  formErrors.username ? "ring-2 ring-red-500/50" : ""
                }`}
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            {formErrors.username && (
              <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest ml-4">
                {formErrors.username}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                className={`w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl text-gray-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500 transition-all ${
                  formErrors.password ? "ring-2 ring-red-500/50" : ""
                }`}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {formErrors.password && (
              <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest ml-4">
                {formErrors.password}
              </p>
            )}
          </div>

          <div className="pt-2">
            <ErrorMessage message={error || ""} />
          </div>

          <Button 
            type="submit" 
            loading={loading}
            className="w-full py-4 rounded-2xl shadow-lg shadow-blue-500/20"
          >
            Authenticate
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-xs font-medium">
            Don&apos;t have an account?{" "}
            <a href="/signup" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
              Create one
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}