import React, { useState, useEffect, useRef } from 'react';
import { ResumeData, Experience, Education, Internship, Project, CustomSection } from '../types';
import { Input, Textarea } from './ui/Input';
import { Button, IconButton } from './ui/Button';
import { PlusIcon, TrashIcon } from './icons';
import { getEmailError, getUrlError, getPhoneError } from '../utils/validation';

// Step icons
const PersonIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const ContactIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const EducationIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
  </svg>
);

const ExperienceIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const SkillsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const SummaryIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
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

export type FormStep = 'personal' | 'contact' | 'education' | 'experience' | 'skills' | 'summary';

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
  shortLabel: string;
  icon: React.ReactNode;
}

const STEPS: StepConfig[] = [
  { id: 'personal', label: 'Personal Info', shortLabel: 'Personal', icon: <PersonIcon /> },
  { id: 'contact', label: 'Contact Details', shortLabel: 'Contact', icon: <ContactIcon /> },
  { id: 'education', label: 'Education', shortLabel: 'Education', icon: <EducationIcon /> },
  { id: 'experience', label: 'Experience', shortLabel: 'Experience', icon: <ExperienceIcon /> },
  { id: 'skills', label: 'Skills', shortLabel: 'Skills', icon: <SkillsIcon /> },
  { id: 'summary', label: 'Summary', shortLabel: 'Summary', icon: <SummaryIcon /> },
];

