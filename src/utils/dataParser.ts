/* eslint-disable @typescript-eslint/no-explicit-any */
import rawProfileData from '../../autoapply_profile_backup_2026_06_18.json';
import { ProjectData, SkillData, ExperienceData, EducationData, AchievementData } from './types';

const data = rawProfileData as any;

// Clean up project links and provide fallbacks
const cleanProjects = (data.projects || []).map((p: any): ProjectData => ({
  id: p.id || String(Math.random()),
  project_name: p.project_name || 'Unnamed Project',
  description: p.description || '',
  tech_stack: p.tech_stack || [],
  project_url: p.project_url && p.project_url !== 'N/A' ? p.project_url : null,
  github_url: p.github_url && p.github_url !== 'N/A' ? p.github_url : null,
  start_date: p.start_date,
  end_date: p.end_date,
}));

// Clean up and format experiences
const cleanExperience = (data.experience || []).map((exp: any): ExperienceData => ({
  id: exp.id || String(Math.random()),
  company_name: exp.company_name === 'Unknown Company' && exp.role_title.includes('TechnoHacks') ? 'TechnoHacks EduTech' : exp.company_name,
  role_title: exp.role_title || '',
  employment_type: exp.employment_type || '',
  location: exp.location || '',
  start_date: exp.start_date,
  end_date: exp.end_date,
  description: exp.description || 'Gained hands-on experience in software development and technical solutions.',
  skills_used: exp.skills_used || [],
}));

// Clean up and format education
const cleanEducation = (data.education || []).map((edu: any): EducationData => ({
  id: edu.id || String(Math.random()),
  institution_name: edu.institution_name || '',
  degree: edu.degree || '',
  field_of_study: edu.field_of_study || '',
  cgpa: edu.cgpa || null,
  start_year: edu.start_year || 0,
  end_year: edu.end_year || 0,
  is_current: edu.is_current || false,
}));

// Clean up and format skills
const cleanSkills = (data.skills || []).map((s: any): SkillData => ({
  id: s.id || String(Math.random()),
  skill_name: s.skill_name || '',
  category: s.category || 'Other',
  proficiency_level: s.proficiency_level || 'INTERMEDIATE',
  is_primary: s.is_primary || false,
}));

// Clean up achievements
const cleanAchievements = (data.achievements || [])
  .filter((a: any) => a.title && a.title !== 'CERTIFICATES') // filter empty lists
  .map((a: any): AchievementData => ({
    id: a.id || String(Math.random()),
    achievement_type: a.achievement_type || 'AWARD',
    title: a.title || '',
    description: a.description || '',
    date_achieved: a.date_achieved,
  }));

export const portfolioData = {
  personal: {
    name: 'Nagalla Satish',
    email: 'satishnagalla0@gmail.com',
    phone: '+91-6302394400',
    location: `${data.profile?.address_city || 'Kakinada'}, ${data.profile?.address_state || 'Andhra Pradesh'}, ${data.profile?.address_country || 'India'}`,
    github: data.profile?.github_url || 'https://github.com/satish05112003',
    linkedin: data.profile?.linkedin_url || 'https://www.linkedin.com/in/satish-nagalla-25775b256/',
    role: 'Embedded Systems & AI Engineer',
    summary: data.profile?.profile_summary || '',
  },
  preferences: {
    preferredRoles: data.preferences?.preferred_roles || [],
    preferredLocations: data.preferences?.preferred_locations || [],
  },
  skills: cleanSkills,
  skillsByCategory: cleanSkills.reduce((acc: { [key: string]: SkillData[] }, skill: SkillData) => {
    const cat = skill.category;
    if (!acc[cat]) {
      acc[cat] = [];
    }
    // Avoid duplicates
    if (!acc[cat].some(s => s.skill_name.toLowerCase() === skill.skill_name.toLowerCase())) {
      acc[cat].push(skill);
    }
    return acc;
  }, {}),
  education: cleanEducation,
  experience: cleanExperience,
  projects: cleanProjects,
  achievements: cleanAchievements,
};
