"use client";

import { useEffect } from "react";
import Button from "@/components/common/Button/Button";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center text-red-600 dark:text-red-400 mb-6">
        <AlertTriangle size={32} />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Something went wrong!
      </h2>
      <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8">
        An error occurred while processing your request. Please try again or contact support if the problem persists.
      </p>
      <Button onClick={() => reset()} className="flex items-center gap-2">
        <RefreshCw size={18} />
        Try Again
      </Button>
    </div>
  );
}
