import React from 'react';
import { ResumeData, Experience, Education, Internship, Project, CustomSection } from '../types';
import {
  SectionWrapper,
  PersonIcon,
  BriefcaseIcon,
  AcademicIcon,
  CodeIcon,
  SparklesIcon,
  DocumentTextIcon,
  LightningIcon,
  PuzzleIcon
} from './ui/SectionWrapper';
import { Input, Textarea } from './ui/Input';
import { Button, IconButton } from './ui/Button';
import { PlusIcon, TrashIcon } from './icons';

interface ResumeFormProps {
  resumeData: ResumeData;
  onResumeDataChange: (section: keyof ResumeData, data: any) => void;
  jobDescription: string;
  onJobDescriptionChange: (value: string) => void;
  onPreview: () => void;
  onBack: () => void;
}

export const ResumeForm: React.FC<ResumeFormProps> = ({
  resumeData,
  onResumeDataChange,
  jobDescription,
  onJobDescriptionChange,
  onPreview,
  onBack,
}) => {

  const handlePersonalInfoChange = (field: keyof ResumeData['personalInfo'], value: string) => {
    onResumeDataChange('personalInfo', { ...resumeData.personalInfo, [field]: value });
  };

  // --- Experience Handlers ---
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
    const newExperience = resumeData.experience.filter((_, i) => i !== index);
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

  // --- Internship Handlers ---
  const handleInternshipChange = (index: number, field: keyof Internship, value: string | string[]) => {
    const newInternships = [...resumeData.internships];
    newInternships[index] = { ...newInternships[index], [field]: value };
    onResumeDataChange('internships', newInternships);
  };

  const handleInternshipBulletChange = (intIndex: number, bulletIndex: number, value: string) => {
    const newInternships = [...resumeData.internships];
    newInternships[intIndex].bulletPoints[bulletIndex] = value;
    onResumeDataChange('internships', newInternships);
  };

  const addInternship = () => {
    const newInternship: Internship = {
      id: `int${Date.now()}`,
      company: '',
      role: '',
      date: '',
      bulletPoints: [''],
    };
    onResumeDataChange('internships', [...resumeData.internships, newInternship]);
  };

  const removeInternship = (index: number) => {
    const newInternships = resumeData.internships.filter((_, i) => i !== index);
    onResumeDataChange('internships', newInternships);
  };

  const addInternshipBullet = (intIndex: number) => {
    const newInternships = [...resumeData.internships];
    newInternships[intIndex].bulletPoints.push('');
    onResumeDataChange('internships', newInternships);
  };

  const removeInternshipBullet = (intIndex: number, bulletIndex: number) => {
    const newInternships = [...resumeData.internships];
    newInternships[intIndex].bulletPoints = newInternships[intIndex].bulletPoints.filter((_, i) => i !== bulletIndex);
    onResumeDataChange('internships', newInternships);
  };

  // --- Project Handlers ---
  const handleProjectChange = (index: number, field: keyof Project, value: string | string[]) => {
    const newProjects = [...resumeData.projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    onResumeDataChange('projects', newProjects);
  };

  const handleProjectBulletChange = (projIndex: number, bulletIndex: number, value: string) => {
    const newProjects = [...resumeData.projects];
    newProjects[projIndex].bulletPoints[bulletIndex] = value;
    onResumeDataChange('projects', newProjects);
  };

  const addProject = () => {
    const newProject: Project = {
      id: `proj${Date.now()}`,
      name: '',
      link: '',
      bulletPoints: [''],
    };
    onResumeDataChange('projects', [...resumeData.projects, newProject]);
  };

  const removeProject = (index: number) => {
    const newProjects = resumeData.projects.filter((_, i) => i !== index);
    onResumeDataChange('projects', newProjects);
  };

  const addProjectBullet = (projIndex: number) => {
    const newProjects = [...resumeData.projects];
    newProjects[projIndex].bulletPoints.push('');
    onResumeDataChange('projects', newProjects);
  };

  const removeProjectBullet = (projIndex: number, bulletIndex: number) => {
    const newProjects = [...resumeData.projects];
    newProjects[projIndex].bulletPoints = newProjects[projIndex].bulletPoints.filter((_, i) => i !== bulletIndex);
    onResumeDataChange('projects', newProjects);
  };

  // --- Education Handlers ---
  const handleEducationChange = (index: number, field: keyof Education, value: string) => {
    const newEducation = [...resumeData.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    onResumeDataChange('education', newEducation);
  };

  const addEducation = () => {
    const newEducationItem: Education = {
      id: `edu${Date.now()}`,
      institution: '',
      degree: '',
      date: '',
    };
    onResumeDataChange('education', [...resumeData.education, newEducationItem]);
  };

  const removeEducation = (index: number) => {
    const newEducation = resumeData.education.filter((_, i) => i !== index);
    onResumeDataChange('education', newEducation);
  };

  // --- Skills Handler ---
  const handleSkillsChange = (value: string) => {
    onResumeDataChange('skills', value.split(',').map(skill => skill.trim()));
  };

  // --- Custom Section Handlers ---
  const addCustomSection = () => {
    const newCustomSection: CustomSection = {
      id: `custom${Date.now()}`,
      title: 'New Section',
      bulletPoints: [''],
    };
    onResumeDataChange('customSections', [...resumeData.customSections, newCustomSection]);
  };

  const removeCustomSection = (index: number) => {
    const newCustomSections = resumeData.customSections.filter((_, i) => i !== index);
    onResumeDataChange('customSections', newCustomSections);
  };

  const handleCustomSectionTitleChange = (index: number, value: string) => {
    const newCustomSections = [...resumeData.customSections];
    newCustomSections[index].title = value;
    onResumeDataChange('customSections', newCustomSections);
  };

  const handleCustomSectionBulletChange = (secIndex: number, bulletIndex: number, value: string) => {
    const newCustomSections = [...resumeData.customSections];
    newCustomSections[secIndex].bulletPoints[bulletIndex] = value;
    onResumeDataChange('customSections', newCustomSections);
  };

  const addCustomSectionBullet = (secIndex: number) => {
    const newCustomSections = [...resumeData.customSections];
    newCustomSections[secIndex].bulletPoints.push('');
    onResumeDataChange('customSections', newCustomSections);
  };

  const removeCustomSectionBullet = (secIndex: number, bulletIndex: number) => {
    const newCustomSections = [...resumeData.customSections];
    newCustomSections[secIndex].bulletPoints = newCustomSections[secIndex].bulletPoints.filter((_, i) => i !== bulletIndex);
    onResumeDataChange('customSections', newCustomSections);
  };


  return (
    <div className="space-y-6 pb-24 max-w-4xl mx-auto">
      {/* Personal Info */}
      <SectionWrapper title="Personal Information" icon={<PersonIcon />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input
            label="Full Name"
            value={resumeData.personalInfo.name}
            onChange={(e) => handlePersonalInfoChange('name', e.target.value)}
            hint="Your full professional name"
          />
          <Input
            label="Email"
            type="email"
            value={resumeData.personalInfo.email}
            onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
          />
          <Input
            label="Phone"
            type="tel"
            value={resumeData.personalInfo.phone}
            onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
          />
          <Input
            label="LinkedIn Profile"
            value={resumeData.personalInfo.linkedin}
            onChange={(e) => handlePersonalInfoChange('linkedin', e.target.value)}
            hint="e.g., linkedin.com/in/yourname"
          />
          <Input
            label="Website/Portfolio"
            value={resumeData.personalInfo.website}
            onChange={(e) => handlePersonalInfoChange('website', e.target.value)}
          />
        </div>
      </SectionWrapper>

      {/* Summary */}
      <SectionWrapper title="Professional Summary" icon={<DocumentTextIcon />} collapsible>
        <Textarea
          label="Summary"
          rows={4}
          value={resumeData.summary}
          onChange={(e) => onResumeDataChange('summary', e.target.value)}
          showCharCount
          maxLength={500}
          hint="Write a compelling 2-3 sentence summary of your professional background"
        />
      </SectionWrapper>

      {/* Experience */}
      <SectionWrapper
        title="Work Experience"
        icon={<BriefcaseIcon />}
        collapsible
        badge={resumeData.experience.length || undefined}
      >
        <div className="space-y-6">
          {resumeData.experience.map((exp, index) => (
            <div
              key={exp.id}
              className="p-5 border border-slate-200 rounded-xl space-y-4 bg-gradient-to-br from-slate-50 to-white"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-slate-700">Experience #{index + 1}</h3>
                <IconButton
                  variant="danger"
                  size="sm"
                  onClick={() => removeExperience(index)}
                  aria-label="Remove Experience"
                >
                  <TrashIcon />
                </IconButton>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Company"
                  value={exp.company}
                  onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                />
                <Input
                  label="Role"
                  value={exp.role}
                  onChange={(e) => handleExperienceChange(index, 'role', e.target.value)}
                />
                <Input
                  label="Date"
                  value={exp.date}
                  onChange={(e) => handleExperienceChange(index, 'date', e.target.value)}
                  hint="e.g., Jan 2020 - Present"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">
                  Key Responsibilities / Achievements
                </label>
                <div className="space-y-3">
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
                    <PlusIcon /> Add Bullet Point
                  </Button>
                </div>
              </div>
            </div>
          ))}
          <Button variant="secondary" onClick={addExperience}>
            <PlusIcon /> Add Experience
          </Button>
        </div>
      </SectionWrapper>

      {/* Internships */}
      <SectionWrapper
        title="Internships"
        icon={<LightningIcon />}
        collapsible
        defaultOpen={resumeData.internships.length > 0}
        badge={resumeData.internships.length || undefined}
      >
        <div className="space-y-6">
          {resumeData.internships.map((internship, index) => (
            <div
              key={internship.id}
              className="p-5 border border-slate-200 rounded-xl space-y-4 bg-gradient-to-br from-slate-50 to-white"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-slate-700">Internship #{index + 1}</h3>
                <IconButton
                  variant="danger"
                  size="sm"
                  onClick={() => removeInternship(index)}
                  aria-label="Remove Internship"
                >
                  <TrashIcon />
                </IconButton>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Company"
                  value={internship.company}
                  onChange={(e) => handleInternshipChange(index, 'company', e.target.value)}
                />
                <Input
                  label="Role"
                  value={internship.role}
                  onChange={(e) => handleInternshipChange(index, 'role', e.target.value)}
                />
                <Input
                  label="Date"
                  value={internship.date}
                  onChange={(e) => handleInternshipChange(index, 'date', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Key Responsibilities</label>
                <div className="space-y-3">
                  {internship.bulletPoints.map((point, bulletIndex) => (
                    <div key={bulletIndex} className="flex items-start gap-2">
                      <div className="flex-grow">
                        <Textarea
                          rows={2}
                          value={point}
                          onChange={(e) => handleInternshipBulletChange(index, bulletIndex, e.target.value)}
                          placeholder={`Responsibility #${bulletIndex + 1}`}
                        />
                      </div>
                      <IconButton
                        variant="danger"
                        size="sm"
                        onClick={() => removeInternshipBullet(index, bulletIndex)}
                        aria-label="Remove Bullet Point"
                        className="mt-1"
                      >
                        <TrashIcon />
                      </IconButton>
                    </div>
                  ))}
                  <Button variant="ghost" size="sm" onClick={() => addInternshipBullet(index)}>
                    <PlusIcon /> Add Bullet Point
                  </Button>
                </div>
              </div>
            </div>
          ))}
          <Button variant="secondary" onClick={addInternship}>
            <PlusIcon /> Add Internship
          </Button>
        </div>
      </SectionWrapper>

      {/* Projects */}
      <SectionWrapper
        title="Projects"
        icon={<CodeIcon />}
        collapsible
        defaultOpen={resumeData.projects.length > 0}
        badge={resumeData.projects.length || undefined}
      >
        <div className="space-y-6">
          {resumeData.projects.map((project, index) => (
            <div
              key={project.id}
              className="p-5 border border-slate-200 rounded-xl space-y-4 bg-gradient-to-br from-slate-50 to-white"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-slate-700">Project #{index + 1}</h3>
                <IconButton
                  variant="danger"
                  size="sm"
                  onClick={() => removeProject(index)}
                  aria-label="Remove Project"
                >
                  <TrashIcon />
                </IconButton>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Project Name"
                  value={project.name}
                  onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
                />
                <Input
                  label="Project Link"
                  value={project.link}
                  onChange={(e) => handleProjectChange(index, 'link', e.target.value)}
                  hint="GitHub, demo, or portfolio link"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Description / Key Features</label>
                <div className="space-y-3">
                  {project.bulletPoints.map((point, bulletIndex) => (
                    <div key={bulletIndex} className="flex items-start gap-2">
                      <div className="flex-grow">
                        <Textarea
                          rows={2}
                          value={point}
                          onChange={(e) => handleProjectBulletChange(index, bulletIndex, e.target.value)}
                          placeholder={`Feature #${bulletIndex + 1}`}
                        />
                      </div>
                      <IconButton
                        variant="danger"
                        size="sm"
                        onClick={() => removeProjectBullet(index, bulletIndex)}
                        aria-label="Remove Bullet Point"
                        className="mt-1"
                      >
                        <TrashIcon />
                      </IconButton>
                    </div>
                  ))}
                  <Button variant="ghost" size="sm" onClick={() => addProjectBullet(index)}>
                    <PlusIcon /> Add Bullet Point
                  </Button>
                </div>
              </div>
            </div>
          ))}
          <Button variant="secondary" onClick={addProject}>
            <PlusIcon /> Add Project
          </Button>
        </div>
      </SectionWrapper>

      {/* Education */}
      <SectionWrapper
        title="Education"
        icon={<AcademicIcon />}
        collapsible
        badge={resumeData.education.length || undefined}
      >
        <div className="space-y-4">
          {resumeData.education.map((edu, index) => (
            <div
              key={edu.id}
              className="p-5 border border-slate-200 rounded-xl space-y-4 bg-gradient-to-br from-slate-50 to-white"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-slate-700">Education #{index + 1}</h3>
                <IconButton
                  variant="danger"
                  size="sm"
                  onClick={() => removeEducation(index)}
                  aria-label="Remove Education"
                >
                  <TrashIcon />
                </IconButton>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>
          ))}
          <Button variant="secondary" onClick={addEducation}>
            <PlusIcon /> Add Education
          </Button>
        </div>
      </SectionWrapper>

      {/* Skills */}
      <SectionWrapper title="Skills" icon={<SparklesIcon />} collapsible>
        <Input
          label="Skills (comma-separated)"
          value={resumeData.skills.join(', ')}
          onChange={(e) => handleSkillsChange(e.target.value)}
          hint="e.g., React, TypeScript, UI/UX Design, Project Management"
        />
        {resumeData.skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {resumeData.skills.map((skill, index) => (
              skill && (
                <span
                  key={index}
                  className="px-3 py-1.5 text-sm rounded-full bg-gradient-to-r from-primary-50 to-primary-100 text-primary-700 border border-primary-200"
                >
                  {skill}
                </span>
              )
            ))}
          </div>
        )}
      </SectionWrapper>

      {/* Custom Sections */}
      {resumeData.customSections.map((section, index) => (
        <SectionWrapper key={section.id} title={section.title || 'Custom Section'} icon={<PuzzleIcon />} collapsible>
          <div className="space-y-4">
            <div className="flex justify-between items-start gap-4">
              <div className="flex-grow">
                <Input
                  label="Section Title"
                  value={section.title}
                  onChange={(e) => handleCustomSectionTitleChange(index, e.target.value)}
                />
              </div>
              <IconButton
                variant="danger"
                size="sm"
                onClick={() => removeCustomSection(index)}
                aria-label="Remove Custom Section"
                className="mt-3"
              >
                <TrashIcon />
              </IconButton>
            </div>

            <label className="block text-sm font-medium text-slate-600">Content</label>
            <div className="space-y-3">
              {section.bulletPoints.map((point, bulletIndex) => (
                <div key={bulletIndex} className="flex items-start gap-2">
                  <div className="flex-grow">
                    <Textarea
                      rows={1}
                      value={point}
                      onChange={(e) => handleCustomSectionBulletChange(index, bulletIndex, e.target.value)}
                      placeholder={`Item #${bulletIndex + 1}`}
                    />
                  </div>
                  <IconButton
                    variant="danger"
                    size="sm"
                    onClick={() => removeCustomSectionBullet(index, bulletIndex)}
                    aria-label="Remove Item"
                    className="mt-1"
                  >
                    <TrashIcon />
                  </IconButton>
                </div>
              ))}
              <Button variant="ghost" size="sm" onClick={() => addCustomSectionBullet(index)}>
                <PlusIcon /> Add Item
              </Button>
            </div>
          </div>
        </SectionWrapper>
      ))}

      <div className="text-center">
        <Button variant="secondary" onClick={addCustomSection}>
          <PlusIcon /> Add Custom Section
        </Button>
      </div>


      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 glass border-t border-slate-200/50 z-40 safe-area-bottom">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 flex justify-between items-center gap-2 max-w-4xl">
          <Button variant="secondary" onClick={onBack} className="text-xs sm:text-sm px-3 sm:px-4">
            <span className="hidden sm:inline">Back to</span> Templates
          </Button>
          <Button variant="gradient" size="lg" onClick={onPreview} className="text-xs sm:text-sm px-4 sm:px-6">
            Preview <span className="hidden sm:inline">Resume</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
