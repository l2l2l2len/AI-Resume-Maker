import React from 'react';
import { SpinnerIcon } from '../icons';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'gradient' | 'gradient-accent' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  isLoading,
  leftIcon,
  rightIcon,
  ...props
}) => {
  const baseClasses = `
    inline-flex items-center justify-center font-medium
    rounded-xl transition-all duration-300 ease-out
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    transform active:scale-[0.98]
  `;

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3.5 text-base gap-2.5',
  };

  const variantClasses = {
    primary: `
      bg-slate-900 text-white
      hover:bg-slate-800 hover:-translate-y-0.5
      focus:ring-slate-500
      shadow-lg shadow-slate-900/20
      hover:shadow-xl hover:shadow-slate-900/30
    `,
    secondary: `
      bg-white text-slate-700 border border-slate-200
      hover:bg-slate-50 hover:border-slate-300 hover:-translate-y-0.5
      focus:ring-primary-500
      shadow-sm
      hover:shadow-md
    `,
    gradient: `
      text-white
      hover:-translate-y-0.5
      focus:ring-primary-500
      btn-gradient
    `,
    'gradient-accent': `
      text-white
      hover:-translate-y-0.5
      focus:ring-accent-500
      btn-gradient-accent
    `,
    ghost: `
      bg-transparent text-slate-600
      hover:bg-slate-100 hover:text-slate-900
      focus:ring-slate-500
    `,
    danger: `
      bg-red-50 text-red-600 border border-red-200
      hover:bg-red-100 hover:border-red-300 hover:-translate-y-0.5
      focus:ring-red-500
      shadow-sm
    `,
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <SpinnerIcon />
      ) : leftIcon ? (
        <span className="flex-shrink-0">{leftIcon}</span>
      ) : null}

      <span>{children}</span>

      {!isLoading && rightIcon && (
        <span className="flex-shrink-0">{rightIcon}</span>
      )}
    </button>
  );
};

// Icon Button variant
interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  'aria-label': string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  children,
  className = '',
  variant = 'ghost',
  size = 'md',
  ...props
}) => {
  const baseClasses = `
    inline-flex items-center justify-center
    rounded-xl transition-all duration-300 ease-out
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    transform active:scale-95
  `;

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const variantClasses = {
    primary: 'bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-500',
    secondary: 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 focus:ring-primary-500 shadow-sm',
    ghost: 'bg-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-700 focus:ring-slate-500',
    danger: 'bg-transparent text-slate-400 hover:bg-red-50 hover:text-red-600 focus:ring-red-500',
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
