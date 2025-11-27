import React from 'react';

interface SectionWrapperProps {
  title: string;
  children: React.ReactNode;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({ title, children }) => {
  return (
    <div className="bg-slate-900/40 backdrop-blur-md p-6 rounded-lg shadow-2xl border border-slate-700/50">
      <h2 className="text-xl font-semibold mb-4 text-slate-100 border-b border-slate-700/50 pb-3">
        {title}
      </h2>
      {children}
    </div>
  );
};