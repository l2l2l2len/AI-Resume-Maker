import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  FileCheck,
  Layout,
  Download,
  Shield,
  Zap,
  Menu,
  X,
  ChevronRight,
  Star,
  ArrowRight
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface HomepageProps {
  onStart: () => void;
}

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 }
};

// Animated SVG Wave Background
const AnimatedWaveBackground: React.FC<{ isLight: boolean }> = ({ isLight }) => (
  <div className="absolute inset-0 overflow-hidden">
    {/* Base gradient - Deep Midnight Blue */}
    <div
      className="absolute inset-0"
      style={{
        background: isLight
          ? 'linear-gradient(180deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)'
          : 'linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      }}
    />

    {/* Animated gradient orbs */}
    <motion.div
      className="absolute w-[600px] h-[600px] rounded-full opacity-30"
      style={{
        background: isLight
          ? 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)',
        top: '-20%',
        right: '-10%',
      }}
      animate={{
        scale: [1, 1.2, 1],
        x: [0, 30, 0],
        y: [0, -20, 0],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />

    <motion.div
      className="absolute w-[500px] h-[500px] rounded-full opacity-20"
      style={{
        background: isLight
          ? 'radial-gradient(circle, rgba(244, 114, 182, 0.15) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(244, 114, 182, 0.25) 0%, transparent 70%)',
        bottom: '-10%',
        left: '-5%',
      }}
      animate={{
        scale: [1, 1.1, 1],
        x: [0, -20, 0],
        y: [0, 30, 0],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 2
      }}
    />

    <motion.div
      className="absolute w-[400px] h-[400px] rounded-full opacity-15"
      style={{
        background: isLight
          ? 'radial-gradient(circle, rgba(52, 211, 153, 0.15) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(52, 211, 153, 0.2) 0%, transparent 70%)',
        top: '40%',
        left: '30%',
      }}
      animate={{
        scale: [1, 1.15, 1],
        rotate: [0, 10, 0],
      }}
      transition={{
        duration: 18,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1
      }}
    />

    {/* SVG Wave layers */}
    <svg
      className="absolute bottom-0 w-full h-[300px]"
      viewBox="0 0 1440 300"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={isLight ? "#e2e8f0" : "#1e293b"} stopOpacity="0.8" />
          <stop offset="100%" stopColor={isLight ? "#cbd5e1" : "#334155"} stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="waveGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={isLight ? "#cbd5e1" : "#334155"} stopOpacity="0.5" />
          <stop offset="100%" stopColor={isLight ? "#94a3b8" : "#475569"} stopOpacity="0.4" />
        </linearGradient>
      </defs>

      <motion.path
        d="M0,150 C360,100 720,200 1080,150 C1260,125 1380,175 1440,150 L1440,300 L0,300 Z"
        fill="url(#waveGrad1)"
        animate={{
          d: [
            "M0,150 C360,100 720,200 1080,150 C1260,125 1380,175 1440,150 L1440,300 L0,300 Z",
            "M0,180 C360,220 720,120 1080,180 C1260,200 1380,140 1440,180 L1440,300 L0,300 Z",
            "M0,150 C360,100 720,200 1080,150 C1260,125 1380,175 1440,150 L1440,300 L0,300 Z"
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.path
        d="M0,200 C480,180 960,220 1440,200 L1440,300 L0,300 Z"
        fill="url(#waveGrad2)"
        animate={{
          d: [
            "M0,200 C480,180 960,220 1440,200 L1440,300 L0,300 Z",
            "M0,220 C480,240 960,180 1440,220 L1440,300 L0,300 Z",
            "M0,200 C480,180 960,220 1440,200 L1440,300 L0,300 Z"
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      />
    </svg>
  </div>
);

// Bento Grid Feature Card with muted gradients
interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: 'coral' | 'lime' | 'teal' | 'purple' | 'blue';
  size?: 'normal' | 'large';
  delay?: number;
  isLight: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  gradient,
  size = 'normal',
  delay = 0,
  isLight
}) => {
  const gradients = {
    coral: {
      bg: isLight
        ? 'linear-gradient(135deg, rgba(251, 146, 134, 0.15) 0%, rgba(255, 182, 173, 0.1) 100%)'
        : 'linear-gradient(135deg, rgba(251, 146, 134, 0.1) 0%, rgba(255, 182, 173, 0.05) 100%)',
      border: isLight ? 'rgba(251, 146, 134, 0.3)' : 'rgba(251, 146, 134, 0.2)',
      iconBg: 'rgba(251, 146, 134, 0.2)',
      iconColor: '#fb9286',
    },
    lime: {
      bg: isLight
        ? 'linear-gradient(135deg, rgba(163, 230, 53, 0.15) 0%, rgba(190, 242, 100, 0.1) 100%)'
        : 'linear-gradient(135deg, rgba(163, 230, 53, 0.1) 0%, rgba(190, 242, 100, 0.05) 100%)',
      border: isLight ? 'rgba(163, 230, 53, 0.3)' : 'rgba(163, 230, 53, 0.2)',
      iconBg: 'rgba(163, 230, 53, 0.2)',
      iconColor: '#a3e635',
    },
    teal: {
      bg: isLight
        ? 'linear-gradient(135deg, rgba(45, 212, 191, 0.15) 0%, rgba(94, 234, 212, 0.1) 100%)'
        : 'linear-gradient(135deg, rgba(45, 212, 191, 0.1) 0%, rgba(94, 234, 212, 0.05) 100%)',
      border: isLight ? 'rgba(45, 212, 191, 0.3)' : 'rgba(45, 212, 191, 0.2)',
      iconBg: 'rgba(45, 212, 191, 0.2)',
      iconColor: '#2dd4bf',
    },
    purple: {
      bg: isLight
        ? 'linear-gradient(135deg, rgba(167, 139, 250, 0.15) 0%, rgba(196, 181, 253, 0.1) 100%)'
        : 'linear-gradient(135deg, rgba(167, 139, 250, 0.1) 0%, rgba(196, 181, 253, 0.05) 100%)',
      border: isLight ? 'rgba(167, 139, 250, 0.3)' : 'rgba(167, 139, 250, 0.2)',
      iconBg: 'rgba(167, 139, 250, 0.2)',
      iconColor: '#a78bfa',
    },
    blue: {
      bg: isLight
        ? 'linear-gradient(135deg, rgba(96, 165, 250, 0.15) 0%, rgba(147, 197, 253, 0.1) 100%)'
        : 'linear-gradient(135deg, rgba(96, 165, 250, 0.1) 0%, rgba(147, 197, 253, 0.05) 100%)',
      border: isLight ? 'rgba(96, 165, 250, 0.3)' : 'rgba(96, 165, 250, 0.2)',
      iconBg: 'rgba(96, 165, 250, 0.2)',
      iconColor: '#60a5fa',
    },
  };

  const style = gradients[gradient];

  return (
    <motion.div
      className={`group relative rounded-2xl sm:rounded-3xl p-5 sm:p-6 cursor-pointer overflow-hidden ${
        size === 'large' ? 'sm:col-span-2' : ''
      }`}
      style={{
        background: style.bg,
        border: `1px solid ${style.border}`,
      }}
      variants={fadeInUp}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
    >
      {/* Icon */}
      <div
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4"
        style={{ background: style.iconBg }}
      >
        <div style={{ color: style.iconColor }}>
          {icon}
        </div>
      </div>

      {/* Content */}
      <h3
        className={`font-semibold text-lg sm:text-xl mb-2 ${
          isLight ? 'text-slate-800' : 'text-white'
        }`}
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {title}
      </h3>
      <p className={`text-sm sm:text-base leading-relaxed ${
        isLight ? 'text-slate-600' : 'text-slate-400'
      }`}>
        {description}
      </p>

      {/* Hover arrow */}
      <motion.div
        className={`absolute bottom-5 right-5 sm:bottom-6 sm:right-6 opacity-0 group-hover:opacity-100 ${
          isLight ? 'text-slate-600' : 'text-slate-400'
        }`}
        initial={{ x: -10, opacity: 0 }}
        whileHover={{ x: 0, opacity: 1 }}
      >
        <ArrowRight className="w-5 h-5" />
      </motion.div>
    </motion.div>
  );
};

// Floating Navigation with Sidebar Drawer
const FloatingNav: React.FC<{ onStart: () => void; isLight: boolean }> = ({ onStart, isLight }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        className={`fixed top-4 right-4 z-50 sm:hidden w-12 h-12 rounded-xl flex items-center justify-center ${
          isLight
            ? 'bg-white/90 text-slate-800 shadow-lg'
            : 'bg-slate-800/90 text-white'
        }`}
        style={{ backdropFilter: 'blur(10px)' }}
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </motion.button>

      {/* Sidebar Drawer for Mobile */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 sm:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className={`fixed top-0 right-0 h-full w-72 z-50 sm:hidden p-6 ${
                isLight ? 'bg-white' : 'bg-slate-900'
              }`}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="mt-16 space-y-6">
                <nav className="space-y-4">
                  <a
                    href="#features"
                    className={`block text-lg font-medium ${
                      isLight ? 'text-slate-800 hover:text-indigo-600' : 'text-white hover:text-indigo-400'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    Features
                  </a>
                  <a
                    href="#how-it-works"
                    className={`block text-lg font-medium ${
                      isLight ? 'text-slate-800 hover:text-indigo-600' : 'text-white hover:text-indigo-400'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    How it Works
                  </a>
                  <a
                    href="#templates"
                    className={`block text-lg font-medium ${
                      isLight ? 'text-slate-800 hover:text-indigo-600' : 'text-white hover:text-indigo-400'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    Templates
                  </a>
                </nav>

                <button
                  onClick={() => {
                    setIsOpen(false);
                    onStart();
                  }}
                  className="w-full py-3 px-6 rounded-xl font-semibold text-white"
                  style={{
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  }}
                >
                  Get Started
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Floating Nav */}
      <motion.div
        className={`hidden sm:flex fixed top-4 left-1/2 -translate-x-1/2 z-50 items-center gap-6 px-6 py-3 rounded-full ${
          isLight
            ? 'bg-white/80 shadow-lg shadow-slate-200/50'
            : 'bg-slate-800/80 shadow-lg shadow-black/20'
        }`}
        style={{ backdropFilter: 'blur(10px)' }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <span
          className={`font-bold text-lg ${isLight ? 'text-slate-800' : 'text-white'}`}
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          ResumeAI
        </span>
        <nav className="flex items-center gap-4">
          <a
            href="#features"
            className={`text-sm font-medium transition-colors ${
              isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
            }`}
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className={`text-sm font-medium transition-colors ${
              isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
            }`}
          >
            How it Works
          </a>
        </nav>
        <button
          onClick={onStart}
          className="py-2 px-4 rounded-full text-sm font-semibold text-white transition-transform hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          }}
        >
          Start Free
        </button>
      </motion.div>
    </>
  );
};

// Step Card for How it Works
const StepCard: React.FC<{
  number: number;
  title: string;
  description: string;
  isLight: boolean;
  delay?: number;
}> = ({ number, title, description, isLight, delay = 0 }) => (
  <motion.div
    className="flex items-start gap-4"
    variants={fadeInUp}
    initial="initial"
    whileInView="animate"
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
  >
    <div
      className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center font-bold text-white text-lg"
      style={{
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      }}
    >
      {number}
    </div>
    <div>
      <h4
        className={`font-semibold text-lg mb-1 ${isLight ? 'text-slate-800' : 'text-white'}`}
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {title}
      </h4>
      <p className={`text-sm ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
        {description}
      </p>
    </div>
  </motion.div>
);

export const Homepage: React.FC<HomepageProps> = ({ onStart }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <div className="relative">
      <FloatingNav onStart={onStart} isLight={isLight} />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden rounded-2xl sm:rounded-3xl mx-[-0.75rem] sm:mx-[-1rem] mt-[-1rem] sm:mt-[-2rem]">
        <AnimatedWaveBackground isLight={isLight} />

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 py-20 sm:py-24 max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 sm:mb-8 ${
              isLight
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-indigo-500/20 text-indigo-300'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Star className="w-4 h-4" />
            <span className="text-sm font-medium">Free & No Sign-up Required</span>
          </motion.div>

          {/* Main Headline - Serif Font */}
          <motion.h1
            className="mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span
              className={`block text-4xl sm:text-5xl md:text-7xl font-bold leading-tight ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Craft resumes that
            </span>
            <span
              className="block text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mt-2"
              style={{
                fontFamily: "'Playfair Display', serif",
                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              tell your story
            </span>
          </motion.h1>

          {/* Subheadline - Sans Serif */}
          <motion.p
            className={`text-lg sm:text-xl max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed ${
              isLight ? 'text-slate-600' : 'text-slate-400'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Professional resume builder with stunning templates, AI-powered suggestions,
            and instant PDF export. Land your dream job faster.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              onClick={onStart}
              className="group w-full sm:w-auto px-8 py-4 rounded-xl sm:rounded-2xl text-lg font-semibold text-white flex items-center justify-center gap-2"
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                boxShadow: '0 20px 40px rgba(99, 102, 241, 0.3)',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Start Building Free
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              onClick={onStart}
              className={`w-full sm:w-auto px-8 py-4 rounded-xl sm:rounded-2xl text-lg font-medium ${
                isLight
                  ? 'bg-white text-slate-800 shadow-lg'
                  : 'bg-slate-800 text-white'
              }`}
              style={{ backdropFilter: 'blur(10px)' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              View Templates
            </motion.button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className={`mt-10 sm:mt-12 flex flex-wrap justify-center gap-6 sm:gap-8 text-sm ${
              isLight ? 'text-slate-500' : 'text-slate-500'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {['ATS-Optimized', '100% Private', 'No Watermarks'].map((item, index) => (
              <span key={index} className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-emerald-500" />
                {item}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { delay: 1 },
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <div className={`w-6 h-10 rounded-full border-2 flex items-start justify-center p-2 ${
            isLight ? 'border-slate-300' : 'border-slate-600'
          }`}>
            <motion.div
              className={`w-1.5 h-1.5 rounded-full ${isLight ? 'bg-slate-400' : 'bg-slate-500'}`}
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section - Bento Grid */}
      <section id="features" className="py-16 sm:py-24">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Everything you need
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Powerful features designed to help you stand out in the job market
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <FeatureCard
            title="AI Writing Assistant"
            description="Get intelligent suggestions for your bullet points and professional summary. Our AI helps you articulate your achievements effectively."
            icon={<Sparkles className="w-6 h-6" />}
            gradient="coral"
            size="large"
            delay={0}
            isLight={isLight}
          />
          <FeatureCard
            title="ATS Compliance"
            description="Templates optimized for Applicant Tracking Systems. Get past the bots and into human hands."
            icon={<FileCheck className="w-6 h-6" />}
            gradient="lime"
            delay={0.1}
            isLight={isLight}
          />
          <FeatureCard
            title="Smart Templates"
            description="Beautiful, professionally designed templates that adapt to your content."
            icon={<Layout className="w-6 h-6" />}
            gradient="teal"
            delay={0.2}
            isLight={isLight}
          />
          <FeatureCard
            title="Instant PDF Export"
            description="Download pixel-perfect PDFs ready for submission. Print-friendly A4 format."
            icon={<Download className="w-6 h-6" />}
            gradient="purple"
            delay={0.3}
            isLight={isLight}
          />
          <FeatureCard
            title="100% Private"
            description="Your data stays in your browser. No accounts, no uploads, no tracking. Complete privacy guaranteed."
            icon={<Shield className="w-6 h-6" />}
            gradient="blue"
            size="large"
            delay={0.4}
            isLight={isLight}
          />
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Content */}
            <div>
              <motion.h2
                className={`text-3xl sm:text-4xl font-bold mb-4 ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
                style={{ fontFamily: "'Playfair Display', serif" }}
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                Create your resume in{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  3 simple steps
                </span>
              </motion.h2>

              <motion.p
                className={`text-lg mb-10 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                No complicated processes. Just a smooth, intuitive experience.
              </motion.p>

              <div className="space-y-8">
                <StepCard
                  number={1}
                  title="Choose a Template"
                  description="Select from our collection of professionally designed, ATS-friendly templates."
                  isLight={isLight}
                  delay={0.2}
                />
                <StepCard
                  number={2}
                  title="Fill in Your Details"
                  description="Enter your information with our intuitive form. See live preview as you type."
                  isLight={isLight}
                  delay={0.3}
                />
                <StepCard
                  number={3}
                  title="Download & Apply"
                  description="Export your polished resume as a high-quality PDF, ready to send to employers."
                  isLight={isLight}
                  delay={0.4}
                />
              </div>
            </div>

            {/* Right: Visual */}
            <motion.div
              className="relative hidden lg:block"
              variants={scaleIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div
                className="rounded-2xl sm:rounded-3xl p-6 sm:p-8"
                style={{
                  background: isLight
                    ? 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
                    : 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
                  border: `1px solid ${isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'}`,
                }}
              >
                {/* Mock browser chrome */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>

                {/* Mock resume preview */}
                <div
                  className="rounded-xl p-4 space-y-4"
                  style={{
                    background: isLight ? '#ffffff' : '#0f172a',
                  }}
                >
                  <div
                    className="h-20 rounded-lg"
                    style={{
                      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    }}
                  />
                  <div className="flex gap-4">
                    <div className="w-1/3 space-y-3">
                      <div className={`h-3 rounded ${isLight ? 'bg-slate-200' : 'bg-slate-700'}`} />
                      <div className={`h-3 rounded w-3/4 ${isLight ? 'bg-slate-200' : 'bg-slate-700'}`} />
                      <div className={`h-3 rounded w-1/2 ${isLight ? 'bg-slate-200' : 'bg-slate-700'}`} />
                    </div>
                    <div className="w-2/3 space-y-3">
                      <div className={`h-3 rounded ${isLight ? 'bg-slate-200' : 'bg-slate-700'}`} />
                      <div className={`h-3 rounded ${isLight ? 'bg-slate-200' : 'bg-slate-700'}`} />
                      <div className={`h-3 rounded w-4/5 ${isLight ? 'bg-slate-200' : 'bg-slate-700'}`} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <motion.div
                className="absolute -top-6 -right-6 w-20 h-20 rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  opacity: 0.8,
                }}
                animate={{
                  rotate: [15, 20, 15],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-14 h-14 rounded-xl"
                style={{
                  background: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)',
                  opacity: 0.8,
                }}
                animate={{
                  rotate: [-10, -5, -10],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24">
        <motion.div
          className="max-w-4xl mx-auto rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          }}
          variants={scaleIn}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {/* Animated background elements */}
          <motion.div
            className="absolute w-64 h-64 rounded-full opacity-20"
            style={{
              background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)',
              top: '-20%',
              right: '-10%',
            }}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute w-48 h-48 rounded-full opacity-15"
            style={{
              background: 'radial-gradient(circle, #ec4899 0%, transparent 70%)',
              bottom: '-10%',
              left: '10%',
            }}
            animate={{
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />

          <div className="relative z-10">
            <h2
              className="text-3xl sm:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Ready to stand out?
            </h2>
            <p className="text-lg text-slate-400 mb-8 max-w-xl mx-auto">
              Join thousands who have already created professional resumes and landed their dream jobs.
            </p>
            <motion.button
              onClick={onStart}
              className="group px-10 py-4 rounded-xl sm:rounded-2xl text-lg font-semibold text-white inline-flex items-center gap-2"
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                boxShadow: '0 20px 40px rgba(99, 102, 241, 0.4)',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Start Building Now
              <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
