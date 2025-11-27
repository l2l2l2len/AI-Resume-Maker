import React from 'react';
import { ResumeData } from '../../types';

interface TemplateProps {
  resumeData: ResumeData;
}

export const TemplateModern = React.forwardRef<HTMLDivElement, TemplateProps>(({ resumeData }, ref) => {
  const { personalInfo, summary, experience, education, skills } = resumeData;

  return (
    <div ref={ref} className="flex min-h-full font-sans" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
      {/* Left Column */}
      <aside className="w-1/3 bg-slate-800 text-white p-6">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white">{personalInfo.name}</h1>
        </header>
        
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-2 border-b border-slate-600 pb-1">Contact</h2>
          <div className="text-xs space-y-1 text-slate-300">
            <p>{personalInfo.email}</p>
            <p>{personalInfo.phone}</p>
            <p>{personalInfo.linkedin}</p>
            <p>{personalInfo.website}</p>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-2 border-b border-slate-600 pb-1">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="text-xs mb-2">
              <h3 className="font-semibold text-white">{edu.institution}</h3>
              <p className="text-slate-300">{edu.degree}</p>
              <p className="text-slate-400">{edu.date}</p>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-2 border-b border-slate-600 pb-1">Skills</h2>
          <div className="flex flex-wrap gap-1.5 text-xs">
            {skills.map((skill, index) => (
              <span key={index} className="bg-slate-700 text-slate-200 px-2 py-1 rounded">
                {skill}
              </span>
            ))}
          </div>
        </section>
      </aside>

      {/* Right Column */}
      <main className="w-2/3 p-8 bg-white text-slate-800">
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wider text-slate-800 mb-2">Summary</h2>
          <p className="text-sm text-slate-700 text-justify">{summary}</p>
        </section>

        <section>
          <h2 className="text-lg font-bold uppercase tracking-wider text-slate-800 mb-2">Experience</h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-slate-900 text-md">{exp.role}</h3>
                  <span className="text-xs font-medium text-slate-500">{exp.date}</span>
                </div>
                <h4 className="text-sm font-medium text-slate-600 mb-1">{exp.company}</h4>
                <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm">
                  {exp.bulletPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
});
