import React, { useState, useEffect, useRef } from 'react';
import { ResumeData, Experience, Education } from '../types';
import { Input, Textarea } from './ui/Input';
import { Button, IconButton } from './ui/Button';
import { PlusIcon, TrashIcon } from './icons';
import { getEmailError, getUrlError, getPhoneError } from '../utils/validation';

// Compact icons (smaller)
const ChevronDownIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const ChevronUpIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
  </svg>
);

const MenuIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const EyeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const LightbulbIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const SparkleIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

export type FormStep = 'personal' | 'experience' | 'education' | 'skills' | 'summary';

interface FormWizardProps {
  resumeData: ResumeData;
  onResumeDataChange: (section: keyof ResumeData, data: any) => void;
  onComplete: () => void;
  onBack: () => void;
  initialStep?: FormStep;
}

interface StepConfig {
  id: FormStep;
  label: string;
  description: string;
  proTip?: string;
}

const STEPS: StepConfig[] = [
  { id: 'personal', label: 'Personal Details', description: 'Basic info & contact', proTip: 'Use a professional email address' },
  { id: 'experience', label: 'Work Experience', description: 'Your work history', proTip: 'Include relevant internships and volunteer work' },
  { id: 'education', label: 'Education', description: 'Academic background', proTip: 'Have a low CGPA? You can hide marks!' },
  { id: 'skills', label: 'Skills', description: 'Your expertise', proTip: 'Include both technical and soft skills' },
  { id: 'summary', label: 'Summary', description: 'Professional summary', proTip: 'Keep it concise - 2-3 sentences max' },
];

const PROGRESS_MESSAGES = [
  "Just 2 minutes to make your resume. Let's go!",
  "Great start! Let's add a few key details",
  "You're doing well. Just a few more sections",
  "Almost there! Keep going",
  "Final step! You're about to finish",
];

// Compact Input Component for mobile
const CompactInput: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  error?: string;
}> = ({ label, value, onChange, placeholder, type = 'text', error }) => (
  <div className="space-y-1">
    <label className="block text-xs font-medium text-gray-600">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder || label.toLowerCase()}
      className={`w-full px-3 py-2.5 text-sm bg-gray-50 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
        error ? 'border-red-300 bg-red-50' : 'border-gray-200'
      }`}
    />
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

// Compact Textarea for mobile
const CompactTextarea: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}> = ({ label, value, onChange, placeholder, rows = 2 }) => (
  <div className="space-y-1">
    <label className="block text-xs font-medium text-gray-600">{label}</label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
    />
  </div>
);

// Pro Tip Box
const ProTip: React.FC<{ tip: string }> = ({ tip }) => (
  <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-100 rounded-lg">
    <LightbulbIcon />
    <div>
      <p className="text-xs font-semibold text-blue-700">Pro Tip</p>
      <p className="text-xs text-blue-600">{tip}</p>
    </div>
  </div>
);

