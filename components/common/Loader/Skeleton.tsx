import React from "react";

export const PostSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm animate-pulse">
      <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-full w-3/4 mb-4"></div>
      <div className="h-3 bg-gray-100 dark:bg-gray-800/50 rounded-full w-full mb-2"></div>
      <div className="h-3 bg-gray-100 dark:bg-gray-800/50 rounded-full w-full mb-2"></div>
      <div className="h-3 bg-gray-100 dark:bg-gray-800/50 rounded-full w-2/3 mb-6"></div>
      <div className="flex justify-between items-center">
        <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-lg w-24"></div>
        <div className="h-6 bg-gray-100 dark:bg-gray-800 rounded-full w-16"></div>
      </div>
    </div>
  );
};

export const DetailSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6 animate-pulse">
      <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-full w-24 mb-8"></div>
      <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded-xl w-3/4 mb-6"></div>
      <div className="flex gap-4 mb-10">
        <div className="h-5 bg-gray-100 dark:bg-gray-800 rounded-full w-20"></div>
        <div className="h-5 bg-gray-100 dark:bg-gray-800 rounded-full w-20"></div>
      </div>
      <div className="space-y-4 mb-12">
        <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-full w-full"></div>
        <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-full w-full"></div>
        <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-full w-full"></div>
        <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-full w-4/5"></div>
      </div>
      <div className="border-t border-gray-100 dark:border-gray-800 pt-10">
        <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded-lg w-32 mb-6"></div>
        <div className="space-y-4">
          <div className="h-20 bg-gray-50 dark:bg-gray-800/50 rounded-xl w-full"></div>
          <div className="h-20 bg-gray-50 dark:bg-gray-800/50 rounded-xl w-full"></div>
        </div>
      </div>
    </div>
  );
};
