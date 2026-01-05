import React from 'react';
import { FileCheck, Layout, Download, Shield, Sparkles, ArrowRight } from 'lucide-react';

interface HomepageProps {
  onStart: () => void;
}

const FeatureCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
}> = ({ title, description, icon }) => (
  <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-4">
      {icon}
    </div>
    <h3 className="font-semibold text-gray-900 text-lg mb-2">{title}</h3>
    <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
  </div>
);

const StepItem: React.FC<{
  number: number;
  title: string;
  description: string;
}> = ({ number, title, description }) => (
  <div className="flex items-start gap-4">
    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
      {number}
    </div>
    <div>
      <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  </div>
);

export const Homepage: React.FC<HomepageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="text-lg font-semibold text-gray-900">AI Resume</span>
          </div>
          <button
            onClick={onStart}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get Started
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Free & No Sign-up Required
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Intelligence that works for{' '}
              <span className="text-blue-600">your career</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl">
              Create professional, ATS-optimized resumes in minutes. No complicated processes—just a smooth, intuitive experience.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onStart}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onStart}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                View Templates
              </button>
            </div>

            <div className="mt-8 flex flex-wrap gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-green-500" />
                ATS-Optimized
              </span>
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" />
                100% Private
              </span>
              <span className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-green-500" />
                No Watermarks
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything you need
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to help you stand out in the job market
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              title="AI Writing Assistant"
              description="Get intelligent suggestions for your bullet points and professional summary."
              icon={<Sparkles className="w-5 h-5" />}
            />
            <FeatureCard
              title="ATS Compliance"
              description="Templates optimized for Applicant Tracking Systems. Get past the bots."
              icon={<FileCheck className="w-5 h-5" />}
            />
            <FeatureCard
              title="Smart Templates"
              description="Beautiful, professionally designed templates that adapt to your content."
              icon={<Layout className="w-5 h-5" />}
            />
            <FeatureCard
              title="Instant PDF Export"
              description="Download pixel-perfect PDFs ready for submission. Print-friendly A4 format."
              icon={<Download className="w-5 h-5" />}
            />
            <FeatureCard
              title="100% Private"
              description="Your data stays in your browser. No accounts, no uploads, no tracking."
              icon={<Shield className="w-5 h-5" />}
            />
            <FeatureCard
              title="Live Preview"
              description="See changes in real-time as you type. No surprises when you download."
              icon={<Layout className="w-5 h-5" />}
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Create your resume in{' '}
              <span className="text-blue-600">3 simple steps</span>
            </h2>
            <p className="text-lg text-gray-600 mb-10">
              No complicated processes. Just a smooth, intuitive experience.
            </p>

            <div className="space-y-8">
              <StepItem
                number={1}
                title="Choose a Template"
                description="Select from our collection of professionally designed, ATS-friendly templates."
              />
              <StepItem
                number={2}
                title="Fill in Your Details"
                description="Enter your information with our intuitive form. See live preview as you type."
              />
              <StepItem
                number={3}
                title="Download & Apply"
                description="Export your polished resume as a high-quality PDF, ready to send to employers."
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to stand out?
          </h2>
          <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
            Join thousands who have already created professional resumes and landed their dream jobs.
          </p>
          <button
            onClick={onStart}
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start Building Now
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
};
