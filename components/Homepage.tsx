import React from 'react';
import { Button } from './ui/Button';

interface HomepageProps {
  onStart: () => void;
}

// Organic Wave Background SVG Component
const WaveBackground: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden">
    {/* Base gradient */}
    <div
      className="absolute inset-0"
      style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 70%, #1a1a2e 100%)',
      }}
    />

    {/* Organic wave layers */}
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Gradient definitions */}
        <linearGradient id="wave1Grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0f3460" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#1a1a2e" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="wave2Grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#16213e" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#0f3460" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="wave3Grad" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1a1a2e" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#16213e" stopOpacity="0.7" />
        </linearGradient>

        {/* Glow filter */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Layer 1 - Back waves */}
      <path
        d="M0,600 C150,550 300,650 450,600 C600,550 750,500 900,550 C1050,600 1200,650 1350,600 C1400,580 1440,560 1440,560 L1440,900 L0,900 Z"
        fill="url(#wave1Grad)"
        style={{ animation: 'wave1 12s ease-in-out infinite' }}
      />

      {/* Layer 2 - Mid waves */}
      <path
        d="M0,650 C200,700 350,600 500,650 C650,700 800,750 950,700 C1100,650 1250,600 1440,650 L1440,900 L0,900 Z"
        fill="url(#wave2Grad)"
        style={{ animation: 'wave2 10s ease-in-out infinite' }}
      />

      {/* Layer 3 - Front waves */}
      <path
        d="M0,750 C180,700 360,800 540,750 C720,700 900,650 1080,700 C1260,750 1350,800 1440,750 L1440,900 L0,900 Z"
        fill="url(#wave3Grad)"
        style={{ animation: 'wave3 8s ease-in-out infinite' }}
      />

      {/* Organic blob shapes for depth */}
      <ellipse cx="200" cy="300" rx="150" ry="200" fill="#0f3460" opacity="0.3" style={{ animation: 'float1 15s ease-in-out infinite' }} />
      <ellipse cx="1200" cy="200" rx="180" ry="250" fill="#16213e" opacity="0.25" style={{ animation: 'float2 18s ease-in-out infinite' }} />
      <ellipse cx="700" cy="150" rx="120" ry="160" fill="#1a1a2e" opacity="0.2" style={{ animation: 'float3 12s ease-in-out infinite' }} />
    </svg>

    {/* Floating orbs for extra depth */}
    <div
      className="absolute w-64 h-64 rounded-full opacity-20"
      style={{
        background: 'radial-gradient(circle, #e94560 0%, transparent 70%)',
        top: '10%',
        right: '15%',
        animation: 'pulse 8s ease-in-out infinite',
      }}
    />
    <div
      className="absolute w-48 h-48 rounded-full opacity-15"
      style={{
        background: 'radial-gradient(circle, #4facfe 0%, transparent 70%)',
        bottom: '30%',
        left: '10%',
        animation: 'pulse 10s ease-in-out infinite reverse',
      }}
    />
  </div>
);

