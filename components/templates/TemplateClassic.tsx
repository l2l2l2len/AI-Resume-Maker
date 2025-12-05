import React from 'react';
import { ResumeData } from '../../types';

interface TemplateProps {
  resumeData: ResumeData;
}

export const TemplateClassic = React.forwardRef<HTMLDivElement, TemplateProps>(({ resumeData }, ref) => {
  const { personalInfo, summary, experience, internships, projects, education, skills, customSections } = resumeData;

  const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <section className="mb-6">
      <h2 className="text-xl font-bold uppercase tracking-wider text-slate-800 mb-2 border-b border-slate-300 pb-1">{title}</h2>
      {children}
    </section>
  );

  return (
    <div ref={ref} className="p-8 font-serif" style={{ fontFamily: 'Georgia, serif' }}>
      <header className="text-center border-b-2 border-slate-300 pb-4 mb-6">
        <h1 className="text-4xl font-bold tracking-wider">{personalInfo.name}</h1>
        <div className="flex justify-center items-center flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-slate-600">
          <span>{personalInfo.email}</span>
          <span className="hidden sm:inline">|</span>
          <span>{personalInfo.phone}</span>
          <span className="hidden sm:inline">|</span>
          <span>{personalInfo.linkedin}</span>
          <span className="hidden sm:inline">|</span>
          <span>{personalInfo.website}</span>
        </div>
      </header>

      <main>
        {summary && (
          <Section title="Summary">
            <p className="text-slate-700 text-sm text-justify">{summary}</p>
          </Section>
        )}

        {experience && experience.length > 0 && (
          <Section title="Experience">
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-slate-800 text-lg">{exp.role}</h3>
                    <span className="text-xs font-medium text-slate-500">{exp.date}</span>
                  </div>
                  <h4 className="text-md font-semibold text-slate-600 mb-1">{exp.company}</h4>
                  <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm">
                    {exp.bulletPoints.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>
        )}

        {internships && internships.length > 0 && (
          <Section title="Internships">
            <div className="space-y-4">
              {internships.map((internship) => (
                <div key={internship.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-slate-800 text-lg">{internship.role}</h3>
                    <span className="text-xs font-medium text-slate-500">{internship.date}</span>
                  </div>
                  <h4 className="text-md font-semibold text-slate-600 mb-1">{internship.company}</h4>
                  <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm">
                    {internship.bulletPoints.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>
        )}

        {projects && projects.length > 0 && (
          <Section title="Projects">
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-slate-800 text-lg">{project.name}</h3>
                    {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-blue-600 hover:underline">{project.link}</a>}
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm">
                    {project.bulletPoints.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>
        )}

        {education && education.length > 0 && (
          <Section title="Education">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline mb-2">
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">{edu.institution}</h3>
                  <p className="text-sm text-slate-600">{edu.degree}</p>
                </div>
                <span className="text-xs font-medium text-slate-500">{edu.date}</span>
              </div>
            ))}
          </Section>
        )}
        
        {skills && skills.length > 0 && (
          <Section title="Skills">
            <p className="text-slate-700 text-sm">
              {skills.join(' • ')}
            </p>
          </Section>
        )}

        {customSections && customSections.map((section) => (
          section.title && <Section key={section.id} title={section.title}>
            <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm">
              {section.bulletPoints.map((point, index) => (
                point && <li key={index}>{point}</li>
              ))}
            </ul>
          </Section>
        ))}
      </main>
    </div>
  );
});