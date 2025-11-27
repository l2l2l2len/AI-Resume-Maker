import React from 'react';
import { SpinnerIcon } from '../icons';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, className, variant = 'primary', isLoading, ...props }) => {
  const baseClasses = "inline-flex items-center justify-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-in-out";

  const variantClasses = {
    primary: "border-transparent text-white bg-slate-900 hover:bg-slate-800 focus:ring-slate-500",
    secondary: "border-slate-300 text-slate-700 bg-white hover:bg-slate-50 focus:ring-blue-500",
  };
  
  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} disabled={isLoading || props.disabled} {...props}>
      <div className="flex items-center gap-2">
        {isLoading ? <SpinnerIcon /> : null}
        {children}
      </div>
    </button>
  );
};
