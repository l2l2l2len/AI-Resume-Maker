import { ResumeData } from './types';

export const INITIAL_RESUME_DATA: ResumeData = {
  personalInfo: {
    name: 'Your Name',
    email: 'your.email@example.com',
    phone: '555-123-4567',
    linkedin: 'linkedin.com/in/yourprofile',
    website: 'yourportfolio.com',
  },
  summary: 'A brief professional summary about yourself. Highlight your key skills and achievements related to the job you are applying for.',
  experience: [
    {
      id: 'exp1',
      company: 'Awesome Tech Inc.',
      role: 'Senior React Developer',
      date: 'Jan 2020 - Present',
      bulletPoints: [
        'Developed and maintained web applications using React and TypeScript.',
        'Collaborated with cross-functional teams to deliver high-quality software.',
        'Improved application performance by 20% through code optimization.',
      ],
    },
  ],
  internships: [],
  projects: [
    {
      id: 'proj1',
      name: 'Personal Portfolio Website',
      link: 'yourportfolio.com',
      bulletPoints: [
        'Designed and built a responsive personal portfolio using React and Tailwind CSS.',
        'Implemented a project gallery and a contact form.',
      ],
    }
  ],
  education: [
    {
      id: 'edu1',
      institution: 'University of Technology',
      degree: 'B.S. in Computer Science',
      date: 'Sep 2016 - May 2020',
    },
  ],
  skills: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'UI/UX Design'],
  customSections: [],
};