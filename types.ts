
export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  website: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  date: string;
  bulletPoints: string[];
}

export interface Internship {
  id: string;
  company: string;
  role: string;
  date: string;
  bulletPoints: string[];
}

export interface Project {
  id: string;
  name: string;
  link: string;
  bulletPoints: string[];
}

export interface CustomSection {
  id: string;
  title: string;
  bulletPoints: string[];
}


export interface Education {
  id: string;
  institution: string;
  degree: string;
  date: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  internships: Internship[];
  projects: Project[];
  education: Education[];
  skills: string[];
  customSections: CustomSection[];
}