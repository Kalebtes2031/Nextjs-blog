"use client";

import { useState } from "react";
import Button from "@/components/common/Button/Button";
import { Lock, User, Mail, UserPlus } from "lucide-react";
import { validateEmail, validatePassword } from "@/utils/validators";
import { toast } from "react-hot-toast";

export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState<{ username?: string; email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors: { username?: string; email?: string; password?: string } = {};
    if (!username) errors.username = "Username is required";
    if (!email) {
      errors.email = "Email is required";
    } else if (!validateEmail(email)) {
      errors.email = "Invalid email format";
    }
    if (!password) {
      errors.password = "Password is required";
    } else if (!validatePassword(password)) {
      errors.password = "Password must be at least 6 characters";
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setLoading(true);
      // DummyJSON doesn't have a real registration, so we mock it
      setTimeout(() => {
        setLoading(false);
        toast.success("Account created successfully! Please login.");
        setUsername("");
        setEmail("");
        setPassword("");
      }, 1500);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white dark:bg-gray-900 p-10 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-2xl shadow-gray-200/50 dark:shadow-none relative overflow-hidden group">
        {/* Background Accent */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-green-50 dark:bg-green-900/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 group-hover:bg-green-100 dark:group-hover:bg-green-900/20 transition-colors"></div>

        <div className="relative z-10 text-center mb-10">
          <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-green-500/30 transform rotate-6 group-hover:rotate-0 transition-transform">
            <UserPlus size={32} />
          </div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">
            Join <span className="text-green-600">Pro</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mt-2">
            Create your engineering profile today.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <div className="relative">
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                className={`w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl text-gray-900 dark:text-white font-medium focus:ring-2 focus:ring-green-500 transition-all ${
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

          <div className="space-y-1">
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                className={`w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl text-gray-900 dark:text-white font-medium focus:ring-2 focus:ring-green-500 transition-all ${
                  formErrors.email ? "ring-2 ring-red-500/50" : ""
                }`}
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {formErrors.email && (
              <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest ml-4">
                {formErrors.email}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                className={`w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl text-gray-900 dark:text-white font-medium focus:ring-2 focus:ring-green-500 transition-all ${
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

          <Button 
            type="submit" 
            variant="success" 
            loading={loading}
            className="w-full py-4 rounded-2xl shadow-lg shadow-green-500/20 mt-4"
          >
            Create Account
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-xs font-medium">
            Already a member?{" "}
            <a href="/login" className="text-green-600 dark:text-green-500 font-bold hover:underline">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}