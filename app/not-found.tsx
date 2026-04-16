import Link from "next/link";
import Button from "@/components/common/Button/Button";
import { Home, FileSearch } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
      <div className="w-24 h-24 bg-blue-50 dark:bg-blue-900/10 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mb-8">
        <FileSearch size={48} />
      </div>
      <h1 className="text-6xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter">
        404
      </h1>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
        Page Not Found
      </h2>
      <p className="text-gray-500 dark:text-gray-400 max-w-md mb-10">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link href="/">
        <Button className="flex items-center gap-2">
          <Home size={18} />
          Back to Home
        </Button>
      </Link>
    </div>
  );
}
