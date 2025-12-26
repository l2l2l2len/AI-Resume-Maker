import React from 'react';
import { ResumeData } from '../../types';

interface TemplateProps {
  resumeData: ResumeData;
}

// Color Palette for 3D Depth Effect
// Primary: #1a1a2e (Deep Navy) → #16213e (Dark Blue) → #0f3460 (Ocean Blue)
// Accent: #e94560 (Coral Pink) → #ff6b6b (Salmon)
// Cards: #ffffff with layered shadows
// Background: Linear gradient from #f8fafc to #e2e8f0

const SkillBar: React.FC<{ skill: string; level: number }> = ({ skill, level }) => (
  <div className="mb-3">
    <div className="flex justify-between mb-1">
      <span className="text-xs font-semibold text-slate-700">{skill}</span>
      <span className="text-xs text-slate-500">{level}%</span>
    </div>
    <div className="h-2 bg-gradient-to-r from-slate-100 to-slate-200 rounded-full overflow-hidden shadow-inner">
      <div
        className="h-full rounded-full"
        style={{
          width: `${level}%`,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
          boxShadow: '0 2px 4px rgba(102, 126, 234, 0.4)',
        }}
      />
    </div>
  </div>
);

const RadialSkill: React.FC<{ skill: string; index: number }> = ({ skill, index }) => {
  const colors = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  ];

  return (
    <div
      className="px-3 py-1.5 rounded-full text-xs font-medium text-white shadow-lg transform hover:scale-105 transition-transform"
      style={{
        background: colors[index % colors.length],
        boxShadow: '0 4px 15px rgba(0,0,0,0.15), 0 2px 5px rgba(0,0,0,0.1)',
      }}
    >
      {skill}
    </div>
  );
};

const Card3D: React.FC<{ children: React.ReactNode; className?: string; depth?: number }> = ({
  children,
  className = '',
  depth = 1
}) => {
  const shadowIntensity = depth * 8;
  const shadowBlur = depth * 16;

  return (
    <div
      className={`bg-white rounded-xl ${className}`}
      style={{
        boxShadow: `
          0 ${shadowIntensity}px ${shadowBlur}px rgba(0,0,0,0.08),
          0 ${shadowIntensity/2}px ${shadowBlur/2}px rgba(0,0,0,0.06),
          0 2px 4px rgba(0,0,0,0.04),
          inset 0 1px 0 rgba(255,255,255,0.8)
        `,
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
      }}
    >
      {children}
    </div>
  );
};

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="relative mb-4">
    <h2
      className="text-sm font-bold uppercase tracking-widest"
      style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      {children}
    </h2>
    <div
      className="absolute -bottom-1 left-0 h-0.5 w-12 rounded-full"
      style={{
        background: 'linear-gradient(90deg, #e94560 0%, #ff6b6b 100%)',
        boxShadow: '0 2px 8px rgba(233, 69, 96, 0.4)',
      }}
    />
  </div>
);

