import React from 'react';
import { SpinnerIcon } from '../icons';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'gradient';
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
  // Base classes with minimum touch target (44px)
  const baseClasses = `
    inline-flex items-center justify-center font-medium
    rounded-lg transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    min-h-[44px] touch-action-manipulation
    active:scale-[0.98]
  `;

  // Size classes ensuring minimum 44px height on mobile
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm gap-1.5 min-h-[44px]',
    md: 'px-4 py-2.5 text-base gap-2 min-h-[44px]',
    lg: 'px-6 py-3 text-base md:text-lg gap-2 min-h-[48px]',
  };

  const variantClasses = {
    primary: `
      bg-blue-600 text-white
      hover:bg-blue-700 active:bg-blue-800
      focus:ring-blue-500
    `,
    secondary: `
      bg-white text-gray-700 border border-gray-300
      hover:bg-gray-50 active:bg-gray-100
      focus:ring-blue-500
    `,
    ghost: `
      bg-transparent text-gray-600
      hover:bg-gray-100 hover:text-gray-900
      active:bg-gray-200
      focus:ring-gray-500
    `,
    danger: `
      bg-white text-red-600 border border-red-200
      hover:bg-red-50 active:bg-red-100
      focus:ring-red-500
    `,
    gradient: `
      bg-gradient-to-r from-blue-600 to-blue-700 text-white
      hover:from-blue-700 hover:to-blue-800
      active:from-blue-800 active:to-blue-900
      focus:ring-blue-500 shadow-lg shadow-blue-500/25
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

// Icon Button variant - minimum 44x44px touch targets
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
    rounded-lg transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    touch-action-manipulation active:scale-95
  `;

  // All sizes now meet 44px minimum touch target
  const sizeClasses = {
    sm: 'w-11 h-11 min-w-[44px] min-h-[44px]',
    md: 'w-11 h-11 min-w-[44px] min-h-[44px]',
    lg: 'w-12 h-12 min-w-[48px] min-h-[48px]',
  };

  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-blue-500',
    secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 active:bg-gray-100 focus:ring-blue-500',
    ghost: 'bg-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700 active:bg-gray-200 focus:ring-gray-500',
    danger: 'bg-transparent text-gray-400 hover:bg-red-50 hover:text-red-600 active:bg-red-100 focus:ring-red-500',
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