// 3D Feature Card with organic shape background
const FeatureCard3D: React.FC<{
  title: string;
  description: string;
  color: 'coral' | 'lime' | 'teal' | 'purple';
  delay?: number;
}> = ({ title, description, color, delay = 0 }) => {
  const colorSchemes = {
    coral: {
      bg: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a5a 50%, #e94560 100%)',
      wave: '#d63d54',
      text: '#fff',
    },
    lime: {
      bg: 'linear-gradient(135deg, #a8e063 0%, #d4fc79 50%, #96e6a1 100%)',
      wave: '#8bd35a',
      text: '#1a1a2e',
    },
    teal: {
      bg: 'linear-gradient(135deg, #11998e 0%, #38ef7d 50%, #2d9c8f 100%)',
      wave: '#1e8a7f',
      text: '#fff',
    },
    purple: {
      bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #6B73FF 100%)',
      wave: '#5a4d91',
      text: '#fff',
    },
  };

  const scheme = colorSchemes[color];

  return (
    <div
      className="group relative rounded-3xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-translate-y-2"
      style={{
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25), 0 12px 24px -8px rgba(0,0,0,0.15)',
        animationDelay: `${delay}ms`,
      }}
    >
      {/* Card background */}
      <div
        className="absolute inset-0"
        style={{ background: scheme.bg }}
      />

      {/* Organic wave overlay */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 300 400"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Multiple wave layers for depth */}
        <path
          d="M0,100 Q75,80 150,100 T300,100 L300,400 L0,400 Z"
          fill={scheme.wave}
          opacity="0.3"
          className="transition-transform duration-700 group-hover:translate-y-2"
        />
        <path
          d="M0,150 Q100,120 200,150 T300,140 L300,400 L0,400 Z"
          fill={scheme.wave}
          opacity="0.2"
          className="transition-transform duration-500 group-hover:translate-y-4"
        />
        <path
          d="M0,200 Q60,180 120,200 T240,190 T300,200 L300,400 L0,400 Z"
          fill={scheme.wave}
          opacity="0.15"
          className="transition-transform duration-300 group-hover:translate-y-6"
        />
      </svg>

      {/* Shine effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 p-8 h-80 flex flex-col justify-end">
        <h3
          className="text-2xl font-bold mb-3 transform transition-transform duration-300 group-hover:-translate-y-1"
          style={{ color: scheme.text }}
        >
          {title}
        </h3>
        <p
          className="text-sm opacity-90 leading-relaxed"
          style={{ color: scheme.text }}
        >
          {description}
        </p>

        {/* Arrow indicator */}
        <div
          className="mt-4 flex items-center gap-2 opacity-70 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-2"
          style={{ color: scheme.text }}
        >
          <span className="text-sm font-medium">Learn more</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </div>
  );
};

// Floating Glass Card for navigation hints
const GlassCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div
    className={`rounded-2xl p-6 ${className}`}
    style={{
      background: 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(20px)',
      boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.1)',
    }}
  >
    {children}
  </div>
);

// Step indicator component
const StepIndicator: React.FC<{ number: number; title: string; description: string }> = ({ number, title, description }) => (
  <div className="flex items-start gap-4 group">
    <div
      className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        boxShadow: '0 8px 20px rgba(102, 126, 234, 0.4)',
      }}
    >
      {number}
    </div>
    <div>
      <h4 className="font-bold text-slate-800 mb-1">{title}</h4>
      <p className="text-sm text-slate-600">{description}</p>
    </div>
  </div>
);

