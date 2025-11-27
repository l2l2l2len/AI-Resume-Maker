import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input: React.FC<InputProps> = ({ label, id, className, ...props }) => {
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');
  return (
    <div>
      <label htmlFor={inputId} className="block text-sm font-medium text-slate-300 mb-1">
        {label}
      </label>
      <input
        id={inputId}
        className={`w-full px-3 py-2 border border-slate-700/50 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-slate-800/50 text-slate-200 transition-all duration-200 ${className}`}
        {...props}
      />
    </div>
  );
};