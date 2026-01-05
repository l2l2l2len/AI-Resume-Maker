import React from 'react';

interface AboutProps {
  onBack: () => void;
  onStart: () => void;
}

export const About: React.FC<AboutProps> = ({ onBack, onStart }) => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 min-h-[44px] text-base"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </button>

        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About AI Resume Maker</h1>
          <p className="text-lg text-gray-600">
            A free, privacy-focused resume builder for everyone
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-base text-gray-700 leading-relaxed">
              We believe everyone deserves access to professional resume-building tools without barriers.
              AI Resume Maker was created to provide a completely free, no-strings-attached solution for
              job seekers to create polished, ATS-friendly resumes that help them land interviews.
            </p>
          </div>
        </section>

        {/* Why We're Different */}
        <section className="mb-12">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">Why We're Different</h2>
          <div className="grid gap-4 md:gap-6">
            <FeatureCard
              icon={<FreeIcon />}
              title="100% Free, Forever"
              description="No hidden fees, no premium tiers, no watermarks. Every feature is completely free to use, and we plan to keep it that way."
            />
            <FeatureCard
              icon={<PrivacyIcon />}
              title="Privacy by Design"
              description="Your data never leaves your device. Everything is stored locally in your browser, which means we can't see, access, or sell your personal information."
            />
            <FeatureCard
              icon={<NoAccountIcon />}
              title="No Account Required"
              description="Start creating your resume immediately. No sign-up forms, no email verification, no passwords to remember. Just open the app and begin."
            />
            <FeatureCard
              icon={<ATSIcon />}
              title="ATS-Optimized Templates"
              description="Our templates are designed to pass through Applicant Tracking Systems that many companies use to screen resumes. Clean formatting and proper structure improve your chances."
            />
            <FeatureCard
              icon={<DeviceIcon />}
              title="Works Everywhere"
              description="Whether you're on your phone during a commute, a tablet at a coffee shop, or a desktop at home, AI Resume Maker works seamlessly on all devices."
            />
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-12">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">How It Works</h2>
          <div className="space-y-4">
            <Step number={1} title="Choose a Template" description="Select from 5 professionally designed templates, including ATS-optimized options." />
            <Step number={2} title="Fill In Your Details" description="Enter your personal information, work experience, education, and skills." />
            <Step number={3} title="Preview & Download" description="Review your resume and download it as a high-quality PDF, ready to submit." />
          </div>
        </section>

        {/* Open Source */}
        <section className="mb-12">
          <div className="bg-gray-50 rounded-xl p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">Built with Care</h2>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              AI Resume Maker is built with modern web technologies including React, TypeScript, and
              Tailwind CSS. We focus on creating a fast, accessible, and reliable experience for all users.
            </p>
            <p className="text-base text-gray-700 leading-relaxed">
              Our goal is to help as many job seekers as possible create professional resumes without
              the typical barriers of cost, accounts, or complicated software.
            </p>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center bg-gray-50 rounded-xl p-8">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
            Ready to Build Your Resume?
          </h2>
          <p className="text-gray-600 mb-6">
            Join thousands of job seekers who have created professional resumes with AI Resume Maker.
          </p>
          <button
            onClick={onStart}
            className="inline-flex items-center gap-2 px-6 py-3 min-h-[48px] bg-blue-600 text-white text-base font-medium rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors"
          >
            Get Started Free
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({
  icon,
  title,
  description,
}) => (
  <div className="flex gap-4 p-4 md:p-5 bg-white rounded-xl border border-gray-200">
    <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
      {icon}
    </div>
    <div>
      <h3 className="text-base font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </div>
  </div>
);

const Step: React.FC<{ number: number; title: string; description: string }> = ({
  number,
  title,
  description,
}) => (
  <div className="flex gap-4 p-4 md:p-5 bg-white rounded-xl border border-gray-200">
    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 font-semibold">
      {number}
    </div>
    <div>
      <h3 className="text-base font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

// Icons
const FreeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const PrivacyIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const NoAccountIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const ATSIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const DeviceIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);
