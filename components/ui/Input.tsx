import React, { useState, useId } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showCharCount?: boolean;
  maxLength?: number;
}

export const Input: React.FC<InputProps> = ({
  label,
  id,
  className = '',
  error,
  hint,
  leftIcon,
  rightIcon,
  showCharCount,
  maxLength,
  value,
  ...props
}) => {
  const generatedId = useId();
  const inputId = id || generatedId;
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value !== undefined && value !== '';
  const charCount = typeof value === 'string' ? value.length : 0;

  return (
    <div className="relative">
      {/* Label */}
      <label
        htmlFor={inputId}
        className={`
          absolute left-3 transition-all duration-200 pointer-events-none z-10
          ${leftIcon ? 'left-10' : 'left-3'}
          ${isFocused || hasValue
            ? '-top-2.5 text-xs px-1 bg-white'
            : 'top-1/2 -translate-y-1/2 text-sm'
          }
          ${error
            ? 'text-red-500'
            : isFocused
              ? 'text-primary-600'
              : 'text-slate-500'
          }
        `}
      >
        {label}
      </label>

      {/* Input Container */}
      <div className="relative">
        {/* Left Icon */}
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {leftIcon}
          </div>
        )}

        {/* Input Field */}
        <input
          id={inputId}
          value={value}
          maxLength={maxLength}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          className={`
            w-full px-3 py-3 border rounded-xl
            bg-white text-slate-900
            transition-all duration-200
            placeholder:text-transparent
            ${leftIcon ? 'pl-10' : 'pl-3'}
            ${rightIcon || showCharCount ? 'pr-10' : 'pr-3'}
            ${error
              ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
              : 'border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20'
            }
            input-focus-ring
            ${className}
          `}
          {...props}
        />

        {/* Right Icon or Character Count */}
        {(rightIcon || showCharCount) && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
            {showCharCount && maxLength ? (
              <span className={charCount >= maxLength ? 'text-red-500' : ''}>
                {charCount}/{maxLength}
              </span>
            ) : (
              rightIcon
            )}
          </div>
        )}
      </div>

      {/* Error or Hint */}
      {(error || hint) && (
        <p className={`mt-1.5 text-xs ${error ? 'text-red-500' : 'text-slate-500'}`}>
          {error || hint}
        </p>
      )}
    </div>
  );
};

// Textarea variant with same styling
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  showCharCount?: boolean;
  maxLength?: number;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  id,
  className = '',
  error,
  hint,
  showCharCount,
  maxLength,
  value,
  rows = 3,
  ...props
}) => {
  const generatedId = useId();
  const textareaId = id || generatedId;
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value !== undefined && value !== '';
  const charCount = typeof value === 'string' ? value.length : 0;

  return (
    <div className="relative">
      {/* Label */}
      {label && (
        <label
          htmlFor={textareaId}
          className={`
            absolute left-3 transition-all duration-200 pointer-events-none z-10
            ${isFocused || hasValue
              ? '-top-2.5 text-xs px-1 bg-white'
              : 'top-3 text-sm'
            }
            ${error
              ? 'text-red-500'
              : isFocused
                ? 'text-primary-600'
                : 'text-slate-500'
            }
          `}
        >
          {label}
        </label>
      )}

      {/* Textarea Field */}
      <textarea
        id={textareaId}
        value={value}
        rows={rows}
        maxLength={maxLength}
        onFocus={(e) => {
          setIsFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          props.onBlur?.(e);
        }}
        className={`
          w-full px-3 py-3 border rounded-xl
          bg-white text-slate-900
          transition-all duration-200
          placeholder:text-transparent
          resize-none
          ${error
            ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
            : 'border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20'
          }
          input-focus-ring
          ${className}
        `}
        {...props}
      />

      {/* Character Count and Error/Hint */}
      <div className="flex justify-between items-center mt-1.5">
        {(error || hint) && (
          <p className={`text-xs ${error ? 'text-red-500' : 'text-slate-500'}`}>
            {error || hint}
          </p>
        )}
        {showCharCount && maxLength && (
          <p className={`text-xs ml-auto ${charCount >= maxLength ? 'text-red-500' : 'text-slate-400'}`}>
            {charCount}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
};