export const FormWizard: React.FC<FormWizardProps> = ({
  resumeData,
  onResumeDataChange,
  onComplete,
  onBack,
  initialStep = 'personal',
}) => {
  const [currentStep, setCurrentStep] = useState<FormStep>(initialStep);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  const currentStepIndex = STEPS.findIndex((s) => s.id === currentStep);

  // Auto-scroll to top on step change
  useEffect(() => {
    containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const goToStep = (step: FormStep) => {
    setCurrentStep(step);
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

  // Validation handlers
  const validateEmail = () => {
    const error = getEmailError(resumeData.personalInfo.email);
    setErrors((prev) => ({ ...prev, email: error || '' }));
  };

  const validatePhone = () => {
    const error = getPhoneError(resumeData.personalInfo.phone);
    setErrors((prev) => ({ ...prev, phone: error || '' }));
  };

  const validateUrl = (field: string, value: string) => {
    const error = getUrlError(value);
    setErrors((prev) => ({ ...prev, [field]: error || '' }));
  };

  // Personal Info handlers
  const handlePersonalInfoChange = (field: keyof ResumeData['personalInfo'], value: string) => {
    onResumeDataChange('personalInfo', { ...resumeData.personalInfo, [field]: value });
  };

  // Education handlers
  const addEducation = () => {
    const newEducation: Education = {
      id: `edu${Date.now()}`,
      institution: '',
      degree: '',
      date: '',
    };
    onResumeDataChange('education', [...resumeData.education, newEducation]);
  };

  const removeEducation = (index: number) => {
    onResumeDataChange('education', resumeData.education.filter((_, i) => i !== index));
  };

  const handleEducationChange = (index: number, field: keyof Education, value: string) => {
    const newEducation = [...resumeData.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    onResumeDataChange('education', newEducation);
  };

  // Experience handlers
  const addExperience = () => {
    const newExperience: Experience = {
      id: `exp${Date.now()}`,
      company: '',
      role: '',
      date: '',
      bulletPoints: [''],
    };
    onResumeDataChange('experience', [...resumeData.experience, newExperience]);
  };

  const removeExperience = (index: number) => {
    onResumeDataChange('experience', resumeData.experience.filter((_, i) => i !== index));
  };

  const handleExperienceChange = (index: number, field: keyof Experience, value: string | string[]) => {
    const newExperience = [...resumeData.experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    onResumeDataChange('experience', newExperience);
  };

  const handleExperienceBulletChange = (expIndex: number, bulletIndex: number, value: string) => {
    const newExperience = [...resumeData.experience];
    newExperience[expIndex].bulletPoints[bulletIndex] = value;
    onResumeDataChange('experience', newExperience);
  };

  const addExperienceBullet = (expIndex: number) => {
    const newExperience = [...resumeData.experience];
    newExperience[expIndex].bulletPoints.push('');
    onResumeDataChange('experience', newExperience);
  };

  const removeExperienceBullet = (expIndex: number, bulletIndex: number) => {
    const newExperience = [...resumeData.experience];
    newExperience[expIndex].bulletPoints = newExperience[expIndex].bulletPoints.filter((_, i) => i !== bulletIndex);
    onResumeDataChange('experience', newExperience);
  };

  // Skills handler
  const handleSkillsChange = (value: string) => {
    onResumeDataChange('skills', value.split(',').map((skill) => skill.trim()));
  };

  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 'personal':
        return (
          <div className="space-y-5">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Personal Information</h2>
              <p className="text-gray-600">Let's start with your basic details</p>
            </div>
            <Input
              label="Full Name"
              value={resumeData.personalInfo.name}
              onChange={(e) => handlePersonalInfoChange('name', e.target.value)}
              hint="Your full professional name"
            />
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-5">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Contact Details</h2>
              <p className="text-gray-600">How can employers reach you?</p>
            </div>
            <Input
              label="Email"
              type="email"
              value={resumeData.personalInfo.email}
              onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
              onBlur={validateEmail}
              error={errors.email}
            />
            <Input
              label="Phone Number"
              type="tel"
              value={resumeData.personalInfo.phone}
              onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
              onBlur={validatePhone}
              error={errors.phone}
            />
            <Input
              label="LinkedIn Profile"
              value={resumeData.personalInfo.linkedin}
              onChange={(e) => handlePersonalInfoChange('linkedin', e.target.value)}
              onBlur={() => validateUrl('linkedin', resumeData.personalInfo.linkedin)}
              error={errors.linkedin}
              hint="e.g., linkedin.com/in/yourname"
            />
            <Input
              label="Website/Portfolio"
              value={resumeData.personalInfo.website}
              onChange={(e) => handlePersonalInfoChange('website', e.target.value)}
              onBlur={() => validateUrl('website', resumeData.personalInfo.website)}
              error={errors.website}
            />
          </div>
        );

      case 'education':
        return (
          <div className="space-y-5">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Education</h2>
              <p className="text-gray-600">Add your educational background</p>
            </div>

            {resumeData.education.map((edu, index) => (
              <div
                key={edu.id}
                className="p-4 border border-gray-200 rounded-xl space-y-4 bg-gray-50"
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">Education #{index + 1}</span>
                  <IconButton
                    variant="danger"
                    size="sm"
                    onClick={() => removeEducation(index)}
                    aria-label="Remove Education"
                  >
                    <TrashIcon />
                  </IconButton>
                </div>
                <Input
                  label="Institution"
                  value={edu.institution}
                  onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                />
                <Input
                  label="Degree"
                  value={edu.degree}
                  onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                />
                <Input
                  label="Date"
                  value={edu.date}
                  onChange={(e) => handleEducationChange(index, 'date', e.target.value)}
                  hint="e.g., Sep 2016 - May 2020"
                />
              </div>
            ))}

            <Button variant="secondary" onClick={addEducation} className="w-full">
              <PlusIcon /> Add Education
            </Button>
          </div>
        );

      case 'experience':
        return (
          <div className="space-y-5">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Work Experience</h2>
              <p className="text-gray-600">Add your work history</p>
            </div>

            {resumeData.experience.map((exp, index) => (
              <div
                key={exp.id}
                className="p-4 border border-gray-200 rounded-xl space-y-4 bg-gray-50"
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">Experience #{index + 1}</span>
                  <IconButton
                    variant="danger"
                    size="sm"
                    onClick={() => removeExperience(index)}
                    aria-label="Remove Experience"
                  >
                    <TrashIcon />
                  </IconButton>
                </div>
                <Input
                  label="Company"
                  value={exp.company}
                  onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                />
                <Input
                  label="Role/Position"
                  value={exp.role}
                  onChange={(e) => handleExperienceChange(index, 'role', e.target.value)}
                />
                <Input
                  label="Date Range"
                  value={exp.date}
                  onChange={(e) => handleExperienceChange(index, 'date', e.target.value)}
                  hint="e.g., Jan 2020 - Present"
                />

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-600">
                    Key Achievements
                  </label>
                  {exp.bulletPoints.map((point, bulletIndex) => (
                    <div key={bulletIndex} className="flex items-start gap-2">
                      <div className="flex-grow">
                        <Textarea
                          rows={2}
                          value={point}
                          onChange={(e) => handleExperienceBulletChange(index, bulletIndex, e.target.value)}
                          placeholder={`Achievement #${bulletIndex + 1}`}
                        />
                      </div>
                      <IconButton
                        variant="danger"
                        size="sm"
                        onClick={() => removeExperienceBullet(index, bulletIndex)}
                        aria-label="Remove Bullet Point"
                        className="mt-1"
                      >
                        <TrashIcon />
                      </IconButton>
                    </div>
                  ))}
                  <Button variant="ghost" size="sm" onClick={() => addExperienceBullet(index)}>
                    <PlusIcon /> Add Point
                  </Button>
                </div>
              </div>
            ))}

            <Button variant="secondary" onClick={addExperience} className="w-full">
              <PlusIcon /> Add Experience
            </Button>
          </div>
        );

      case 'skills':
        return (
          <div className="space-y-5">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Skills</h2>
              <p className="text-gray-600">What are your key skills and competencies?</p>
            </div>
            <Input
              label="Skills (comma-separated)"
              value={resumeData.skills.join(', ')}
              onChange={(e) => handleSkillsChange(e.target.value)}
              hint="e.g., React, TypeScript, UI/UX Design, Project Management"
            />
            {resumeData.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {resumeData.skills.map((skill, index) =>
                  skill ? (
                    <span
                      key={index}
                      className="px-3 py-1.5 text-sm rounded-full bg-blue-50 text-blue-700 border border-blue-200"
                    >
                      {skill}
                    </span>
                  ) : null
                )}
              </div>
            )}
          </div>
        );

      case 'summary':
        return (
          <div className="space-y-5">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Professional Summary</h2>
              <p className="text-gray-600">Write a compelling summary of your career</p>
            </div>
            <Textarea
              label="Summary"
              rows={6}
              value={resumeData.summary}
              onChange={(e) => onResumeDataChange('summary', e.target.value)}
              showCharCount
              maxLength={500}
              hint="Write 2-3 sentences about your professional background and goals"
            />
          </div>
        );

      default:
        return null;
    }
  };

  const isLastStep = currentStepIndex === STEPS.length - 1;

  return (
    <div className="pb-32" ref={containerRef}>
      {/* Step Progress Indicator - Horizontal scrollable on mobile */}
      <div className="mb-6 -mx-4 px-4 overflow-x-auto scrollbar-hide">
        <div className="flex items-center min-w-max gap-1">
          {STEPS.map((step, index) => {
            const isCompleted = index < currentStepIndex;
            const isCurrent = index === currentStepIndex;
            const isClickable = index <= currentStepIndex;

            return (
              <React.Fragment key={step.id}>
                <button
                  onClick={() => isClickable && goToStep(step.id)}
                  disabled={!isClickable}
                  className={`
                    flex items-center gap-2 px-3 py-2 rounded-xl transition-all
                    min-h-[44px] touch-action-manipulation whitespace-nowrap
                    ${isClickable ? 'cursor-pointer' : 'cursor-default'}
                    ${isCurrent
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                      : isCompleted
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-gray-100 text-gray-400'
                    }
                  `}
                >
                  <span
                    className={`
                      w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold
                      ${isCurrent
                        ? 'bg-white/20 text-white'
                        : isCompleted
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-300 text-gray-500'
                      }
                    `}
                  >
                    {isCompleted ? <CheckIcon /> : index + 1}
                  </span>
                  <span className="text-sm font-medium hidden sm:inline">{step.shortLabel}</span>
                </button>
                {index < STEPS.length - 1 && (
                  <div
                    className={`w-4 h-0.5 flex-shrink-0 ${
                      index < currentStepIndex ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Step Card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm animate-fade-in">
        {renderStepContent()}
      </div>

      {/* Fixed Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 z-40 safe-area-bottom">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center gap-3 max-w-4xl">
          <Button
            variant="secondary"
            onClick={goPrevious}
            className="flex-1 md:flex-none"
          >
            <ChevronLeftIcon />
            <span className="hidden xs:inline">
              {currentStepIndex === 0 ? 'Templates' : 'Previous'}
            </span>
          </Button>

          <div className="flex items-center gap-1">
            {STEPS.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index <= currentStepIndex ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <Button
            variant="gradient"
            onClick={goNext}
            className="flex-1 md:flex-none"
          >
            <span className="hidden xs:inline">
              {isLastStep ? 'Preview' : 'Next'}
            </span>
            <ChevronRightIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FormWizard;