// Collapsible Section Header
const SectionHeader: React.FC<{
  title: string;
  description: string;
  isOpen: boolean;
  onToggle: () => void;
  count?: number;
}> = ({ title, description, isOpen, onToggle, count }) => (
  <button
    onClick={onToggle}
    className="w-full flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 touch-action-manipulation"
  >
    <div className="text-left">
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        {count !== undefined && count > 0 && (
          <span className="px-1.5 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full">{count}</span>
        )}
      </div>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
    {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
  </button>
);

export const FormWizard: React.FC<FormWizardProps> = ({
  resumeData,
  onResumeDataChange,
  onComplete,
  onBack,
  initialStep = 'personal',
}) => {
  const [currentStep, setCurrentStep] = useState<FormStep>(initialStep);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({ main: true });
  const [showSectionMenu, setShowSectionMenu] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  const currentStepIndex = STEPS.findIndex((s) => s.id === currentStep);
  const progressPercent = ((currentStepIndex + 1) / STEPS.length) * 100;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const toggleSection = (key: string) => {
    setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const goToStep = (step: FormStep) => {
    setCurrentStep(step);
    setShowSectionMenu(false);
  };

  const goNext = () => {
    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStep(STEPS[currentStepIndex + 1].id);
    } else {
      onComplete();
    }
  };

  const goPrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(STEPS[currentStepIndex - 1].id);
    } else {
      onBack();
    }
  };

  // Handlers
  const handlePersonalInfoChange = (field: keyof ResumeData['personalInfo'], value: string) => {
    onResumeDataChange('personalInfo', { ...resumeData.personalInfo, [field]: value });
  };

  const addEducation = () => {
    const newEducation: Education = { id: `edu${Date.now()}`, institution: '', degree: '', date: '' };
    onResumeDataChange('education', [...resumeData.education, newEducation]);
  };

  const removeEducation = (index: number) => {
    onResumeDataChange('education', resumeData.education.filter((_, i) => i !== index));
  };

  const handleEducationChange = (index: number, field: keyof Education, value: string) => {
    const updated = [...resumeData.education];
    updated[index] = { ...updated[index], [field]: value };
    onResumeDataChange('education', updated);
  };

  const addExperience = () => {
    const newExp: Experience = { id: `exp${Date.now()}`, company: '', role: '', date: '', bulletPoints: [''] };
    onResumeDataChange('experience', [...resumeData.experience, newExp]);
  };

  const removeExperience = (index: number) => {
    onResumeDataChange('experience', resumeData.experience.filter((_, i) => i !== index));
  };

  const handleExperienceChange = (index: number, field: keyof Experience, value: string | string[]) => {
    const updated = [...resumeData.experience];
    updated[index] = { ...updated[index], [field]: value };
    onResumeDataChange('experience', updated);
  };

  const handleSkillsChange = (value: string) => {
    onResumeDataChange('skills', value.split(',').map(s => s.trim()).filter(Boolean));
  };

  const currentStepConfig = STEPS[currentStepIndex];

  const renderStepContent = () => {
    switch (currentStep) {
      case 'personal':
        return (
          <div className="space-y-3">
            <SectionHeader
              title="Personal Details"
              description="Your name and contact information"
              isOpen={expandedSections.main !== false}
              onToggle={() => toggleSection('main')}
            />
            {expandedSections.main !== false && (
              <div className="space-y-3 p-3 bg-gray-50 rounded-lg">
                <CompactInput
                  label="Full Name"
                  value={resumeData.personalInfo.name}
                  onChange={(v) => handlePersonalInfoChange('name', v)}
                  placeholder="John Doe"
                />
                <CompactInput
                  label="Email"
                  type="email"
                  value={resumeData.personalInfo.email}
                  onChange={(v) => handlePersonalInfoChange('email', v)}
                  placeholder="john@email.com"
                />
                <CompactInput
                  label="Phone"
                  type="tel"
                  value={resumeData.personalInfo.phone}
                  onChange={(v) => handlePersonalInfoChange('phone', v)}
                  placeholder="+1 234 567 8900"
                />
                <CompactInput
                  label="LinkedIn"
                  value={resumeData.personalInfo.linkedin}
                  onChange={(v) => handlePersonalInfoChange('linkedin', v)}
                  placeholder="linkedin.com/in/johndoe"
                />
                <CompactInput
                  label="Website"
                  value={resumeData.personalInfo.website}
                  onChange={(v) => handlePersonalInfoChange('website', v)}
                  placeholder="johndoe.com"
                />
              </div>
            )}
          </div>
        );

      case 'experience':
        return (
          <div className="space-y-3">
            <SectionHeader
              title="Work Experience"
              description="Add up to 5 most recent roles"
              isOpen={expandedSections.main !== false}
              onToggle={() => toggleSection('main')}
              count={resumeData.experience.length}
            />
            {expandedSections.main !== false && (
              <div className="space-y-3">
                {resumeData.experience.map((exp, idx) => (
                  <div key={exp.id} className="p-3 bg-gray-50 rounded-lg space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-gray-500">Experience {idx + 1}</span>
                      <button
                        onClick={() => removeExperience(idx)}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded"
                      >
                        <TrashIcon />
                      </button>
                    </div>
                    <CompactInput label="Company" value={exp.company} onChange={(v) => handleExperienceChange(idx, 'company', v)} />
                    <CompactInput label="Role" value={exp.role} onChange={(v) => handleExperienceChange(idx, 'role', v)} />
                    <CompactInput label="Duration" value={exp.date} onChange={(v) => handleExperienceChange(idx, 'date', v)} placeholder="Jan 2020 - Present" />
                    <CompactTextarea
                      label="Responsibilities"
                      value={exp.bulletPoints.join('\n')}
                      onChange={(v) => handleExperienceChange(idx, 'bulletPoints', v.split('\n'))}
                      placeholder="• Led team of 5..."
                      rows={3}
                    />
                  </div>
                ))}
                <button
                  onClick={addExperience}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 text-sm font-medium text-blue-600 border border-dashed border-blue-300 rounded-lg hover:bg-blue-50"
                >
                  <span className="text-lg">+</span> Add Work
                </button>
              </div>
            )}
            <ProTip tip="Students: Include relevant internships and volunteer work. Professionals: Focus on roles relevant to the job you're applying for." />
          </div>
        );

      case 'education':
        return (
          <div className="space-y-3">
            <SectionHeader
              title="Education"
              description="Add up to 3 education entries"
              isOpen={expandedSections.main !== false}
              onToggle={() => toggleSection('main')}
              count={resumeData.education.length}
            />
            {expandedSections.main !== false && (
              <div className="space-y-3">
                {resumeData.education.map((edu, idx) => (
                  <div key={edu.id} className="p-3 bg-gray-50 rounded-lg space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-gray-500">Education {idx + 1}</span>
                      <button
                        onClick={() => removeEducation(idx)}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded"
                      >
                        <TrashIcon />
                      </button>
                    </div>
                    <CompactInput label="Institution" value={edu.institution} onChange={(v) => handleEducationChange(idx, 'institution', v)} />
                    <CompactInput label="Degree" value={edu.degree} onChange={(v) => handleEducationChange(idx, 'degree', v)} />
                    <CompactInput label="Year" value={edu.date} onChange={(v) => handleEducationChange(idx, 'date', v)} placeholder="2016 - 2020" />
                  </div>
                ))}
                <button
                  onClick={addEducation}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 text-sm font-medium text-blue-600 border border-dashed border-blue-300 rounded-lg hover:bg-blue-50"
                >
                  <span className="text-lg">+</span> Add Education
                </button>
              </div>
            )}
            <ProTip tip="Have a low CGPA or percentage? Enable the 'Hide marks' option to focus on your degree instead!" />
          </div>
        );

      case 'skills':
        return (
          <div className="space-y-3">
            <SectionHeader
              title="Skills"
              description="Technical and soft skills"
              isOpen={expandedSections.main !== false}
              onToggle={() => toggleSection('main')}
              count={resumeData.skills.filter(Boolean).length}
            />
            {expandedSections.main !== false && (
              <div className="space-y-3 p-3 bg-gray-50 rounded-lg">
                <CompactInput
                  label="Skills (comma separated)"
                  value={resumeData.skills.join(', ')}
                  onChange={handleSkillsChange}
                  placeholder="React, TypeScript, Node.js..."
                />
                {resumeData.skills.filter(Boolean).length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {resumeData.skills.filter(Boolean).map((skill, i) => (
                      <span key={i} className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
            <ProTip tip="Include both technical skills (React, Python) and soft skills (Leadership, Communication)" />
          </div>
        );

      case 'summary':
        return (
          <div className="space-y-3">
            <SectionHeader
              title="Professional Summary"
              description="A brief overview of your career"
              isOpen={expandedSections.main !== false}
              onToggle={() => toggleSection('main')}
            />
            {expandedSections.main !== false && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <CompactTextarea
                  label="Summary"
                  value={resumeData.summary}
                  onChange={(v) => onResumeDataChange('summary', v)}
                  placeholder="Experienced software engineer with 5+ years..."
                  rows={4}
                />
                <p className="text-xs text-gray-500 mt-1">{resumeData.summary.length}/300 characters</p>
              </div>
            )}
            <ProTip tip="Keep your summary concise - 2-3 sentences highlighting your key strengths and career goals" />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="pb-20 min-h-screen" ref={containerRef}>
      {/* Progress Bar */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-100">
        <div className="h-1 bg-gray-100">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        {/* Progress Message */}
        <div className="flex items-center justify-center gap-1.5 py-2 text-xs text-gray-600">
          <SparkleIcon />
          <span>{PROGRESS_MESSAGES[currentStepIndex]}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-3">
        {renderStepContent()}
      </div>

      {/* Section Menu Modal */}
      {showSectionMenu && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setShowSectionMenu(false)} />
          <div className="fixed bottom-16 left-4 right-4 bg-white rounded-xl shadow-xl z-50 p-2 max-h-[60vh] overflow-auto">
            <p className="text-xs font-semibold text-gray-500 px-3 py-2">Jump to section</p>
            {STEPS.map((step, idx) => (
              <button
                key={step.id}
                onClick={() => goToStep(step.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left ${
                  currentStep === step.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                  idx < currentStepIndex ? 'bg-blue-600 text-white' : idx === currentStepIndex ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {idx < currentStepIndex ? '✓' : idx + 1}
                </span>
                <div>
                  <p className="text-sm font-medium">{step.label}</p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
              </button>
            ))}
          </div>
        </>
      )}

      {/* Bottom Navigation - 4 buttons like GoResume */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 safe-area-bottom">
        <div className="grid grid-cols-4 divide-x divide-gray-100">
          {/* Previous */}
          <button
            onClick={goPrevious}
            className="flex flex-col items-center justify-center py-2.5 text-gray-600 hover:bg-gray-50 active:bg-gray-100"
          >
            <ChevronLeftIcon />
            <span className="text-[10px] mt-0.5">Previous</span>
          </button>

          {/* Section */}
          <button
            onClick={() => setShowSectionMenu(!showSectionMenu)}
            className="flex flex-col items-center justify-center py-2.5 text-gray-600 hover:bg-gray-50 active:bg-gray-100"
          >
            <MenuIcon />
            <span className="text-[10px] mt-0.5">Section</span>
          </button>

          {/* Preview */}
          <button
            onClick={onComplete}
            className="flex flex-col items-center justify-center py-2.5 text-gray-600 hover:bg-gray-50 active:bg-gray-100"
          >
            <EyeIcon />
            <span className="text-[10px] mt-0.5">Preview</span>
          </button>

          {/* Next */}
          <button
            onClick={goNext}
            className="flex flex-col items-center justify-center py-2.5 bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800"
          >
            <ChevronRightIcon />
            <span className="text-[10px] mt-0.5 font-medium">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormWizard;
