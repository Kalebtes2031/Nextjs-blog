import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`border rounded-lg p-4 shadow-sm hover:shadow-md transition bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 ${className}`}>
      {children}
    </div>
  );
}