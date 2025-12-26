import React from 'react';
import { ResumeData } from '../../types';

interface TemplateProps {
  resumeData: ResumeData;
}

export const TemplateATS = React.forwardRef<HTMLDivElement, TemplateProps>(({ resumeData }, ref) => {
  const { personalInfo, summary, experience, internships, projects, education, skills, customSections } = resumeData;

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <section className="mb-5">
      <h2 className="text-sm font-bold uppercase tracking-wide text-black border-b border-black pb-1 mb-3">
        {title}
      </h2>
      {children}
    </section>
  );

  return (
    <div
      ref={ref}
      className="p-8 bg-white text-black"
      style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '11pt', lineHeight: '1.4' }}
    >
      {/* Header - Simple and clean */}
      <header className="text-center mb-6">
        <h1 className="text-2xl font-bold uppercase tracking-wide mb-2">{personalInfo.name}</h1>
        <div className="text-sm space-x-2">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && (
            <>
              <span>|</span>
              <span>{personalInfo.phone}</span>
            </>
          )}
          {personalInfo.linkedin && (
            <>
              <span>|</span>
              <span>{personalInfo.linkedin}</span>
            </>
          )}
          {personalInfo.website && (
            <>
              <span>|</span>
              <span>{personalInfo.website}</span>
            </>
          )}
        </div>
      </header>

      <main>
        {/* Professional Summary */}
        {summary && (
          <Section title="Professional Summary">
            <p className="text-sm">{summary}</p>
          </Section>
        )}

        {/* Work Experience */}
        {experience && experience.length > 0 && (
          <Section title="Work Experience">
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <div>
                      <span className="font-bold">{exp.role}</span>
                      <span className="mx-2">|</span>
                      <span>{exp.company}</span>
                    </div>
                    <span className="text-sm">{exp.date}</span>
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
          <Section title="Internships">
            <div className="space-y-4">
              {internships.map((internship) => (
                <div key={internship.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <div>
                      <span className="font-bold">{internship.role}</span>
                      <span className="mx-2">|</span>
                      <span>{internship.company}</span>
                    </div>
                    <span className="text-sm">{internship.date}</span>
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
          <Section title="Projects">
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="font-bold">{project.name}</span>
                    {project.link && <span className="text-sm">{project.link}</span>}
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
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold">{edu.institution}</span>
                    <span className="mx-2">|</span>
                    <span>{edu.degree}</span>
                  </div>
                  <span className="text-sm">{edu.date}</span>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <Section title="Skills">
            <p className="text-sm">{skills.join(', ')}</p>
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