export const Homepage: React.FC<HomepageProps> = ({ onStart }) => {
  return (
    <div className="relative">
      {/* Hero Section with 3D Background */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden rounded-3xl mx-[-1rem] mt-[-2rem]">
        <WaveBackground />

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 py-20 max-w-4xl mx-auto">
          {/* Floating badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white/80 text-sm">Free & No Sign-up Required</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            <span className="text-white">Build resumes</span>
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #f8e3a3 0%, #f6d365 50%, #fda085 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              that stand out
            </span>
          </h1>

          <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
            Professional resume builder with stunning templates, live preview, and instant PDF download.
            Land your dream job faster.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={onStart}
              className="group px-8 py-4 rounded-2xl text-lg font-bold transition-all duration-300 transform hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #e94560 0%, #ff6b6b 100%)',
                color: 'white',
                boxShadow: '0 20px 40px rgba(233, 69, 96, 0.4), 0 0 0 0 rgba(233, 69, 96, 0.5)',
              }}
            >
              <span className="flex items-center gap-2">
                Get Started Free
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>

            <button
              className="px-8 py-4 rounded-2xl text-lg font-medium transition-all duration-300"
              style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              View Templates
            </button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/50 text-sm">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              ATS-Friendly
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              100% Private
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              No Watermarks
            </span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Features Section with 3D Cards */}
      <section className="py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Everything you need to create
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              the perfect resume
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Powerful features designed to help you land your dream job faster
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          <FeatureCard3D
            title="Stunning Templates"
            description="Choose from Classic, Modern, Compact, or our new 3D Depth design. All ATS-optimized."
            color="coral"
            delay={0}
          />
          <FeatureCard3D
            title="Live Preview"
            description="See changes instantly as you type. Perfect your resume in real-time."
            color="lime"
            delay={100}
          />
          <FeatureCard3D
            title="PDF Export"
            description="Download pixel-perfect PDFs ready for recruiters. Print-friendly A4 format."
            color="teal"
            delay={200}
          />
          <FeatureCard3D
            title="100% Private"
            description="Your data stays in your browser. No accounts, no uploads, no tracking."
            color="purple"
            delay={300}
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Steps */}
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Create your resume in
                <br />
                <span
                  style={{
                    background: 'linear-gradient(135deg, #e94560 0%, #ff6b6b 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  3 simple steps
                </span>
              </h2>
              <p className="text-lg text-slate-600 mb-10">
                No complicated processes. Just a smooth, intuitive experience.
              </p>

              <div className="space-y-8">
                <StepIndicator
                  number={1}
                  title="Choose a Template"
                  description="Select from our collection of professionally designed, ATS-friendly templates."
                />
                <StepIndicator
                  number={2}
                  title="Fill in Your Details"
                  description="Enter your information with our intuitive form. See live preview as you type."
                />
                <StepIndicator
                  number={3}
                  title="Download PDF"
                  description="Export your polished resume as a high-quality PDF, ready to send."
                />
              </div>
            </div>

            {/* Right: Visual */}
            <div className="relative">
              <GlassCard className="transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <span className="text-xs text-slate-400">Preview</span>
                  </div>

                  {/* Mock resume preview */}
                  <div
                    className="rounded-xl p-4 space-y-3"
                    style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}
                  >
                    <div
                      className="h-16 rounded-lg"
                      style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)' }}
                    />
                    <div className="flex gap-3">
                      <div className="w-1/3 space-y-2">
                        <div className="h-3 bg-slate-300 rounded" />
                        <div className="h-3 bg-slate-300 rounded w-3/4" />
                        <div className="h-3 bg-slate-300 rounded w-1/2" />
                      </div>
                      <div className="w-2/3 space-y-2">
                        <div className="h-3 bg-slate-300 rounded" />
                        <div className="h-3 bg-slate-300 rounded" />
                        <div className="h-3 bg-slate-300 rounded w-4/5" />
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Decorative elements */}
              <div
                className="absolute -top-8 -right-8 w-24 h-24 rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  transform: 'rotate(15deg)',
                  opacity: 0.8,
                  boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3)',
                }}
              />
              <div
                className="absolute -bottom-6 -left-6 w-16 h-16 rounded-xl"
                style={{
                  background: 'linear-gradient(135deg, #e94560 0%, #ff6b6b 100%)',
                  transform: 'rotate(-10deg)',
                  opacity: 0.8,
                  boxShadow: '0 15px 30px rgba(233, 69, 96, 0.3)',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div
          className="max-w-4xl mx-auto rounded-3xl p-12 text-center relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
            boxShadow: '0 40px 80px rgba(0,0,0,0.3)',
          }}
        >
          {/* Decorative orbs */}
          <div
            className="absolute w-48 h-48 rounded-full opacity-20"
            style={{
              background: 'radial-gradient(circle, #e94560 0%, transparent 70%)',
              top: '-10%',
              right: '10%',
            }}
          />
          <div
            className="absolute w-32 h-32 rounded-full opacity-15"
            style={{
              background: 'radial-gradient(circle, #4facfe 0%, transparent 70%)',
              bottom: '10%',
              left: '5%',
            }}
          />

          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to build your resume?
            </h2>
            <p className="text-lg text-white/70 mb-8 max-w-xl mx-auto">
              Join thousands who have already created professional resumes and landed their dream jobs.
            </p>
            <button
              onClick={onStart}
              className="group px-10 py-4 rounded-2xl text-lg font-bold transition-all duration-300 transform hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #e94560 0%, #ff6b6b 100%)',
                color: 'white',
                boxShadow: '0 20px 40px rgba(233, 69, 96, 0.4)',
              }}
            >
              <span className="flex items-center gap-2">
                Start Building Now
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* CSS Keyframes */}
      <style>{`
        @keyframes wave1 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes wave2 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-15px) translateX(-15px); }
        }
        @keyframes wave3 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-10px) translateX(5px); }
        }
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -20px) scale(1.1); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-20px, 30px) scale(0.95); }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(15px, 15px) scale(1.05); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.1); opacity: 0.3; }
        }
      `}</style>
    </div>
  );
};
