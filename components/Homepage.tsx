import React from 'react';
import {
  Sparkles,
  FileCheck,
  Layout,
  Download,
  Shield,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

interface HomepageProps {
  onStart: () => void;
}

// Feature Card Component
const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <div className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-200">
    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 text-blue-600">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
  </div>
);

// Step Component
const Step: React.FC<{
  number: number;
  title: string;
  description: string;
}> = ({ number, title, description }) => (
  <div className="flex gap-4">
    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-lg">
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
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="text-center max-w-3xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-6">
              <CheckCircle2 className="w-4 h-4" />
              Free & No Sign-up Required
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
              Intelligence that works for{' '}
              <span className="text-blue-600">your career</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Create professional, ATS-friendly resumes in minutes with our AI-powered builder. No accounts, no uploads, complete privacy.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
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

            {/* Trust indicators */}
            <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-green-500" />
                ATS-Optimized
              </span>
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" />
                100% Private
              </span>
              <span className="flex items-center gap-2">
                <Download className="w-4 h-4 text-green-500" />
                Instant PDF Export
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
              icon={<Sparkles className="w-6 h-6" />}
              title="AI Writing Assistant"
              description="Get intelligent suggestions for your bullet points and professional summary to articulate achievements effectively."
            />
            <FeatureCard
              icon={<FileCheck className="w-6 h-6" />}
              title="ATS Compliance"
              description="Templates optimized for Applicant Tracking Systems. Get past the bots and into human hands."
            />
            <FeatureCard
              icon={<Layout className="w-6 h-6" />}
              title="Smart Templates"
              description="Beautiful, professionally designed templates that adapt to your content automatically."
            />
            <FeatureCard
              icon={<Download className="w-6 h-6" />}
              title="Instant PDF Export"
              description="Download pixel-perfect PDFs ready for submission. Print-friendly A4 format included."
            />
            <FeatureCard
              icon={<Shield className="w-6 h-6" />}
              title="100% Private"
              description="Your data stays in your browser. No accounts, no uploads, no tracking. Complete privacy."
            />
            <FeatureCard
              icon={<CheckCircle2 className="w-6 h-6" />}
              title="Real-time Preview"
              description="See your changes instantly as you type. What you see is exactly what you'll get."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Steps */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Create your resume in{' '}
                <span className="text-blue-600">3 simple steps</span>
              </h2>
              <p className="text-lg text-gray-600 mb-10">
                No complicated processes. Just a smooth, intuitive experience.
              </p>

              <div className="space-y-8">
                <Step
                  number={1}
                  title="Choose a Template"
                  description="Select from our collection of professionally designed, ATS-friendly templates."
                />
                <Step
                  number={2}
                  title="Fill in Your Details"
                  description="Enter your information with our intuitive form. See live preview as you type."
                />
                <Step
                  number={3}
                  title="Download & Apply"
                  description="Export your polished resume as a high-quality PDF, ready to send to employers."
                />
              </div>
            </div>

            {/* Right: Visual */}
            <div className="hidden lg:block">
              <div className="bg-gray-100 rounded-2xl p-6 border border-gray-200">
                {/* Browser chrome */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>

                {/* Mock resume */}
                <div className="bg-white rounded-xl p-4 space-y-4 shadow-sm">
                  <div className="h-16 bg-blue-600 rounded-lg" />
                  <div className="flex gap-4">
                    <div className="w-1/3 space-y-2">
                      <div className="h-3 bg-gray-200 rounded" />
                      <div className="h-3 bg-gray-200 rounded w-3/4" />
                      <div className="h-3 bg-gray-200 rounded w-1/2" />
                    </div>
                    <div className="w-2/3 space-y-2">
                      <div className="h-3 bg-gray-200 rounded" />
                      <div className="h-3 bg-gray-200 rounded" />
                      <div className="h-3 bg-gray-200 rounded w-4/5" />
                    </div>
                  </div>
                </div>
              </div>
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
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-lg"
          >
            Start Building Now
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center text-sm text-gray-500">
          <p>AI Resume Maker - Professional resume builder with complete privacy</p>
        </div>
      </footer>
    </div>
  );
};
