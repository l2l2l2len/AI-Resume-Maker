import React from 'react';
import { SparklesIcon } from '../icons';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, className, variant = 'primary', isLoading, ...props }) => {
  const baseClasses = "inline-flex items-center justify-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-in-out";

  const variantClasses = {
    primary: "border-transparent text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 focus:ring-purple-500",
    secondary: "border-slate-700 text-slate-200 bg-slate-800/50 hover:bg-slate-700/50 focus:ring-blue-500",
  };
  
  const loadingContent = (
      <>
        <SparklesIcon className="animate-pulse" />
        {props.disabled ? (children as string[]).find(c => typeof c === 'string' && c.includes('...')) : 'Generating...'}
      </>
  );


  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      <div className="flex items-center gap-2">
        {isLoading ? loadingContent : children}
      </div>
    </button>
  );
};