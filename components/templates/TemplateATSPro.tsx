import React from 'react';
import { ResumeData } from '../../types';

interface TemplateProps {
  resumeData: ResumeData;
}

export const TemplateATSPro = React.forwardRef<HTMLDivElement, TemplateProps>(({ resumeData }, ref) => {
  const { personalInfo, summary, experience, internships, projects, education, skills, customSections } = resumeData;

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <section className="mb-5">
      <h2
        className="text-base font-bold uppercase tracking-wider mb-3 pb-1"
        style={{ color: '#2563eb', borderBottom: '2px solid #2563eb' }}
      >
        {title}
      </h2>
      {children}
    </section>
  );

  return (
    <div
      ref={ref}
      className="p-8 bg-white text-gray-800"
      style={{ fontFamily: 'Calibri, Arial, sans-serif', fontSize: '11pt', lineHeight: '1.5' }}
    >
      {/* Header - Professional with accent color */}
      <header className="mb-6 pb-4" style={{ borderBottom: '3px solid #2563eb' }}>
        <h1 className="text-3xl font-bold mb-2" style={{ color: '#1e3a5f' }}>
          {personalInfo.name}
        </h1>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <span>Email:</span>
              <span className="font-medium">{personalInfo.email}</span>
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <span>Phone:</span>
              <span className="font-medium">{personalInfo.phone}</span>
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1">
              <span>LinkedIn:</span>
              <span className="font-medium">{personalInfo.linkedin}</span>
            </span>
          )}
          {personalInfo.website && (
            <span className="flex items-center gap-1">
              <span>Website:</span>
              <span className="font-medium">{personalInfo.website}</span>
            </span>
          )}
        </div>
      </header>

      <main>
        {/* Professional Summary */}
        {summary && (
          <Section title="Professional Summary">
            <p className="text-sm leading-relaxed">{summary}</p>
          </Section>
        )}

        {/* Core Competencies / Skills - Moved up for ATS visibility */}
        {skills && skills.length > 0 && (
          <Section title="Core Competencies">
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm rounded"
                  style={{ backgroundColor: '#e0e7ff', color: '#3730a3' }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </Section>
        )}

        {/* Professional Experience */}
        {experience && experience.length > 0 && (
          <Section title="Professional Experience">
            <div className="space-y-5">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="mb-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-base" style={{ color: '#1e3a5f' }}>
                        {exp.role}
                      </h3>
                      <span className="text-sm font-medium text-gray-500">{exp.date}</span>
                    </div>
                    <p className="text-sm font-medium text-gray-600">{exp.company}</p>
                  </div>
                  <ul className="list-disc ml-5 space-y-1 text-sm">
                    {exp.bulletPoints.map((point, index) => point && <li key={index}>{point}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Internships */}
        {internships && internships.length > 0 && (
          <Section title="Internship Experience">
            <div className="space-y-5">
              {internships.map((internship) => (
                <div key={internship.id}>
                  <div className="mb-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-base" style={{ color: '#1e3a5f' }}>
                        {internship.role}
                      </h3>
                      <span className="text-sm font-medium text-gray-500">{internship.date}</span>
                    </div>
                    <p className="text-sm font-medium text-gray-600">{internship.company}</p>
                  </div>
                  <ul className="list-disc ml-5 space-y-1 text-sm">
                    {internship.bulletPoints.map((point, index) => point && <li key={index}>{point}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <Section title="Key Projects">
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold" style={{ color: '#1e3a5f' }}>
                      {project.name}
                    </h3>
                    {project.link && <span className="text-sm text-blue-600">{project.link}</span>}
                  </div>
                  <ul className="list-disc ml-5 space-y-1 text-sm">
                    {project.bulletPoints.map((point, index) => point && <li key={index}>{point}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <Section title="Education">
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold" style={{ color: '#1e3a5f' }}>
                        {edu.institution}
                      </h3>
                      <p className="text-sm text-gray-600">{edu.degree}</p>
                    </div>
                    <span className="text-sm font-medium text-gray-500">{edu.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Custom Sections */}
        {customSections &&
          customSections.map(
            (section) =>
              section.title && (
                <Section key={section.id} title={section.title}>
                  <ul className="list-disc ml-5 space-y-1 text-sm">
                    {section.bulletPoints.map((point, index) => point && <li key={index}>{point}</li>)}
                  </ul>
                </Section>
              )
          )}
      </main>
    </div>
  );
});
