import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    id: string;
}

export const Textarea: React.FC<TextareaProps> = ({ id, className, ...props }) => {
  return (
    <textarea
      id={id}
      className={`w-full px-3 py-2 border border-slate-700/50 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-slate-800/50 text-slate-200 transition-all duration-200 ${className}`}
      {...props}
    />
  );
};