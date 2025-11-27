import React from 'react';

export const ConfigError: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center text-slate-100 font-sans p-4">
      <div className="max-w-2xl w-full bg-slate-900/40 backdrop-blur-md p-8 rounded-lg shadow-2xl border border-red-500/50 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h1 className="text-3xl font-bold text-red-400 mb-2">Application Not Configured</h1>
        <p className="text-slate-300 mb-4">
          This AI-powered application requires a Gemini API key to function, but it has not been configured in the deployment environment.
        </p>
        <div className="bg-slate-800/50 text-left p-4 rounded-md text-sm text-slate-400 font-mono">
          <p className="font-semibold text-slate-200">Action Required:</p>
          <p>The owner of this application needs to add the <code className="bg-slate-700 text-amber-400 px-1 py-0.5 rounded">API_KEY</code> environment variable to the deployment settings (e.g., in Vercel, Netlify, or your server environment).</p>
        </div>
      </div>
    </div>
  );
};