export const Template3D = React.forwardRef<HTMLDivElement, TemplateProps>(({ resumeData }, ref) => {
  const { personalInfo, summary, experience, internships, projects, education, skills, customSections } = resumeData;

  // Generate skill levels (for demo purposes, based on skill name length)
  const getSkillLevel = (skill: string, index: number) => {
    const baseLevel = 70 + (skill.length % 25);
    const variation = (index * 7) % 20;
    return Math.min(95, baseLevel + variation);
  };

  return (
    <div
      ref={ref}
      className="min-h-full font-sans p-6"
      style={{
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
        background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)',
      }}
    >
      {/* Header Card - Hero Section with 3D Depth */}
      <Card3D depth={3} className="mb-5 overflow-hidden">
        <div
          className="relative p-5"
          style={{
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)',
          }}
        >
          {/* Decorative Floating Elements */}
          <div
            className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10"
            style={{
              background: 'radial-gradient(circle, #e94560 0%, transparent 70%)',
              transform: 'translate(30%, -30%)',
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-24 h-24 rounded-full opacity-10"
            style={{
              background: 'radial-gradient(circle, #4facfe 0%, transparent 70%)',
              transform: 'translate(-30%, 30%)',
            }}
          />

          <div className="relative z-10">
            <h1
              className="text-3xl font-extrabold tracking-tight mb-2"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 2px 20px rgba(255,255,255,0.1)',
              }}
            >
              {personalInfo.name}
            </h1>

            {/* Contact Info Pills */}
            <div className="flex flex-wrap gap-2 mt-3">
              {personalInfo.email && (
                <span
                  className="text-xs px-3 py-1 rounded-full"
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    color: '#e2e8f0',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  {personalInfo.email}
                </span>
              )}
              {personalInfo.phone && (
                <span
                  className="text-xs px-3 py-1 rounded-full"
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    color: '#e2e8f0',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  {personalInfo.phone}
                </span>
              )}
              {personalInfo.linkedin && (
                <span
                  className="text-xs px-3 py-1 rounded-full"
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    color: '#e2e8f0',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  {personalInfo.linkedin}
                </span>
              )}
              {personalInfo.website && (
                <span
                  className="text-xs px-3 py-1 rounded-full"
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    color: '#e2e8f0',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  {personalInfo.website}
                </span>
              )}
            </div>
          </div>
        </div>
      </Card3D>

      {/* Two Column Layout */}
      <div className="flex gap-5">
        {/* Left Column - 35% */}
        <div className="w-[35%] space-y-4">
          {/* Summary Card */}
          {summary && (
            <Card3D depth={2} className="p-4">
              <SectionTitle>About Me</SectionTitle>
              <p className="text-xs text-slate-600 leading-relaxed text-justify">
                {summary}
              </p>
            </Card3D>
          )}

          {/* Skills Card with Bars */}
          {skills && skills.length > 0 && (
            <Card3D depth={2} className="p-4">
              <SectionTitle>Expertise</SectionTitle>

              {/* Skill Bars for top skills */}
              <div className="mb-4">
                {skills.slice(0, 4).map((skill, index) => (
                  <SkillBar
                    key={index}
                    skill={skill}
                    level={getSkillLevel(skill, index)}
                  />
                ))}
              </div>

              {/* Radial/Pill Skills for remaining */}
              {skills.length > 4 && (
                <div className="flex flex-wrap gap-2">
                  {skills.slice(4).map((skill, index) => (
                    <RadialSkill key={index} skill={skill} index={index + 4} />
                  ))}
                </div>
              )}
            </Card3D>
          )}

          {/* Education Card */}
          {education && education.length > 0 && (
            <Card3D depth={2} className="p-4">
              <SectionTitle>Education</SectionTitle>
              <div className="space-y-3">
                {education.map((edu, index) => (
                  <div
                    key={edu.id}
                    className="relative pl-4"
                    style={{
                      borderLeft: '2px solid',
                      borderImage: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%) 1',
                    }}
                  >
                    <div
                      className="absolute left-0 top-1 w-2 h-2 rounded-full transform -translate-x-[5px]"
                      style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        boxShadow: '0 2px 8px rgba(102, 126, 234, 0.4)',
                      }}
                    />
                    <h3 className="text-xs font-bold text-slate-800">{edu.institution}</h3>
                    <p className="text-xs text-slate-600">{edu.degree}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{edu.date}</p>
                  </div>
                ))}
              </div>
            </Card3D>
          )}
        </div>

        {/* Right Column - 65% */}
        <div className="w-[65%] space-y-4">
          {/* Experience Section */}
          {experience && experience.length > 0 && (
            <Card3D depth={2} className="p-4">
              <SectionTitle>Professional Experience</SectionTitle>
              <div className="space-y-4">
                {experience.map((exp, index) => (
                  <div
                    key={exp.id}
                    className="relative"
                  >
                    {/* 3D Block Effect */}
                    <div
                      className="p-3 rounded-lg"
                      style={{
                        background: 'linear-gradient(135deg, #fafbfc 0%, #f1f5f9 100%)',
                        boxShadow: `
                          0 4px 12px rgba(0,0,0,0.05),
                          0 2px 4px rgba(0,0,0,0.03),
                          inset 0 1px 0 rgba(255,255,255,0.8),
                          inset 0 -1px 0 rgba(0,0,0,0.02)
                        `,
                      }}
                    >
                      {/* Accent Bar */}
                      <div
                        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg"
                        style={{
                          background: 'linear-gradient(180deg, #e94560 0%, #ff6b6b 100%)',
                        }}
                      />

                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <h3 className="text-sm font-bold text-slate-800">{exp.role}</h3>
                          <p
                            className="text-xs font-medium"
                            style={{ color: '#0f3460' }}
                          >
                            {exp.company}
                          </p>
                        </div>
                        <span
                          className="text-xs px-2 py-0.5 rounded-full font-medium"
                          style={{
                            background: 'linear-gradient(135deg, #e94560 0%, #ff6b6b 100%)',
                            color: 'white',
                            boxShadow: '0 2px 8px rgba(233, 69, 96, 0.3)',
                          }}
                        >
                          {exp.date}
                        </span>
                      </div>

                      <ul className="mt-2 space-y-1">
                        {exp.bulletPoints.map((point, idx) => (
                          <li key={idx} className="text-xs text-slate-600 flex items-start">
                            <span
                              className="mr-2 mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                              style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                            />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </Card3D>
          )}

          {/* Internships Section */}
          {internships && internships.length > 0 && (
            <Card3D depth={2} className="p-4">
              <SectionTitle>Internships</SectionTitle>
              <div className="space-y-3">
                {internships.map((internship) => (
                  <div
                    key={internship.id}
                    className="p-3 rounded-lg relative"
                    style={{
                      background: 'linear-gradient(135deg, #fafbfc 0%, #f1f5f9 100%)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.03)',
                    }}
                  >
                    <div
                      className="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg"
                      style={{
                        background: 'linear-gradient(180deg, #4facfe 0%, #00f2fe 100%)',
                      }}
                    />
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="text-sm font-bold text-slate-800">{internship.role}</h3>
                        <p className="text-xs font-medium" style={{ color: '#0f3460' }}>{internship.company}</p>
                      </div>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{
                          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                          color: 'white',
                          boxShadow: '0 2px 8px rgba(79, 172, 254, 0.3)',
                        }}
                      >
                        {internship.date}
                      </span>
                    </div>
                    <ul className="mt-2 space-y-1">
                      {internship.bulletPoints.map((point, idx) => (
                        <li key={idx} className="text-xs text-slate-600 flex items-start">
                          <span className="mr-2 mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: '#4facfe' }} />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Card3D>
          )}

          {/* Projects Section */}
          {projects && projects.length > 0 && (
            <Card3D depth={2} className="p-4">
              <SectionTitle>Projects & Highlights</SectionTitle>
              <div className="grid grid-cols-2 gap-3">
                {projects.map((project, index) => (
                  <div
                    key={project.id}
                    className="p-3 rounded-lg"
                    style={{
                      background: `linear-gradient(135deg, ${
                        index % 2 === 0
                          ? 'rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%'
                          : 'rgba(79, 172, 254, 0.05) 0%, rgba(0, 242, 254, 0.05) 100%'
                      })`,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.6)',
                      border: '1px solid rgba(0,0,0,0.03)',
                    }}
                  >
                    <h3 className="text-xs font-bold text-slate-800 mb-1">{project.name}</h3>
                    {project.link && (
                      <p className="text-xs text-blue-500 mb-1 truncate">{project.link}</p>
                    )}
                    <ul className="space-y-0.5">
                      {project.bulletPoints.slice(0, 2).map((point, idx) => (
                        <li key={idx} className="text-xs text-slate-600 flex items-start">
                          <span className="mr-1 mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{
                            background: index % 2 === 0 ? '#667eea' : '#4facfe'
                          }} />
                          <span className="line-clamp-2">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Card3D>
          )}

          {/* Custom Sections */}
          {customSections && customSections.map((section) => (
            section.title && (
              <Card3D key={section.id} depth={2} className="p-4">
                <SectionTitle>{section.title}</SectionTitle>
                <ul className="space-y-1">
                  {section.bulletPoints.map((point, idx) => (
                    point && (
                      <li key={idx} className="text-xs text-slate-600 flex items-start">
                        <span
                          className="mr-2 mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                          style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}
                        />
                        {point}
                      </li>
                    )
                  ))}
                </ul>
              </Card3D>
            )
          ))}
        </div>
      </div>

      {/* Color Palette Reference (hidden, for documentation) */}
      {/*
        Primary Gradients:
        - Deep Navy: #1a1a2e → #16213e → #0f3460
        - Coral Accent: #e94560 → #ff6b6b
        - Purple: #667eea → #764ba2 → #f093fb
        - Cyan: #4facfe → #00f2fe
        - Green: #43e97b → #38f9d7

        Background: #f8fafc → #f1f5f9 → #e2e8f0
        Card Base: #ffffff
        Text: #1e293b, #475569, #94a3b8
      */}
    </div>
  );
});
