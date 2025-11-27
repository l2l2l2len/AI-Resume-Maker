import React from 'react';
import { ResumeData } from '../../types';

interface TemplateProps {
  resumeData: ResumeData;
}

export const TemplateClassic = React.forwardRef<HTMLDivElement, TemplateProps>(({ resumeData }, ref) => {
  const { personalInfo, summary, experience, education, skills } = resumeData;

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
        <section className="mb-6">
          <h2 className="text-xl font-bold uppercase tracking-wider text-slate-800 mb-2 border-b border-slate-300 pb-1">Summary</h2>
          <p className="text-slate-700 text-sm text-justify">{summary}</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-bold uppercase tracking-wider text-slate-800 mb-2 border-b border-slate-300 pb-1">Experience</h2>
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
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-bold uppercase tracking-wider text-slate-800 mb-2 border-b border-slate-300 pb-1">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="flex justify-between items-baseline mb-2">
              <div>
                <h3 className="font-bold text-slate-800 text-lg">{edu.institution}</h3>
                <p className="text-sm text-slate-600">{edu.degree}</p>
              </div>
              <span className="text-xs font-medium text-slate-500">{edu.date}</span>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-xl font-bold uppercase tracking-wider text-slate-800 mb-2 border-b border-slate-300 pb-1">Skills</h2>
          <p className="text-slate-700 text-sm">
            {skills.join(' • ')}
          </p>
        </section>
      </main>
    </div>
  );
});
